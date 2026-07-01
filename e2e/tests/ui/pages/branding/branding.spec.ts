// @ts-check

import { expect } from "../../assertions";
import { test } from "../../fixtures";
import { login } from "../../helpers/Auth";

test.describe("Branding", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("should render the brand image in the masthead", async ({ page }) => {
    await page.goto("/");

    const brandImg = page.getByRole("img", { name: "brand" });
    await expect(brandImg).toBeVisible();

    const naturalWidth = await brandImg.evaluate(
      (img: HTMLImageElement) => img.naturalWidth,
    );
    expect(naturalWidth).toBeGreaterThan(0);
  });
});
