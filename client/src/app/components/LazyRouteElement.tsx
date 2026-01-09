import type React from "react";
import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { Bullseye, Spinner } from "@patternfly/react-core";
import { ErrorFallback } from "./ErrorFallback";
import { NavigationSuspense } from "./NavigationSuspense";

export const LazyRouteElement = ({
  identifier,
  component,
}: {
  identifier: string;
  component: React.ReactNode;
}) => {
  return (
    <Suspense
      key={identifier}
      fallback={
        <Bullseye>
          <Spinner />
        </Bullseye>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback} key={identifier}>
        <NavigationSuspense>{component}</NavigationSuspense>
      </ErrorBoundary>
    </Suspense>
  );
};
