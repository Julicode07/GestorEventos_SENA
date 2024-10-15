import React, { useState } from "react";
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
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from "@nextui-org/react";
import { SearchIcon } from "@/modules/Admin/components/SearchIcon";
import { ChevronDownIcon } from "@/modules/Admin/components/ChevronDownIcon";
import { columns, events, statusOptions } from "@modules/Admin/utils/data";
import { EyeIcon } from "@/modules/Admin/components/EyeIcon";

const statusColorMap = {
  Aceptado: "success",
  Pendiente: "warning",
  Rechazado: "secondary",
  Finalizado: "danger",
};

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "event",
  "startDate",
  "endDate",
  "status",
  "actions",
];

export default function Eventos() {
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "status",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredEvents = [...events];

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
  }, [events, filterValue, statusFilter]);

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
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: event.user.avatar }}
            name={event.user.name}
            description={event.user.email}
          ></User>
        );
      case "event":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{event.name}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[event.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Tooltip
              content="Ver información"
              className="bg-secondary text-white"
            >
              <Button
                href={`/admin/instructor/eventos/${event.id}`}
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
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar usuario, evento o espacio..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="hidden sm:flex items-center gap-2 md:gap-3">
            <span className="font-bold text-default-800">Filtros:</span>
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
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
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
                  <DropdownItem key={column.uid}>{column.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            {/* Modal to create event */}
            <Button
              className="bg-primary hover:bg-primary/100 text-white"
              onClick={() => setIsModalOpen(true)}
            >
              Crear Evento
            </Button>

            {isModalOpen && (
              <>
                <div
                  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) {
                      setIsModalOpen(false);
                    }
                  }}
                >
                  <div className="relative p-4 w-full max-w-2xl z-50">
                    <div className="relative bg-white rounded-lg shadow">
                      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                        <h3 className="text-3xl font-semibold text-gray-900">
                          Crear evento
                        </h3>
                        <button
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                          onClick={() => setIsModalOpen(false)}
                        >
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 6 6m0 0 6-6M7 7l6 6m-6-6-6 6"
                            />
                          </svg>
                          <span className="sr-only">Cerrar modal</span>
                        </button>
                      </div>

                      <div className="p-4 md:p-5">
                        <form className="space-y-4" action="#">
                          <div>
                            <label className="block mb-2 text-lg font-bold text-gray-900 ">
                              Nombre del Evento
                            </label>
                            <input
                              type="text"
                              name="nameEvent"
                              id="nameEvent"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5 outline-none"
                              placeholder="Semana del instructor"
                              required
                            />
                          </div>
                          <div>
                            <label className="block mb-2 text-lg font-bold text-gray-900">
                              Descripción del evento
                            </label>
                            <textarea
                              name="description"
                              id="description"
                              placeholder="Escribe la descripción del evento"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5 outline-none"
                              required
                              rows="4"
                            ></textarea>
                          </div>
                        </form>
                      </div>

                      <div className="flex items-center justify-center p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b">
                        <button
                          type="button"
                          className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 "
                          onClick={() => setIsModalOpen(false)}
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          className="text-white bg-primary hover:bg-primary/90 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                          onClick={() => setIsModalOpen(false)}
                        >
                          Crear Evento
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    onClear,
    statusFilter,
    visibleColumns,
    isModalOpen,
  ]);

  return (
    <>
      {topContent}
      <Table
        aria-label="Example table with dynamic content"
        className="mt-4 min-w-full"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        pagination={{
          rowsPerPage,
          page,
          onRowsPerPageChange,
          onPageChange: setPage,
        }}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              allowsSorting={column.sortable}
              isHidden={column.uid === "actions"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="mt-4 flex justify-center">
        <Pagination
          total={pages}
          page={page}
          onChange={(newPage) => setPage(newPage)}
        />
      </div>
    </>
  );
}
