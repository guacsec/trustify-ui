import type React from "react";
import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { Bullseye, Spinner } from "@patternfly/react-core";
import { ErrorFallback } from "./ErrorFallback";

export const LazyRouteElement = ({
  component,
}: {
  component: React.ReactNode;
}) => {
  return (
    <Suspense
      fallback={
        <Bullseye>
          <Spinner />
        </Bullseye>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {component}
      </ErrorBoundary>
    </Suspense>
  );
};
