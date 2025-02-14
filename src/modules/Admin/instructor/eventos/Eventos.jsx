import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  BreadcrumbItem,
  Breadcrumbs,
} from "@nextui-org/react";
import { columns, INITIAL_VISIBLE_COLUMNS } from "./utils/utils.js";
import { capitalize } from "../../utils/utils";
import { VerticalDotsIcon } from "../../components/VerticalDotsIcon";
import ModalEventos from "./ModalEventos";
import ModalEventosActualizar from "./ModalEventosActualizar.jsx";
import SubEventosModal from "./SubEventosModal.jsx";
import { Link } from "react-router-dom";
import Alert from "../../components/Alert.jsx";
import TopContent from "../../components/TopContent.jsx";
import BottomContent from "../../components/BottonContent.jsx";
const TableShowData = React.lazy(() =>
  import("./../../components/TableShowData.jsx")
);

export default function Eventos() {
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [alert, setAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "status",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  // modal de subeventos
  const [isSubEventosModalOpen, setIsSubEventosModalOpen] = useState(false);
  //

  // Show global event
  const [showGlobalEvent, setShowGlobalEvent] = useState([]);

  const getGlobalEvents = useCallback(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/events/global/self/all`
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
  const [globalEventName, setGlobalEventName] = useState("");
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
          event.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          event.details.toLowerCase().includes(filterValue.toLowerCase())
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
              className={`text-bold text-small text-center rounded-lg ${
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
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  textValue="Actualizar Evento"
                  disabled={
                    event.global_event_status === "Rechazado" ||
                    event.global_event_status === "Aceptado"
                  }
                  onClick={() => {
                    setStatusAlert(event.global_event_status);
                    if (
                      event.global_event_status === "Rechazado" ||
                      event.global_event_status === "Aceptado"
                    ) {
                      setAlert(true);
                      setTimeout(() => {
                        setAlert(false);
                      }, 2000);
                      return;
                    }
                    setIsModalOpen(true);
                    setIdEvent(event.id_global_event);
                    setGlobalEventName(event.name);
                  }}
                >
                  <span className="flex justify-between group">
                    Actualizar Evento{" "}
                    <i className=" rtl:rotate-180  transition-transform duration-300 ease-in-out group-hover:rotate-90 group-hover:scale-110 ri-refresh-line"></i>
                  </span>
                </DropdownItem>
                <DropdownItem
                  textValue="Crear subeventos"
                  disabled={
                    event.global_event_status === "Rechazado" ||
                    event.global_event_status === "Aceptado"
                  }
                  onClick={() => {
                    setStatusAlert(event.global_event_status);
                    if (
                      event.global_event_status === "Rechazado" ||
                      event.global_event_status === "Aceptado"
                    ) {
                      setAlert(true);
                      setTimeout(() => {
                        setAlert(false);
                      }, 1500);
                      return;
                    }
                    setIsSubEventosModalOpen(true);
                    setIdEvent(event.id_global_event);
                    setGlobalEventName(event.name);
                  }}
                >
                  <span className="flex justify-between group">
                    Crear subeventos{" "}
                    <i className="  transition-transform duration-300 ease-in-out group-hover:scale-125 ri-add-line"></i>
                  </span>
                </DropdownItem>
                <DropdownItem textValue="SubEventos">
                  <Link
                    to={`/admin/instructor/subeventos/${event.id_global_event}`}
                  >
                    <span className="flex justify-between group">
                      SubEventos{" "}
                      <i className="transition-transform duration-300 ease-in-out group-hover:scale-125 ri-calendar-2-line"></i>
                    </span>
                  </Link>
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
      {alert && (
        <Alert
          message={`No se puede acceder a esa acción porque el estado es ${statusAlert}`}
        />
      )}
      <div>
        <Breadcrumbs>
          <BreadcrumbItem href=""> </BreadcrumbItem>
          <BreadcrumbItem href="/admin/instructor/espacios">
            Eventos
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <ModalEventosActualizar
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        idEvent={Number(idEvent)}
      />
      <SubEventosModal
        isSubEventosModalOpen={isSubEventosModalOpen}
        setIsSubEventosModalOpen={setIsSubEventosModalOpen}
        idEvent={Number(idEvent)}
        globalEventname={globalEventName}
      />
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
            ModuleModal={ModalEventos}
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
        emptyContent="No hay eventos para mostrar"
        renderCell={renderCell}
        id="id_global_event"
        aria="Table to show the data of global events"
      />
    </main>
  );
}
