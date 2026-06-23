import type React from "react";

import { DashboardIngestionMetrics } from "./DashboardIngestionMetrics";
import { HomeSectionCard } from "./HomeSectionCard";

export const PortfolioMetricsSection: React.FC = () => {
  return (
    <HomeSectionCard>
      <DashboardIngestionMetrics />
    </HomeSectionCard>
  );
};
