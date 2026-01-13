import { expect as baseExpect } from "@playwright/test";
import type { DeletionConfirmDialog } from "../pages/ConfirmDialog";
import type { MatcherResult } from "./types";

export interface DialogMatchers {
  toHaveTitle(expectedTitle: string): Promise<MatcherResult>;
}

type DialogMatcherDefinitions = {
  readonly [K in keyof DialogMatchers]: (
    receiver: DeletionConfirmDialog,
    ...args: Parameters<DialogMatchers[K]>
  ) => Promise<MatcherResult>;
};

export const dialogAssertions = baseExpect.extend<DialogMatcherDefinitions>({
  toHaveTitle: async (
    dialog: DeletionConfirmDialog,
    expectedTitle: string,
  ): Promise<MatcherResult> => {
    try {
      const dialogTitle = dialog.getDeletionConfirmDialogHeading();
      await baseExpect(dialogTitle).toHaveText(expectedTitle);
      return {
        pass: true,
        message: () => `Dialog has title "${expectedTitle}"`,
      };
    } catch (error) {
      return {
        pass: false,
        message: () => (error instanceof Error ? error.message : String(error)),
      };
    }
  },
});
