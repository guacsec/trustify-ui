import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { linkifyDetails } from "../helpers/csaf-utils";

describe("linkifyDetails", () => {
  it("converts a URL in text to a link", () => {
    const text = "Visit https://example.com for more info";
    const { container } = render(<div>{linkifyDetails(text)}</div>);

    const link = container.querySelector("a");
    expect(link).toBeTruthy();
    expect(link?.getAttribute("href")).toBe("https://example.com");
    expect(link?.textContent).toBe("https://example.com");
    expect(link?.getAttribute("target")).toBe("_blank");
    expect(link?.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("handles text with no URLs", () => {
    const text = "This is plain text without any URLs";
    const { container } = render(<div>{linkifyDetails(text)}</div>);

    const links = container.querySelectorAll("a");
    expect(links.length).toBe(0);
    expect(container.textContent).toBe(text);
  });

  it("handles multiple URLs in one string", () => {
    const text = "Check https://example.com and https://test.org";
    const { container } = render(<div>{linkifyDetails(text)}</div>);

    const links = container.querySelectorAll("a");
    expect(links.length).toBe(2);
    expect(links[0].textContent).toBe("https://example.com");
    expect(links[1].textContent).toBe("https://test.org");
  });

  it("linkifies correctly on consecutive calls (global regex lastIndex bug)", () => {
    const text = "Visit https://example.com for details";

    // Call linkifyDetails 3 times consecutively
    const result1 = render(<div>{linkifyDetails(text)}</div>);
    const link1 = result1.container.querySelector("a");
    expect(link1).toBeTruthy();
    expect(link1?.textContent).toBe("https://example.com");
    result1.unmount();

    const result2 = render(<div>{linkifyDetails(text)}</div>);
    const link2 = result2.container.querySelector("a");
    expect(link2).toBeTruthy();
    expect(link2?.textContent).toBe("https://example.com");
    result2.unmount();

    const result3 = render(<div>{linkifyDetails(text)}</div>);
    const link3 = result3.container.querySelector("a");
    expect(link3).toBeTruthy();
    expect(link3?.textContent).toBe("https://example.com");
    result3.unmount();
  });
});
