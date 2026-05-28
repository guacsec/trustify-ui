import React from "react";

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
  Grid,
  GridItem,
  Label,
  List,
  ListItem,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import ExternalLinkAltIcon from "@patternfly/react-icons/dist/esm/icons/external-link-alt-icon";

import { severityList } from "@app/api/model-utils";
import type { ExtendedSeverity } from "@app/api/models";
import { formatDate } from "@app/utils/utils";

import type { CsafDocument } from "../types";

interface DocumentOverviewProps {
  csafDocument: CsafDocument;
}

const severityColorMap: Record<string, string> = {
  critical: "red",
  important: "orange",
  high: "orange",
  moderate: "gold",
  medium: "gold",
  low: "blue",
};

const remediationLabels: Record<string, string> = {
  vendor_fix: "Vendor Fix",
  workaround: "Workaround",
  mitigation: "Mitigation",
  no_fix_planned: "No Fix Planned",
  none_available: "None Available",
};

/** CSAF Overview tab showing metadata, impact summary, remediation status, references, and revision history. */
export const DocumentOverview: React.FC<DocumentOverviewProps> = ({
  csafDocument,
}) => {
  const { document: doc, vulnerabilities } = csafDocument;

  const severityCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    for (const vuln of vulnerabilities) {
      const severity =
        vuln.scores?.[0]?.cvss_v3?.baseSeverity?.toLowerCase() ?? "unknown";
      counts[severity] = (counts[severity] ?? 0) + 1;
    }
    return counts;
  }, [vulnerabilities]);

  const remediationCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    for (const vuln of vulnerabilities) {
      for (const rem of vuln.remediations ?? []) {
        counts[rem.category] = (counts[rem.category] ?? 0) + 1;
      }
    }
    return counts;
  }, [vulnerabilities]);

  const donutData = React.useMemo(() => {
    return Object.entries(remediationCounts).map(([category, count]) => ({
      label: remediationLabels[category] ?? category,
      count,
    }));
  }, [remediationCounts]);

  const totalRemediations = donutData.reduce(
    (sum, item) => sum + item.count,
    0,
  );

  const severityBarData = React.useMemo(() => {
    return Object.entries(severityCounts)
      .map(([severity, count]) => {
        const key = severity as ExtendedSeverity;
        const props = severityList[key];
        return {
          severity,
          count,
          label: props?.name ?? severity,
          color: props?.color.var ?? "#888",
        };
      })
      .sort((a, b) => b.count - a.count);
  }, [severityCounts]);

  return (
    <Stack hasGutter>
      <StackItem>
        <Grid hasGutter>
          <GridItem md={4}>
            <Card isFullHeight>
              <CardTitle>Document</CardTitle>
              <CardBody>
                <DescriptionList>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Title</DescriptionListTerm>
                    <DescriptionListDescription>
                      {doc.title}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Category</DescriptionListTerm>
                    <DescriptionListDescription>
                      {doc.category}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                  {doc.aggregate_severity && (
                    <DescriptionListGroup>
                      <DescriptionListTerm>Severity</DescriptionListTerm>
                      <DescriptionListDescription>
                        <Label
                          color={
                            (severityColorMap[
                              doc.aggregate_severity.text.toLowerCase()
                            ] as "red" | "orange" | "gold" | "blue") ?? "grey"
                          }
                        >
                          {doc.aggregate_severity.text}
                        </Label>
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
                  <DescriptionListGroup>
                    <DescriptionListTerm>CSAF Version</DescriptionListTerm>
                    <DescriptionListDescription>
                      {doc.csaf_version}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                </DescriptionList>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem md={4}>
            <Card isFullHeight>
              <CardTitle>Publisher</CardTitle>
              <CardBody>
                <DescriptionList>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Name</DescriptionListTerm>
                    <DescriptionListDescription>
                      {doc.publisher.name}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Category</DescriptionListTerm>
                    <DescriptionListDescription>
                      {doc.publisher.category}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                  {doc.publisher.contact_details && (
                    <DescriptionListGroup>
                      <DescriptionListTerm>Contact Details</DescriptionListTerm>
                      <DescriptionListDescription>
                        {doc.publisher.contact_details}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                  )}
                  {doc.publisher.issuing_authority && (
                    <DescriptionListGroup>
                      <DescriptionListTerm>
                        Issuing Authority
                      </DescriptionListTerm>
                      <DescriptionListDescription>
                        {doc.publisher.issuing_authority}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                  )}
                </DescriptionList>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem md={4}>
            <Card isFullHeight>
              <CardTitle>Tracking</CardTitle>
              <CardBody>
                <DescriptionList>
                  <DescriptionListGroup>
                    <DescriptionListTerm>ID</DescriptionListTerm>
                    <DescriptionListDescription>
                      {doc.tracking.id}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Status</DescriptionListTerm>
                    <DescriptionListDescription>
                      {doc.tracking.status}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>Version</DescriptionListTerm>
                    <DescriptionListDescription>
                      {doc.tracking.version}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>
                      Initial Release Date
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      {formatDate(doc.tracking.initial_release_date)}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>
                      Current Release Date
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      {formatDate(doc.tracking.current_release_date)}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                  {doc.tracking.generator && (
                    <DescriptionListGroup>
                      <DescriptionListTerm>Generator</DescriptionListTerm>
                      <DescriptionListDescription>
                        {doc.tracking.generator.engine.name}{" "}
                        {doc.tracking.generator.engine.version}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                  )}
                </DescriptionList>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </StackItem>

      <StackItem>
        <Grid hasGutter>
          <GridItem md={6}>
            <Card>
              <CardTitle>Impact Summary</CardTitle>
              <CardBody>
                {severityBarData.length > 0 ? (
                  <DescriptionList isHorizontal>
                    {severityBarData.map(
                      ({ severity, count, label, color }) => (
                        <DescriptionListGroup key={severity}>
                          <DescriptionListTerm>{label}</DescriptionListTerm>
                          <DescriptionListDescription>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                              }}
                            >
                              <div
                                style={{
                                  width: `${Math.max(20, (count / vulnerabilities.length) * 200)}px`,
                                  height: 16,
                                  backgroundColor: color,
                                  borderRadius: 2,
                                }}
                              />
                              <span>{count}</span>
                            </div>
                          </DescriptionListDescription>
                        </DescriptionListGroup>
                      ),
                    )}
                  </DescriptionList>
                ) : (
                  <Content component="p">
                    No vulnerability data available
                  </Content>
                )}
              </CardBody>
            </Card>
          </GridItem>
          <GridItem md={6}>
            <Card>
              <CardTitle>Remediation Status</CardTitle>
              <CardBody>
                {donutData.length > 0 ? (
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
                      subTitle="Total remediations"
                      width={350}
                      legendData={donutData.map(({ label, count }) => ({
                        name: `${label}: ${count}`,
                      }))}
                      data={donutData.map(({ label, count }) => ({
                        x: label,
                        y: count,
                      }))}
                      labels={({ datum }) => `${datum.x}: ${datum.y}`}
                    />
                  </div>
                ) : (
                  <Content component="p">No remediation data available</Content>
                )}
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </StackItem>

      {doc.references && doc.references.length > 0 && (
        <StackItem>
          <Card>
            <CardTitle>References</CardTitle>
            <CardBody>
              <List isPlain>
                {doc.references.map((ref, index) => (
                  <ListItem key={index}>
                    <a href={ref.url} target="_blank" rel="noopener noreferrer">
                      {ref.summary} <ExternalLinkAltIcon />
                    </a>
                  </ListItem>
                ))}
              </List>
            </CardBody>
          </Card>
        </StackItem>
      )}

      {doc.tracking.revision_history.length > 0 && (
        <StackItem>
          <Card>
            <CardTitle>Revision History</CardTitle>
            <CardBody>
              <DescriptionList isHorizontal>
                {[...doc.tracking.revision_history]
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime(),
                  )
                  .map((rev) => (
                    <DescriptionListGroup key={rev.number}>
                      <DescriptionListTerm>
                        v{rev.number} — {formatDate(rev.date)}
                      </DescriptionListTerm>
                      <DescriptionListDescription>
                        {rev.summary}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                  ))}
              </DescriptionList>
            </CardBody>
          </Card>
        </StackItem>
      )}

      {doc.notes && doc.notes.length > 0 && (
        <StackItem>
          <Card>
            <CardTitle>Notes</CardTitle>
            <CardBody>
              <Stack hasGutter>
                {doc.notes.map((note, index) => (
                  <StackItem key={index}>
                    {note.title && (
                      <Content component="h4">{note.title}</Content>
                    )}
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
