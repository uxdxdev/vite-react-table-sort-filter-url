import React, { useState } from "react";
import { TableContext } from "./TableContext";

const TableView = ({ children }) => {
  const [columns, setColumns] = useState([]);
  const value = {
    columns,
    setColumns,
  };
  return (
    <TableContext.Provider value={value}>
      <table className="table is-bordered is-striped is-narrow is-fullwidth">
        {children}
      </table>
    </TableContext.Provider>
  );
};

export default TableView;
