import React from "react";
import { Link, useSearchParams } from "react-router-dom";

import {
  Alert,
  Breadcrumb,
  BreadcrumbItem,
  Button,
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
  Label,
  LabelGroup,
  PageSection,
  Progress,
  Spinner,
  Stack,
  StackItem,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";

import { Paths } from "@app/Routes";
import { useBatchedRecommendations } from "./use-batched-recommendations";
import { downloadCsv } from "./csv-export";

export const LightwellReport: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sbomIds = React.useMemo(() => {
    const ids = searchParams.get("ids");
    return ids ? ids.split(",").filter(Boolean) : [];
  }, [searchParams]);

  const {
    progressPercent,
    isLoading,
    isComplete,
    sbomResults,
    packageResults,
    error,
    warnings,
  } = useBatchedRecommendations(sbomIds);

  if (sbomIds.length === 0) {
    return (
      <PageSection>
        <Alert variant="warning" title="No SBOMs selected">
          Go back to the SBOMs page and select one or more SBOMs to generate a
          report.
        </Alert>
      </PageSection>
    );
  }

  const addressableSboms = sbomResults.filter((s) => s.addressablePackages > 0);

  const coverage =
    sbomIds.length > 0
      ? Math.round((addressableSboms.length / sbomIds.length) * 100)
      : 0;

  return (
    <>
      <PageSection variant="light">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={Paths.sboms}>SBOMs</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isActive>Lightwell remediation report</BreadcrumbItem>
        </Breadcrumb>

        <Toolbar>
          <ToolbarContent>
            <ToolbarItem>
              <Content component="h1">Lightwell remediation report</Content>
              <Content component="p">
                Impact summary for your selected SBOMs. Download a copy if you
                want to keep it.
              </Content>
            </ToolbarItem>
            <ToolbarItem align={{ default: "alignEnd" }}>
              <Button
                variant="primary"
                isDisabled={!isComplete || packageResults.length === 0}
                onClick={() => downloadCsv(packageResults)}
              >
                Download
              </Button>
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
      </PageSection>

      <PageSection>
        <Stack hasGutter>
          {isLoading && (
            <StackItem>
              <Card>
                <CardBody>
                  <Progress
                    value={progressPercent}
                    title="Generating report..."
                    label={`${progressPercent}%`}
                  />
                </CardBody>
              </Card>
            </StackItem>
          )}

          {error && (
            <StackItem>
              <Alert variant="danger" title="Error generating report">
                {error}
              </Alert>
            </StackItem>
          )}

          {warnings.length > 0 && (
            <StackItem>
              <Alert variant="warning" title="Partial data warning">
                Some recommendation batches failed. Results may be incomplete:
                <ul>
                  {warnings.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </Alert>
            </StackItem>
          )}

          {isComplete && (
            <>
              <StackItem>
                <Alert
                  variant="info"
                  title="Lightwell remediations available"
                  isInline
                >
                  Based on the selected SBOMs, Lightwell can address{" "}
                  {addressableSboms.length} of {sbomIds.length} and{" "}
                  {packageResults.length} related packages.
                </Alert>
              </StackItem>

              <StackItem>
                <Card>
                  <CardTitle>Impact summary</CardTitle>
                  <CardBody>
                    <Flex>
                      <FlexItem>
                        <DescriptionList isHorizontal>
                          <DescriptionListGroup>
                            <DescriptionListTerm>
                              SBOMs Lightwell can address
                            </DescriptionListTerm>
                            <DescriptionListDescription>
                              <Content component="h2">
                                {addressableSboms.length} / {sbomIds.length}
                              </Content>
                              <Content component="small">
                                You selected {sbomIds.length} SBOMs
                              </Content>
                            </DescriptionListDescription>
                          </DescriptionListGroup>
                        </DescriptionList>
                      </FlexItem>
                      <FlexItem>
                        <DescriptionList isHorizontal>
                          <DescriptionListGroup>
                            <DescriptionListTerm>
                              Packages Lightwell can address
                            </DescriptionListTerm>
                            <DescriptionListDescription>
                              <Content component="h2">
                                {packageResults.length}
                              </Content>
                              <Content component="small">
                                Unique packages across selected SBOMs
                              </Content>
                            </DescriptionListDescription>
                          </DescriptionListGroup>
                        </DescriptionList>
                      </FlexItem>
                    </Flex>

                    <Progress
                      value={coverage}
                      title="SBOM coverage"
                      label={`${coverage}%`}
                      style={{ marginTop: "1rem" }}
                    />

                    <DescriptionList isHorizontal style={{ marginTop: "1rem" }}>
                      <DescriptionListGroup>
                        <DescriptionListTerm>
                          Selected SBOMs
                        </DescriptionListTerm>
                        <DescriptionListDescription>
                          {sbomIds.length}
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      <DescriptionListGroup>
                        <DescriptionListTerm>
                          Addressable SBOMs
                        </DescriptionListTerm>
                        <DescriptionListDescription>
                          {addressableSboms.length}
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      <DescriptionListGroup>
                        <DescriptionListTerm>
                          Addressable packages
                        </DescriptionListTerm>
                        <DescriptionListDescription>
                          {packageResults.length}
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                    </DescriptionList>
                  </CardBody>
                </Card>
              </StackItem>

              <StackItem>
                <Card>
                  <CardTitle>SBOMs Lightwell can help with</CardTitle>
                  <CardBody>
                    <Table aria-label="SBOMs Lightwell can help with">
                      <Thead>
                        <Tr>
                          <Th>SBOM</Th>
                          <Th>Addressable packages</Th>
                          <Th>Vulnerabilities</Th>
                          <Th>Status</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {addressableSboms.map((s) => (
                          <Tr key={s.sbomId}>
                            <Td>{s.sbomName}</Td>
                            <Td>{s.addressablePackages}</Td>
                            <Td>{s.vulnerabilityCount}</Td>
                            <Td>
                              <Label color="grey" isCompact>
                                Lightwell can help
                              </Label>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </CardBody>
                </Card>
              </StackItem>

              <StackItem>
                <Card>
                  <CardTitle>Packages Lightwell can help with</CardTitle>
                  <CardBody>
                    <Table aria-label="Packages Lightwell can help with">
                      <Thead>
                        <Tr>
                          <Th>Package</Th>
                          <Th>Version</Th>
                          <Th>Recommended version</Th>
                          <Th>Vulnerabilities addressed</Th>
                          <Th>Found in</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {packageResults.map((p) => (
                          <Tr key={`${p.packageName}-${p.version}`}>
                            <Td>{p.packageName}</Td>
                            <Td>{p.version}</Td>
                            <Td>{p.recommendedVersion}</Td>
                            <Td>
                              <LabelGroup>
                                {p.vulnerabilities.map((cve) => (
                                  <Label key={cve} isCompact color="orange">
                                    {cve}
                                  </Label>
                                ))}
                              </LabelGroup>
                            </Td>
                            <Td>
                              <LabelGroup>
                                {p.foundIn.map((name) => (
                                  <Label key={name} isCompact color="grey">
                                    {name}
                                  </Label>
                                ))}
                              </LabelGroup>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </CardBody>
                </Card>
              </StackItem>
            </>
          )}

          {isLoading && !isComplete && (
            <StackItem>
              <Flex justifyContent={{ default: "justifyContentCenter" }}>
                <Spinner size="lg" />
              </Flex>
            </StackItem>
          )}
        </Stack>
      </PageSection>
    </>
  );
};
