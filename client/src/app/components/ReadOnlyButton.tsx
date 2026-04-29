import type React from "react";

import { Button, type ButtonProps, Tooltip } from "@patternfly/react-core";

import { READ_ONLY_TOOLTIP, useReadOnlyContext } from "./ReadOnlyContext";

/** Button that is automatically aria-disabled with a tooltip when the instance is in read-only mode. */
export const ReadOnlyButton: React.FC<ButtonProps> = (props) => {
  const { isReadOnly } = useReadOnlyContext();

  if (isReadOnly) {
    return (
      <Tooltip content={READ_ONLY_TOOLTIP}>
        <Button {...props} isAriaDisabled />
      </Tooltip>
    );
  }

  return <Button {...props} />;
};
