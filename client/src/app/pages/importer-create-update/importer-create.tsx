import type React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  Content,
  PageSection,
  PageSectionTypes,
} from "@patternfly/react-core";

import { Paths } from "@app/Routes";
import { ImporterWizard } from "./components/importer-wizard";

export const ImporterCreate: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageSection type="breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={Paths.importers}>Importers</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isActive>Create Importer</BreadcrumbItem>
        </Breadcrumb>
      </PageSection>
      <PageSection>
        <Content>
          <Content component="h1">Create Importer</Content>
        </Content>
      </PageSection>
      <PageSection hasBodyWrapper={false} type={PageSectionTypes.wizard}>
        <ImporterWizard
          importer={null}
          onClose={() => navigate(Paths.importers)}
        />
      </PageSection>
    </>
  );
};

export { ImporterCreate as default } from "./importer-create";
