import { saveAs } from "file-saver";

import type { PackageResult } from "./use-batched-recommendations";

const escapeField = (value: string): string => {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
};

export const downloadCsv = (results: PackageResult[]): void => {
  const headers = [
    "Package",
    "Current Version",
    "Recommended Version",
    "Found in SBOMs",
    "Vulnerabilities Addressed",
  ];

  const rows = results.map((r) => [
    escapeField(r.packageName),
    escapeField(r.version),
    escapeField(r.recommendedPackage),
    escapeField(r.foundIn.join("; ")),
    escapeField(r.vulnerabilities.join("; ")),
  ]);

  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  saveAs(blob, "lightwell-remediation-report.csv");
};
