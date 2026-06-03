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
  Stack,
  StackItem,
  Title,
} from "@patternfly/react-core";
import ExternalLinkAltIcon from "@patternfly/react-icons/dist/esm/icons/external-link-alt-icon";

import { normalizeSeverityText, severityList } from "@app/api/model-utils";
import { Paths } from "@app/Routes";
import { CommonSecurityAdvisoryFramework } from "@app/specs/csaf/csaf-v2.0-schema";
import { formatDate } from "@app/utils/utils";

import { collectProducts, csafStatusColor } from "./csaf-utils";
import { CSAFImpactChart } from "./CSAFImpactChart";
import { CSAFRemediationStatus } from "./CSAFRemediationStatus";

interface ICSAFOverviewProps {
  csafDocument: CommonSecurityAdvisoryFramework;
}

export const CSAFOverview: React.FC<ICSAFOverviewProps> = ({
  csafDocument,
}) => {
  //
  const csafSeverity = csafDocument.document.aggregate_severity?.text;
  const extendedSeverity = csafSeverity
    ? normalizeSeverityText(csafSeverity)
    : undefined;
  const severityProps = extendedSeverity
    ? severityList[extendedSeverity]
    : undefined;

  //
  const { products, relationships } = React.useMemo(() => {
    const products = collectProducts(csafDocument.product_tree?.branches || []);
    const relationships =
      csafDocument.product_tree?.relationships?.map(
        (r) => r.full_product_name,
      ) || [];
    return {
      products,
      relationships,
    };
  }, []);
  const totalProducts = products.length + relationships.length;

  return (
    <Stack hasGutter>
      <StackItem>
        <Card isFullHeight>
          <CardTitle>
            <Flex
              justifyContent={{
                default: "justifyContentSpaceBetween",
              }}
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
                      {csafDocument.vulnerabilities?.length} CVE
                      {csafDocument.vulnerabilities?.length !== 1
                        ? "s"
                        : ""}{" "}
                      affecting {products.length} product
                      {totalProducts !== 1 ? "s" : ""}
                    </Content>
                  </StackItem>
                  <StackItem>
                    <CSAFImpactChart
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
                    <CSAFRemediationStatus
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

      {csafDocument.document.references &&
        csafDocument.document.references.length > 0 && (
          <StackItem>
            <Card>
              <CardTitle>Document references</CardTitle>
              <CardBody>
                <Stack hasGutter>
                  <StackItem>
                    <Flex
                      direction={{ default: "column" }}
                      gap={{ default: "gapSm" }}
                    >
                      {csafDocument.document.references.map((ref) => (
                        <FlexItem key={ref.url}>
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {ref.summary} <ExternalLinkAltIcon />
                          </a>
                          {ref.category && ref.category !== "self" && (
                            <Label
                              variant="outline"
                              isCompact
                              style={{ marginLeft: 8 }}
                            >
                              {ref.category}
                            </Label>
                          )}
                        </FlexItem>
                      ))}
                    </Flex>
                  </StackItem>
                </Stack>
              </CardBody>
            </Card>
          </StackItem>
        )}

      {csafDocument.document.tracking.revision_history &&
        csafDocument.document.tracking.revision_history.length > 0 && (
          <StackItem>
            <Card>
              <CardTitle>Revision history</CardTitle>
              <CardBody>
                <Stack hasGutter>
                  <StackItem>
                    <DescriptionList
                      isHorizontal
                      isCompact
                      horizontalTermWidthModifier={{
                        md: "15ch",
                      }}
                    >
                      {[...csafDocument.document.tracking.revision_history]
                        .sort(
                          (a, b) =>
                            new Date(b.date).getTime() -
                            new Date(a.date).getTime(),
                        )
                        .map((rev) => (
                          <DescriptionListGroup key={rev.number}>
                            <DescriptionListTerm>
                              <Flex>
                                <FlexItem>
                                  <Label variant="outline" isCompact>
                                    v{rev.number}
                                  </Label>
                                </FlexItem>
                                <FlexItem>
                                  <Content component="small">
                                    {formatDate(rev.date)}
                                  </Content>
                                </FlexItem>
                              </Flex>
                            </DescriptionListTerm>
                            <DescriptionListDescription>
                              {rev.summary}
                            </DescriptionListDescription>
                          </DescriptionListGroup>
                        ))}
                    </DescriptionList>
                  </StackItem>
                </Stack>
              </CardBody>
            </Card>
          </StackItem>
        )}

      {csafDocument.document.notes &&
        csafDocument.document.notes.length > 0 && (
          <StackItem>
            <Card>
              <CardTitle>Notes</CardTitle>
              <CardBody>
                <Stack hasGutter>
                  {csafDocument.document.notes.map((note) => (
                    <StackItem key={note.title}>
                      <Content component="h4">{note.title}</Content>
                      <Content component="p">{note.text}</Content>
                    </StackItem>
                  ))}
                </Stack>
              </CardBody>
            </Card>
          </StackItem>
        )}
    </Stack>
  );
};
