import React from "react";
import { Link } from "react-router-dom";

import {
  Alert,
  Breadcrumb,
  BreadcrumbItem,
  Content,
  EmptyState,
  EmptyStateBody,
  EmptyStateFooter,
  MultipleFileUpload,
  MultipleFileUploadMain,
  PageSection,
  Spinner,
  type DropEvent,
} from "@patternfly/react-core";
import { LockIcon } from "@patternfly/react-icons";
import UploadIcon from "@patternfly/react-icons/dist/esm/icons/upload-icon";
import type { AxiosError } from "axios";

import { DocumentMetadata } from "@app/components/DocumentMetadata";
import { ReadOnlyContext } from "@app/components/ReadOnlyContext";
import { Paths } from "@app/Routes";
import { useUploadRemediationMapping } from "@app/queries/crypto";
import { getAxiosErrorMessage } from "@app/utils/utils";

const REMEDIATION_DROPZONE_ACCEPT = {
  "text/csv": [".csv"],
  "application/json": [".json"],
};

/** Full-page upload interface for importing PQC remediation mappings. */
export const CryptoRemediationUpload: React.FC = () => {
  const { areMutationsDisabled } = React.useContext(ReadOnlyContext);
  const [importedCount, setImportedCount] = React.useState<number | null>(null);
  const mutation = useUploadRemediationMapping();

  const handleFileDrop = (_event: DropEvent, files: File[]) => {
    setImportedCount(null);
    mutation.reset();
    const uploadSequentially = async () => {
      let total = 0;
      for (const file of files) {
        const res = await mutation.mutateAsync(file);
        total += res.data.count;
      }
      setImportedCount(total);
    };
    uploadSequentially().catch(() => {
      // error is captured in mutation.error
    });
  };

  return (
    <>
      <DocumentMetadata title="Import Remediation Mappings" />
      <PageSection type="breadcrumb">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={Paths.cryptography}>Cryptography</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isActive>Import Remediation Mappings</BreadcrumbItem>
        </Breadcrumb>
      </PageSection>
      {areMutationsDisabled ? (
        <PageSection>
          <EmptyState headingLevel="h1" icon={LockIcon} titleText="Unavailable">
            <EmptyStateBody>
              This instance is running in read-only mode. Importing remediation
              mappings is not available.
            </EmptyStateBody>
            <EmptyStateFooter>
              <Link to={Paths.cryptography}>Return to Cryptography</Link>
            </EmptyStateFooter>
          </EmptyState>
        </PageSection>
      ) : (
        <>
          <PageSection>
            <Content>
              <Content component="h1">Import Remediation Mappings</Content>
              <Content component="p">
                Upload a CSV or JSON file that maps non-compliant algorithms to
                their NIST-recommended PQC replacements.
              </Content>
            </Content>
          </PageSection>
          <PageSection>
            <MultipleFileUpload
              onFileDrop={handleFileDrop}
              dropzoneProps={{
                accept: REMEDIATION_DROPZONE_ACCEPT,
                disabled: mutation.isPending,
                useFsAccessApi: false,
              }}
            >
              <MultipleFileUploadMain
                titleIcon={<UploadIcon />}
                titleText="Drag and drop files here"
                titleTextSeparator="or"
                infoText="Accepted file types: .csv, .json"
              />
              {mutation.isPending && (
                <Alert
                  variant="info"
                  isInline
                  title={
                    <>
                      <Spinner isInline size="sm" /> Importing…
                    </>
                  }
                />
              )}
              {importedCount !== null && (
                <Alert
                  variant="success"
                  isInline
                  title={`${importedCount} mapping(s) imported successfully`}
                />
              )}
              {mutation.isError && (
                <Alert
                  variant="danger"
                  isInline
                  title={getAxiosErrorMessage(mutation.error as AxiosError)}
                />
              )}
            </MultipleFileUpload>
          </PageSection>
        </>
      )}
    </>
  );
};
