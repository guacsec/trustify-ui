import React from "react";

import type { AxiosError } from "axios";

import type { SbomModel } from "@app/client";
import type { ITableControls } from "@app/hooks/table-controls";

interface IModelSearchContext {
  tableControls: ITableControls<
    SbomModel,
    "name" | "suppliedBy" | "licenses" | "sboms",
    "name",
    "",
    string
  >;

  totalItemCount: number;
  isFetching: boolean;
  fetchError: AxiosError | null;
}

const contextDefaultValue = {} as IModelSearchContext;

export const ModelSearchContext =
  React.createContext<IModelSearchContext>(contextDefaultValue);
