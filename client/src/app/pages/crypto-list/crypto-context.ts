import React from "react";

import type { AxiosError } from "axios";

import type { ITableControls } from "@app/hooks/table-controls";

/** Context interface for the cryptography algorithm search page. */
export interface ICryptoSearchContext {
  tableControls: ITableControls<
    CryptoAlgorithm,
    "name" | "type" | "standard" | "pqcReady",
    "name",
    "",
    string
  >;

  totalItemCount: number;
  isFetching: boolean;
  fetchError: AxiosError | null;
}

/** Shape of a single cryptographic algorithm returned by the API. */
export interface CryptoAlgorithm {
  id: string;
  name: string;
  type: string;
  standard: string;
  pqcReady: boolean;
}

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
