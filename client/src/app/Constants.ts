import ENV from "./env";

export const RENDER_DATE_FORMAT = "MMM DD, YYYY";
export const RENDER_DATETIME_FORMAT = "MMM DD, YYYY | HH:mm:ss";
export const FILTER_DATE_FORMAT = "YYYY-MM-DD";

export const TablePersistenceKeyPrefixes = {
  advisories: "ad",
  vulnerabilities: "vn",
  sboms: "sb",
  sboms_by_package: "sbk",
  packages: "pk",
  sbom_packages: "spk",
};

// URL param prefixes: should be short, must be unique for each table that uses one
export enum TableURLParamKeyPrefix {
  repositories = "r",
  tags = "t",
}

export const isAuthRequired = ENV.AUTH_REQUIRED !== "false";
export const isAnalyticsEnabled = ENV.ANALYTICS_ENABLED !== "false";
export const uploadLimit = "500m";

/**
 * The name of the client generated id field inserted in a object marked with mixin type
 * `WithUiId`.
 */
export const UI_UNIQUE_ID = "_ui_unique_id";

export const FORM_DATA_FILE_KEY = "file";
