import React from "react";

import type { AxiosError } from "axios";

import type { ITableControls } from "@app/hooks/table-controls";

/** Context interface for the cryptography algorithm search page. */
export interface ICryptoSearchContext {
  tableControls: ITableControls<
    CryptoAlgorithm,
    | "name"
    | "primitive"
    | "occurrences"
    | "policy"
    | "recommendation"
    | "usage"
    | "packages"
    | "sboms",
    "name",
    "" | "policy",
    string
  >;

  totalItemCount: number;
  isFetching: boolean;
  fetchError: AxiosError | null;
}

/** Shape of a single cryptographic algorithm returned by the API. */
export interface CryptoAlgorithm {
  node_id: string;
  name: string;
  asset_type: string;
  oid: string | null;
  properties: Record<string, unknown>;
  policy_status: PolicyVerdict;
}

/** Policy compliance verdict for a cryptographic algorithm. */
export type PolicyVerdict = "compliant" | "warning" | "non_compliant";

/** Shape of the portfolio-level PQC readiness summary returned by the API. */
export interface CryptoSummary {
  pqcAlgorithms: number;
  classicalAlgorithms: number;
  totalAlgorithms: number;
  pqcSboms: number;
  totalSboms: number;
}

const contextDefaultValue = {} as ICryptoSearchContext;

export const CryptoSearchContext =
  React.createContext<ICryptoSearchContext>(contextDefaultValue);
