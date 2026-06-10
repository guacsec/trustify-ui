import React from "react";

import type { AxiosError } from "axios";

import type { SbomHead, SourceDocument } from "@app/client";
import type { BulkSelectionValues } from "@app/hooks/selection";
import type { ITableControls } from "@app/hooks/table-controls";

interface ISbomSearchContext {
  tableControls: ITableControls<
    SbomHead &
      SourceDocument & {
        described_by: Array<{
          group?: string | null;
          id: string;
          name: string;
          version?: string | null;
        }>;
      },
    | "name"
    | "version"
    | "packages"
    | "published"
    | "supplier"
    | "labels"
    | "type"
    | "vulnerabilities",
    "name" | "published",
    "" | "published" | "labels" | "license",
    string
  >;

  bulkSelection: {
    isEnabled: boolean;
    controls: BulkSelectionValues<
      SbomHead &
        SourceDocument & {
          described_by: Array<{
            group?: string | null;
            id: string;
            name: string;
            version?: string | null;
          }>;
        }
    >;
  };

  totalItemCount: number;
  isFetching: boolean;
  fetchError: AxiosError | null;
}

const contextDefaultValue = {} as ISbomSearchContext;

export const SbomSearchContext =
  React.createContext<ISbomSearchContext>(contextDefaultValue);
