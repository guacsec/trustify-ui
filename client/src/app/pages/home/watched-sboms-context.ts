import React from "react";

import type { AxiosError } from "axios";

import type { WatchedSboms } from "@app/api/models";

interface IWatchedSbomsContext {
  sboms?: WatchedSboms;
  isFetching: boolean;
  fetchError: AxiosError | null;
  mutatingKeys: ReadonlySet<string>;
  patch: (key: string, value: string | null) => void;
}

const contextDefaultValue = {} as IWatchedSbomsContext;

export const WatchedSbomsContext =
  React.createContext<IWatchedSbomsContext>(contextDefaultValue);
