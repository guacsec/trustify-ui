import { splitStringAsKeyValue } from "@app/api/model-utils";
import type {
  ClearlyDefinedCurationImporter,
  ClearlyDefinedImporter,
  ClearlyDefinedPackageType,
  CsafImporter,
  CveImporter,
  CweImporter,
  Importer,
  ImporterConfiguration,
  OsvImporter,
  QuayImporter,
  SbomImporter,
} from "@app/client";
import type { ImporterWizardFormValues } from "./schema";

export const ALL_IMPORTER_TYPES = [
  "sbom",
  "csaf",
  "osv",
  "cve",
  "clearlyDefined",
  "clearlyDefinedCuration",
  "cwe",
  "quay",
] as const;
export type ImporterType = (typeof ALL_IMPORTER_TYPES)[number];

/**
 * Start
 * Safe way of generating an array of all elements of a Typescript Type
 */

type ListClearlyDefinedPackageType = {
  [key in ClearlyDefinedPackageType]: unknown;
};

const listClearlyDefinedPackageType: ListClearlyDefinedPackageType = {
  composer: {},
  crate: {},
  deb: {},
  gem: {},
  git: {},
  go: {},
  maven: {},
  npm: {},
  nuget: {},
  pod: {},
  pypi: {},
};

export const ALL_CLEARLY_DEFINED_PACKAGE_TYPES: ClearlyDefinedPackageType[] =
  Object.keys(listClearlyDefinedPackageType) as ClearlyDefinedPackageType[];

/**
 * End
 */

// Period

export const ALL_PERIOD_UNITS = [
  "s",
  "m",
  "h",
  "days",
  "weeks",
  "months",
  "years",
] as const;
export type PeriodUnitType = (typeof ALL_PERIOD_UNITS)[number];
type PeriodUnitProps = {
  [key in PeriodUnitType]: {
    label: string;
  };
};
export const PERIOD_UNIT_LIST: PeriodUnitProps = {
  s: { label: "seconds" },
  m: { label: "minutes" },
  h: { label: "hours" },
  days: { label: "days" },
  weeks: { label: "weeks" },
  months: { label: "months" },
  years: { label: "years" },
};

export const getPeriodValueAndUnit = (period?: string) => {
  try {
    const match = period?.match(/^(\d+)([a-zA-Z]+)$/);
    if (!match) return null;

    return {
      value: parseInt(match[1]),
      unit: match[2] as PeriodUnitType,
    };
  } catch (_e) {
    return null;
  }
};

// Size limit
export const ALL_SIZE_LIMITS = [
  "B",
  "KB",
  "KIB",
  "MB",
  "MIB",
  "GB",
  "GIB",
] as const;
export type SizeLimitUnitType = (typeof ALL_SIZE_LIMITS)[number];

export const getLimitSizeValueAndUnit = (limitSize?: string | null) => {
  if (!limitSize) {
    return null;
  }

  try {
    const split = limitSize.split(" ");
    return {
      value: split[0]?.trim(),
      unit: split[1]?.trim()?.toUpperCase(),
    };
  } catch (_e) {
    return null;
  }
};

//

export type AllImporterConfigurations = SbomImporter &
  CsafImporter &
  OsvImporter &
  CveImporter &
  ClearlyDefinedImporter &
  ClearlyDefinedCurationImporter &
  CweImporter &
  QuayImporter;

export const getImporterTypeAndConfiguration = (importer: Importer) => {
  const importerType = (Object.keys(importer?.configuration ?? {})[0] ??
    null) as ImporterType | null;

  const configuration =
    importer && importerType
      ? // biome-ignore lint/suspicious/noExplicitAny: allow
        ((importer.configuration as any)[
          importerType
        ] as AllImporterConfigurations)
      : null;

  return { importerType, configuration };
};

export const getImporterConfigurationFromFormValues = (
  importerType: ImporterType,
  formValues: ImporterWizardFormValues,
) => {
  const commonConfigurationFields = {
    labels: formValues.labels
      .map((label) => splitStringAsKeyValue(label))
      .reduce((prev, current) => {
        // biome-ignore lint/suspicious/noExplicitAny: allowed
        (prev as any)[current.key] = current.value;
        return prev;
      }, {}),
    period: `${formValues.periodValue}${formValues.periodUnit.trim()}`,
    source: formValues.source,
    description: formValues.description,
    disabled: !formValues.enabled,
  };

  let configuration: ImporterConfiguration | null = null;

  switch (importerType) {
    case "sbom": {
      configuration = {
        sbom: {
          ...commonConfigurationFields,
          fetchRetries: formValues.fetchRetries,
          ignoreMissing: formValues.ignoreMissing,
          keys: formValues.keys.map((e) => e.value),
          onlyPatterns: formValues.onlyPatterns.map((e) => e.value),
          sizeLimit: formValues.sizeLimitValue
            ? `${formValues.sizeLimitValue}${formValues.sizeLimitUnit.trim()}`
            : undefined,
          v3Signatures: formValues.v3Signatures,
        },
      };
      break;
    }
    case "csaf": {
      configuration = {
        csaf: {
          ...commonConfigurationFields,
          fetchRetries: formValues.fetchRetries,
          ignoreMissing: formValues.ignoreMissing,
          onlyPatterns: formValues.onlyPatterns.map((e) => e.value),
          v3Signatures: formValues.v3Signatures,
        },
      };
      break;
    }
    case "osv": {
      configuration = {
        osv: {
          ...commonConfigurationFields,
          branch: formValues.branch,
          path: formValues.path,
          startYear: formValues.startYear,
          years: formValues.years.map((e) => e.value),
        },
      };
      break;
    }
    case "cve": {
      configuration = {
        cve: {
          ...commonConfigurationFields,
          startYear: formValues.startYear,
          years: formValues.years.map((e) => e.value),
        },
      };
      break;
    }
    case "clearlyDefined": {
      configuration = {
        clearlyDefined: {
          ...commonConfigurationFields,
          types: formValues.clearlyDefinedTypes as ClearlyDefinedPackageType[],
        },
      };
      break;
    }
    case "clearlyDefinedCuration": {
      configuration = {
        clearlyDefinedCuration: {
          ...commonConfigurationFields,
          types: formValues.clearlyDefinedTypes as ClearlyDefinedPackageType[],
        },
      };
      break;
    }
    case "cwe": {
      configuration = {
        cwe: {
          ...commonConfigurationFields,
        },
      };
      break;
    }
    case "quay": {
      configuration = {
        quay: {
          ...commonConfigurationFields,
          apiToken: formValues.apiToken,
          namespace: formValues.namespace,
          sizeLimit: formValues.sizeLimitValue
            ? `${formValues.sizeLimitValue}${formValues.sizeLimitUnit.trim()}`
            : undefined,
          concurrency: formValues.concurrency,
        },
      };
      break;
    }
    default:
      break;
  }

  return configuration;
};
