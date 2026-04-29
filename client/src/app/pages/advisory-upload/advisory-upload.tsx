import type React from "react";
import { Link } from "react-router-dom";

import type { AxiosError, AxiosResponse } from "axios";

import {
  Breadcrumb,
  BreadcrumbItem,
  Content,
  EmptyState,
  EmptyStateBody,
  EmptyStateFooter,
  PageSection,
} from "@patternfly/react-core";
import LockIcon from "@patternfly/react-icons/dist/esm/icons/lock-icon";

import { DocumentMetadata } from "@app/components/DocumentMetadata";
import { useReadOnlyContext } from "@app/components/ReadOnlyContext";
import { UploadFiles } from "@app/components/UploadFiles";
import { useUploadAdvisory } from "@app/queries/advisories";
import { Paths } from "@app/Routes";

export const AdvisoryUpload: React.FC = () => {
  const { isReadOnly } = useReadOnlyContext();
  const { uploads, handleUpload, handleRemoveUpload } = useUploadAdvisory();

  return (
    <>
      <DocumentMetadata title="Upload advisory" />
      <PageSection type="breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={Paths.advisories}>Advisories</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isActive>Upload Advisory</BreadcrumbItem>
        </Breadcrumb>
      </PageSection>
      {isReadOnly ? (
        <PageSection>
          <EmptyState
            headingLevel="h1"
            icon={LockIcon}
            titleText="Uploads unavailable"
          >
            <EmptyStateBody>
              This instance is running in read-only mode. Uploading advisories
              is not available.
            </EmptyStateBody>
            <EmptyStateFooter>
              <Link to={Paths.advisories}>Return to advisories</Link>
            </EmptyStateFooter>
          </EmptyState>
        </PageSection>
      ) : (
        <>
          <PageSection>
            <Content>
              <Content component="h1">Upload Advisory</Content>
              <Content component="p">
                Upload a CSAF, CVE, or OSV Advisory.
              </Content>
            </Content>
          </PageSection>
          <PageSection>
            <UploadFiles
              fileUploadProps={{ "aria-label": "advisory-uploader" }}
              uploads={uploads}
              handleUpload={handleUpload}
              handleRemoveUpload={handleRemoveUpload}
              extractSuccessMessage={(
                response: AxiosResponse<{ document_id: string }>,
              ) => {
                return `${response.data.document_id} uploaded`;
              }}
              extractErrorMessage={(error: AxiosError) =>
                error.response?.data
                  ? error.message
                  : "Error while uploading file"
              }
            />
          </PageSection>
        </>
      )}
    </>
  );
};
