import React from "react";

import { Button, type ButtonProps } from "@patternfly/react-core";

import { ReadOnlyContext } from "./ReadOnlyContext";

export const ReadOnlyButton: React.FC<ButtonProps> = (props) => {
  const { areMutationsDisabled } = React.useContext(ReadOnlyContext);

  return <Button {...props} isDisabled={areMutationsDisabled} />;
};
