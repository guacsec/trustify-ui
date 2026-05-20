import React from "react";

interface IReadOnlyContext {
  isReadOnly: boolean;
  isLoading: boolean;
}

export const ReadOnlyContext = React.createContext<IReadOnlyContext>({
  isReadOnly: false,
  isLoading: true,
});
