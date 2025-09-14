import type React from "react";

import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateVariant,
} from "@patternfly/react-core";
import { PathMissingIcon } from "@patternfly/react-icons";

/**
 * Based on https://www.patternfly.org/component-groups/error-communication/missing-page
 */
export const NotFoundPage: React.FC = () => {
  return (
    <EmptyState
      titleText="Page not found"
      headingLevel="h1"
      icon={PathMissingIcon}
      variant={EmptyStateVariant.full}
    >
      <EmptyStateBody>
        The page you are trying to reach does not exist.
      </EmptyStateBody>
      <EmptyStateFooter>
        <Button variant="link" component="a" href={"/"}>
          Return to homepage
        </Button>
      </EmptyStateFooter>
    </EmptyState>
  );
};
