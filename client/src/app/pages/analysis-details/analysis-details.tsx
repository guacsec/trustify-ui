import type React from "react";
import { generatePath, Link } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
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
  ListComponent,
  ListItem,
  OrderType,
  PageSection,
} from "@patternfly/react-core";

import { LoadingWrapper } from "@app/components/LoadingWrapper";
import { useFetchAnalysisById } from "@app/queries/analysis";
import { useFetchSBOMById } from "@app/queries/sboms";
import { PathParam, Paths, useRouteParams } from "@app/Routes";
import { formatDate } from "@app/utils/utils";

export const AnalysisDetails: React.FC = () => {
  const sbomId = useRouteParams(PathParam.SBOM_ID);
  const analysisId = useRouteParams(PathParam.ANALYSIS_ID);

  const { sbom } = useFetchSBOMById(sbomId);

  const {
    analysis,
    isFetching: isFetchingAnalysis,
    fetchError: isFetchinErrorAnalysis,
  } = useFetchAnalysisById(analysisId);

  return (
    <>
      <PageSection type="breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={Paths.sboms}>SBOMs</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link
              to={generatePath(Paths.sbomDetails, {
                sbomId,
              })}
            >
              SBOM Details
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem isActive>Analysis Report</BreadcrumbItem>
        </Breadcrumb>
      </PageSection>
      <PageSection>
        <Content component="h1">Analysis Report</Content>
        <Content component="p">{sbom?.name}</Content>
      </PageSection>
      <PageSection>
        <LoadingWrapper
          isFetching={isFetchingAnalysis}
          fetchError={isFetchinErrorAnalysis}
        >
          <Grid hasGutter>
            <GridItem md={9}>
              <Card>
                {analysis?.output?.map((output) => (
                  <CardBody key={output.vuln_id}>
                    <DescriptionList isHorizontal>
                      <DescriptionListGroup>
                        <DescriptionListTerm>
                          Vulnerability ID
                        </DescriptionListTerm>
                        <DescriptionListDescription>
                          {output.vuln_id}
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      <DescriptionListGroup>
                        <DescriptionListTerm>Impacted</DescriptionListTerm>
                        <DescriptionListDescription>
                          {output.justification.status === "FALSE" ? (
                            <Label status="success">No</Label>
                          ) : output.justification.status === "TRUE" ? (
                            <Label status="danger">Yes</Label>
                          ) : (
                            <Label status="info">Unknown</Label>
                          )}
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      <DescriptionListGroup>
                        <DescriptionListTerm>Status</DescriptionListTerm>
                        <DescriptionListDescription>
                          <Label>{output.justification.label}</Label>
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      <DescriptionListGroup>
                        <DescriptionListTerm>Reason</DescriptionListTerm>
                        <DescriptionListDescription>
                          {output.justification.reason}
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      <DescriptionListGroup>
                        <DescriptionListTerm>Summary</DescriptionListTerm>
                        <DescriptionListDescription>
                          {output.summary}
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      <DescriptionListGroup>
                        <DescriptionListTerm>
                          CVSS Vector String
                        </DescriptionListTerm>
                        <DescriptionListDescription>
                          {output.summary}
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      <DescriptionListGroup>
                        <DescriptionListTerm>
                          CVSS Vector String
                        </DescriptionListTerm>
                        <DescriptionListDescription>
                          {output.cvss?.vector_string}
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      <DescriptionListGroup>
                        <DescriptionListTerm>CVSS Score</DescriptionListTerm>
                        <DescriptionListDescription>
                          {output.cvss?.score}
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      <DescriptionListGroup>
                        <DescriptionListTerm>
                          CVE intel score
                        </DescriptionListTerm>
                        <DescriptionListDescription>
                          {output.intel_score}
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                      <DescriptionListGroup>
                        <DescriptionListTerm>Checklist</DescriptionListTerm>
                        <DescriptionListDescription>
                          <List
                            component={ListComponent.ol}
                            type={OrderType.number}
                          >
                            {output.checklist.map((check) => (
                              <ListItem key={check.input}>
                                <Content component="dt">{check.input}</Content>
                                <List>
                                  <ListItem>{check.response}</ListItem>
                                </List>
                              </ListItem>
                            ))}
                          </List>
                        </DescriptionListDescription>
                      </DescriptionListGroup>
                    </DescriptionList>
                  </CardBody>
                ))}
              </Card>
            </GridItem>
            <GridItem md={3}>
              <Card isFullHeight>
                <CardTitle>Metadata</CardTitle>
                <CardBody>
                  <DescriptionList>
                    <DescriptionListGroup>
                      <DescriptionListTerm>Image</DescriptionListTerm>
                      <DescriptionListDescription>
                        {analysis?.input.image.name}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                      <DescriptionListTerm>Tag</DescriptionListTerm>
                      <DescriptionListDescription>
                        {analysis?.input.image.tag}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                      <DescriptionListTerm>Submitted</DescriptionListTerm>
                      <DescriptionListDescription>
                        {formatDate(analysis?.metadata.submitted_at.$date)}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                      <DescriptionListTerm>Sent</DescriptionListTerm>
                      <DescriptionListDescription>
                        {formatDate(analysis?.metadata.sent_at.$date)}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                      <DescriptionListTerm>Started</DescriptionListTerm>
                      <DescriptionListDescription>
                        {formatDate(analysis?.input.scan.started_at)}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                    <DescriptionListGroup>
                      <DescriptionListTerm>Completed</DescriptionListTerm>
                      <DescriptionListDescription>
                        {formatDate(analysis?.input.scan.completed_at)}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                  </DescriptionList>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </LoadingWrapper>
      </PageSection>
    </>
  );
};
