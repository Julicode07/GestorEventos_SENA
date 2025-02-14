import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { memo } from "react";

const TableShowData = memo(
  ({
    aria,
    sortDescriptor,
    setSortDescriptor,
    topContent,
    selectedKeys,
    bottomContent,
    columns,
    items,
    emptyContent,
    setSelectedKeys,
    renderCell,
    id,
  }) => {
    return (
      <Table
        aria-label={aria}
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        topContent={topContent}
        selectedKeys={selectedKeys}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items} emptyContent={emptyContent}>
          {(item) => (
            <TableRow key={item[id]} >
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}

        </TableBody>
      </Table>
    );
  }
);

TableShowData.displayName = "TableShowData";

TableShowData.propTypes = {
  aria: PropTypes.string,
  sortDescriptor: PropTypes.object,
  setSortDescriptor: PropTypes.func,
  topContent: PropTypes.object,
  selectedKeys: PropTypes.object,
  bottomContent: PropTypes.object,
  columns: PropTypes.arrayOf(PropTypes.object),
  items: PropTypes.array,
  setSelectedKeys: PropTypes.func,
  renderCell: PropTypes.elementType,
  emptyContent: PropTypes.elementType,
  id: PropTypes.string,
};

export default TableShowData;
