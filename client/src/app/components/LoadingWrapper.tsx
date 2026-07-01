import type React from "react";

import type { AxiosError } from "axios";

import { Bullseye, Spinner } from "@patternfly/react-core";

import { StateError } from "./StateError";

export const LoadingWrapper = <T extends Error = AxiosError>(props: {
  isFetching: boolean;
  fetchError?: T | null;
  isFetchingState?: React.ReactNode;
  fetchErrorState?: (error: T) => React.ReactNode;
  children: React.ReactNode;
}) => {
  if (props.isFetching) {
    return (
      props.isFetchingState || (
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
      <StateError />
    );
  }
  return props.children;
};
