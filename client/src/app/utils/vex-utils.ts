import type { VexStatus } from "@app/client";

export const vexStatusColor = (
  status: VexStatus | null | undefined,
): "green" | "red" | "grey" => {
  if (status === "Fixed" || status === "NotAffected") return "green";
  if (status === "Affected") return "red";
  return "grey";
};

export const formatVexStatus = (
  status: VexStatus | null | undefined,
): string => {
  if (!status) return "Unknown";
  if (typeof status === "string") return status;
  return status.Other;
};
