import React from "react";
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
  Chip,
  User,
  Pagination,
  Textarea,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

import { VerticalDotsIcon } from "../../components/VerticalDotsIcon";
import { SearchIcon } from "../../components/SearchIcon";
import { ChevronDownIcon } from "../../components/ChevronDownIcon";
import { columns, users, statusOptions } from "./data";
import { capitalize } from "../../utils/utils";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

export default function App() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
  }, [filterValue, statusFilter]);

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
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
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
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    setFilterValue(value);
    setPage(1);
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
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
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
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button color="primary" onClick={() => setIsModalOpen(true)}>
              Nuevo Espacio
            </Button>
            {isModalOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 h-screen"
                onClick={() => setIsModalOpen(false)}
              >
                <div
                  className={`bg-white border border-gray-300 shadow-2xl p-8 rounded-2xl w-4/5 max-w-2xl flex flex-col items-center relative transition-transform transform ${
                    isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                  } transition-all duration-300 ease-out`}
                  onClick={(e) => e.stopPropagation()}
                  style={{ maxHeight: "90vh" }}
                >
                  <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path>
                    </svg>
                  </button>

                  <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Añadir un nuevo espacio
                  </h2>

                  <div className="w-full overflow-y-auto max-h-[50vh] px-2">
                    <div className="w-full">
                      <label className="pl-1">
                        Ingrese el nombre del espacio
                      </label>
                      <Input className="w-full mb-4" placeholder="Nombre" />
                    </div>
                    <div className="w-full">
                      <label className="pl-1">Ingrese la capacidad</label>
                      <Input
                        className="w-full mb-4"
                        placeholder="Capacidad"
                        type="number"
                      />
                    </div>
                    <div className="w-full mb-4">
                      <label className="pl-1">
                        Seleccione el tipo de espacio
                      </label>

                      <Select label="Tipo de espacio" className="">
                        <SelectItem key="aula">Aula</SelectItem>
                        <SelectItem key="piso">Piso</SelectItem>
                        <SelectItem key="edificio">Edificio</SelectItem>
                        <SelectItem key="oficina">Oficina</SelectItem>
                      </Select>
                    </div>
                    <div className="w-full mb-4">
                      <label className="pl-1">
                        Seleccione el estado del espacio
                      </label>

                      <Select label="Estado del espacio" className="">
                        <SelectItem key="activo">Activo</SelectItem>
                        <SelectItem key="inactivo">Inactivo</SelectItem>
                      </Select>
                    </div>
                    <div className="w-full">
                      <label className="pl-1">Ingrese las observaciones</label>
                      <Textarea placeholder="Observaciones" className="mb-4" />
                    </div>
                  </div>

                  <Button color="primary" onClick={() => setIsModalOpen(false)}>
                    Crear espacio
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onClear,
    onSearchChange,
    statusFilter,
    statusOptions,
    onRowsPerPageChange,
    users.length,
    setIsModalOpen,
    isModalOpen,
  ]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      topContent={topContent}
      bottomContent={
        <div className="py-2 px-2 flex justify-between items-center">
          <Pagination
            showControls
            isCompact
            page={page}
            onNext={onNextPage}
            onPrevious={onPreviousPage}
            total={pages}
          />
        </div>
      }
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
  );
}
