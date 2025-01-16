import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
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
import { VerticalDotsIcon } from "../../components/VerticalDotsIcon";
import { SearchIcon } from "../../components/SearchIcon";
import { ChevronDownIcon } from "../../components/ChevronDownIcon";
import { columns, INITIAL_VISIBLE_COLUMNS, statusOptions } from "./utils";
import { capitalize } from "../../utils/utils";
import ModalInventario from "../inventario/ModalInventario.jsx";
import { Link } from "react-router-dom";
import ModalEspaciosActualizar from "./ModalEspaciosActualizar.jsx";
const ModalEspacios = React.lazy(() => import("./ModalEspacios.jsx"));
const TableShowData = React.lazy(() =>
  import("./../../components/TableShowData.jsx")
);

export default function App() {
  const [showSpaces, setShowSpaces] = useState([]);

  const getAllSpaces = useCallback(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/spaces/all`
    );
    const data = await response.json();
    return data;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllSpaces();
      setShowSpaces(data);
    };
    fetchData();
  }, [getAllSpaces]);

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    if (!Array.isArray(showSpaces)) {
      return []; // O un valor por defecto que prefieras
    }
    let filterSpaces = [...showSpaces];

    if (hasSearchFilter) {
      filterSpaces = filterSpaces.filter((space) =>
        space.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      filterSpaces = filterSpaces.filter(
        (space) => space.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    return filterSpaces;
  }, [filterValue, statusFilter, showSpaces, hasSearchFilter]);

  const handleStatusSelectionChange = (keys) => {
    const selected = Array.from(keys)[0];
    setStatusFilter(selected || "all");
  };

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((space, columnKey) => {
    const cellValue = space[columnKey];
    switch (columnKey) {
      case "id_space":
        return <div className="text-small">{cellValue}</div>;
      case "name":
        return <div className="text-small">{cellValue}</div>;
      case "capacity":
        return <div className="text-small">{cellValue}</div>;
      case "type":
        return <div className="text-small">{cellValue}</div>;
      case "status":
        return (
          <div
            className={`${
              cellValue === "activo"
                ? "text-green-700 bg-green-200"
                : "text-red-700 bg-red-200"
            } capitalize text-center px-2 py-0.5 text-xs rounded-lg w-fit`}
          >
            {cellValue}
          </div>
        );
      case "details":
        return <div className="text-small">{cellValue}</div>;
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
                <DropdownItem className="text-white bg-secondary">
                  <Link
                    to={`/admin/coordinador/inventario/espacio/${space.id_space}`}
                  >
                    Inventario <i className="ri-list-check"></i>
                  </Link>
                </DropdownItem>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>
                  <ModalEspaciosActualizar />
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    setFilterValue(value);
    setPage(1);
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar espacios"
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
                  Estado
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={true}
                selectedKeys={new Set([statusFilter])}
                selectionMode="single"
                onSelectionChange={handleStatusSelectionChange}
              >
                <DropdownItem key="all" className="capitalize">
                  All
                </DropdownItem>
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <ModalEspacios />
            <ModalInventario />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {showSpaces.length} espacios
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
    showSpaces.length,
    statusFilter,
  ]);

  const bottomContent = useMemo(() => {
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
    <>
      <main className="flex flex-col gap-2">
        <div>
          <Breadcrumbs>
            <BreadcrumbItem href=""> </BreadcrumbItem>
            <BreadcrumbItem href="/admin/coordinador/espacios">
              Espacios
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <section>
          <TableShowData
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
            topContent={topContent}
            selectedKeys={selectedKeys}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            columns={headerColumns}
            items={sortedItems}
            renderCell={renderCell}
            id="id_space"
            aria="Table to show the data of spaces"
          />
        </section>
      </main>
    </>
  );
}
