import React from "react";

import {
  type ExtendedSeverity,
  type VulnerabilityStatus,
  extendedSeverityFromSeverity,
} from "@app/api/models";
import type { SbomAdvisory, SbomPackage, SbomStatus } from "@app/client";
import {
  useFetchSbomsAdvisory,
  useFetchSbomsAdvisoryBatch,
} from "@app/queries/sboms";

const areVulnerabilityOfSbomEqual = (
  a: VulnerabilityOfSbom,
  b: VulnerabilityOfSbom | FlatVulnerabilityOfSbom,
) => {
  return (
    a.vulnerability.identifier === b.vulnerability.identifier &&
    a.status === b.status
  );
};

interface FlatVulnerabilityOfSbom {
  vulnerability: SbomStatus;
  status: VulnerabilityStatus;
  advisory: SbomAdvisory;
  packages: SbomPackage[];
}

//

interface VulnerabilityOfSbom {
  vulnerability: SbomStatus;
  status: VulnerabilityStatus;
  advisories: Map<string, SbomAdvisory>;
  packages: Map<string, SbomPackage>;
}

export type SeveritySummary = {
  total: number;
  severities: { [key in ExtendedSeverity]: number };
};

export interface VulnerabilityOfSbomSummary {
  vulnerabilityStatus: {
    [key in VulnerabilityStatus]: SeveritySummary;
  };
}

const DEFAULT_SEVERITY: SeveritySummary = {
  total: 0,
  severities: { unknown: 0, none: 0, low: 0, medium: 0, high: 0, critical: 0 },
};

export const DEFAULT_SUMMARY: VulnerabilityOfSbomSummary = {
  vulnerabilityStatus: {
    affected: { ...DEFAULT_SEVERITY },
    fixed: { ...DEFAULT_SEVERITY },
    not_affected: { ...DEFAULT_SEVERITY },
    known_not_affected: { ...DEFAULT_SEVERITY },
    under_investigation: { ...DEFAULT_SEVERITY },
  },
};

const advisoryToModels = (advisories: SbomAdvisory[]) => {
  const vulnerabilities = advisories
    .flatMap((advisory) => {
      return (advisory.status ?? []).map((sbomStatus) => {
        const result: FlatVulnerabilityOfSbom = {
          vulnerability: sbomStatus,
          status: sbomStatus.status as VulnerabilityStatus,
          advisory,
          packages: sbomStatus.packages,
        };
        return result;
      });
    })
    // group
    .reduce((prev, current) => {
      const existingElement = prev.find((item) => {
        return areVulnerabilityOfSbomEqual(item, current);
      });

      let result: VulnerabilityOfSbom[];

      if (existingElement) {
        const arrayWithoutExistingItem = prev.filter(
          (item) => !areVulnerabilityOfSbomEqual(item, existingElement),
        );

        // new advisories
        const advisories = new Map<string, SbomAdvisory>(
          existingElement.advisories,
        );
        advisories.set(current.advisory.identifier, current.advisory);

        // new packages
        const packages = current.packages.reduce((prev, current) => {
          prev.set(current.id, current);
          return prev;
        }, new Map<string, SbomPackage>(existingElement.packages));

        const updatedItemInArray: VulnerabilityOfSbom = {
          vulnerability: existingElement.vulnerability,
          status: existingElement.status,
          advisories,
          packages,
        };

        result = [...arrayWithoutExistingItem, updatedItemInArray];
      } else {
        // advisories
        const advisories = new Map<string, SbomAdvisory>();
        advisories.set(current.advisory.identifier, current.advisory);

        // packages
        const packages = current.packages.reduce((prev, current) => {
          prev.set(current.id, current);
          return prev;
        }, new Map<string, SbomPackage>());

        const newItemInArray: VulnerabilityOfSbom = {
          vulnerability: current.vulnerability,
          status: current.status,
          advisories,
          packages,
        };
        result = [...prev.slice(), newItemInArray];
      }

      return result;
    }, [] as VulnerabilityOfSbom[]);

  const summary = vulnerabilities.reduce(
    (prev, current) => {
      const vulnStatus = current.status;
      const severity = extendedSeverityFromSeverity(
        current.vulnerability.average_severity,
      );

      const prevVulnStatusValue = prev.vulnerabilityStatus[vulnStatus];

      // biome-ignore lint/performance/noAccumulatingSpread: allowed
      const result: VulnerabilityOfSbomSummary = Object.assign(prev, {
        vulnerabilityStatus: {
          ...prev.vulnerabilityStatus,
          [vulnStatus]: {
            total: prevVulnStatusValue.total + 1,
            severities: {
              ...prevVulnStatusValue.severities,
              [severity]: prevVulnStatusValue.severities[severity] + 1,
            },
          },
        },
      });
      return result;
    },
    { ...DEFAULT_SUMMARY } as VulnerabilityOfSbomSummary,
  );

  return {
    vulnerabilities,
    summary,
  };
};

export const useVulnerabilitiesOfSbom = (sbomId: string) => {
  const {
    advisories,
    isFetching: isFetchingAdvisories,
    fetchError: fetchErrorAdvisories,
  } = useFetchSbomsAdvisory(sbomId);

  const result = React.useMemo(() => {
    return advisoryToModels(advisories || []);
  }, [advisories]);

  return {
    data: result,
    isFetching: isFetchingAdvisories,
    fetchError: fetchErrorAdvisories,
  };
};

export const useVulnerabilitiesOfSboms = (sbomIds: string[]) => {
  const { advisories, isFetching, fetchError } =
    useFetchSbomsAdvisoryBatch(sbomIds);

  const result = React.useMemo(() => {
    return (advisories ?? []).map((item) => {
      return advisoryToModels(item || []);
    });
  }, [advisories]);

  return {
    data: result,
    isFetching: isFetching,
    fetchError: fetchError,
  };
};
