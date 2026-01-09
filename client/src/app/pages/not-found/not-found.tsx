import { Bullseye, EmptyState, EmptyStateBody } from "@patternfly/react-core";

import PathMissingIcon from "@patternfly/react-icons/dist/esm/icons/path-missing-icon";

export const NotFound: React.FC = () => {
  return (
    <Bullseye>
      <EmptyState
        titleText="404: That page does not exist"
        headingLevel="h4"
        icon={PathMissingIcon}
      >
        <EmptyStateBody>
          Another page might have the information you need.
        </EmptyStateBody>
      </EmptyState>
    </Bullseye>
  );
};
