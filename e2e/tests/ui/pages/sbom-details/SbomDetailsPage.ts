import type { Page } from "@playwright/test";
import { DetailsPageLayout } from "../DetailsPageLayout";
import { Navigation } from "../Navigation";
import { SbomListPage } from "../sbom-list/SbomListPage";

export class SbomDetailsPage {
  _layout: DetailsPageLayout;

  private constructor(_page: Page, layout: DetailsPageLayout) {
    this._layout = layout;
  }

  /**
   * Build the page object by navigating from the sidebar to the SBOM list,
   * filtering, and clicking on the SBOM link.
   */
  static async build(page: Page, sbomName: string) {
    const navigation = await Navigation.build(page);
    await navigation.goToSidebar("SBOMs");

    const listPage = await SbomListPage.build(page);
    const toolbar = await listPage.getToolbar();
    const table = await listPage.getTable();

    await toolbar.applyTextFilter("Filter text", sbomName);
    await table.waitUntilDataIsLoaded();
    await table.verifyColumnContainsText("Name", sbomName);

    await page.getByRole("link", { name: sbomName, exact: true }).click();

    const layout = await DetailsPageLayout.build(page);
    await layout.verifyPageHeader(sbomName);

    return new SbomDetailsPage(page, layout);
  }

  /**
   * Build the page object from the current page state WITHOUT navigating.
   * @param page - The Playwright page object
   * @param sbomName - Optional SBOM name to verify the page header
   */
  static async fromCurrentPage(page: Page, sbomName?: string) {
    const layout = await DetailsPageLayout.build(page);

    if (sbomName) {
      await layout.verifyPageHeader(sbomName);
    }

    return new SbomDetailsPage(page, layout);
  }
}
