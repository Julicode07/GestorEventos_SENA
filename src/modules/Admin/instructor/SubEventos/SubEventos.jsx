import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "@modules/Admin/components/VerticalDotsIcon";
import { SearchIcon } from "@modules/Admin/components/SearchIcon";
import { ChevronDownIcon } from "@modules/Admin/components/ChevronDownIcon";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

export const columns = [
  { name: "ID", uid: "id_sub_event", sortable: true },
  { name: "ESPACIO GLOBAL", uid: "global_event_name", sortable: true },
  { name: "NOMBRE", uid: "name" },
  { name: "SEDE", uid: "headquarters", sortable: true },
  { name: "FECHA DE INICIO", uid: "start_date", sortable: true },
  { name: "FECHA DE FIN", uid: "end_date", sortable: true },
  { name: "DESCRIPCIÓN", uid: "description", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const INITIAL_VISIBLE_COLUMNS = [
  "id_sub_event",
  "global_event_name",
  "name",
  "headquarters",
  "start_date",
  "end_date",
  "description",
  "actions",
];

export default function SubEventos() {
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

  //get subevents
  const [subEvents, setSubEvents] = useState([]);

  const getInventory = useCallback(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/subEvents/${id}`
    );
    const data = await response.json();
    setSubEvents(data);
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
    let filteredUsers = [...subEvents];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredUsers;
  }, [filterValue, hasSearchFilter, subEvents]);

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

  const renderCell = React.useCallback((subEvent, columnKey) => {
    const cellValue = subEvent[columnKey];

    switch (columnKey) {
      case "id_sub_event":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {subEvent.id_sub_event}
            </p>
          </div>
        );
      case "global_event_name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {subEvent.global_event_name}
            </p>
          </div>
        );
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{subEvent.name}</p>
          </div>
        );
      case "hearquarters":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {subEvent.hearquarters}
            </p>
          </div>
        );
      case "start_date":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {dayjs(subEvent.start_date).format("YYYY-MM-DD HH:mm:ss")}
            </p>
          </div>
        );
      case "end_date":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {dayjs(subEvent.end_date).format("YYYY-MM-DD HH:mm:ss")}
            </p>
          </div>
        );
      case "description":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {subEvent.description}
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="view">View</DropdownItem>
                <DropdownItem key="edit">Edit</DropdownItem>
                <DropdownItem key="delete">Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {subEvents.length} resultados
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
  }, [
    filterValue,
    onClear,
    onRowsPerPageChange,
    onSearchChange,
    rowsPerPage,
    visibleColumns,
    subEvents.length,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-0 px-2 flex justify-center items-center">
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
  }, [page, pages]);

  return (
    <main className="flex flex-col gap-2">
      <div>
        <Breadcrumbs>
          <BreadcrumbItem href="/admin/instructor/eventos">
            Eventos
          </BreadcrumbItem>
          <BreadcrumbItem href={`/admin/instructor/subeventos/${id}`}>
            SubEvento
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <section>
        <Table
          isHeaderSticky
          aria-label="Example table with custom cells, pagination and sorting"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[382px]",
          }}
          sortDescriptor={sortDescriptor}
          topContent={topContent}
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
          <TableBody
            emptyContent={"Este evento no tiene subeventos"}
            items={sortedItems}
          >
            {(item) => (
              <TableRow key={item.id_sub_event}>
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
