/** CSAF Overview tab displaying document metadata, charts, references, revision history, and notes. */
import React from "react";

import dayjs from "dayjs";

import { ChartDonut } from "@patternfly/react-charts/victory";

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
  List,
  ListItem,
} from "@patternfly/react-core";
import ExternalLinkAltIcon from "@patternfly/react-icons/dist/esm/icons/external-link-alt-icon";

import { SeverityShieldAndText } from "@app/components/SeverityShieldAndText";
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

/** Derives severity counts from CSAF vulnerabilities. */
function computeSeverityCounts(
  vulnerabilities?: CsafVulnerability[],
): { severity: string; count: number }[] {
  const counts: Record<string, number> = {};
  if (vulnerabilities) {
    for (const vuln of vulnerabilities) {
      const baseSeverity =
        vuln.scores?.[0]?.cvss_v3?.baseSeverity?.toUpperCase() || "NONE";
      counts[baseSeverity] = (counts[baseSeverity] || 0) + 1;
    }
  }
  const order = ["CRITICAL", "HIGH", "MEDIUM", "LOW", "NONE"];
  return order
    .filter((s) => (counts[s] || 0) > 0)
    .map((severity) => ({ severity, count: counts[severity] || 0 }));
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

  return (
    <Flex direction={{ default: "column" }} gap={{ default: "gapLg" }}>
      {/* Metadata */}
      <FlexItem>
        <Card isPlain>
          <CardTitle>Document Metadata</CardTitle>
          <CardBody>
            <DescriptionList isHorizontal>
              <DescriptionListGroup>
                <DescriptionListTerm>Title</DescriptionListTerm>
                <DescriptionListDescription>
                  {doc.title}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Tracking ID</DescriptionListTerm>
                <DescriptionListDescription>
                  {doc.tracking.id}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Status</DescriptionListTerm>
                <DescriptionListDescription>
                  <Label>{doc.tracking.status}</Label>
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
                  {doc.publisher.name}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Initial release</DescriptionListTerm>
                <DescriptionListDescription>
                  {dayjs(doc.tracking.initial_release_date).format(
                    "YYYY-MM-DD",
                  )}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Current release</DescriptionListTerm>
                <DescriptionListDescription>
                  {dayjs(doc.tracking.current_release_date).format(
                    "YYYY-MM-DD",
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
              {doc.aggregate_severity && (
                <DescriptionListGroup>
                  <DescriptionListTerm>Severity</DescriptionListTerm>
                  <DescriptionListDescription>
                    <SeverityShieldAndText
                      value={
                        doc.aggregate_severity.text.toLowerCase() as
                          | "critical"
                          | "important"
                          | "moderate"
                          | "low"
                          | "none"
                      }
                      score={null}
                    />
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
              {doc.distribution?.tlp && (
                <DescriptionListGroup>
                  <DescriptionListTerm>TLP</DescriptionListTerm>
                  <DescriptionListDescription>
                    <Label>{doc.distribution.tlp.label}</Label>
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
                <Card isPlain>
                  <CardTitle>Impact Summary</CardTitle>
                  <CardBody>
                    <Flex
                      direction={{ default: "column" }}
                      gap={{ default: "gapSm" }}
                    >
                      {severityCounts.map(({ severity, count }) => (
                        <FlexItem key={severity}>
                          <Flex
                            alignItems={{ default: "alignItemsCenter" }}
                            gap={{ default: "gapSm" }}
                          >
                            <FlexItem style={{ minWidth: 120 }}>
                              <SeverityShieldAndText
                                value={
                                  severity.toLowerCase() as
                                    | "critical"
                                    | "important"
                                    | "moderate"
                                    | "low"
                                    | "none"
                                }
                                score={null}
                              />
                            </FlexItem>
                            <FlexItem>
                              <div
                                style={{
                                  height: 16,
                                  width: count * 40,
                                  maxWidth: 300,
                                  minWidth: 20,
                                  backgroundColor:
                                    SEVERITY_COLORS[severity] || "#8A8D90",
                                  borderRadius: 2,
                                }}
                              />
                            </FlexItem>
                            <FlexItem>
                              <strong>{count}</strong>{" "}
                              {count === 1 ? "CVE" : "CVEs"}
                            </FlexItem>
                          </Flex>
                        </FlexItem>
                      ))}
                    </Flex>
                  </CardBody>
                </Card>
              </GridItem>
            )}
            {remediationCounts.length > 0 && (
              <GridItem md={6}>
                <Card isPlain>
                  <CardTitle>Remediation Status</CardTitle>
                  <CardBody>
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
                        subTitle="Remediations"
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
                      v{rev.number} — {dayjs(rev.date).format("YYYY-MM-DD")}
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
