import { ExtendedSeverity } from "@app/api/models";

/** Maps free-form severity text (e.g. CSAF aggregate_severity) to an ExtendedSeverity key. */
export const normalizeCsafSeverityText = (text?: string): ExtendedSeverity => {
  switch (text?.toLowerCase()) {
    case "critical":
      return "critical";
    case "important":
    case "high":
      return "high";
    case "moderate":
    case "medium":
      return "medium";
    case "low":
      return "low";
    case "none":
      return "none";
    default:
      return "unknown";
  }
};
