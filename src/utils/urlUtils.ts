export const getCurrentSearchParams = () =>
  new URLSearchParams(window.location.search);
export const getSearchParam = (name: string) =>
  getCurrentSearchParams().get(name);

export const appendSearchParamsToCurrent = (params: Record<string, string>) => {
  const currentSearchParams = getCurrentSearchParams();
  const currentSearchParamsObject = {};

  currentSearchParams.forEach((value, key) => {
    currentSearchParamsObject[key] = value;
  });

  const mergedSearchParams = { ...currentSearchParamsObject, ...params };

  return new URLSearchParams(mergedSearchParams);
};
