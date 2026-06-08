import { describe, expect, it } from "vitest";

import type { Branch } from "@app/specs/csaf/csaf-v2.0-schema";

import {
  transformBranchesToTreeData,
  countVisibleLeaves,
  countExpandedNodes,
} from "./csaf-tree-helpers";

describe("transformBranchesToTreeData", () => {
  const makeBranch = (
    name: string,
    category: string = "vendor",
    children?: Branch[],
  ): Branch =>
    ({
      name,
      category,
      ...(children ? { branches: children } : {}),
    }) as Branch;

  it("returns the single branch directly as root when there is one root branch", () => {
    const branches: Branch[] = [
      makeBranch("Red Hat", "vendor", [makeBranch("RHEL", "product_name")]),
    ];

    const result = transformBranchesToTreeData(branches);

    expect(result.name).toBe("Red Hat");
    expect(result.children).toHaveLength(1);
    expect(result.children![0].name).toBe("RHEL");
  });

  it("wraps multiple root branches under a 'Products' node", () => {
    const branches: Branch[] = [
      makeBranch("Red Hat", "vendor"),
      makeBranch("Fedora", "vendor"),
    ];

    const result = transformBranchesToTreeData(branches);

    expect(result.name).toBe("Products");
    expect(result.children).toHaveLength(2);
    expect(result.children![0].name).toBe("Red Hat");
    expect(result.children![1].name).toBe("Fedora");
  });

  it("applies category colors to nodes", () => {
    const branches: Branch[] = [makeBranch("Red Hat", "vendor")];

    const result = transformBranchesToTreeData(branches);

    expect(result.itemStyle?.color).toBe("#C9190B");
  });

  it("sets product_id as node value when branch has a product", () => {
    const branch: Branch = {
      name: "RHEL 9",
      category: "product_name" as Branch["category"],
      product: {
        name: "Red Hat Enterprise Linux 9",
        product_id: "RHEL-9",
      },
    } as Branch;

    const result = transformBranchesToTreeData([branch]);

    expect(result.value).toBe("RHEL-9");
  });

  it("auto-collapses nodes with more than 40 leaves", () => {
    const manyLeaves = Array.from({ length: 50 }, (_, i) =>
      makeBranch(`product-${i}`, "product_name"),
    );
    const branches: Branch[] = [makeBranch("Big Vendor", "vendor", manyLeaves)];

    const result = transformBranchesToTreeData(branches);

    expect(result.collapsed).toBe(true);
  });
});

describe("countVisibleLeaves", () => {
  it("returns 1 for a single node with no children", () => {
    expect(countVisibleLeaves({ name: "leaf" })).toBe(1);
  });

  it("counts all leaves in a fully expanded tree", () => {
    const tree = {
      name: "root",
      children: [{ name: "a" }, { name: "b" }, { name: "c" }],
    };
    expect(countVisibleLeaves(tree)).toBe(3);
  });

  it("counts a collapsed node as 1 regardless of its children", () => {
    const tree = {
      name: "root",
      collapsed: true,
      children: [
        { name: "a" },
        { name: "b" },
        { name: "c", children: [{ name: "d" }, { name: "e" }] },
      ],
    };
    expect(countVisibleLeaves(tree)).toBe(1);
  });

  it("counts visible leaves in a mixed expanded/collapsed tree", () => {
    const tree = {
      name: "root",
      children: [
        {
          name: "expanded-parent",
          children: [{ name: "visible-leaf-1" }, { name: "visible-leaf-2" }],
        },
        {
          name: "collapsed-parent",
          collapsed: true,
          children: [
            { name: "hidden-1" },
            { name: "hidden-2" },
            { name: "hidden-3" },
          ],
        },
      ],
    };
    expect(countVisibleLeaves(tree)).toBe(3);
  });

  it("handles deeply nested collapsed nodes", () => {
    const tree = {
      name: "root",
      children: [
        {
          name: "level-1",
          children: [
            {
              name: "level-2-collapsed",
              collapsed: true,
              children: Array.from({ length: 100 }, (_, i) => ({
                name: `deep-${i}`,
              })),
            },
            { name: "level-2-leaf" },
          ],
        },
      ],
    };
    expect(countVisibleLeaves(tree)).toBe(2);
  });

  it("matches real-world pattern: vendor with 880 collapsed children", () => {
    const manyLeaves = Array.from({ length: 880 }, (_, i) => ({
      name: `product-${i}`,
    }));
    const tree = {
      name: "Red Hat",
      collapsed: true,
      children: manyLeaves,
    };
    expect(countVisibleLeaves(tree)).toBe(1);
  });
});

describe("countExpandedNodes", () => {
  it("returns 1 for a leaf node", () => {
    const node = { children: [] };
    expect(countExpandedNodes(node)).toBe(1);
  });

  it("counts all children when node is expanded", () => {
    const node = {
      isExpand: true,
      children: [{ children: [] }, { children: [] }, { children: [] }],
    };
    expect(countExpandedNodes(node)).toBe(3);
  });

  it("counts a collapsed node as 1", () => {
    const node = {
      isExpand: false,
      children: [{ children: [] }, { children: [] }],
    };
    expect(countExpandedNodes(node)).toBe(1);
  });

  it("handles mixed expanded and collapsed subtrees", () => {
    const node = {
      isExpand: true,
      children: [
        {
          isExpand: true,
          children: [{ children: [] }, { children: [] }],
        },
        {
          isExpand: false,
          children: Array.from({ length: 500 }, () => ({ children: [] })),
        },
      ],
    };
    expect(countExpandedNodes(node)).toBe(3);
  });
});
