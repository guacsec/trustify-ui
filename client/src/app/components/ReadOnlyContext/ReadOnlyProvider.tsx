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
  const { trustifyInfo, isLoading } = useFetchTrustifyInfo();
  const isReadOnly = isLoading || (trustifyInfo?.readOnly ?? false);

  return (
    <ReadOnlyContext.Provider value={{ isReadOnly, isLoading }}>
      {children}
    </ReadOnlyContext.Provider>
  );
};

