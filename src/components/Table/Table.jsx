import TableView from "./TableView";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Row from "./Row";
import Column from "./Column";

import { Input } from "../common";

const Table = ({
  rows,
  columns,
  handleSortBy,
  handleFilters,
  sortAllowList,
  filterAllowList,
  appliedFilters,
  appliedSorting,
}) => {
  return (
    <TableView>
      <TableHeader columns={columns}>
        {(column) => (
          <Column key={column.uid}>
            {handleSortBy && sortAllowList?.includes(column.uid) ? (
              // sorting allowed
              <div
                className="is-clickable"
                // make column name focusable to enable
                // keyboard tab and enter key press
                tabIndex={0}
                onKeyDown={(e) => handleSortBy("onKeyDown", column.uid, e)}
                onClick={() => handleSortBy("onClick", column.uid)}
              >
                {column.name}
                {"* "}
                {appliedSorting && appliedSorting.sortBy === column.uid && ` ${appliedSorting.order}`}
              </div>
            ) : (
              // no sorting allowed
              <>{column.name}</>
            )}
            {handleFilters && appliedFilters && filterAllowList?.includes(column.uid) && (
              <div>
                <Input onChange={(e) => handleFilters(e)} value={appliedFilters[column.uid]} uid={column.uid} />
              </div>
            )}
          </Column>
        )}
      </TableHeader>
      <TableBody rows={rows}>{(row) => <Row key={row.id}>{(key) => row[key]}</Row>}</TableBody>
    </TableView>
  );
};

export default Table;
