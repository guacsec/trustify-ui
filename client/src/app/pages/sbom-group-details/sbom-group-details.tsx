import React from "react";
import { Link } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  Content,
  Flex,
  FlexItem,
  Label,
  PageSection,
} from "@patternfly/react-core";

import { PathParam, Paths, useRouteParams } from "@app/Routes";

import { DocumentMetadata } from "@app/components/DocumentMetadata";
import { useSuspenseSBOMGroupById } from "@app/queries/sbom-groups";
import { SbomSearchProvider } from "../sbom-list/sbom-context";
import { SbomTable } from "../sbom-list/sbom-table";
import { SbomToolbar } from "../sbom-list/sbom-toolbar";

export const SBOMGroupDetails: React.FC = () => {
  const sbomGroupId = useRouteParams(PathParam.SBOM_GROUP_ID);

  const { sbomGroup } = useSuspenseSBOMGroupById(sbomGroupId);

  return (
    <>
      <DocumentMetadata title={sbomGroup?.name} />
      <PageSection type="breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={Paths.sbomGroups}>Groups</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isActive>Group details</BreadcrumbItem>
        </Breadcrumb>
      </PageSection>
      <PageSection>
        <Flex>
          <FlexItem>
            <Content component="h1">{sbomGroup?.name} </Content>
          </FlexItem>
          <FlexItem>
            <Label color={"purple"} isCompact>
              {sbomGroup?.labels?.product}
            </Label>
          </FlexItem>
        </Flex>
        <Content component="p">{sbomGroup?.description} </Content>
      </PageSection>
      <PageSection>
        <SbomSearchProvider sbomGroupIds={[sbomGroupId]}>
          <SbomToolbar showFilters showActions />
          <SbomTable />
        </SbomSearchProvider>
      </PageSection>
    </>
  );
};
