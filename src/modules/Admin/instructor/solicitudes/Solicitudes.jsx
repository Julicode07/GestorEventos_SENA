import React, { useCallback, useEffect, useState } from "react";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import { columns, INITIAL_VISIBLE_COLUMNS, capitalize } from "./utils/utils.js";
import TopContent from "../../components/TopContent.jsx";
import BottomContent from "../../components/BottonContent.jsx";
import { Link } from "react-router-dom";
const TableShowData = React.lazy(() =>
  import("./../../components/TableShowData.jsx")
);

export default function App() {
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "status",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  // Show global event
  const [showGlobalEvent, setShowGlobalEvent] = useState([]);

  const getGlobalEvents = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events/global/self/all`
      );
      const data = await response.json();
      setShowGlobalEvent(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Ocurrio un error al traer la data", err);
    }
  }, []);

  useEffect(() => {
    getGlobalEvents();
  }, [getGlobalEvents]);
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
          event.global_event_name
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          event.global_event_observations
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          event.global_event_status
            .toLowerCase()
            .includes(filterValue.toLowerCase())
      );
    }

    return filteredEvents;
  }, [filterValue, hasSearchFilter, showGlobalEvent]);

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

  const renderCell = React.useCallback((event, columnKey) => {
    const cellValue = event[columnKey];

    switch (columnKey) {
      case "global_event_status":
        return (
          <div className="flex flex-col">
            <p
              className={`text-bold text-small text-center rounded-lg p-2 ${
                event.global_event_status === "Pendiente"
                  ? "bg-warning-100 text-warning"
                  : event.global_event_status === "Rechazado"
                  ? "bg-danger-100 text-danger"
                  : "bg-success-100 text-success"
              }`}
            >
              {event.global_event_status}
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Link
              to={`/admin/instructor/solicitudes/ver/${event.id_global_event}`}
              aria-label="Ver"
            >
              <Button
                className="flex items-center bg-primary/80 text-white px-2"
                aria-label="Ver"
              >
                <i className="ri-eye-line"></i> Ver Evento
              </Button>
            </Link>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <main className="flex flex-col gap-2">
      <div>
        <Breadcrumbs>
          <BreadcrumbItem href=""> </BreadcrumbItem>
          <BreadcrumbItem href="/admin/instructor/espacios">
            Solicitudes hechas por ti
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      {/* table */}
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
            module={showGlobalEvent}
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
        emptyContent="No hay solicitudes para mostrar"
        renderCell={renderCell}
        id="id_global_event"
        aria="Table to show the data of global events"
      />
    </main>
  );
}
