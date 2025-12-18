import React from "react";
import { useLoaderData, useLocation, useMatches } from "react-router-dom";

import type { SeoReturn } from "@app/utils/seo";

export const SeoMetadata: React.FC = () => {
  const location = useLocation();
  const matches = useMatches();

  const loaderData = useLoaderData<{ seo: SeoReturn } | undefined>();
  const [currentSeo, setCurrentSeo] = React.useState(loaderData?.seo);

  React.useEffect(() => {
    const match = [...matches].reverse().find((match) => {
      return match.pathname === location.pathname;
    });

    if (
      match?.loaderData &&
      typeof match.loaderData === "object" &&
      "seo" in match.loaderData
    ) {
      setCurrentSeo(match.loaderData.seo as SeoReturn);
    }
  }, [matches, location]);

  return (
    <>
      {currentSeo?.descriptors.map((descriptor, index) => {
        if ("title" in descriptor && typeof descriptor.title === "string") {
          return <title key={descriptor.title}>{descriptor.title}</title>;
        }
        if ("charSet" in descriptor && typeof descriptor.charSet === "string") {
          return <meta key={descriptor.charSet} charSet={descriptor.charSet} />;
        }
        if ("name" in descriptor && typeof descriptor.name === "string") {
          return <meta key={descriptor.name} {...descriptor} />;
        }
        if (
          "property" in descriptor &&
          typeof descriptor.property === "string"
        ) {
          return <meta key={descriptor.property} {...descriptor} />;
        }
        return (
          <meta
            key={`${index}_${Array.from(Object(descriptor).keys()).join("_")}`}
            {...descriptor}
          />
        );
      })}
    </>
  );
};
