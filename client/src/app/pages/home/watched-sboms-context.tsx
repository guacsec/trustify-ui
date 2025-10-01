import React from "react";

import type { AxiosError } from "axios";

import type { WatchedSboms } from "@app/api/models";
import { NotificationsContext } from "@app/components/NotificationsContext";
import {
  useFetchWatchedSboms,
  useUpdateWatchedSbomsMutation,
} from "@app/queries/dashboard";

interface IWatchedSbomsContext {
  sboms?: WatchedSboms;
  isFetching: boolean;
  fetchError: AxiosError | null;

  patch: (key: string, value: string | null) => void;
}

const contextDefaultValue = {} as IWatchedSbomsContext;

export const WatchedSbomsContext =
  React.createContext<IWatchedSbomsContext>(contextDefaultValue);

interface IWatchedSbomsProvider {
  children: React.ReactNode;
}

export const WatchedSbomsProvider: React.FunctionComponent<
  IWatchedSbomsProvider
> = ({ children }) => {
  const { pushNotification } = React.useContext(NotificationsContext);

  const { sboms, isFetching, fetchError } = useFetchWatchedSboms();

  const onUpdateSuccess = () => {};
  const onUpdateError = (_error: AxiosError) => {
    pushNotification({
      title: "Error while updating the user preferences",
      variant: "danger",
    });
  };

  const { mutate: updateSboms } = useUpdateWatchedSbomsMutation(
    onUpdateSuccess,
    onUpdateError,
  );

  const patch = React.useCallback(
    (key: string, value: string | null) => {
      const newSboms = { ...sboms, [key]: value };
      updateSboms(newSboms as WatchedSboms);
    },
    [sboms, updateSboms],
  );

  return (
    <WatchedSbomsContext.Provider
      value={{
        sboms,
        isFetching,
        fetchError,
        patch,
      }}
    >
      {children}
    </WatchedSbomsContext.Provider>
  );
};
