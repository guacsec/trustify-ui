export const getLicensesUrl = (appName: string) => {
  const baseUrl = Paths.dependencies;
  const filterParams = serializeFilterUrlParams({
    "application.name": [appName],
  });
  const urlParams = trimAndStringifyUrlParams({
    newPrefixedSerializedParams: {
      filters: filterParams.filters,
    },
  });
  return `${baseUrl}?${urlParams}`;
};
