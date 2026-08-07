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
  PageSection,
  Progress,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";

import { Paths } from "@app/Routes";

export const LightwellReport: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sbomIds = React.useMemo(() => {
    const ids = searchParams.get("ids");
    return ids ? ids.split(",").filter(Boolean) : [];
  }, [searchParams]);

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
              <Button variant="primary" isDisabled>
                Download
              </Button>
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
      </PageSection>

      <PageSection>
        <Content component="p">
          Loading report for {sbomIds.length} SBOM(s)...
        </Content>
      </PageSection>
    </>
  );
};
