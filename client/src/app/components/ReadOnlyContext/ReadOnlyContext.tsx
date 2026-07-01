import React from "react";

interface IReadOnlyContext {
  isLoading: boolean;
  areMutationsDisabled: boolean;
}

export const ReadOnlyContext = React.createContext<IReadOnlyContext>({
  isLoading: true,
  areMutationsDisabled: true,
});
