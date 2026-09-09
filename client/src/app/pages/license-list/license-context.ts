import React from "react";

import type { AxiosError } from "axios";

import type { LicenseText } from "@app/client";
import type { ITableControls } from "@app/hooks/table-controls";

interface ILicenseSearchContext {
  tableControls: ITableControls<
    LicenseText,
    "name" | "packages" | "sboms",
    "name",
    "" | "packages" | "sboms",
    string
  >;

  totalItemCount: number;
  isFetching: boolean;
  fetchError: AxiosError | null;
}

const contextDefaultValue = {} as ILicenseSearchContext;

export const LicenseSearchContext =
  React.createContext<ILicenseSearchContext>(contextDefaultValue);
