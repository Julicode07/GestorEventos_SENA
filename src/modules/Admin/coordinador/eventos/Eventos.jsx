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
  Tooltip,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Breadcrumbs,
  BreadcrumbItem,
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
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "status",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

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
                href={`/admin/coordinador/eventos/${event.id}`}
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
            placeholder="Buscar usuario, evento o espacio..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="hidden sm:flex items-center gap-3">
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
          </div>
        </div>
        <div className="flex justify-between items-center gap-2">
          <span className="text-default-400 text-small">
            Total {filteredItems.length} resultados
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
  }, [filterValue, statusFilter, visibleColumns, rowsPerPage]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-center items-center border-t border-divider">
        <Pagination
          showControls
          isCompact
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
          <BreadcrumbItem href="/admin/coordinador/eventos">
            Eventos
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <section>
        <Table
          aria-label="Tabla de eventos"
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
            emptyContent={"No hay eventos para mostrar"}
            items={sortedItems}
          >
            {(event) => (
              <TableRow>
                {(columnKey) => (
                  <TableCell
                    className={
                      event.type === "globalEvent" ? "bg-gray-100" : "bg-white"
                    }
                  >
                    {renderCell(event, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
