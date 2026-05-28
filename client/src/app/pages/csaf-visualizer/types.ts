/** Top-level CSAF 2.0 document structure. */
export interface CsafDocument {
  document: DocumentMeta;
  product_tree: ProductTree;
  vulnerabilities: Vulnerability[];
}

/** CSAF document metadata including title, publisher, tracking, and distribution info. */
export interface DocumentMeta {
  aggregate_severity?: { namespace: string; text: string };
  category: string;
  csaf_version: string;
  distribution?: {
    text: string;
    tlp?: { label: string; url: string };
  };
  lang?: string;
  notes?: Note[];
  publisher: Publisher;
  references?: Reference[];
  title: string;
  tracking: Tracking;
}

/** Publisher information for the CSAF document. */
export interface Publisher {
  category: string;
  contact_details?: string;
  issuing_authority?: string;
  name: string;
  namespace: string;
}

/** Document tracking metadata including version history. */
export interface Tracking {
  current_release_date: string;
  generator?: {
    date: string;
    engine: { name: string; version: string };
  };
  id: string;
  initial_release_date: string;
  revision_history: RevisionEntry[];
  status: string;
  version: string;
}

/** A single entry in the document revision history. */
export interface RevisionEntry {
  date: string;
  number: string;
  summary: string;
}

/** A note attached to a document or vulnerability. */
export interface Note {
  category: string;
  text: string;
  title?: string;
}

/** A reference link with summary and URL. */
export interface Reference {
  category: string;
  summary: string;
  url: string;
}

/** Product tree containing branch hierarchy and product relationships. */
export interface ProductTree {
  branches: Branch[];
  relationships?: Relationship[];
}

/** Recursive branch in the product tree hierarchy. */
export interface Branch {
  category: string;
  name: string;
  branches?: Branch[];
  product?: Product;
}

/** A product leaf node with identification helpers. */
export interface Product {
  name: string;
  product_id: string;
  product_identification_helper?: {
    cpe?: string;
    purl?: string;
  };
}

/** A relationship between two products in the product tree. */
export interface Relationship {
  category: string;
  full_product_name: {
    name: string;
    product_id: string;
  };
  product_reference: string;
  relates_to_product_reference: string;
}

/** A vulnerability entry with CVE, scores, remediations, and affected products. */
export interface Vulnerability {
  cve: string;
  cwe?: { id: string; name: string };
  discovery_date?: string;
  ids?: { system_name: string; text: string }[];
  notes?: Note[];
  product_status?: ProductStatus;
  references?: Reference[];
  release_date?: string;
  remediations?: Remediation[];
  scores?: Score[];
  threats?: Threat[];
  title: string;
}

/** Product status categories for a vulnerability. */
export interface ProductStatus {
  fixed?: string[];
  known_affected?: string[];
  known_not_affected?: string[];
  under_investigation?: string[];
}

/** A remediation action for a vulnerability. */
export interface Remediation {
  category: string;
  date?: string;
  details: string;
  group_ids?: string[];
  product_ids?: string[];
  url?: string;
}

/** CVSS v3 scoring for a vulnerability. */
export interface Score {
  cvss_v3?: CvssV3;
  products: string[];
}

/** CVSS v3 score breakdown. */
export interface CvssV3 {
  attackComplexity: string;
  attackVector: string;
  availabilityImpact: string;
  baseScore: number;
  baseSeverity: string;
  confidentialityImpact: string;
  integrityImpact: string;
  privilegesRequired: string;
  scope: string;
  userInteraction: string;
  vectorString: string;
  version: string;
}

/** A threat entry describing the nature and impact of a vulnerability. */
export interface Threat {
  category: string;
  details: string;
  product_ids?: string[];
}
