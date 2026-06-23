import type React from "react";

import { Card, CardBody } from "@patternfly/react-core";

import "./home-section-card.css";

interface HomeSectionCardProps {
  children: React.ReactNode;
  className?: string;
}

export const HomeSectionCard: React.FC<HomeSectionCardProps> = ({
  children,
  className,
}) => {
  const cardClassName = className
    ? `home-section-card ${className}`
    : "home-section-card";

  return (
    <Card className={cardClassName}>
      <CardBody>{children}</CardBody>
    </Card>
  );
};
