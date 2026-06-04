import React from "react";
import { generatePath, Link } from "react-router-dom";

import {
  Card,
  CardBody,
  CardTitle,
  Content,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Label,
  pluralize,
  Stack,
  StackItem,
  Title,
} from "@patternfly/react-core";

import { severityList } from "@app/api/model-utils";
import { Paths } from "@app/Routes";
import type { CommonSecurityAdvisoryFramework } from "@app/specs/csaf/csaf-v2.0-schema";
import { formatDate } from "@app/utils/utils";

import { DocumentNotesCard } from "./components/csaf-overview-tab/DocumentNotesCard";
import { DocumentReferencesCard } from "./components/csaf-overview-tab/DocumentReferencesCard";
import { ImpactChart } from "./components/csaf-overview-tab/ImpactChart";
import { RemediationStatus } from "./components/csaf-overview-tab/RemediationStatus";
import { RevisionHistoryCard } from "./components/csaf-overview-tab/RevisionHistoryCard";
import {
  collectProducts,
  csafStatusColor,
  normalizeCsafSeverityText,
} from "./helpers/csaf-utils";

interface ICsafOverviewProps {
  csafDocument: CommonSecurityAdvisoryFramework;
}

export const CsafOverview: React.FC<ICsafOverviewProps> = ({
  csafDocument,
}) => {
  const csafSeverity = csafDocument.document.aggregate_severity?.text;
  const extendedSeverity = csafSeverity
    ? normalizeCsafSeverityText(csafSeverity)
    : undefined;
  const severityProps = extendedSeverity
    ? severityList[extendedSeverity]
    : undefined;

  const { products, relationships } = React.useMemo(() => {
    const products = collectProducts(csafDocument.product_tree?.branches || []);
    const relationships =
      csafDocument.product_tree?.relationships?.map(
        (r) => r.full_product_name,
      ) || [];
    return { products, relationships };
  }, [csafDocument]);
  const totalProducts = products.length + relationships.length;

  const references = csafDocument.document.references?.filter(Boolean);
  const revisionHistory = csafDocument.document.tracking.revision_history;
  const notes = csafDocument.document.notes;

  return (
    <Stack hasGutter>
      <StackItem>
        <Card isFullHeight>
          <CardTitle>
            <Flex
              justifyContent={{ default: "justifyContentSpaceBetween" }}
              alignItems={{ default: "alignItemsFlexStart" }}
            >
              <FlexItem>
                <Title headingLevel="h2" size="xl">
                  {csafDocument.document.title}
                </Title>
              </FlexItem>
              <FlexItem>
                <Flex gap={{ default: "gapSm" }}>
                  {csafDocument.document.aggregate_severity && (
                    <FlexItem>
                      <Label color={severityProps?.labelColor}>
                        Severity:{" "}
                        {csafDocument.document.aggregate_severity.text}
                      </Label>
                    </FlexItem>
                  )}
                  {csafDocument.document.distribution?.tlp && (
                    <FlexItem>
                      <Label>
                        TLP: {csafDocument.document.distribution.tlp.label}
                      </Label>
                    </FlexItem>
                  )}
                </Flex>
              </FlexItem>
            </Flex>
          </CardTitle>
          <CardBody>
            <DescriptionList isHorizontal isCompact>
              <DescriptionListGroup>
                <DescriptionListTerm>Tracking ID</DescriptionListTerm>
                <DescriptionListDescription>
                  {csafDocument.document.tracking.id.startsWith("CVE-") ? (
                    <Link
                      to={generatePath(Paths.vulnerabilityDetails, {
                        vulnerabilityId: csafDocument.document.tracking.id,
                      })}
                    >
                      {csafDocument.document.tracking.id}
                    </Link>
                  ) : (
                    csafDocument.document.tracking.id
                  )}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Status</DescriptionListTerm>
                <DescriptionListDescription>
                  <Label
                    color={csafStatusColor(
                      csafDocument.document.tracking.status,
                    )}
                  >
                    {csafDocument.document.tracking.status}
                  </Label>
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Version</DescriptionListTerm>
                <DescriptionListDescription>
                  {csafDocument.document.tracking.version}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Category</DescriptionListTerm>
                <DescriptionListDescription>
                  {csafDocument.document.category}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Publisher</DescriptionListTerm>
                <DescriptionListDescription>
                  {csafDocument.document.publisher.name}{" "}
                  <Label variant="outline" isCompact>
                    {csafDocument.document.publisher.category}
                  </Label>
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Initial release</DescriptionListTerm>
                <DescriptionListDescription>
                  {formatDate(
                    csafDocument.document.tracking.initial_release_date,
                  )}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Current release</DescriptionListTerm>
                <DescriptionListDescription>
                  {formatDate(
                    csafDocument.document.tracking.current_release_date,
                  )}
                </DescriptionListDescription>
              </DescriptionListGroup>
              {csafDocument.document.tracking.generator && (
                <DescriptionListGroup>
                  <DescriptionListTerm>Generator</DescriptionListTerm>
                  <DescriptionListDescription>
                    {csafDocument.document.tracking.generator.engine.name} v
                    {csafDocument.document.tracking.generator.engine.version}
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
            </DescriptionList>
          </CardBody>
        </Card>
      </StackItem>

      <StackItem>
        <Grid hasGutter>
          <GridItem md={6}>
            <Card isFullHeight>
              <CardTitle>Impact summary</CardTitle>
              <CardBody>
                <Stack hasGutter>
                  <StackItem>
                    <Content component="small">
                      {csafDocument.vulnerabilities?.length}{" "}
                      {pluralize(
                        csafDocument.vulnerabilities?.length ?? 1,
                        "CVE",
                      )}{" "}
                      affecting {products.length}{" "}
                      {pluralize(totalProducts, "product")}
                    </Content>
                  </StackItem>
                  <StackItem>
                    <ImpactChart
                      vulnerabilities={csafDocument.vulnerabilities || []}
                    />
                  </StackItem>
                </Stack>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem md={6}>
            <Card isFullHeight>
              <CardTitle>Remediation status</CardTitle>
              <CardBody>
                <Stack hasGutter>
                  <StackItem>
                    <Content component="small">
                      Fix availability across affected products
                    </Content>
                  </StackItem>
                  <StackItem>
                    <RemediationStatus
                      totalProducts={totalProducts}
                      vulnerabilities={csafDocument.vulnerabilities ?? []}
                    />
                  </StackItem>
                </Stack>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </StackItem>

      {references && references.length > 0 && (
        <StackItem>
          <DocumentReferencesCard references={references} />
        </StackItem>
      )}

      {revisionHistory && revisionHistory.length > 0 && (
        <StackItem>
          <RevisionHistoryCard revisions={revisionHistory} />
        </StackItem>
      )}

      {notes && notes.length > 0 && (
        <StackItem>
          <DocumentNotesCard notes={notes} />
        </StackItem>
      )}
    </Stack>
  );
};
