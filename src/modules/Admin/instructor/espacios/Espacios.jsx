import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { columns, INITIAL_VISIBLE_COLUMNS } from "./utils/utils.js";
import { capitalize } from "../../utils/utils";

import { Link } from "react-router-dom";
import TopContent from "../../components/TopContent.jsx";

const TableShowData = React.lazy(() =>
  import("./../../components/TableShowData.jsx")
);
const BottomContent = React.lazy(() =>
  import("./../../components/BottonContent.jsx")
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
      return []; // O un valor por defecto que prefieras
    }
    let filterSpaces = [...showSpaces];

    if (hasSearchFilter) {
      filterSpaces = filterSpaces.filter((space) =>
        space.name.toLowerCase().includes(filterValue.toLowerCase())
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
            className={`${cellValue === "activo"
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
            <Link
              to={`/admin/instructor/inventario/espacio/${space.id_space}`}
              className="block m-auto bg-primary/80 text-white p-2 rounded-lg"
              aria-label="Ver Inventario"
            >
              Ver Inventario <i className="ri-list-check"></i>
            </Link>
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
        <div>
          <Breadcrumbs>
            <BreadcrumbItem href=""> </BreadcrumbItem>
            <BreadcrumbItem href="/admin/instructor/espacios">
              Espacios
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <section>
          <TableShowData
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
            emptyContent="No hay espacios para mostrar"
            renderCell={renderCell}
            id="id_space"
            aria="Table to show the data of spaces"
          />
        </section>
      </main>
    </>
  );
}
