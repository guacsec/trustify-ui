import React from "react";

import { Label, LabelGroup, type LabelProps } from "@patternfly/react-core";

export const AffectedProducts: React.FC<{
  productIds: string[];
  productNameMap: Map<string, string>;
  color?: LabelProps["color"];
}> = ({ productIds, productNameMap, color = "orange" }) => {
  return (
    <LabelGroup numLabels={5}>
      {productIds.map((id) => (
        <Label key={id} variant="outline" color={color} isCompact>
          {productNameMap.get(id) ?? id}
        </Label>
      ))}
    </LabelGroup>
  );
};
