import type React from "react";

import { Th } from "@patternfly/react-table";

export interface ITableHeaderContentWithControlsProps {
  numColumnsBeforeData: number;
  numColumnsAfterData: number;
  children: React.ReactNode;
}

export const TableHeaderContentWithControls: React.FC<
  ITableHeaderContentWithControlsProps
> = ({ numColumnsBeforeData, numColumnsAfterData, children }) => (
  <>
    {/* eslint-disable @eslint-react/no-array-index-key -- filler cells with no identity beyond position */}
    {Array(numColumnsBeforeData)
      .fill(null)
      .map((_, i) => (
        <Th screenReaderText={`before-data-${i}`} key={i} />
      ))}
    {children}
    {Array(numColumnsAfterData)
      .fill(null)
      .map((_, i) => (
        <Th screenReaderText={`after-data-${i}`} key={i} />
      ))}
    {/* eslint-enable @eslint-react/no-array-index-key */}
  </>
);
