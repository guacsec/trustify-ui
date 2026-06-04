import React from "react";

import type { CommonSecurityAdvisoryFramework } from "@app/specs/csaf/csaf-v2.0-schema";

import { CsafContext, type ICsafContextValue } from "./csaf-context";
import { buildProductNameMap, collectProducts } from "./helpers/csaf-utils";

const EMPTY_MAP = new Map<string, string>();

interface ICsafProviderProps {
  csaf: CommonSecurityAdvisoryFramework | null;
  children: React.ReactNode;
}

export const CsafProvider: React.FC<ICsafProviderProps> = ({
  csaf,
  children,
}) => {
  const value = React.useMemo<ICsafContextValue>(() => {
    const products = collectProducts(csaf?.product_tree?.branches || []);
    const productNameMap = csaf ? buildProductNameMap(csaf) : EMPTY_MAP;

    return {
      csaf,
      productNameMap,
      products,
    };
  }, [csaf]);

  return <CsafContext.Provider value={value}>{children}</CsafContext.Provider>;
};
