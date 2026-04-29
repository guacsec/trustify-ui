import * as React from "react";

import { useFetchTrustifyInfo } from "@app/queries/trustifyInfo";

interface IReadOnlyContext {
  isReadOnly: boolean;
  isLoading: boolean;
}

const ReadOnlyContext = React.createContext<IReadOnlyContext>({
  isReadOnly: false,
  isLoading: true,
});

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

export const useReadOnlyContext = () => React.useContext(ReadOnlyContext);

export const READ_ONLY_TOOLTIP = "Not available in read-only mode";

/** Returns props that disable an ActionsColumn item when read-only, including a click guard. */
export const readOnlyActionProps = (isReadOnly: boolean) =>
  isReadOnly
    ? {
        isAriaDisabled: true,
        tooltipProps: { content: READ_ONLY_TOOLTIP },
        onClick: () => {},
      }
    : {};
