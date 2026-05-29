import type React from "react";
import { AdvisorySearchProvider } from "../advisory-list/advisory-provider";
import { PackageSearchProvider } from "../package-list/package-provider";
import { SbomSearchProvider } from "../sbom-list/sbom-provider";
import { VulnerabilitySearchProvider } from "../vulnerability-list/vulnerability-provider";

interface Provider<TProps> {
  Component: React.ComponentType<React.PropsWithChildren<TProps>>;
  props?: Omit<TProps, "children">;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- allowed
function composeProviders<TProviders extends Array<Provider<any>>>(
  providers: TProviders,
): React.ComponentType<React.PropsWithChildren> {
  const ProviderComponent: React.FunctionComponent<React.PropsWithChildren> = ({
    children,
  }) => {
    const initialJSX = <>{children}</>;

    return providers.reduceRight<React.JSX.Element>(
      (prevJSX, { Component: CurrentProvider, props = {} }) => {
        return (
          <CurrentProvider key={prevJSX.key} {...props}>
            {prevJSX}
          </CurrentProvider>
        );
      },
      initialJSX,
    );
  };

  return ProviderComponent;
}

function createProvider<TProps>(
  Component: React.ComponentType<React.PropsWithChildren<TProps>>,
  props?: Omit<TProps, "children">,
): Provider<TProps> {
  return { Component, props };
}

const allSearchProviders = [
  createProvider(SbomSearchProvider, {}),
  createProvider(PackageSearchProvider, {}),
  createProvider(VulnerabilitySearchProvider, {}),
  createProvider(AdvisorySearchProvider, {}),
];

export const SearchProvider = composeProviders(allSearchProviders);
