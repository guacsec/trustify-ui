import type { AxiosError } from "axios";
import dayjs from "dayjs";
import { PackageURL } from "packageurl-js";

import { RENDER_DATETIME_FORMAT, RENDER_DATE_FORMAT } from "@app/Constants";
import type { DecomposedPurl } from "@app/api/models";
import type { ToolbarLabel } from "@patternfly/react-core";

// Axios error

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- allowed
export const getAxiosErrorMessage = (axiosError: AxiosError<any>) => {
  const data = axiosError.response?.data;

  const error = typeof data?.error === "string" ? data.error : undefined;
  const message = typeof data?.message === "string" ? data.message : undefined;
  const details = typeof data?.details === "string" ? data.details : undefined;

  if (error && message) {
    const base = `${error}: ${message}`;
    return details ? `${base}\n${details}` : base;
  }
  if (message) {
    return message;
  }
  if (error) {
    return error;
  }

  if (typeof data === "string") {
    return data;
  }
  return axiosError.message;
};

// ToolbarChip

export const getToolbarChipKey = (value: string | ToolbarLabel) => {
  return typeof value === "string" ? value : value.key;
};

// Dates

export const formatDate = (value?: string | null) => {
  return value ? dayjs(value).format(RENDER_DATE_FORMAT) : null;
};

export const formatDateTime = (value?: string | null) => {
  return value ? dayjs(value).format(RENDER_DATETIME_FORMAT) : null;
};

export const parseMaybeNumericString = (
  numOrStr: string | undefined | null,
): string | number | null => {
  if (numOrStr === undefined || numOrStr === null) return null;
  const num = Number(numOrStr);
  return Number.isNaN(num) ? numOrStr : num;
};

export const objectKeys = <T extends object>(obj: T) =>
  Object.keys(obj) as (keyof T)[];

export const getValidatedFromErrors = (
  error: unknown | undefined,
  dirty: boolean | undefined,
  isTouched: boolean | undefined,
) => {
  return error && (dirty || isTouched) ? "error" : "default";
};

export const decomposePurl = (purl: string) => {
  try {
    const packageData = PackageURL.fromString(purl);
    const result: DecomposedPurl = {
      type: packageData.type,
      name: packageData.name,
      namespace: packageData.namespace ?? undefined,
      version: packageData.version ?? undefined,
      qualifiers: packageData.qualifiers ?? undefined,
      path: packageData.subpath ?? undefined,
    };
    return result;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

/** Compare two PURLs by type, namespace, name, and version, ignoring qualifiers. */
export const purlBaseEquals = (a: string, b: string): boolean => {
  try {
    const pa = PackageURL.fromString(a);
    const pb = PackageURL.fromString(b);
    return (
      pa.type === pb.type &&
      pa.namespace === pb.namespace &&
      pa.name === pb.name &&
      pa.version === pb.version
    );
  } catch {
    return a === b;
  }
};

/** Decode a PURL for display. Falls back to the original value if decoding fails. */
export const decodePurl = (purl: string | null | undefined): string => {
  if (purl == null) {
    return "";
  }
  try {
    return decodeURIComponent(purl);
  } catch {
    return purl;
  }
};

export const getString = (input: string | (() => string)) =>
  typeof input === "function" ? input() : input;

export const getFilenameFromContentDisposition = (
  contentDisposition: string,
): string | null => {
  const match = contentDisposition.match(/filename="?([^"]+)"?/);
  return match ? match[1] : null;
};

export const parseBooleanIfPossible = (value?: string): boolean => {
  return value?.toLocaleLowerCase() === "true";
};
