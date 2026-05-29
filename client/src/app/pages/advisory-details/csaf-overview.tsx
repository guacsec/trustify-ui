/** CSAF Overview tab displaying document metadata, charts, references, revision history, and notes. */
import React from "react";

import dayjs from "dayjs";

import {
  Chart,
  ChartAxis,
  ChartBar,
  ChartDonut,
} from "@patternfly/react-charts/victory";

import {
  Card,
  CardBody,
  CardHeader,
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
  List,
  ListItem,
} from "@patternfly/react-core";
import ExternalLinkAltIcon from "@patternfly/react-icons/dist/esm/icons/external-link-alt-icon";

import { Link } from "react-router-dom";

import { Paths } from "@app/Routes";
import type { CsafDocument, CsafVulnerability } from "@app/types/csaf";

interface CsafOverviewProps {
  csafDocument: CsafDocument;
}

/** Severity color mapping for impact summary. */
const SEVERITY_COLORS: Record<string, string> = {
  CRITICAL: "#A30000",
  HIGH: "#C9190B",
  MEDIUM: "#F0AB00",
  LOW: "#0066CC",
  NONE: "#8A8D90",
};

/** Collects all product IDs from every product_status category. */
function getAllProductIds(status?: {
  [key: string]: string[] | undefined;
}): string[] {
  if (!status) return [];
  return [
    ...(status.known_affected ?? []),
    ...(status.fixed ?? []),
    ...(status.first_affected ?? []),
    ...(status.last_affected ?? []),
    ...(status.under_investigation ?? []),
    ...(status.known_not_affected ?? []),
    ...(status.first_fixed ?? []),
    ...(status.recommended ?? []),
  ];
}

/** Derives affected-product counts per severity from CSAF vulnerabilities. */
function computeSeverityCounts(
  vulnerabilities?: CsafVulnerability[],
): { severity: string; count: number }[] {
  const productsBySeverity: Record<string, Set<string>> = {};
  if (vulnerabilities) {
    for (const vuln of vulnerabilities) {
      const baseSeverity =
        vuln.scores?.[0]?.cvss_v3?.baseSeverity?.toUpperCase() || "NONE";
      if (!productsBySeverity[baseSeverity]) {
        productsBySeverity[baseSeverity] = new Set();
      }
      const allProducts = getAllProductIds(vuln.product_status);
      for (const pid of allProducts) {
        productsBySeverity[baseSeverity].add(pid);
      }
    }
  }
  const order = ["CRITICAL", "HIGH", "MEDIUM", "LOW", "NONE"];
  return order
    .filter((s) => productsBySeverity[s]?.size)
    .map((severity) => ({
      severity,
      count: productsBySeverity[severity].size,
    }));
}

/** Derives remediation category counts from CSAF vulnerabilities. */
function computeRemediationCounts(
  vulnerabilities?: CsafVulnerability[],
): { category: string; count: number }[] {
  const counts: Record<string, number> = {};
  if (vulnerabilities) {
    for (const vuln of vulnerabilities) {
      if (vuln.remediations) {
        for (const rem of vuln.remediations) {
          counts[rem.category] = (counts[rem.category] || 0) + 1;
        }
      }
    }
  }
  return Object.entries(counts).map(([category, count]) => ({
    category,
    count,
  }));
}

const REMEDIATION_COLORS: Record<string, string> = {
  vendor_fix: "#4CB140",
  workaround: "#F0AB00",
  no_fix_planned: "#C9190B",
  none_available: "#8A8D90",
  mitigation: "#0066CC",
};

export const CsafOverview: React.FC<CsafOverviewProps> = ({ csafDocument }) => {
  const { document: doc, vulnerabilities } = csafDocument;
  const severityCounts = React.useMemo(
    () => computeSeverityCounts(vulnerabilities),
    [vulnerabilities],
  );
  const remediationCounts = React.useMemo(
    () => computeRemediationCounts(vulnerabilities),
    [vulnerabilities],
  );
  const totalRemediations = remediationCounts.reduce(
    (sum, r) => sum + r.count,
    0,
  );
  const totalAffectedProducts = React.useMemo(() => {
    const productIds = new Set<string>();
    if (vulnerabilities) {
      for (const vuln of vulnerabilities) {
        for (const pid of getAllProductIds(vuln.product_status)) {
          productIds.add(pid);
        }
      }
    }
    return productIds.size;
  }, [vulnerabilities]);

  return (
    <Flex direction={{ default: "column" }} gap={{ default: "gapLg" }}>
      {/* Metadata */}
      <FlexItem>
        <Card>
          <CardHeader
            actions={{
              actions: (
                <Flex gap={{ default: "gapSm" }}>
                  {doc.aggregate_severity && (
                    <FlexItem>
                      <Label color="blue">
                        Severity: {doc.aggregate_severity.text}
                      </Label>
                    </FlexItem>
                  )}
                  {doc.distribution?.tlp && (
                    <FlexItem>
                      <Label>TLP: {doc.distribution.tlp.label}</Label>
                    </FlexItem>
                  )}
                </Flex>
              ),
              hasNoOffset: true,
            }}
          >
            <Content component="h2">{doc.title}</Content>
          </CardHeader>
          <CardBody>
            <DescriptionList isHorizontal>
              <DescriptionListGroup>
                <DescriptionListTerm>Tracking ID</DescriptionListTerm>
                <DescriptionListDescription>
                  {/^CVE-\d{4}-\d+$/.test(doc.tracking.id) ? (
                    <Link
                      to={Paths.vulnerabilityDetails.replace(
                        ":vulnerabilityId",
                        doc.tracking.id,
                      )}
                    >
                      {doc.tracking.id}
                    </Link>
                  ) : (
                    doc.tracking.id
                  )}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Status</DescriptionListTerm>
                <DescriptionListDescription>
                  <Label color="green">{doc.tracking.status}</Label>
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Version</DescriptionListTerm>
                <DescriptionListDescription>
                  {doc.tracking.version}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Category</DescriptionListTerm>
                <DescriptionListDescription>
                  {doc.category}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Publisher</DescriptionListTerm>
                <DescriptionListDescription>
                  <Flex
                    gap={{ default: "gapSm" }}
                    alignItems={{ default: "alignItemsCenter" }}
                  >
                    <FlexItem>{doc.publisher.name}</FlexItem>
                    {doc.publisher.category && (
                      <FlexItem>
                        <Label isCompact>{doc.publisher.category}</Label>
                      </FlexItem>
                    )}
                  </Flex>
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Initial release</DescriptionListTerm>
                <DescriptionListDescription>
                  {dayjs(doc.tracking.initial_release_date).format(
                    "MMM D, YYYY",
                  )}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Current release</DescriptionListTerm>
                <DescriptionListDescription>
                  {dayjs(doc.tracking.current_release_date).format(
                    "MMM D, YYYY",
                  )}
                </DescriptionListDescription>
              </DescriptionListGroup>
              {doc.tracking.generator && (
                <DescriptionListGroup>
                  <DescriptionListTerm>Generator</DescriptionListTerm>
                  <DescriptionListDescription>
                    {doc.tracking.generator.engine.name}
                    {doc.tracking.generator.engine.version &&
                      ` v${doc.tracking.generator.engine.version}`}
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
            </DescriptionList>
          </CardBody>
        </Card>
      </FlexItem>

      {/* Charts */}
      {(severityCounts.length > 0 || remediationCounts.length > 0) && (
        <FlexItem>
          <Grid hasGutter>
            {severityCounts.length > 0 && (
              <GridItem md={6}>
                <Card>
                  <CardTitle>Impact summary</CardTitle>
                  <CardBody>
                    <Content component="small">
                      {vulnerabilities?.length ?? 0}{" "}
                      {(vulnerabilities?.length ?? 0) === 1 ? "CVE" : "CVEs"}{" "}
                      affecting {totalAffectedProducts} products
                    </Content>
                    <div style={{ height: 40 + severityCounts.length * 40 }}>
                      <Chart
                        ariaDesc="Impact summary by severity"
                        name="impact-summary-chart"
                        horizontal
                        domainPadding={{ x: [10, 10] }}
                        height={40 + severityCounts.length * 40}
                        padding={{
                          bottom: 30,
                          left: 80,
                          right: 20,
                          top: 10,
                        }}
                      >
                        <ChartAxis
                          dependentAxis
                          style={{
                            tickLabels: { fontSize: 12 },
                          }}
                        />
                        <ChartAxis
                          style={{
                            grid: { stroke: "#D2D2D2", strokeDasharray: "4,4" },
                            tickLabels: { fontSize: 12 },
                          }}
                        />
                        <ChartBar
                          horizontal
                          barWidth={16}
                          data={severityCounts.map(({ severity, count }) => ({
                            x:
                              severity.charAt(0) +
                              severity.slice(1).toLowerCase(),
                            y: count,
                          }))}
                          style={{
                            data: {
                              fill: ({ datum }) =>
                                SEVERITY_COLORS[
                                  (datum.x as string).toUpperCase()
                                ] || "#8A8D90",
                            },
                          }}
                          labels={({ datum }) => `${datum.x}: ${datum.y}`}
                        />
                      </Chart>
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
            )}
            {remediationCounts.length > 0 && (
              <GridItem md={6}>
                <Card>
                  <CardTitle>Remediation status</CardTitle>
                  <CardBody>
                    <Content component="small">
                      Fix availability across affected products
                    </Content>
                    <div style={{ height: "230px", maxWidth: "350px" }}>
                      <ChartDonut
                        constrainToVisibleArea
                        legendOrientation="vertical"
                        legendPosition="right"
                        padding={{
                          bottom: 20,
                          left: 20,
                          right: 140,
                          top: 20,
                        }}
                        title={`${totalRemediations}`}
                        subTitle="entries"
                        width={350}
                        legendData={remediationCounts.map(
                          ({ category, count }) => ({
                            name: `${category.replace(/_/g, " ")}: ${count}`,
                          }),
                        )}
                        data={remediationCounts.map(({ category, count }) => ({
                          x: category.replace(/_/g, " "),
                          y: count,
                        }))}
                        labels={({ datum }) => `${datum.x}: ${datum.y}`}
                        colorScale={remediationCounts.map(
                          ({ category }) =>
                            REMEDIATION_COLORS[category] || "#8A8D90",
                        )}
                      />
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
            )}
          </Grid>
        </FlexItem>
      )}

      {/* References */}
      {doc.references && doc.references.length > 0 && (
        <FlexItem>
          <Card isPlain>
            <CardTitle>References</CardTitle>
            <CardBody>
              <List isPlain>
                {doc.references.map((ref, i) => (
                  <ListItem key={`ref-${i}`}>
                    <a href={ref.url} target="_blank" rel="noopener noreferrer">
                      {ref.summary || ref.url} <ExternalLinkAltIcon />
                    </a>
                    {ref.category && (
                      <Label isCompact color="grey" style={{ marginLeft: 8 }}>
                        {ref.category}
                      </Label>
                    )}
                  </ListItem>
                ))}
              </List>
            </CardBody>
          </Card>
        </FlexItem>
      )}

      {/* Revision History */}
      {doc.tracking.revision_history.length > 0 && (
        <FlexItem>
          <Card isPlain>
            <CardTitle>Revision History</CardTitle>
            <CardBody>
              <DescriptionList isHorizontal>
                {doc.tracking.revision_history.map((rev) => (
                  <DescriptionListGroup key={rev.number}>
                    <DescriptionListTerm>
                      v{rev.number} — {dayjs(rev.date).format("MMM D, YYYY")}
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      {rev.summary}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                ))}
              </DescriptionList>
            </CardBody>
          </Card>
        </FlexItem>
      )}

      {/* Notes */}
      {doc.notes && doc.notes.length > 0 && (
        <FlexItem>
          <Card isPlain>
            <CardTitle>Notes</CardTitle>
            <CardBody>
              {doc.notes.map((note, i) => (
                <div key={`note-${i}`} style={{ marginBottom: 16 }}>
                  {note.title && <Content component="h4">{note.title}</Content>}
                  {!note.title && note.category && (
                    <Content component="h4">
                      {note.category.replace(/_/g, " ")}
                    </Content>
                  )}
                  <Content component="p">{note.text}</Content>
                </div>
              ))}
            </CardBody>
          </Card>
        </FlexItem>
      )}
    </Flex>
  );
};
