import React from "react";

import {
  Chart,
  ChartBar,
  ChartDonut,
  ChartLegend,
  ChartStack,
  ChartTooltip,
} from "@patternfly/react-charts/victory";
import {
  Card,
  CardBody,
  CardTitle,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Grid,
  GridItem,
  Content,
  Label,
  type LabelProps,
  List,
  ListItem,
} from "@patternfly/react-core";
import ExternalLinkAltIcon from "@patternfly/react-icons/dist/esm/icons/external-link-alt-icon";

import { getSeverityPriority, severityList } from "@app/api/model-utils";
import type { ExtendedSeverity } from "@app/api/models";
import { formatDate } from "@app/utils/utils";

import type { CsafDocument } from "..";

interface DocumentOverviewProps {
  csafDocument: CsafDocument;
}

const SEVERITY_ORDER: ExtendedSeverity[] = [
  "critical",
  "high",
  "medium",
  "low",
  "none",
  "unknown",
];

const REMEDIATION_CONFIG: {
  category: string;
  label: string;
  color: string;
}[] = [
  { category: "vendor_fix", label: "Vendor Fix", color: "#3E8635" },
  { category: "workaround", label: "Workaround", color: "#06C" },
  { category: "no_fix_planned", label: "No Fix Planned", color: "#F0AB00" },
  { category: "none_available", label: "None Available", color: "#C9190B" },
];

const getSeverityLabelColor = (text?: string): LabelProps["color"] => {
  switch (text?.toLowerCase()) {
    case "critical":
      return "red";
    case "important":
    case "high":
      return "orange";
    case "moderate":
    case "medium":
      return "gold";
    case "low":
      return "blue";
    default:
      return "grey";
  }
};

export const DocumentOverview: React.FC<DocumentOverviewProps> = ({
  csafDocument,
}) => {
  const doc = csafDocument.document;
  const vulnerabilities = csafDocument.vulnerabilities ?? [];

  const severityData = React.useMemo(() => {
    const counts: Record<ExtendedSeverity, number> = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      none: 0,
      unknown: 0,
    };

    for (const vuln of vulnerabilities) {
      let maxSeverity: ExtendedSeverity = "unknown";
      for (const score of vuln.scores ?? []) {
        const raw = score.cvss_v3?.baseSeverity?.toLowerCase() ?? "unknown";
        const s = (raw in counts ? raw : "unknown") as ExtendedSeverity;
        if (getSeverityPriority(s) > getSeverityPriority(maxSeverity)) {
          maxSeverity = s;
        }
      }
      counts[maxSeverity]++;
    }

    return SEVERITY_ORDER.filter((s) => counts[s] > 0).map((s) => ({
      severity: s,
      count: counts[s],
      label: severityList[s].name,
      color: severityList[s].color.var,
    }));
  }, [vulnerabilities]);

  const totalCves = severityData.reduce((sum, d) => sum + d.count, 0);

  const remediationData = React.useMemo(() => {
    const counts: Record<string, number> = {};
    for (const vuln of vulnerabilities) {
      for (const rem of vuln.remediations ?? []) {
        counts[rem.category] = (counts[rem.category] ?? 0) + 1;
      }
    }

    return REMEDIATION_CONFIG.filter((r) => (counts[r.category] ?? 0) > 0).map(
      (r) => ({
        ...r,
        count: counts[r.category],
      }),
    );
  }, [vulnerabilities]);

  const totalRemediations = remediationData.reduce(
    (sum, d) => sum + d.count,
    0,
  );

  const revisionHistory = React.useMemo(() => {
    return [...(doc.tracking.revision_history ?? [])].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }, [doc.tracking.revision_history]);

  return (
    <Grid hasGutter>
      {/* Row 1: Document metadata, Publisher, Tracking */}
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
              {doc.aggregate_severity && (
                <DescriptionListGroup>
                  <DescriptionListTerm>Severity</DescriptionListTerm>
                  <DescriptionListDescription>
                    <Label
                      color={getSeverityLabelColor(doc.aggregate_severity.text)}
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
                    {doc.distribution.tlp.label}
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
              <DescriptionListGroup>
                <DescriptionListTerm>Category</DescriptionListTerm>
                <DescriptionListDescription>
                  {doc.category}
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
              {doc.publisher.contact_details && (
                <DescriptionListGroup>
                  <DescriptionListTerm>Contact</DescriptionListTerm>
                  <DescriptionListDescription>
                    {doc.publisher.contact_details}
                  </DescriptionListDescription>
                </DescriptionListGroup>
              )}
              {doc.publisher.issuing_authority && (
                <DescriptionListGroup>
                  <DescriptionListTerm>Issuing authority</DescriptionListTerm>
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
                <DescriptionListTerm>Initial release</DescriptionListTerm>
                <DescriptionListDescription>
                  {formatDate(doc.tracking.initial_release_date)}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>Current release</DescriptionListTerm>
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

      {/* Row 2: Charts */}
      {totalCves > 0 && (
        <GridItem md={6}>
          <Card isFullHeight>
            <CardTitle>Impact summary</CardTitle>
            <CardBody>
              <div style={{ height: "200px" }}>
                <Chart
                  ariaDesc="CVE impact summary by severity"
                  height={200}
                  width={450}
                  padding={{
                    bottom: 80,
                    left: 20,
                    right: 20,
                    top: 20,
                  }}
                  legendData={severityData.map((d) => ({
                    name: `${d.label}: ${d.count}`,
                  }))}
                  legendPosition="bottom"
                  legendComponent={
                    <ChartLegend
                      colorScale={severityData.map((d) => d.color)}
                    />
                  }
                >
                  <ChartStack
                    horizontal
                    colorScale={severityData.map((d) => d.color)}
                  >
                    {severityData.map((d) => (
                      <ChartBar
                        key={d.severity}
                        data={[{ x: " ", y: d.count }]}
                        labelComponent={<ChartTooltip constrainToVisibleArea />}
                        labels={({ datum }) => `${d.label}: ${datum.y}`}
                      />
                    ))}
                  </ChartStack>
                </Chart>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      )}

      {totalRemediations > 0 && (
        <GridItem md={6}>
          <Card isFullHeight>
            <CardTitle>Remediation status</CardTitle>
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
                  legendData={remediationData.map((d) => ({
                    name: `${d.label}: ${d.count}`,
                  }))}
                  data={remediationData.map((d) => ({
                    x: d.label,
                    y: d.count,
                  }))}
                  labels={({ datum }) => `${datum.x}: ${datum.y}`}
                  colorScale={remediationData.map((d) => d.color)}
                />
              </div>
            </CardBody>
          </Card>
        </GridItem>
      )}

      {/* Row 3: References, Revision history, Notes */}
      {doc.references && doc.references.length > 0 && (
        <GridItem md={4}>
          <Card isFullHeight>
            <CardTitle>References</CardTitle>
            <CardBody>
              <List isPlain>
                {doc.references.map((ref, i) => (
                  <ListItem key={i}>
                    <a href={ref.url} target="_blank" rel="noopener noreferrer">
                      {ref.summary} <ExternalLinkAltIcon />
                    </a>
                  </ListItem>
                ))}
              </List>
            </CardBody>
          </Card>
        </GridItem>
      )}

      {revisionHistory.length > 0 && (
        <GridItem md={4}>
          <Card isFullHeight>
            <CardTitle>Revision history</CardTitle>
            <CardBody>
              <DescriptionList isCompact>
                {revisionHistory.map((rev) => (
                  <DescriptionListGroup key={rev.number}>
                    <DescriptionListTerm>v{rev.number}</DescriptionListTerm>
                    <DescriptionListDescription>
                      {formatDate(rev.date)} — {rev.summary}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                ))}
              </DescriptionList>
            </CardBody>
          </Card>
        </GridItem>
      )}

      {doc.notes && doc.notes.length > 0 && (
        <GridItem md={4}>
          <Card isFullHeight>
            <CardTitle>Notes</CardTitle>
            <CardBody>
              <Content>
                {doc.notes.map((note, i) => (
                  <div key={i}>
                    {note.title && (
                      <Content component="h4">{note.title}</Content>
                    )}
                    <Content component="p">{note.text}</Content>
                  </div>
                ))}
              </Content>
            </CardBody>
          </Card>
        </GridItem>
      )}
    </Grid>
  );
};
