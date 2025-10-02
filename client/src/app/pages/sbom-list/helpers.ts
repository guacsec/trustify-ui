import type { Path } from "react-router-dom";

import { TablePersistenceKeyPrefixes } from "@app/Constants";
import { serializeFilterUrlParams } from "@app/hooks/table-controls";
import { trimAndStringifyUrlParams } from "@app/hooks/useUrlParams";
import { Paths } from "@app/Routes";

export const getSbomFilteredByLicenseUrl = (
  licenses: string[],
): Pick<Path, "pathname" | "search"> => {
  const prefix = (key: string) => `${TablePersistenceKeyPrefixes.sboms}:${key}`;

  const filterParams = serializeFilterUrlParams({
    license: licenses,
  });

  const params = `${trimAndStringifyUrlParams({
    newPrefixedSerializedParams: {
      [prefix("filters")]: filterParams.filters,
    },
  })}`;

  return {
    pathname: Paths.sboms,
    search: params,
  };
};
