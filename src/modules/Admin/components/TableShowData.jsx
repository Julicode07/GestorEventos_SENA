import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const TableShowData = ({
  aria,
  sortDescriptor,
  setSortDescriptor,
  onSortChange,
  topContent,
  selectedKeys,
  topContentPlacement,
  onSelectionChange,
  bottomContent,
  bottomContentPlacement,
  columns,
  items,
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
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item[id]}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TableShowData;
