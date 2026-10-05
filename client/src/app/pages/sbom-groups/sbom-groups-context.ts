import React from "react";

import type { AxiosError } from "axios";

import type { Group, PaginatedResultsGroupDetails } from "@app/client";
import type { ITableControls } from "@app/hooks/table-controls";

export type SbomGroupItem = PaginatedResultsGroupDetails["items"][number];

interface ITreeExpansionState {
  isNodeExpanded: (node: SbomGroupItem) => boolean;
  toggleExpandedNodes: (node: SbomGroupItem) => void;
}

interface ISbomGroupsContext {
  tableControls: ITableControls<SbomGroupItem, "name", "name", "", string>;

  totalItemCount: number;
  isFetching: boolean;
  fetchError: AxiosError | null;

  treeExpansion: ITreeExpansionState;

  // Group Form Modal
  groupCreateUpdateModalState: "create" | Group | null;
  setGroupCreateUpdateModalState: (value: "create" | Group | null) => void;
}

const contextDefaultValue = {} as ISbomGroupsContext;

export const SbomGroupsContext =
  React.createContext<ISbomGroupsContext>(contextDefaultValue);
