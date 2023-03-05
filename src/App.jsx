import "bulma/css/bulma.min.css";
import "./App.css";

import { Table } from "./components";
import { userIcon } from "./assets";
import { useApp } from "./useApp";

// table configuration based on known data structures
const columns = [
  { uid: "name", name: "Name" },
  { uid: "email", name: "Email" },
  { uid: "birth_date", name: "Age" },
  { uid: "year_of_experience", name: "Years of experience" },
  { uid: "position_applied", name: "Position applied" },
  { uid: "application_date", name: "Date of application" },
  { uid: "status", name: "Status" },
];
const filterAllowList = ["name", "status", "position_applied"];
const sortAllowList = ["position_applied", "year_of_experience", "application_date"];

function App() {
  const { tableData, handleFilters, handleSortBy, filterSortConfig, isLoading } = useApp({
    filterAllowList,
    sortAllowList,
  });

  return (
    <div className="table-container">
      <div className="is-flex is-align-items-center p-3">
        <img src={userIcon} width="30px" />
        <h1 className="title ml-2">Applications</h1>
      </div>
      <Table
        rows={tableData}
        columns={columns}
        filterAllowList={filterAllowList}
        handleFilters={handleFilters}
        sortAllowList={sortAllowList}
        handleSortBy={handleSortBy}
        appliedFilters={filterSortConfig.filters}
        appliedSorting={filterSortConfig.sorting}
      />
      {isLoading ? (
        <div className="has-text-centered">Loading table data...</div>
      ) : (
        !isLoading && tableData.length === 0 && <div className="has-text-centered">No table data available</div>
      )}
    </div>
  );
}

export default App;
