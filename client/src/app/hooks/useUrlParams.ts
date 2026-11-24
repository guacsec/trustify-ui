import React from "react";
import {
  UNSAFE_DataRouterContext,
  useLocation,
  useNavigate,
} from "react-router-dom";

import type { DisallowCharacters } from "@app/utils/type-utils";
import { objectKeys } from "@app/utils/utils";

// useUrlParams is a generic hook similar to React.useState which stores its state in the URL search params string.
// The state is retained on a page reload, when using the browser back/forward buttons, or when bookmarking the page.
// It can be used to store a value of any type (`TDeserializedParams`) in one or more URL params by providing:
// - A list of `keys` you want to use for the URL params (strings with any characters except colon ":")
// - A `serialize` function to convert this type into an object with string values (`TSerializedParams`)
// - A `deserialize` function to convert the serialized object back to your state's type
// - An optional `keyPrefix` to allow for multiple instances using the same keys on the same page.
// The return value is the same [value, setValue] tuple returned by React.useState.

// Note: You do not need to worry about the keyPrefix in your serialize and deserialize functions.
//       The keys of TDeserializedParams and TSerializedParams have the prefixes omitted.
//       Prefixes are only used at the very first/last step when reading/writing from/to the URLSearchParams object.

export type TSerializedParams<TURLParamKey extends string> = Partial<
  Record<TURLParamKey, string | null>
>;

export interface IUseUrlParamsArgs<
  TDeserializedParams,
  TPersistenceKeyPrefix extends string,
  TURLParamKey extends string,
> {
  isEnabled?: boolean;
  persistenceKeyPrefix?: DisallowCharacters<TPersistenceKeyPrefix, ":">;
  keys: DisallowCharacters<TURLParamKey, ":">[];
  defaultValue: TDeserializedParams;
  serialize: (
    params: Partial<TDeserializedParams>,
  ) => TSerializedParams<TURLParamKey>;
  deserialize: (
    serializedParams: TSerializedParams<TURLParamKey>,
  ) => TDeserializedParams;
}

export type TURLParamStateTuple<TDeserializedParams> = [
  TDeserializedParams,
  (newParams: Partial<TDeserializedParams>) => void,
];

export const useUrlParams = <
  TDeserializedParams,
  TKeyPrefix extends string,
  TURLParamKey extends string,
>({
  isEnabled = true,
  persistenceKeyPrefix,
  keys,
  defaultValue,
  serialize,
  deserialize,
}: IUseUrlParamsArgs<
  TDeserializedParams,
  TKeyPrefix,
  TURLParamKey
>): TURLParamStateTuple<TDeserializedParams> => {
  type TPrefixedURLParamKey = TURLParamKey | `${TKeyPrefix}:${TURLParamKey}`;

  const navigate = useNavigate();
  const dataRouter = React.useContext(UNSAFE_DataRouterContext)?.router;

  const withPrefix = (key: TURLParamKey): TPrefixedURLParamKey =>
    persistenceKeyPrefix ? `${persistenceKeyPrefix}:${key}` : key;

  const withPrefixes = (
    serializedParams: TSerializedParams<TURLParamKey>,
  ): TSerializedParams<TPrefixedURLParamKey> =>
    persistenceKeyPrefix
      ? objectKeys(serializedParams).reduce((obj, key) => {
          obj[withPrefix(key)] = serializedParams[key];
          return obj;
        }, {} as TSerializedParams<TPrefixedURLParamKey>)
      : (serializedParams as TSerializedParams<TPrefixedURLParamKey>);

  const setParams = (newParams: Partial<TDeserializedParams>) => {
    if (!isEnabled) return;

    // Data routers commit browser history only after their loaders finish.
    // Read live router state inside the setter so consecutive writers, even
    // from different hook instances before a re-render, merge into the pending URL.
    // Declarative BrowserRouter updates document.location synchronously instead.
    const routerState = dataRouter?.state;
    const currentLocation = routerState?.location ?? document.location;
    const pendingLocation = routerState?.navigation.location;
    // A navigation to another page must not leak its query into this page.
    const { search, hash } =
      pendingLocation?.pathname === currentLocation.pathname
        ? pendingLocation
        : currentLocation;
    const nextSearch = trimAndStringifyUrlParams({
      existingSearchParams: new URLSearchParams(search),
      newPrefixedSerializedParams: withPrefixes(serialize(newParams)),
    });
    // Empty/default writes must not restart a pending navigation unnecessarily.
    if (nextSearch === search.replace(/^\?/, "")) return;

    // Omitting pathname keeps this on the current route without duplicating a basename.
    navigate({ search: nextSearch, hash }, { replace: true });
  };

  // We use useLocation here so we are re-rendering when the params change.
  const urlParams = new URLSearchParams(useLocation().search);
  // We un-prefix the params object here so the deserialize function doesn't have to care about the keyPrefix.

  let allParamsEmpty = true;
  let params: TDeserializedParams = defaultValue;
  if (isEnabled) {
    const serializedParams = keys.reduce((obj, key) => {
      obj[key] = urlParams.get(withPrefix(key));
      return obj;
    }, {} as TSerializedParams<TURLParamKey>);
    allParamsEmpty = keys.every((key) => !serializedParams[key]);
    params = allParamsEmpty ? defaultValue : deserialize(serializedParams);
  }

  React.useEffect(() => {
    if (isEnabled && allParamsEmpty) setParams(defaultValue);
    // Leaving this rule enabled results in a cascade of unnecessary useCallbacks:
  }, [allParamsEmpty, isEnabled]);

  return [params, setParams];
};

export const trimAndStringifyUrlParams = <TPrefixedURLParamKey extends string>({
  existingSearchParams = new URLSearchParams(),
  newPrefixedSerializedParams,
}: {
  existingSearchParams?: URLSearchParams;
  newPrefixedSerializedParams: TSerializedParams<TPrefixedURLParamKey>;
}) => {
  // Start from a copy of the existing params so that unrelated params which are repeated
  // (e.g. `?crypto=AES&crypto=RSA`) keep all of their values.
  const newParams = new URLSearchParams(existingSearchParams);
  for (const key of objectKeys(newPrefixedSerializedParams)) {
    const value = newPrefixedSerializedParams[key];
    // Returning undefined for a property from serialize should result in it being omitted from the partial update.
    if (value === undefined) continue;
    // Returning null for a property from serialize should result in it being removed from the URL.
    if (value === null) {
      newParams.delete(key);
    } else {
      // Replaces all the existing values of this param.
      newParams.set(key, value);
    }
  }
  newParams.sort();
  return newParams.toString();
};
