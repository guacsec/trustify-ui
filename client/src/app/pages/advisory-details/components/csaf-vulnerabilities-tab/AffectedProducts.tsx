import React from "react";

import { Label, LabelGroup } from "@patternfly/react-core";

export const AffectedProducts: React.FC<{
  productIds: string[];
  productNameMap: Map<string, string>;
}> = ({ productIds, productNameMap }) => {
  return (
    <LabelGroup numLabels={5}>
      {productIds.map((id) => (
        <Label key={id} variant="outline" color="orange" isCompact>
          {productNameMap.get(id) ?? id}
        </Label>
      ))}
    </LabelGroup>
  );
};
