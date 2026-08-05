import type React from "react";

import { Bullseye, Spinner } from "@patternfly/react-core";
import { DefaultErrorState } from "./DefaultErrorState";

export const LoadingWrapper = <TError = unknown,>(props: {
  isFetching: boolean;
  fetchError?: TError | null;
  isFetchingState?: React.ReactNode;
  fetchErrorState?: (error: TError) => React.ReactNode;
  children: React.ReactNode;
}) => {
  if (props.isFetching) {
    return (
      props.isFetchingState ?? (
        <Bullseye>
          <Spinner />
        </Bullseye>
      )
    );
  }
  if (props.fetchError) {
    return props.fetchErrorState ? (
      props.fetchErrorState(props.fetchError)
    ) : (
      <DefaultErrorState />
    );
  }
  return props.children;
};
