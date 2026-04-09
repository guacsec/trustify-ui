import React from "react";

import { saveAs } from "file-saver";

import { downloadSbomLicense } from "@app/api/rest";
import { client } from "@app/axios-config/apiInit";
import { downloadAdvisory, downloadSbom } from "@app/client";
import { NotificationsContext } from "@app/components/NotificationsContext";
import {
  getAxiosErrorMessage,
  getFilenameFromContentDisposition,
} from "@app/utils/utils";

/** Hook providing download functions for advisories, SBOMs, and SBOM licenses with error notifications. */
export const useDownload = () => {
  const { pushNotification } = React.useContext(NotificationsContext);

  /** Pushes a danger toast notification with the given title and the error message extracted from the error. */
  const notifyDownloadError = (title: string, error: unknown) => {
    pushNotification({
      title,
      variant: "danger",
      message: getAxiosErrorMessage(error),
    });
  };

  const onDownloadAdvisory = (id: string, filename?: string) => {
    downloadAdvisory({
      client,
      path: { key: id },
      responseType: "arraybuffer",
      headers: { Accept: "text/plain", responseType: "blob" },
    })
      .then((response) => {
        saveAs(new Blob([response.data as BlobPart]), filename || `${id}.json`);
      })
      .catch((error) =>
        notifyDownloadError("Failed to download advisory", error),
      );
  };

  const onDownloadSBOM = (id: string, filename?: string) => {
    downloadSbom({
      client,
      path: { key: id },
      responseType: "arraybuffer",
      headers: { Accept: "text/plain", responseType: "blob" },
    })
      .then((response) => {
        saveAs(new Blob([response.data as BlobPart]), filename || `${id}.json`);
      })
      .catch((error) => notifyDownloadError("Failed to download SBOM", error));
  };

  const onDownloadSBOMLicenses = (id: string) => {
    downloadSbomLicense(id)
      .then((response) => {
        let filename: string | null = null;

        const header = response.headers?.["content-disposition"]?.toString();
        if (header) {
          filename = getFilenameFromContentDisposition(header);
        }

        saveAs(
          new Blob([response.data as BlobPart]),
          filename || `${id}.tar.gz`,
        );
      })
      .catch((error) =>
        notifyDownloadError("Failed to download SBOM licenses", error),
      );
  };

  return {
    downloadAdvisory: onDownloadAdvisory,
    downloadSBOM: onDownloadSBOM,
    downloadSBOMLicenses: onDownloadSBOMLicenses,
  };
};
