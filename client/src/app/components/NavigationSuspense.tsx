import type React from "react";
import { useNavigation } from "react-router-dom";

import { EmptyState, Spinner } from "@patternfly/react-core";

export const NavigationSuspense: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return (
      <EmptyState titleText="Loading data" headingLevel="h4" icon={Spinner} />
    );
  }

  return children;
};
