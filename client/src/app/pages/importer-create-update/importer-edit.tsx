import type React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  Content,
  PageSection,
  PageSectionTypes,
} from "@patternfly/react-core";

import { LoadingWrapper } from "@app/components/LoadingWrapper";
import { useFetchImporterById } from "@app/queries/importers";
import { PathParam, Paths, useRouteParams } from "@app/Routes";
import { ImporterWizard } from "./components/importer-wizard";

export const ImporterEdit: React.FC = () => {
  const navigate = useNavigate();

  const importerId = useRouteParams(PathParam.IMPORTER_ID);

  const { importer, isFetching, fetchError } = useFetchImporterById(importerId);

  return (
    <>
      <PageSection type="breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={Paths.importers}>Importers</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isActive>
            {importerId ? "Edit Importer" : "Create Importer"}
          </BreadcrumbItem>
        </Breadcrumb>
      </PageSection>
      <PageSection>
        <Content>
          <Content component="h1">
            {importerId ? "Edit Importer" : "Create Importer"}
          </Content>
        </Content>
      </PageSection>
      <PageSection hasBodyWrapper={false} type={PageSectionTypes.wizard}>
        <LoadingWrapper isFetching={isFetching} fetchError={fetchError}>
          {importer && (
            <ImporterWizard
              importer={importer}
              onClose={() => navigate(Paths.importers)}
            />
          )}
        </LoadingWrapper>
      </PageSection>
    </>
  );
};

export { ImporterEdit as default } from "./importer-edit";
