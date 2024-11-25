import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Tooltip,
  Pagination,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { SearchIcon } from "@/modules/Admin/components/SearchIcon";
import { columns } from "@modules/Admin/utils/data";
import { EyeIcon } from "@/modules/Admin/components/EyeIcon";
import { getAllUsers } from "../../api/getDataToShow";

const INITIAL_VISIBLE_COLUMNS = [
  "id_user",
  "document",
  "name",
  "last_names",
  "email",
  "phone",
  "role",
  "actions",
];

export default function Usuarios() {
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [showUsers, setShowUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "status",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllUsers();
        setShowUsers(data);
      } catch (error) {
        console.error("Whe had an error to show the data", error);
      }
    };
    fetchData();
  }, []);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filterUsers = [...showUsers];

    if (hasSearchFilter) {
      filterUsers = showUsers.filter(
        (user) =>
          user.document.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.last_names.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.email.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.phone.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.role.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filterUsers;
  }, [showUsers, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

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
      case "id_user":
      case "document":
      case "name":
      case "last_names":
      case "email":
      case "phone":
        return <div className="text-small">{cellValue}</div>;
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Tooltip
              content="Ver información"
              className="bg-secondary text-white"
            >
              <Button
                href={`/admin/coordinador/eventos/${user.id}`}
                as="a"
                isIconOnly
                className="bg-green-700 hover:bg-green-800"
              >
                <EyeIcon className="w-6 h-6 text-white " />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

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

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar usuario"
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
        <div className="flex justify-between items-center gap-2">
          <span className="text-default-400 text-small">
            Total {showUsers.length} usuarios
          </span>
          <label className="flex items-center text-default-400 text-small">
            Filas por página:
            <select
              className="max-w-full rounded-lg bg-default-100 text-default-900 text-small font-bold"
              onChange={onRowsPerPageChange}
              value={rowsPerPage}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, visibleColumns, rowsPerPage, showUsers]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center items-center border-t border-divider">
        <Pagination
          showControls
          isCompact
          showShadow
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
        />
      </div>
    );
  }, [page, filteredItems]);

  return (
    <main className="flex flex-col gap-2">
      <div>
        <Breadcrumbs>
          <BreadcrumbItem href=""> </BreadcrumbItem>
          <BreadcrumbItem href="/admin/coordinador/usuarios">
            Usuarios
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <section>
        <Table
          aria-label="Tabla de usuarios"
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          topContentPlacement="outside"
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                allowsSorting={column.sortable}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent={"No hay usuarios para mostrar"}
            items={sortedItems}
          >
            {(user) => (
              <TableRow key={user.id_user}>
                {(columnKey) => (
                  <TableCell>{renderCell(user, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
