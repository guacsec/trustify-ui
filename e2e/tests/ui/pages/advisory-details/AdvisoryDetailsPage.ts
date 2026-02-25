import type { Page } from "@playwright/test";
import { DetailsPageLayout } from "../DetailsPageLayout";
import { Navigation } from "../Navigation";
import { AdvisoryListPage } from "../advisory-list/AdvisoryListPage";

export class AdvisoryDetailsPage {
  _layout: DetailsPageLayout;

  private constructor(_page: Page, layout: DetailsPageLayout) {
    this._layout = layout;
  }

  /**
   * Build the page object by navigating from the sidebar to the advisory list,
   * filtering, and clicking on the advisory link.
   */
  static async build(page: Page, advisoryID: string) {
    const navigation = await Navigation.build(page);
    await navigation.goToSidebar("Advisories");

    const listPage = await AdvisoryListPage.build(page);
    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    await toolbar.applyTextFilter("Filter text", advisoryID);
    await table.waitUntilDataIsLoaded();
    await table.verifyColumnContainsText("ID", advisoryID);

    await page.getByRole("link", { name: advisoryID, exact: true }).click();

    const layout = await DetailsPageLayout.build(page);
    await layout.verifyPageHeader(advisoryID);

    return new AdvisoryDetailsPage(page, layout);
  }

  /**
   * Build the page object from the current page state WITHOUT navigating.
   * @param page - The Playwright page object
   * @param advisoryID - Optional advisory ID to verify the page header
   */
  static async fromCurrentPage(page: Page, advisoryID?: string) {
    const layout = await DetailsPageLayout.build(page);

    if (advisoryID) {
      await layout.verifyPageHeader(advisoryID);
    }

    return new AdvisoryDetailsPage(page, layout);
  }
}
