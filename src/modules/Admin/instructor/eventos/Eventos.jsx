import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  BreadcrumbItem,
  Breadcrumbs,
} from "@nextui-org/react";
import { SearchIcon } from "@/modules/Admin/components/SearchIcon";
import { ChevronDownIcon } from "@/modules/Admin/components/ChevronDownIcon";
import { columns, INITIAL_VISIBLE_COLUMNS, statusOptions } from "./utils.js";
import { capitalize } from "../../utils/utils";
import { VerticalDotsIcon } from "../../components/VerticalDotsIcon";
import ModalEventos from "./ModalEventos";
import ModalEventosActualizar from "./ModalEventosActualizar.jsx";
const TableShowData = React.lazy(() =>
  import("./../../components/TableShowData.jsx")
);

export default function Eventos() {
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "status",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  // Show global event
  const [showGlobalEvent, setShowGlobalEvent] = useState([]);

  const getGlobalEvents = useCallback(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/events/global/all`
    );
    const data = await response.json();
    setShowGlobalEvent(data);
  }, []);

  useEffect(() => {
    getGlobalEvents();
  }, [getGlobalEvents]);
  //

  // actualizar modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idEvent, setIdEvent] = useState("");
  //

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredEvents = [...showGlobalEvent];

    if (hasSearchFilter) {
      filteredEvents = filteredEvents.filter(
        (event) =>
          event.user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          event.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          (event.space &&
            event.space.toLowerCase().includes(filterValue.toLowerCase()))
      );
    }

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredEvents = filteredEvents.filter((event) =>
        Array.from(statusFilter).includes(event.status)
      );
    }

    return filteredEvents;
  }, [filterValue, statusFilter, hasSearchFilter, showGlobalEvent]);

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

  const renderCell = React.useCallback((event, columnKey) => {
    const cellValue = event[columnKey];

    switch (columnKey) {
      case "id_host_user":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{event.id_user}</p>
          </div>
        );
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{event.name}</p>
          </div>
        );
      case "details":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{event.details}</p>
          </div>
        );
      case "status":
        return (
          <div className="flex flex-col">
            <p
              className={`text-bold text-small text-center rounded-lg capitalize ${
                event.status === "Pendiente"
                  ? "bg-warning-100 text-warning"
                  : event.status === "Rechazado"
                  ? "bg-danger-100 text-danger"
                  : "bg-success "
              }`}
            >
              {event.status}
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
                <DropdownItem>
                  <Button
                    className="bg-primary hover:bg-primary/100 text-white"
                    onClick={() => {
                      setIsModalOpen(true);
                      setIdEvent(event.id_global_event);
                    }}
                  >
                    Actualizar Evento
                  </Button>
                </DropdownItem>
                <DropdownItem>View</DropdownItem>
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

  const handleStatusSelectionChange = (keys) => {
    const selected = Array.from(keys)[0];
    setStatusFilter(selected || "all");
  };

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
            {/* Modal eventos */}
            <ModalEventos />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total 5 espacios</span>
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
    <main className="flex flex-col gap-2">
      <div>
        <Breadcrumbs>
          <BreadcrumbItem href=""> </BreadcrumbItem>
          <BreadcrumbItem href="/admin/instructor/espacios">
            Eventos
          </BreadcrumbItem>
        </Breadcrumbs>
        <ModalEventosActualizar
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          idEvent={idEvent}
        />
      </div>
      {/* table */}
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
        id="id_global_event"
        aria="Table to show the data of global events"
      />
    </main>
  );
}
