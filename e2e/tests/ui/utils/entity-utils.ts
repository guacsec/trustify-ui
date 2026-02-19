/**
 * Utility functions for entity types (SBOMs, Packages, Vulnerabilities, Advisories)
 * These functions contain domain-specific logic for working with different entity types
 */

/**
 * Returns table column information based on entity type
 * @param type Category of the data (e.g., "SBOMs", "Packages", "Vulnerabilities", "Advisories")
 * @returns Object containing columnKey and columnName for the entity type
 */
export function getTableInfo(type: string): {
  columnKey: string;
  columnName: string;
} {
  switch (type) {
    case "SBOMs":
    case "SBOM":
      return { columnKey: "name", columnName: "Name" };
    case "Advisories":
    case "Advisory":
      return { columnKey: "identifier", columnName: "ID" };
    case "Vulnerabilities":
    case "CVE":
      return { columnKey: "identifier", columnName: "ID" };
    case "Packages":
    case "Package":
      return { columnKey: "name", columnName: "Name" };
    default:
      throw new Error(`Unknown type: ${type}`);
  }
}

/**
 * Returns sortable column names for a given entity type
 * @param type Category of the data (e.g., "SBOMs", "Packages", "Vulnerabilities", "Advisories")
 * @returns Array of sortable column names for the entity type
 */
export function getSortableColumns(type: string): string[] {
  switch (type) {
    case "Vulnerabilities":
      return ["ID", "CVSS", "Published"];
    case "Advisories":
      return ["ID", "Revision"];
    case "Packages":
      return ["Name", "Namespace", "Version"];
    case "SBOMs":
      return ["Name", "Created on"];
    default:
      throw new Error(`Unknown type: ${type}`);
  }
}

/**
 * Converts plural entity type to singular form
 * @param pluralType Plural entity type (e.g., "SBOMs", "Packages", "Vulnerabilities", "Advisories")
 * @returns Singular form of the entity type
 */
export function toSingular(pluralType: string): string {
  switch (pluralType) {
    case "SBOMs":
      return "SBOM";
    case "Packages":
      return "Package";
    case "Vulnerabilities":
      return "CVE";
    case "Advisories":
      return "Advisory";
    default:
      throw new Error(`Unknown plural type: ${pluralType}`);
  }
}

/**
 * Returns the default sort configuration for a given entity type
 * @param type Category of the data (e.g., "SBOMs", "Packages", "Vulnerabilities", "Advisories")
 * @returns Object containing the default sort column name and direction
 */
export function getDefaultSort(type: string): {
  column: string;
  direction: "ascending" | "descending";
} {
  switch (type) {
    case "SBOMs":
      return { column: "Name", direction: "ascending" };
    case "Packages":
      return { column: "Name", direction: "ascending" };
    case "Vulnerabilities":
      return { column: "Published", direction: "descending" };
    case "Advisories":
      return { column: "Revision", direction: "descending" };
    default:
      throw new Error(`Unknown type: ${type}`);
  }
}
