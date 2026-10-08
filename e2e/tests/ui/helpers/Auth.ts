import { expect, type Page } from "@playwright/test";
import {
  AUTH_PASSWORD,
  AUTH_REQUIRED,
  AUTH_USER,
} from "../../common/constants";

export const getAccessToken = (page: Page): Promise<string | null> =>
  page.evaluate(() => {
    for (let i = 0; i < window.sessionStorage.length; i++) {
      const key = window.sessionStorage.key(i);
      if (key?.startsWith("oidc.user:")) {
        const raw = window.sessionStorage.getItem(key);
        if (raw) {
          try {
            return (
              (JSON.parse(raw) as { access_token?: string }).access_token ??
              null
            );
          } catch {
            return null;
          }
        }
      }
    }
    return null;
  });

export const login = async (page: Page) => {
  if (AUTH_REQUIRED === "true") {
    const userName = AUTH_USER;
    const userPassword = AUTH_PASSWORD;

    await page.goto("/importers");

    await page.fill('input[name="username"]:visible', userName);
    await page.fill('input[name="password"]:visible', userPassword);
    await page.keyboard.press("Enter");

    await expect(page.getByRole("heading", { name: "Importers" })).toHaveCount(
      1,
    ); // Ensure login was successful
  }
};
