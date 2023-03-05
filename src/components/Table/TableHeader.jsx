import React, { useContext, useEffect } from "react";
import { TableContext } from "./TableContext";

const TableHeader = ({ columns, children }) => {
  const ctx = useContext(TableContext);

  useEffect(() => {
    ctx.setColumns(columns);
  }, []);

  return (
    <thead>
      <tr>{columns?.map((column) => children(column))}</tr>
    </thead>
  );
};

export default TableHeader;
