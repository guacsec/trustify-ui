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

export const duplicateFieldCheck = <T>(
  fieldKey: keyof T,
  itemList: T[],
  currentItem: T | null,
  fieldValue: T[keyof T],
) =>
  (currentItem && currentItem[fieldKey] === fieldValue) ||
  !itemList.some((item) => item[fieldKey] === fieldValue);

export const duplicateNameCheck = <T extends { name?: string }>(
  itemList: T[],
  currentItem: T | null,
  nameValue: T["name"],
) => duplicateFieldCheck("name", itemList, currentItem, nameValue);

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- allowed
export const dedupeFunction = (arr: any[]) =>
  arr?.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.value === value.value),
  );

export const numStr = (num: number | undefined): string => {
  if (num === undefined) return "";
  return String(num);
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

export const getValidatedFromError = (error: unknown | undefined) => {
  return error ? "error" : "default";
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
