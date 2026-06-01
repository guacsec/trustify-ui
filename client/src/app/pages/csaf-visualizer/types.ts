/** Top-level CSAF 2.0 document structure. */
export interface CsafDocument {
  document: CsafDocumentMetadata;
  product_tree: ProductTree;
  vulnerabilities: Vulnerability[];
}

/** Document-level metadata section of a CSAF document. */
export interface CsafDocumentMetadata {
  aggregate_severity?: { namespace: string; text: string };
  category: string;
  csaf_version: string;
  distribution?: {
    text: string;
    tlp?: { label: string; url: string };
  };
  lang?: string;
  notes?: CsafNote[];
  publisher: CsafPublisher;
  references?: CsafReference[];
  title: string;
  tracking: CsafTracking;
}

/** Publisher information from a CSAF document. */
export interface CsafPublisher {
  category: string;
  contact_details?: string;
  issuing_authority?: string;
  name: string;
  namespace: string;
}

/** Document tracking metadata. */
export interface CsafTracking {
  current_release_date: string;
  generator?: {
    date: string;
    engine: { name: string; version: string };
  };
  id: string;
  initial_release_date: string;
  revision_history: CsafRevision[];
  status: string;
  version: string;
}

/** A single revision entry in the document tracking history. */
export interface CsafRevision {
  date: string;
  number: string;
  summary: string;
}

/** A document-level or vulnerability-level note. */
export interface CsafNote {
  category: string;
  text: string;
  title: string;
}

/** An external reference link. */
export interface CsafReference {
  category: string;
  summary: string;
  url: string;
}

/** Product tree containing branch hierarchy and relationships. */
export interface ProductTree {
  branches: Branch[];
  relationships?: Relationship[];
}

/** A recursive branch in the product tree hierarchy. */
export interface Branch {
  category: string;
  name: string;
  branches?: Branch[];
  product?: Product;
}

/** A leaf product in the product tree. */
export interface Product {
  name: string;
  product_id: string;
  product_identification_helper?: {
    cpe?: string;
    purl?: string;
  };
}

/** A relationship between products in the product tree. */
export interface Relationship {
  category: string;
  full_product_name: {
    name: string;
    product_id: string;
  };
  product_reference: string;
  relates_to_product_reference: string;
}

/** A vulnerability entry in the CSAF document. */
export interface Vulnerability {
  cve: string;
  cwe?: { id: string; name: string };
  discovery_date?: string;
  ids?: { system_name: string; text: string }[];
  notes?: CsafNote[];
  product_status?: ProductStatus;
  references?: CsafReference[];
  release_date?: string;
  remediations?: Remediation[];
  scores?: Score[];
  threats?: Threat[];
  title: string;
}

/** Product status groupings for a vulnerability. */
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

/** A CVSS score entry for a vulnerability. */
export interface Score {
  cvss_v3: CvssV3;
  products: string[];
}

/** CVSS v3 scoring details. */
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

/** A threat statement associated with a vulnerability. */
export interface Threat {
  category: string;
  details: string;
  product_ids: string[];
}
