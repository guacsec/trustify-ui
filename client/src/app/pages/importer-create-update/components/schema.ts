import type { Importer } from "@app/client";
import { duplicateNameCheck } from "@app/utils/utils";
import { array, boolean, number, object, type SchemaOf, string } from "yup";

export interface GeneralInformationFormValues {
  type: string;
  name: string;
  description?: string;
  enabled: boolean;
  labels: string[];
}

export interface ConfigurationFormValues {
  source: string;
  periodValue: number;
  periodUnit: string;
  v3Signatures?: boolean;
  ignoreMissing?: boolean;
  fetchRetries?: number;
  sizeLimitValue?: string;
  sizeLimitUnit: string;
  onlyPatterns: { value: string }[];
  keys: { value: string }[];
  branch?: string;
  path?: string;
  years: { value: number }[];
  startYear?: number | null;
  clearlyDefinedTypes: string[];
  apiToken?: string;
  namespace?: string;
  concurrency?: number;
}

export const useGeneralInformationFormSchema = ({
  importer,
  importers,
}: {
  importer: Importer | null;
  importers: Importer[];
}) => {
  return object({
    type: string().required().trim().min(3).max(250),
    name: string()
      .required()
      .trim()
      .min(3)
      .max(120)
      .test(
        "Duplicate name",
        "An importer with this name already exists. Use a different name.",
        (value) => {
          return duplicateNameCheck(
            importers || [],
            importer || null,
            value || "",
          );
        },
      ),
    description: string().trim().max(250),
    enabled: boolean().required(),
    labels: array(string().required()),
  });
};

export const useConfigurationFormSchema = () => {
  return object({
    source: string().required().trim().min(3).max(250),
    periodValue: number().required().min(1),
    periodUnit: string().required().trim().max(250),
    v3Signatures: boolean(),
    ignoreMissing: boolean(),
    fetchRetries: number().min(0),
    sizeLimitValue: string().matches(
      /^[0-9]*\.?[0-9]*$/,
      "Only numbers and a dot are allowed",
    ),
    sizeLimitUnit: string().required().trim().max(250),
    onlyPatterns: array(object({ value: string().required() })),
    keys: array(object({ value: string().required().url() })),
    branch: string().trim(),
    path: string().trim(),
    years: array(object({ value: number().required() })),
    startYear: number()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value,
      )
      .nullable()
      .min(0),
    clearlyDefinedTypes: array(string().required()),
    apiToken: string().trim(),
    namespace: string().trim(),
    concurrency: number().min(0),
  });
};

export type ImporterWizardFormValues = GeneralInformationFormValues &
  ConfigurationFormValues;

export const useAnalysisWizardFormValidationSchema = ({
  importer,
  importers,
}: {
  importer: Importer | null;
  importers: Importer[];
}) => {
  const schemas = {
    generalInformationStep: useGeneralInformationFormSchema({
      importer,
      importers,
    }),
    configurationStep: useConfigurationFormSchema(),
  };
  const allFieldsSchema: SchemaOf<ImporterWizardFormValues> =
    schemas.generalInformationStep.concat(schemas.configurationStep);
  return {
    schemas,
    allFieldsSchema,
  };
};
