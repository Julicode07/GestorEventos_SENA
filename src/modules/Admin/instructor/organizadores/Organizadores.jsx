import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";

import { VerticalDotsIcon } from "@modules/Admin/components/VerticalDotsIcon";
const ModalOrganizador = React.lazy(() => import("./ModalOrganizador"));
const TopContent = React.lazy(() => import("./../../components/TopContent"));
const BottomContent = React.lazy(() =>
  import("./../../components/BottonContent")
);
const ModalOrganizadoresActualizar = React.lazy(() =>
  import("./ModalOrganizadoresActualizar")
);
import { columns, INITIAL_VISIBLE_COLUMNS, capitalize } from "./utils/utils";

export default function App() {
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
  const [idOrganizer, setIdOrganizer] = useState("");
  const [isOrganizersUpdateModalOpen, setIsOrganizersUpdateModalOpen] =
    useState(false);

  const hasSearchFilter = Boolean(filterValue);

  //Get organizers
  const [getOrganizers, setOrganizers] = useState([]);

  const getData = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/organizers/all`
      );
      const data = await response.json();
      setOrganizers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("No se pudo traer la data", err);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);
  //

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredOrganizers = [...getOrganizers];

    if (hasSearchFilter) {
      filteredOrganizers = filteredOrganizers.filter(
        (organizer) =>
          organizer.sub_event_name
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          organizer.organizer_name
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          organizer.rol.toLowerCase().includes(filterValue.toLowerCase()) ||
          organizer.email.toLowerCase().includes(filterValue.toLowerCase()) ||
          organizer.address.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredOrganizers;
  }, [filterValue, hasSearchFilter, getOrganizers]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  //Top Content
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

  const renderCell = React.useCallback((organizers, columnKey) => {
    const cellValue = organizers[columnKey];

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light" aria-label="Actions">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                textValue="Actualizar"
                  key="view"
                  onClick={() => {
                    setIdOrganizer(organizers.id_organizers);
                    setIsOrganizersUpdateModalOpen(true);
                  }}
                >
                  <span className="flex justify-between group">Actualizar <i className=" rtl:rotate-180  transition-transform duration-300 ease-in-out group-hover:rotate-90 group-hover:scale-110 ri-refresh-line"></i></span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <main className="flex flex-col gap-2">
      <ModalOrganizadoresActualizar
        idOrganizer={Number(idOrganizer)}
        isOrganizersUpdateModalOpen={isOrganizersUpdateModalOpen}
        setIsOrganizersUpdateModalOpen={setIsOrganizersUpdateModalOpen}
      />
      <div>
        <Breadcrumbs>
          <BreadcrumbItem href=""> </BreadcrumbItem>
          <BreadcrumbItem href="/admin/coordinador/organizadores">
            Organizadores
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <section>
        <Table
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
              module={getOrganizers}
              setVisibleColumns={setVisibleColumns}
              columns={columns}
              capitalize={capitalize}
              ModuleModal={ModalOrganizador}
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
          <TableBody
            emptyContent={"No hay organizadores para mostrar"}
            items={sortedItems}
          >
            {(item) => (
              <TableRow key={item.id_organizers}>
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
