import { useEffect, useState } from "react";

import { api } from "./utils";
import { useUrlFilterSort, useTransform } from "./hooks";

const useApp = ({ filterAllowList, sortAllowList }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { urlFilterSortMap, updateFilters, updateSortBy } = useUrlFilterSort({
    // default filtering
    ...filterAllowList.reduce((acc, cur) => ({ ...acc, [cur]: "" }), {}),
    // default sorting
    sortBy: sortAllowList[0], // position_applied
    order: "ASC",
  });

  // apply filter and sorting
  const { data, setTransformData, filterSortConfig, setFilterSortConfig } = useTransform();

  const [tableData, setTableData] = useState([]);

  // fetch data and convert to format used in useTransform hook
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await api
        .get("/api/candidates")
        .then((res) => {
          if (res.data.error) {
            throw new Error(res.data.error.message);
          }

          // transform data
          let result = res?.data?.data
            // filter out any data that does not have an:
            // - id (need this for React 'key' in table rows)
            ?.filter((item) => item.id)
            .map((entry) => {
              let updatedDate = "";
              if (entry.application_date) {
                // convert date to YYYYMMDD
                let entryArr = entry?.application_date.split("/");
                updatedDate = entryArr[2] + entryArr[0] + entryArr[1];
              }

              const entryObj = {
                ...entry,
                birth_date: new Date().getFullYear() - entry.birth_date?.split("/")[2] || null,
                status: entry.status?.charAt(0).toUpperCase() + entry.status?.slice(1).toLowerCase() || null,
                application_date: updatedDate || null,
              };

              return entryObj;
            });

          setTransformData(result);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          // log error and notify user
          // toast message handler? network issue
          console.error(error);
        });
    };
    fetchData();
  }, []);

  // update filters or sorting config with user input
  useEffect(() => {
    setFilterSortConfig({
      filters: {
        ...filterAllowList.reduce((acc, cur) => ({ ...acc, [cur]: urlFilterSortMap[cur] }), {}),
      },
      sorting: {
        sortBy: urlFilterSortMap.sortBy,
        order: urlFilterSortMap.order,
      },
    });
  }, [urlFilterSortMap]);

  // transform data to display in table
  useEffect(() => {
    let result = data.map((entry) => {
      let formattedDate = "";
      if (entry.application_date) {
        const year = entry.application_date?.substring(0, 4);
        const month = entry.application_date?.substring(4, 6);
        const date = entry.application_date?.substring(6, 8);
        formattedDate = `${month}/${date}/${year}`;
      }
      return {
        ...entry,
        application_date: formattedDate,
      };
    });
    setTableData(result);
  }, [data]);

  const handleFilters = (event) => {
    updateFilters({
      id: event.target.id,
      value: event.target.value,
    });
  };

  const handleSortBy = (eventType, columnId, event) => {
    if (eventType === "onKeyDown") {
      if (event.key === "Enter") {
        updateSortBy({
          uid: columnId,
        });
      }
    }

    if (eventType === "onClick") {
      updateSortBy({
        uid: columnId,
      });
    }
  };

  return {
    tableData,
    filterSortConfig,
    handleFilters,
    handleSortBy,
    isLoading,
  };
};

export { useApp };
