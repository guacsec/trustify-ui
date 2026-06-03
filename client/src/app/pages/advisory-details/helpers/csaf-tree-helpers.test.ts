import { describe, expect, it } from "vitest";

import type { Branch } from "@app/specs/csaf/csaf-v2.0-schema";

import { transformBranchesToTreeData } from "./csaf-tree-helpers";

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
