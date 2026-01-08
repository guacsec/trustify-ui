import type { MetaDescriptor } from "react-router-dom";

export type SeoReturn = {
  descriptors: MetaDescriptor[];
};

export const createSeo = (seo: SeoReturn) => {
  return { seo };
};
