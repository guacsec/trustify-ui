/** CSAF 2.0 VEX document type definitions per the OASIS CSAF JSON schema. */

/** Top-level CSAF document container. */
export interface CsafDocument {
  document: CsafDocumentMetadata;
  product_tree?: CsafProductTree;
  vulnerabilities?: CsafVulnerability[];
}

/** Document-level metadata section. */
export interface CsafDocumentMetadata {
  category: string;
  csaf_version: string;
  title: string;
  publisher: CsafPublisher;
  tracking: CsafTracking;
  notes?: CsafNote[];
  references?: CsafReference[];
  distribution?: CsafDistribution;
  aggregate_severity?: CsafAggregateSeverity;
  lang?: string;
  source_lang?: string;
}

/** Document publisher information. */
export interface CsafPublisher {
  category: string;
  name: string;
  namespace: string;
  contact_details?: string;
  issuing_authority?: string;
}

/** Document tracking metadata including revision history. */
export interface CsafTracking {
  current_release_date: string;
  id: string;
  initial_release_date: string;
  revision_history: CsafRevision[];
  status: string;
  version: string;
  generator?: CsafGenerator;
  aliases?: string[];
}

/** Document version revision entry. */
export interface CsafRevision {
  date: string;
  number: string;
  summary: string;
}

/** Tool that generated the CSAF document. */
export interface CsafGenerator {
  engine: CsafGeneratorEngine;
  date?: string;
}

/** Generator engine identification. */
export interface CsafGeneratorEngine {
  name: string;
  version?: string;
}

/** Document-level note. */
export interface CsafNote {
  category: string;
  text: string;
  audience?: string;
  title?: string;
}

/** External reference link. */
export interface CsafReference {
  url: string;
  summary?: string;
  category?: string;
}

/** TLP distribution information. */
export interface CsafDistribution {
  text?: string;
  tlp?: CsafTlp;
}

/** Traffic Light Protocol classification. */
export interface CsafTlp {
  label: string;
  url?: string;
}

/** Aggregate severity for the entire document. */
export interface CsafAggregateSeverity {
  text: string;
  namespace?: string;
}

/** Product tree describing the vendor/product/version hierarchy. */
export interface CsafProductTree {
  branches?: CsafBranch[];
  full_product_names?: CsafFullProductName[];
  relationships?: CsafRelationship[];
  product_groups?: CsafProductGroup[];
}

/** Recursive branch in the product tree hierarchy. */
export interface CsafBranch {
  category: string;
  name: string;
  branches?: CsafBranch[];
  product?: CsafFullProductName;
}

/** A uniquely identifiable product with an ID and display name. */
export interface CsafFullProductName {
  name: string;
  product_id: string;
  product_identification_helper?: CsafProductIdentificationHelper;
}

/** Helper data for identifying a product (CPE, PURL, etc.). */
export interface CsafProductIdentificationHelper {
  cpe?: string;
  purl?: string;
  hashes?: CsafHash[];
  model_numbers?: string[];
  serial_numbers?: string[];
  skus?: string[];
  x_generic_uris?: CsafGenericUri[];
}

/** Cryptographic hash for product identification. */
export interface CsafHash {
  file_hashes: CsafFileHash[];
  filename: string;
}

/** Individual file hash entry. */
export interface CsafFileHash {
  algorithm: string;
  value: string;
}

/** Generic URI reference. */
export interface CsafGenericUri {
  namespace: string;
  uri: string;
}

/** Relationship between two products. */
export interface CsafRelationship {
  category: string;
  full_product_name: CsafFullProductName;
  product_reference: string;
  relates_to_product_reference: string;
}

/** Named group of product IDs. */
export interface CsafProductGroup {
  group_id: string;
  product_ids: string[];
  summary?: string;
}

/** Vulnerability entry in a CSAF document. */
export interface CsafVulnerability {
  cve?: string;
  cwe?: CsafCwe;
  title?: string;
  notes?: CsafNote[];
  references?: CsafReference[];
  discovery_date?: string;
  release_date?: string;
  scores?: CsafScore[];
  product_status?: CsafProductStatus;
  remediations?: CsafRemediation[];
  threats?: CsafThreat[];
  acknowledgments?: CsafAcknowledgment[];
  involvements?: CsafInvolvement[];
  ids?: CsafVulnerabilityId[];
}

/** CWE weakness classification. */
export interface CsafCwe {
  id: string;
  name: string;
}

/** CVSS scoring data for a set of products. */
export interface CsafScore {
  products: string[];
  cvss_v3?: CsafCvssV3;
  cvss_v2?: CsafCvssV2;
}

/** CVSS v3.x score details. */
export interface CsafCvssV3 {
  version: string;
  vectorString: string;
  baseScore: number;
  baseSeverity: string;
  attackVector?: string;
  attackComplexity?: string;
  privilegesRequired?: string;
  userInteraction?: string;
  scope?: string;
  confidentialityImpact?: string;
  integrityImpact?: string;
  availabilityImpact?: string;
  exploitCodeMaturity?: string;
  remediationLevel?: string;
  reportConfidence?: string;
  temporalScore?: number;
  temporalSeverity?: string;
  environmentalScore?: number;
  environmentalSeverity?: string;
}

/** CVSS v2 score details. */
export interface CsafCvssV2 {
  version: string;
  vectorString: string;
  baseScore: number;
  accessVector?: string;
  accessComplexity?: string;
  authentication?: string;
  confidentialityImpact?: string;
  integrityImpact?: string;
  availabilityImpact?: string;
}

/** Product status categories per vulnerability. */
export interface CsafProductStatus {
  fixed?: string[];
  known_affected?: string[];
  known_not_affected?: string[];
  first_affected?: string[];
  first_fixed?: string[];
  last_affected?: string[];
  recommended?: string[];
  under_investigation?: string[];
}

/** Remediation action for affected products. */
export interface CsafRemediation {
  category: string;
  details: string;
  product_ids?: string[];
  group_ids?: string[];
  url?: string;
  date?: string;
  entitlements?: string[];
  restart_required?: CsafRestartRequired;
}

/** Restart requirement for a remediation. */
export interface CsafRestartRequired {
  category: string;
  details?: string;
}

/** Threat information for affected products. */
export interface CsafThreat {
  category: string;
  details: string;
  product_ids?: string[];
  group_ids?: string[];
  date?: string;
}

/** Acknowledgment of contributors or reporters. */
export interface CsafAcknowledgment {
  names?: string[];
  organization?: string;
  summary?: string;
  urls?: string[];
}

/** Involvement of a party in vulnerability handling. */
export interface CsafInvolvement {
  party: string;
  status: string;
  summary?: string;
}

/** Alternative vulnerability identifier. */
export interface CsafVulnerabilityId {
  system_name: string;
  text: string;
}
