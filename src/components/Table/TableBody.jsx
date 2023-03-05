import React from "react";

const TableBody = ({ rows, children }) => {
  return <tbody>{rows?.map((row) => children(row))}</tbody>;
};

export default TableBody;
