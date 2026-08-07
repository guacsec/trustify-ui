import { useCallback, useEffect, useRef, useState } from "react";

import { client } from "@app/axios-config/apiInit";
import { getSbom, listPackages, recommend } from "@app/client";
import type { RecommendEntry } from "@app/client";

const BATCH_SIZE = 100;
const MAX_CONCURRENCY = 2;

const extractVersion = (purl: string): string => {
  const afterAt = purl.split("@")[1] ?? "";
  return afterAt.split("?")[0] ?? "";
};

const extractName = (purl: string): string => {
  return (
    purl
      .split("@")[0]
      ?.replace(/^pkg:[^/]+\//, "")
      ?.split("/")
      .pop() ?? purl
  );
};

export interface SbomResult {
  sbomId: string;
  sbomName: string;
  addressablePackages: number;
  vulnerabilityCount: number;
}

export interface PackageResult {
  packageName: string;
  version: string;
  recommendedVersion: string;
  foundIn: string[];
  vulnerabilities: string[];
}

interface BatchedRecommendationsState {
  progress: number;
  totalSteps: number;
  isLoading: boolean;
  isComplete: boolean;
  error: string | null;
  warnings: string[];
  sbomResults: SbomResult[];
  packageResults: PackageResult[];
}

export const useBatchedRecommendations = (sbomIds: string[]) => {
  const [state, setState] = useState<BatchedRecommendationsState>({
    progress: 0,
    totalSteps: 0,
    isLoading: false,
    isComplete: false,
    error: null,
    warnings: [],
    sbomResults: [],
    packageResults: [],
  });

  const abortRef = useRef<AbortController | null>(null);
  const runCounterRef = useRef(0);

  const run = useCallback(async () => {
    if (sbomIds.length === 0) return;

    abortRef.current?.abort();
    const abort = new AbortController();
    abortRef.current = abort;

    const currentRun = ++runCounterRef.current;
    const isLatestRun = () => runCounterRef.current === currentRun;

    setState((s) => ({
      ...s,
      isLoading: true,
      isComplete: false,
      progress: 0,
      error: null,
      warnings: [],
      sbomResults: [],
      packageResults: [],
    }));

    try {
      // Phase 1: Fetch SBOM metadata and packages
      const sbomData: Array<{
        id: string;
        name: string;
        purls: string[];
      }> = [];

      for (const sbomId of sbomIds) {
        if (abort.signal.aborted) return;

        const sbomRes = await getSbom({
          client,
          path: { id: sbomId },
        });
        const sbomName = sbomRes.data?.name ?? sbomId;

        // Fetch all packages with pagination (backend max_limit: 1000)
        const purls: string[] = [];
        let offset = 0;
        const pageSize = 1000;

        while (true) {
          if (abort.signal.aborted) return;

          const pkgRes = await listPackages({
            client,
            path: { id: sbomId },
            query: { limit: pageSize, offset },
          });

          const items = pkgRes.data?.items ?? [];
          const pagePurls = items
            .flatMap((p) => p.purl)
            .map((ps) => ps.purl)
            .filter((p): p is string => !!p);

          purls.push(...pagePurls);

          if (items.length < pageSize) break;
          offset += pageSize;
        }

        sbomData.push({ id: sbomId, name: sbomName, purls });

        if (isLatestRun()) {
          setState((s) => ({
            ...s,
            progress: s.progress + 1,
          }));
        }
      }

      // Calculate total steps
      const batchCounts = sbomData.map((s) =>
        Math.ceil(s.purls.length / BATCH_SIZE),
      );
      const totalBatches = batchCounts.reduce((a, b) => a + b, 0);
      const totalSteps = sbomIds.length + totalBatches;

      if (isLatestRun()) {
        setState((s) => ({ ...s, totalSteps }));
      }

      // Phase 2: Batch recommend calls with concurrency limit
      // Collect all batches with SBOM context
      const allBatches: Array<{
        sbomId: string;
        sbomName: string;
        purls: string[];
      }> = [];

      for (const sbom of sbomData) {
        for (let i = 0; i < sbom.purls.length; i += BATCH_SIZE) {
          allBatches.push({
            sbomId: sbom.id,
            sbomName: sbom.name,
            purls: sbom.purls.slice(i, i + BATCH_SIZE),
          });
        }
      }

      // Per-SBOM addressable package and CVE tracking
      const sbomAddressable = new Map<string, Set<string>>();
      const sbomVulnerabilities = new Map<string, Set<string>>();
      // Global package dedup
      const packageMap = new Map<string, PackageResult>();
      const batchWarnings: string[] = [];

      // Process batches with concurrency limit
      let batchIndex = 0;
      const processBatch = async () => {
        while (batchIndex < allBatches.length) {
          if (abort.signal.aborted) return;
          const idx = batchIndex++;
          const batch = allBatches[idx];

          try {
            const res = await recommend({
              client,
              body: { purls: batch.purls },
            });

            const recs = res.data?.recommendations ?? {};
            for (const [purl, entries] of Object.entries(recs)) {
              if (entries.length === 0) continue;

              for (const entry of entries) {
                const name = extractName(purl);
                const version = extractVersion(purl);
                const recVersion = extractVersion(entry.package);
                const key = `${name}@${version}|${recVersion}`;

                if (!sbomAddressable.has(batch.sbomId)) {
                  sbomAddressable.set(batch.sbomId, new Set());
                }
                sbomAddressable.get(batch.sbomId)!.add(`${name}@${version}`);

                if (!sbomVulnerabilities.has(batch.sbomId)) {
                  sbomVulnerabilities.set(batch.sbomId, new Set());
                }
                for (const v of entry.vulnerabilities) {
                  sbomVulnerabilities.get(batch.sbomId)!.add(v.id);
                }

                if (packageMap.has(key)) {
                  const existing = packageMap.get(key)!;
                  if (!existing.foundIn.includes(batch.sbomName)) {
                    existing.foundIn.push(batch.sbomName);
                  }
                  for (const v of entry.vulnerabilities) {
                    if (!existing.vulnerabilities.includes(v.id)) {
                      existing.vulnerabilities.push(v.id);
                    }
                  }
                } else {
                  packageMap.set(key, {
                    packageName: name,
                    version,
                    recommendedVersion: recVersion,
                    foundIn: [batch.sbomName],
                    vulnerabilities: entry.vulnerabilities.map((v) => v.id),
                  });
                }
              }
            }
          } catch (e) {
            const errMsg = e instanceof Error ? e.message : String(e);
            batchWarnings.push(
              `Failed to fetch recommendations for batch ${idx + 1} (SBOM: ${batch.sbomName}): ${errMsg}`,
            );
          }

          if (isLatestRun()) {
            setState((s) => ({
              ...s,
              progress: s.progress + 1,
            }));
          }
        }
      };

      // Launch workers up to MAX_CONCURRENCY
      const workers = Array.from(
        { length: Math.min(MAX_CONCURRENCY, allBatches.length) },
        () => processBatch(),
      );
      await Promise.all(workers);

      if (abort.signal.aborted) return;

      // Build final results
      const sbomResults: SbomResult[] = sbomData.map((s) => ({
        sbomId: s.id,
        sbomName: s.name,
        addressablePackages: sbomAddressable.get(s.id)?.size ?? 0,
        vulnerabilityCount: sbomVulnerabilities.get(s.id)?.size ?? 0,
      }));

      const packageResults = Array.from(packageMap.values());

      if (isLatestRun()) {
        setState({
          progress: totalSteps,
          totalSteps,
          isLoading: false,
          isComplete: true,
          error: null,
          warnings: batchWarnings,
          sbomResults,
          packageResults,
        });
      }
    } catch (e) {
      if (!abort.signal.aborted && isLatestRun()) {
        setState((s) => ({
          ...s,
          isLoading: false,
          error: e instanceof Error ? e.message : String(e),
        }));
      }
    }
  }, [sbomIds]);

  useEffect(() => {
    run();
    return () => abortRef.current?.abort();
  }, [run]);

  const progressPercent =
    state.totalSteps > 0
      ? Math.round((state.progress / state.totalSteps) * 100)
      : 0;

  return { ...state, progressPercent };
};
