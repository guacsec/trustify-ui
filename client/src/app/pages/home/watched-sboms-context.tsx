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
  mutatingKeys: Set<string>;
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
  const [mutatingKeys, setMutatingKeys] = React.useState<Set<string>>(
    new Set(),
  );
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
      setMutatingKeys((prev) => {
        const set = new Set(prev);
        set.add(key);
        return set;
      });
      const newSboms = { ...sboms, [key]: value };
      updateSboms(newSboms as WatchedSboms, {
        onSettled: () => {
          setMutatingKeys((prev) => {
            const set = new Set(prev);
            set.delete(key);
            return set;
          });
        },
      });
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
        mutatingKeys,
      }}
    >
      {children}
    </WatchedSbomsContext.Provider>
  );
};
