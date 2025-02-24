import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "../../components/VerticalDotsIcon";
import { PlusIcon } from "@modules/Admin/components/PlusIcon";
import { columns, INITIAL_VISIBLE_COLUMNS } from "./utils/utils.js";
import { capitalize } from "../../utils/utils";
const ModalInventario = React.lazy(() =>
  import("../inventario/ModalInventario.jsx")
);
import { Link } from "react-router-dom";
import TopContent from "../../components/TopContent.jsx";
const ModalEspaciosActualizar = React.lazy(() =>
  import("./ModalEspaciosActualizar.jsx")
);
const ModalEspacios = React.lazy(() => import("./ModalEspacios.jsx"));
const TableShowData = React.lazy(() =>
  import("./../../components/TableShowData.jsx")
);
const BottomContent = React.lazy(() =>
  import("./../../components/BottonContent.jsx")
);

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSpaces, setShowSpaces] = useState([]);
  const [idSpaces, setIdSpaces] = useState("");
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);

  const getAllSpaces = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/spaces/all`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Ocurrio un error al traer la data", error);
    }
  }, []);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await getAllSpaces();
        setShowSpaces(data);
      };
      fetchData();
    } catch (error) {
      console.error("Ocurrio un error al traer la data", error);
    }
  }, [getAllSpaces]);

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
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
      return [];
    }
    let filterSpaces = [...showSpaces];

    if (hasSearchFilter) {
      filterSpaces = filterSpaces.filter(
        (space) =>
          space.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          space.capacity.toLowerCase().includes(filterValue.toLowerCase()) ||
          space.type.toLowerCase().includes(filterValue.toLowerCase()) ||
          space.status.toLowerCase().includes(filterValue.toLowerCase()) ||
          space.details.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filterSpaces;
  }, [filterValue, showSpaces, hasSearchFilter]);

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
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  aria-label="Actions"
                >
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem textValue="Inventario">
                  <Link
                    to={`/admin/coordinador/inventario/espacio/${space.id_space}`}
                    aria-label="Inventario"
                  >
                    <span className="flex justify-between group">
                      Inventario{" "}
                      <i className="  transition-transform duration-300 ease-in-out group-hover:scale-110  ri-list-check"></i>
                    </span>
                  </Link>
                </DropdownItem>
                <DropdownItem
                  textValue="Actualizar"
                  onClick={() => {
                    setIdSpaces(space.id_space);
                    setIsModalOpen(true);
                  }}
                >
                  <span className="flex justify-between group">
                    Actualizar{" "}
                    <i className=" rtl:rotate-180  transition-transform duration-300 ease-in-out group-hover:rotate-90 group-hover:scale-110 ri-refresh-line"></i>
                  </span>
                </DropdownItem>
                <DropdownItem
                  textValue="Inventario"
                  onClick={() => {
                    setIdSpaces(space.id_space);
                    setIsInventoryModalOpen(true);
                  }}
                >
                  <span className="flex justify-between group">
                    Añadir Inventario{" "}
                    <span className="  transition-transform duration-300 ease-in-out group-hover:scale-110">
                      <PlusIcon />
                    </span>
                  </span>
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

  return (
    <>
      <main className="flex flex-col gap-2">
        <ModalInventario
          isInventoryModalOpen={isInventoryModalOpen}
          setIsInventoryModalOpen={setIsInventoryModalOpen}
          idSpaces={idSpaces}
        />
        <div>
          <Breadcrumbs>
            <BreadcrumbItem href=""> </BreadcrumbItem>
            <BreadcrumbItem href="/admin/coordinador/espacios">
              Espacios
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <section>
          <ModalEspaciosActualizar
            idSpaces={Number(idSpaces)}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
          <TableShowData
            emptyContent={"No hay espacios para mostrar"}
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
            topContent={
              <TopContent
                filterValue={filterValue}
                onClear={onClear}
                onRowsPerPageChange={onRowsPerPageChange}
                onSearchChange={onSearchChange}
                rowsPerPage={rowsPerPage}
                visibleColumns={visibleColumns}
                module={showSpaces}
                setVisibleColumns={setVisibleColumns}
                columns={columns}
                capitalize={capitalize}
                ModuleModal={ModalEspacios}
              />
            }
            selectedKeys={selectedKeys}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            bottomContent={
              <BottomContent page={page} pages={pages} setPage={setPage} />
            }
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
