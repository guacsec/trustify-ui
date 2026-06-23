import type React from "react";

import { PageSection, Stack, StackItem } from "@patternfly/react-core";

import { DocumentMetadata } from "@app/components/DocumentMetadata";

import { GetStartedSection } from "./components/GetStartedSection";
import { PortfolioMetricsSection } from "./components/PortfolioMetricsSection";
import { VulnerabilityAttentionSection } from "./components/WhatNeedsAttention";

export const Home: React.FC = () => {
  return (
    <>
      <DocumentMetadata title={"Home"} />
      <PageSection variant="light">
        <Stack hasGutter>
          <StackItem>
            <GetStartedSection />
          </StackItem>
          <StackItem>
            <VulnerabilityAttentionSection />
          </StackItem>
          <StackItem>
            <PortfolioMetricsSection />
          </StackItem>
        </Stack>
      </PageSection>
    </>
  );
};
