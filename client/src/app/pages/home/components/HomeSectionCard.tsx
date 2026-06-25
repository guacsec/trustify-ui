import type React from "react";

import { Card, CardBody } from "@patternfly/react-core";

interface HomeSectionCardProps {
  children: React.ReactNode;
}

export const HomeSectionCard: React.FC<HomeSectionCardProps> = ({
  children,
}) => {
  return (
    <Card isFlat>
      <CardBody>{children}</CardBody>
    </Card>
  );
};
