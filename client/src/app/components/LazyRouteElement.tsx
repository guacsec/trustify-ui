import type React from "react";
import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { Bullseye, Spinner } from "@patternfly/react-core";
import { ErrorFallback } from "./ErrorFallback";

export const LazyRouteElement = ({
  key,
  component,
}: {
  key: string;
  component: React.ReactNode;
}) => {
  return (
    <Suspense
      key={key}
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
