import React, { useContext } from "react";
import { TableContext } from "./TableContext";

const Row = ({ children }) => {
  const ctx = useContext(TableContext);
  const { columns } = ctx;
  return (
    <tr>
      {columns?.map((column) => (
        <td key={column.uid}>{children(column.uid)}</td>
      ))}
    </tr>
  );
};

export default Row;
