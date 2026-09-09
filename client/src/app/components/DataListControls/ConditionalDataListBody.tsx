import type React from "react";

import { Bullseye, Spinner } from "@patternfly/react-core";

import { StateError } from "@app/components/StateError";
import { StateNoData } from "@app/components/StateNoData";

export interface IConditionalDataListBodyProps {
  isLoading?: boolean;
  isError?: boolean;
  isNoData?: boolean;
  errorEmptyState?: React.ReactNode;
  noDataEmptyState?: React.ReactNode;
  children: React.ReactNode;
}

export const ConditionalDataListBody: React.FC<
  IConditionalDataListBodyProps
> = ({
  isLoading = false,
  isError = false,
  isNoData = false,
  errorEmptyState = null,
  noDataEmptyState = null,
  children,
}) => (
  <>
    {isLoading ? (
      <Bullseye>
        <Spinner size="xl" />
      </Bullseye>
    ) : isError ? (
      <Bullseye>{errorEmptyState || <StateError />}</Bullseye>
    ) : isNoData ? (
      <Bullseye>{noDataEmptyState || <StateNoData />}</Bullseye>
    ) : (
      children
    )}
  </>
);
