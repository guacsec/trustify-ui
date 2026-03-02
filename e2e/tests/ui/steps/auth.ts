import { createBdd } from "playwright-bdd";

import { test } from "../fixtures";

import { login } from "../helpers/Auth";

export const { Given, When, Then } = createBdd(test);

Given("User is authenticated", async ({ page }) => {
  await login(page);
});
