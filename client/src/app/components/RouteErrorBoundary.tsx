import type React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

import axios from "axios";

import {
  Bullseye,
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateVariant,
} from "@patternfly/react-core";
import PathMissingIcon from "@patternfly/react-icons/dist/esm/icons/path-missing-icon";
import LockIcon from "@patternfly/react-icons/dist/esm/icons/lock-icon";
import spacing from "@patternfly/react-styles/css/utilities/Spacing/spacing";

export const RouteErrorBoundary: React.FC = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  if (axios.isAxiosError(error)) {
    if (error.status === 404) {
      return (
        <Bullseye>
          <EmptyState
            titleText="Resource not found"
            headingLevel="h4"
            icon={PathMissingIcon}
            variant={EmptyStateVariant.sm}
          >
            <EmptyStateBody>
              Try to refresh your page or contact your admin.
              <Button
                variant="primary"
                className={spacing.mtSm}
                onClick={() => {
                  navigate("/");
                }}
              >
                Refresh
              </Button>
            </EmptyStateBody>
          </EmptyState>
        </Bullseye>
      );
    }
    if (error.status === 401) {
      return (
        <Bullseye>
          <EmptyState
            titleText="You do not have access to this resource"
            headingLevel="h4"
            icon={LockIcon}
            variant={EmptyStateVariant.sm}
          >
            <EmptyStateBody>
              Try to refresh your page or contact your admin.
              <Button
                variant="primary"
                className={spacing.mtSm}
                onClick={() => {
                  navigate("/");
                }}
              >
                Refresh
              </Button>
            </EmptyStateBody>
          </EmptyState>
        </Bullseye>
      );
    }
  }

  // rethrow to let the parent error boundary handle it
  throw error;
};
