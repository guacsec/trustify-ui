import { createBdd } from "playwright-bdd";

import { test } from "../../fixtures";

import { expect } from "../../assertions";

export const { Given, When, Then } = createBdd(test);

// TC-3248: Verify Upload Advisory button should not appear on Search page
Then(
  "{string} button should not be displayed",
  async ({ page }, buttonText: string) => {
    const button = page.getByRole("button", { name: buttonText, exact: true });
    await expect(button).not.toBeVisible();
  },
);
