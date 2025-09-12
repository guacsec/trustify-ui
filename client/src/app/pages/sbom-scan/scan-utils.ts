import type { AdvisoryHead } from "@app/client";
import { formatDate } from "@app/utils/utils";
import type { VulnerabilityOfSbomFromAnalysis } from "./hooks/useVulnerabilitiesOfSbom";

const IMPORTER_NAME_LABEL_KEY = "importer";
const UNKNOWN_IMPORTER_NAME = "Unknown";

export const extractImporterNameFromAdvisory = (advisory: AdvisoryHead) => {
  return advisory.labels[IMPORTER_NAME_LABEL_KEY] ?? UNKNOWN_IMPORTER_NAME;
};

const sanitizeForCSV = (value: string) => {
  // Escape double quotes by doubling them
  let sanitized = value.replace(/"/g, '""');

  // If it contains special characters, wrap in quotes
  if (/[",\r\n]/.test(sanitized)) {
    sanitized = `"${sanitized}"`;
  }

  return sanitized;
};

export const convertToCSV = (data: VulnerabilityOfSbomFromAnalysis[]) => {
  const header =
    "VulnerabilityID, Description, Severity, Severity score, Advisory, Status, Affected package, Published, Updated" +
    "\n";

  const csvData = data.flatMap(
    ({ advisories, purls, vulnerability, status }) => {
      return Array.from(advisories.values()).flatMap(
        ({ opinionatedExtendedSeverity, opinionatedScore, advisory }) => {
          return Array.from(purls).map((purl) => ({
            vulnerabilityId: sanitizeForCSV(vulnerability.identifier),
            description: sanitizeForCSV(vulnerability.description ?? ""),
            severity: sanitizeForCSV(opinionatedExtendedSeverity),
            severityScore: opinionatedScore?.value ?? "",
            advisory: extractImporterNameFromAdvisory(advisory),
            status: sanitizeForCSV(status),
            affectedPackage: sanitizeForCSV(purl),
            published: sanitizeForCSV(
              formatDate(vulnerability.published) ?? "",
            ),
            updated: sanitizeForCSV(formatDate(vulnerability.modified) ?? ""),
          }));
        },
      );
    },
  );

  const rows = csvData.map((row) => Object.values(row).join(",")).join("\n");
  return header + rows;
};
