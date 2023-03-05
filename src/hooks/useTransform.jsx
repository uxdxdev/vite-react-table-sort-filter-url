import { useEffect, useState } from "react";

const useTransform = () => {
  const [transformData, setTransformData] = useState([]);
  const [filterSortConfig, setFilterSortConfig] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    // cut a copy of the tranformed data
    let result = transformData.slice(0);

    const filterConfig = filterSortConfig?.filters;
    if (filterConfig) {
      const filterKeys = filterConfig && Object.keys(filterConfig);
      result = result?.filter((item) => {
        for (const filterKey of filterKeys) {
          if (item[filterKey] && !item[filterKey].toString().toLowerCase().includes(filterConfig[filterKey])) {
            return false;
          }
        }
        return true;
      });
    }

    const sortConfig = filterSortConfig?.sorting;
    if (sortConfig) {
      result = result?.sort((a, b) => {
        const { order, sortBy } = sortConfig;
        let [x, y] = order === "ASC" ? [a, b] : [b, a];
        if (x[sortBy] !== null && x[sortBy] !== undefined && y[sortBy] !== null && y[sortBy] !== undefined) {
          if (typeof x[sortBy] === "number" && typeof y[sortBy] === "number") {
            // number sorting
            return x[sortBy] - y[sortBy];
          } else {
            // string sorting
            return x[sortBy].toString().localeCompare(y[sortBy].toString());
          }
        }
      });
    }

    if (result) {
      setData(result);
    }
  }, [transformData, filterSortConfig]);

  return { data, filterSortConfig, setFilterSortConfig, setTransformData };
};

export default useTransform;
