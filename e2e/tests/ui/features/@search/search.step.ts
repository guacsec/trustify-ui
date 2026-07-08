import { createBdd } from "playwright-bdd";

import { test } from "../../fixtures";

import { expect } from "../../assertions";

// Import page-level common navigation and verification steps
import "../page-common-steps";

export const { Given, When, Then } = createBdd(test);

// TC-3248: Verify Upload Advisory button should not appear on Search page
Then(
  "{string} button should not be displayed",
  async ({ page }, buttonText: string) => {
    // Check that the button with the specified text is not visible on the page
    const button = page.getByRole("button", { name: buttonText, exact: true });
    await expect(button).not.toBeVisible();
  },
);
