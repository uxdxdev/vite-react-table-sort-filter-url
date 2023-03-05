import { useEffect, useState } from "react";

const useUrlFilterSort = (urlMappingConfig) => {
  const [urlFilterSortMap, setUrlFilterSortMap] = useState(urlMappingConfig);

  // set filters and sorting on page initial load or refresh
  useEffect(() => {
    const url = new URL(window.location);
    const reducedFilters = Object.keys(urlFilterSortMap).reduce((acc, cur) => {
      return {
        ...acc,
        [cur]: url.searchParams.get(cur) || urlFilterSortMap[cur] || "",
      };
    }, {});
    setUrlFilterSortMap(reducedFilters);
  }, []);

  // keep URL synced with filters and sorting
  useEffect(() => {
    const url = new URL(window.location);
    Object.entries(urlFilterSortMap).forEach((filter) => {
      const [key, value] = filter;
      url.searchParams.set(key, value);
    });
    window.history.pushState({}, "", url);
  }, [urlFilterSortMap]);

  const updateFilters = ({ id, value }) => {
    setUrlFilterSortMap((current) => ({
      ...current,
      [id]: value.toLowerCase(),
    }));
  };

  const updateSortBy = ({ uid }) => {
    setUrlFilterSortMap((current) => ({
      ...current,
      sortBy: uid,
      // picking a different column will reset order to ASC
      order: current.sortBy !== uid ? "ASC" : current.order === "ASC" ? "DESC" : "ASC",
    }));
  };

  return {
    urlFilterSortMap,
    updateFilters,
    updateSortBy,
  };
};

export default useUrlFilterSort;
