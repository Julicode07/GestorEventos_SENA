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
  Pagination,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { PlusIcon } from "@modules/Admin/components/PlusIcon";
import { VerticalDotsIcon } from "@modules/Admin/components/VerticalDotsIcon";
import { SearchIcon } from "@modules/Admin/components/SearchIcon";
import { ChevronDownIcon } from "@modules/Admin/components/ChevronDownIcon";
import ModalInventario from "./ModalInventario";

export const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "DESCRIPCION", uid: "description" },
  { name: "CANTIDAD", uid: "quantity", sortable: true },
  { name: "TIPO", uid: "type", sortable: true },
  { name: "ID_ESPACIO", uid: "space_id", sortable: true },
  { name: "NOMBRE ESPACIO", uid: "space_name", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const users = [
  {
    id: 1,
    name: "Micrófono",
    description: "Micrófono inalámbrico",
    quantity: 2,
    type: "Sonido",
    space_id: 101,
    space_name: "Auditorio Principal",
  },
  {
    id: 2,
    name: "Proyector",
    description: "Proyector Epson Full HD",
    quantity: 1,
    type: "Proyección",
    space_id: 102,
    space_name: "Salón 10",
  },
  {
    id: 3,
    name: "Silla",
    description: "Silla plástica negra",
    quantity: 50,
    type: "Mobiliario",
    space_id: 103,
    space_name: "Salón de Conferencias",
  },
  {
    id: 4,
    name: "Mesa",
    description: "Mesa rectangular blanca",
    quantity: 10,
    type: "Mobiliario",
    space_id: 104,
    space_name: "Sala de Reuniones",
  },
  {
    id: 5,
    name: "Parlante",
    description: "Parlante JBL 100W",
    quantity: 4,
    type: "Sonido",
    space_id: 105,
    space_name: "Auditorio Principal",
  },
  {
    id: 6,
    name: "Pizarra",
    description: "Pizarra acrílica",
    quantity: 1,
    type: "Escritura",
    space_id: 102,
    space_name: "Salón 10",
  },
  {
    id: 7,
    name: "Computador",
    description: "Laptop Dell i7",
    quantity: 3,
    type: "Tecnología",
    space_id: 106,
    space_name: "Oficina 3",
  },
  {
    id: 8,
    name: "Control Remoto",
    description: "Control para proyector",
    quantity: 2,
    type: "Accesorios",
    space_id: 102,
    space_name: "Salón 10",
  },
  {
    id: 9,
    name: "Micrófono de solapa",
    description: "Micrófono para conferencias",
    quantity: 3,
    type: "Sonido",
    space_id: 105,
    space_name: "Auditorio Principal",
  },
  {
    id: 10,
    name: "Televisor",
    description: "Televisor Samsung 55 pulgadas",
    quantity: 1,
    type: "Proyección",
    space_id: 107,
    space_name: "Sala VIP",
  },
  {
    id: 11,
    name: "Cámara",
    description: "Cámara web Logitech HD",
    quantity: 2,
    type: "Grabación",
    space_id: 106,
    space_name: "Oficina 3",
  },
  {
    id: 12,
    name: "Cargador portátil",
    description: "Cargador universal USB",
    quantity: 5,
    type: "Accesorios",
    space_id: 108,
    space_name: "Bodega 2",
  },
  {
    id: 13,
    name: "Lámpara",
    description: "Lámpara LED de escritorio",
    quantity: 4,
    type: "Iluminación",
    space_id: 106,
    space_name: "Oficina 3",
  },
  {
    id: 14,
    name: "Extensión eléctrica",
    description: "Extensión de 6 tomas",
    quantity: 6,
    type: "Accesorios",
    space_id: 103,
    space_name: "Salón de Conferencias",
  },
  {
    id: 15,
    name: "Atril",
    description: "Atril de madera",
    quantity: 1,
    type: "Mobiliario",
    space_id: 105,
    space_name: "Auditorio Principal",
  },
  {
    id: 16,
    name: "Router",
    description: "Router WiFi TP-Link",
    quantity: 1,
    type: "Tecnología",
    space_id: 108,
    space_name: "Bodega 2",
  },
  {
    id: 17,
    name: "Monitor",
    description: "Monitor LG 24 pulgadas",
    quantity: 3,
    type: "Tecnología",
    space_id: 106,
    space_name: "Oficina 3",
  },
  {
    id: 18,
    name: "Equipo de sonido",
    description: "Sistema de sonido Bose",
    quantity: 1,
    type: "Sonido",
    space_id: 105,
    space_name: "Auditorio Principal",
  },
  {
    id: 19,
    name: "Tóner de impresora",
    description: "Tóner negro HP",
    quantity: 5,
    type: "Accesorios",
    space_id: 109,
    space_name: "Sala de Impresión",
  },
  {
    id: 20,
    name: "Panel LED",
    description: "Panel LED para iluminación",
    quantity: 8,
    type: "Iluminación",
    space_id: 105,
    space_name: "Auditorio Principal",
  },
];

export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "name",
  "description",
  "quantity",
  "type",
  "space_id",
  "space_name",
  "actions",
];

export default function App() {
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
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
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredUsers;
  }, [filterValue, hasSearchFilter]);

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
            <ModalInventario />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} resultados
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
          <BreadcrumbItem href=""> </BreadcrumbItem>
          <BreadcrumbItem href="/admin/coordinador/inventario">
            Inventario
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
          <TableBody emptyContent={"No users found"} items={sortedItems}>
            {(item) => (
              <TableRow key={item.id}>
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
