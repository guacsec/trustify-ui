import type { Labels, Severity } from "@app/client";

export type WithUiId<T> = T & { _ui_unique_id: string };

/** Mark an object as "New" therefore does not have an `id` field. */
export type New<T extends { id: number }> = Omit<T, "id">;

export interface HubFilter {
  field: string;
  operator?: "=" | "!=" | "~" | ">" | ">=" | "<" | "<=";
  value:
    | string
    | number
    | {
        list: (string | number)[];
        operator?: "AND" | "OR";
      };
}

export interface HubRequestParams {
  filters?: HubFilter[];
  sort?: {
    field: string;
    direction: "asc" | "desc";
  };
  page?: {
    pageNumber: number; // 1-indexed
    itemsPerPage: number;
  };
}

export interface HubPaginatedResult<T> {
  data: T[];
  total: number;
  params: HubRequestParams;
}

// Common

export type VulnerabilityStatus =
  | "fixed"
  | "not_affected"
  | "known_not_affected"
  | "under_investigation"
  | "affected";

export interface DecomposedPurl {
  type: string;
  name: string;
  namespace?: string;
  version?: string;
  qualifiers?: Labels;
  path?: string;
}

export type ExtendedSeverity = Severity | "unknown";
export const extendedSeverityFromSeverity = (
  value?: Severity | null,
): ExtendedSeverity => value ?? "unknown";

// User preferences

export interface WatchedSboms {
  sbom1Id: string | null;
  sbom2Id: string | null;
  sbom3Id: string | null;
  sbom4Id: string | null;
}

//

export interface Label {
  key: string;
  value?: string;
}

// ExploitIQ

export interface ExploitIQAnalysis {
  _id: { $oid: string };
  input: {
    scan: {
      id: string;
      type: string | null;
      started_at: string;
      completed_at: string;
      vulns: Array<{
        vuln_id: string;
        description: string | null;
        score: number | null;
        severity: string | null;
        published_date: string | null;
        last_modified_date: string | null;
        url: string | null;
        feed_group: string | null;
        package: string | null;
        package_version: string | null;
        package_name: string | null;
        package_type: string | null;
      }>;
    };
    image: {
      name: string;
      tag: string;
      source_info: Array<{
        type: string;
        source_type: string;
        git_repo: string;
        ref: string;
        include: string[];
        exclude: string[];
      }>;
      sbom_info: {
        _type: string;
        packages: unknown[];
      };
    };
  };
  metadata: {
    submitted_at: { $date: string };
    user: string;
    sent_at: { $date: string };
  };
  info: {
    vdb: {
      code_vdb_path: string | null;
      doc_vdb_path: string;
    };
    intel: Array<{
      vuln_id: string;
      ghsa: {
        ghsa_id: string;
        cve_id: string;
        summary: string;
        description: string;
        severity: string;
        vulnerabilities: Array<{
          package: {
            ecosystem: string;
            name: string;
          };
          vulnerable_version_range: string;
          first_patched_version: string;
          vulnerable_functions: string[];
        }>;
        cvss: {
          score: number;
          vector_string: string;
        };
        cwes: Array<{
          cwe_id: string;
          name: string;
        }>;
        published_at: string;
        updated_at: string;
        url: string;
        html_url: string;
        type: string;
        repository_advisory_url: string | null;
        source_code_location: string;
        identifiers: Array<{ value: string; type: string }>;
        references: string[];
        github_reviewed_at: string;
        nvd_published_at: string;
        withdrawn_at: string | null;
        cvss_severities: {
          cvss_v3: { vector_string: string; score: number };
          cvss_v4: { vector_string: string | null; score: number };
        };
        credits: unknown[];
        epss: { percentage: number; percentile: number };
      };
      nvd: {
        cve_id: string;
        cve_description: string;
        cvss_vector: string;
        cvss_base_score: number;
        cvss_severity: string;
        cwe_name: string;
        cwe_description: string;
        cwe_extended_description: string;
        configurations: Array<{
          package: string;
          system: string | null;
          versionStartExcluding: string | null;
          versionEndExcluding: string | null;
          versionStartIncluding: string | null;
          versionEndIncluding: string | null;
        }>;
        vendor_names: string | null;
        references: string[];
        disputed: boolean;
        published_at: string;
        updated_at: string;
      };
      rhsa: {
        bugzilla: { description: string; id: string; url: string };
        details: string[];
        statement: string | null;
        package_state: Array<{
          product_name: string;
          fix_state: string;
          package_name: string;
          cpe: string;
        }>;
        upstream_fix: string | null;
        cvss3: {
          cvss3_base_score: number;
          cvss3_scoring_vector: string;
          status: string;
        };
        threat_severity: string;
        public_date: string;
        acknowledgement: string;
        affected_release: Array<{
          product_name: string;
          release_date: string;
          advisory: string;
          cpe: string;
          package?: string;
        }>;
        references: string[];
        name: string;
        mitigation: { value: string; lang: string };
        csaw: boolean;
      };
      ubuntu: {
        description: string | null;
        notes: string | null;
        notices: string | null;
        priority: string | null;
        ubuntu_description: string | null;
        impact: string | null;
      };
      epss: {
        epss: number;
        percentile: number;
        date: string;
        cve: string;
      };
      plugin_data: Array<{
        label: string;
        description: string;
      }>;
      intel_score: number;
      has_sufficient_intel_for_agent: boolean;
    }>;
    sbom: { packages: unknown[] };
    vulnerable_dependencies: Array<{
      vuln_id: string;
      vuln_package_intel_sources: unknown[];
      vulnerable_sbom_packages: unknown[];
    }>;
  };
  output?: Array<{
    vuln_id: string;
    checklist: Array<{
      input: string;
      response: string;
      intermediate_steps: string | null;
    }>;
    summary: string;
    justification: {
      label: string;
      reason: string;
      status: "UNKNOWN" | "TRUE" | "FALSE";
    };
    cvss?: {
      score: string;
      vector_string: string;
    };
    intel_score: number;
  }>;
}
