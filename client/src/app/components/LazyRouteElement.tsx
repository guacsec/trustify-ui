import type React from "react";
import { Suspense } from "react";

import { EmptyState, Spinner } from "@patternfly/react-core";
import { NavigationRoute } from "./NavigationRoute";
import { SeoMetadata } from "./SeoMetadata";

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
        <EmptyState
          titleText="Loading assets"
          headingLevel="h4"
          icon={Spinner}
        />
      }
    >
      <NavigationRoute>
        <SeoMetadata />
        {component}
      </NavigationRoute>
    </Suspense>
  );
};
