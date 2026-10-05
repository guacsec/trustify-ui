export interface ModelProperties {
  version?: string;
  licenses?: string;
  bomFormat?: string;
  suppliedBy?: string;
  specVersion?: string;
  typeOfModel?: string;
  serialNumber?: string;
  primaryPurpose?: string;
  downloadLocation?: string;
  external_references?: string;
  limitation?: string;
  safetyRiskAssessment?: string;
}

export const getModelProperties = (properties: unknown): ModelProperties => {
  if (properties && typeof properties === "object") {
    return properties as ModelProperties;
  }
  return {};
};
