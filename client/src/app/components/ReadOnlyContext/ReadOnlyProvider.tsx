import React from "react";

import { useFetchTrustifyInfo } from "@app/queries/trustifyInfo";

import { ReadOnlyContext } from "./ReadOnlyContext";

interface IReadOnlyProvider {
  children: React.ReactNode;
}

/** Provides the server's read-only mode flag to the component tree. */
export const ReadOnlyProvider: React.FunctionComponent<IReadOnlyProvider> = ({
  children,
}) => {
  const { data: trustifyInfo, isLoading } = useFetchTrustifyInfo();
  const isReadOnly = trustifyInfo?.readOnly ?? false;
  const areMutationsDisabled = isLoading || isReadOnly;

  return (
    <ReadOnlyContext.Provider value={{ isLoading, areMutationsDisabled }}>
      {children}
    </ReadOnlyContext.Provider>
  );
};
