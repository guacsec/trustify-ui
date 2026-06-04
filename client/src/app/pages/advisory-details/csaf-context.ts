import React from "react";

import type {
  CommonSecurityAdvisoryFramework,
  FullProductName,
} from "@app/specs/csaf/csaf-v2.0-schema";

export interface ICsafContextValue {
  csaf: CommonSecurityAdvisoryFramework | null;
  productNameMap: Map<string, string>;
  products: FullProductName[];
}

export const CsafContext = React.createContext<ICsafContextValue>(
  {} as ICsafContextValue,
);
