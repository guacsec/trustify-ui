import { useCallback, useEffect, useRef, useState } from "react";

import { client } from "@app/axios-config/apiInit";
import { getSbom, listPackages, recommend } from "@app/client";
import type { RecommendEntry } from "@app/client";

const BATCH_SIZE = 100;
const MAX_CONCURRENCY = 2;

export interface SbomResult {
  sbomId: string;
  sbomName: string;
  addressablePackages: number;
}

export interface PackageResult {
  packageName: string;
  version: string;
  recommendedPackage: string;
  foundIn: string[];
  vulnerabilities: string[];
}

interface BatchedRecommendationsState {
  progress: number;
  totalSteps: number;
  isLoading: boolean;
  isComplete: boolean;
  error: string | null;
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
    sbomResults: [],
    packageResults: [],
  });

  const abortRef = useRef<AbortController | null>(null);

  const run = useCallback(async () => {
    if (sbomIds.length === 0) return;

    abortRef.current?.abort();
    const abort = new AbortController();
    abortRef.current = abort;

    setState((s) => ({
      ...s,
      isLoading: true,
      isComplete: false,
      progress: 0,
      error: null,
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

        // Fetch all packages (paginate to get all)
        const pkgRes = await listPackages({
          client,
          path: { id: sbomId },
          query: { limit: 10000 },
        });

        const purls: string[] = (pkgRes.data?.items ?? [])
          .map((p) => p.purl)
          .filter((p): p is string => !!p);

        sbomData.push({ id: sbomId, name: sbomName, purls });

        setState((s) => ({
          ...s,
          progress: s.progress + 1,
        }));
      }

      // Calculate total steps
      const batchCounts = sbomData.map((s) =>
        Math.ceil(s.purls.length / BATCH_SIZE),
      );
      const totalBatches = batchCounts.reduce((a, b) => a + b, 0);
      const totalSteps = sbomIds.length + totalBatches;

      setState((s) => ({ ...s, totalSteps }));

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

      // Per-SBOM addressable package tracking
      const sbomAddressable = new Map<string, Set<string>>();
      // Global package dedup
      const packageMap = new Map<string, PackageResult>();

      // Process batches with concurrency limit
      let batchIndex = 0;
      const processBatch = async () => {
        while (batchIndex < allBatches.length) {
          if (abort.signal.aborted) return;
          const idx = batchIndex++;
          const batch = allBatches[idx];

          const res = await recommend({
            client,
            body: { purls: batch.purls },
          });

          const recs = res.data?.recommendations ?? {};
          for (const [purl, entries] of Object.entries(recs)) {
            if (entries.length === 0) continue;

            for (const entry of entries) {
              const key = `${purl}|${entry.package}`;

              if (!sbomAddressable.has(batch.sbomId)) {
                sbomAddressable.set(batch.sbomId, new Set());
              }
              sbomAddressable.get(batch.sbomId)!.add(purl);

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
                const purlParts = purl.split("@");
                const name =
                  purlParts[0]
                    ?.replace(/^pkg:[^/]+\//, "")
                    ?.split("/")
                    .pop() ?? purl;
                const version = purlParts[1] ?? "";

                packageMap.set(key, {
                  packageName: name,
                  version,
                  recommendedPackage: entry.package,
                  foundIn: [batch.sbomName],
                  vulnerabilities: entry.vulnerabilities.map((v) => v.id),
                });
              }
            }
          }

          setState((s) => ({
            ...s,
            progress: s.progress + 1,
          }));
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
      }));

      const packageResults = Array.from(packageMap.values());

      setState({
        progress: totalSteps,
        totalSteps,
        isLoading: false,
        isComplete: true,
        error: null,
        sbomResults,
        packageResults,
      });
    } catch (e) {
      if (!abort.signal.aborted) {
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
