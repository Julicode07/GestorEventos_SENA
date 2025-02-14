import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { columns, INITIAL_VISIBLE_COLUMNS, capitalize } from "./utils/utils";
const BottomContent = React.lazy(() =>
  import("./../../components/BottonContent")
);
const TopContent = React.lazy(() => import("./../../components/TopContent"));

export default function App() {
  const { id } = useParams();
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  //get inventory
  const [inventory, setInventory] = useState([]);

  const getInventory = useCallback(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/inventory/space/${id}`
    );
    const data = await response.json();
    setInventory(data);
  }, [id]);

  useEffect(() => {
    getInventory();
  }, [getInventory]);

  //

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...inventory];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredUsers;
  }, [filterValue, hasSearchFilter, inventory]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  //Top content
  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);
  //

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case user.name:
        return (
          <div className="relative flex justify-end items-center gap-2">
            <p>{user[columnKey]}</p>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <main className="flex flex-col gap-2">
      <div>
        <Breadcrumbs>
          <BreadcrumbItem href="/admin/instructor/espacios">
            Espacios
          </BreadcrumbItem>
          <BreadcrumbItem href="/admin/instructor/inventario/espacio/1">
            Inventario del espacio {id}
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <section>
        <Table
          isHeaderSticky
          aria-label="Example table with custom cells, pagination and sorting"
          bottomContent={
            <BottomContent page={page} pages={pages} setPage={setPage} />
          }
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[382px]",
          }}
          sortDescriptor={sortDescriptor}
          topContent={
            <TopContent
              filterValue={filterValue}
              onClear={onClear}
              onRowsPerPageChange={onRowsPerPageChange}
              onSearchChange={onSearchChange}
              rowsPerPage={rowsPerPage}
              visibleColumns={visibleColumns}
              module={inventory}
              setVisibleColumns={setVisibleColumns}
              columns={columns}
              capitalize={capitalize}
            />
          }
          topContentPlacement="outside"
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={headerColumns}>
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
          <TableBody emptyContent={"No se encontraron inventarios"} items={sortedItems}>
            {(item) => (
              <TableRow key={item.id_inventory}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
