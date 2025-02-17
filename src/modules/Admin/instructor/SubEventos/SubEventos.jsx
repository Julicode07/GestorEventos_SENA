import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { VerticalDotsIcon } from "@modules/Admin/components/VerticalDotsIcon";
import { EyeIcon } from "../../components/EyeIcon";
import { Link, useNavigate, useParams } from "react-router-dom";
import { capitalize, INITIAL_VISIBLE_COLUMNS, columns } from "./utils/utils";
import BottomContent from "../../components/BottonContent";
import TopContent from "./../../components/TopContent";
import ModalSubEventosActualizar from "../eventos/ModalSubEventosActualizar";
import Alert from "../../components/Alert";
import { SessionContext } from "../../../../context/SessionContext";
const TableShowData = React.lazy(() =>
  import("./../../components/TableShowData")
);
const OrganizadoresSubEventos = React.lazy(() =>
  import("./OrganizadoresSubEventos")
);
const SubEventConfirmationModal = React.lazy(() =>
  import("./SubEventConfirmationModal")
);

export default function SubEventos() {
  const { updateSession, names } = useContext(SessionContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });

  useEffect(() => {
    const fetchSession = async () => {
      try {
        await updateSession();
      } catch (err) {
        console.error("Ocurrio un error al traer la data", err);
      }
    };

    fetchSession();
  }, [updateSession]);

  //update subevents
  const [isModalUpdateSubEventsOpen, setIsModalUpdateSubEventsOpen] =
    useState(false);
  const [isSubEventConfirmationModalOpen, setIsSubEventConfirmationModalOpen] =
    useState(false);
  const [idSubEvents, setIdSubEvents] = useState("");
  //

  const [isOrganizersModal, setIsOrganizersModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const [statusAlert, setStatusAlert] = useState("");

  //get subevents
  const [subEvents, setSubEvents] = useState([]);

  const getSubEvents = useCallback(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/subEvents/globalEvent/${id}`
    );
    const data = await response.json();
    const userSubEvents = data.filter(
      (event) => event.id_host_user === names.id_user
    );
    if (userSubEvents.length === 0) {
      navigate("/admin/instructor/eventos");
    } else {
      setSubEvents(Array.isArray(data) ? data : []);
    }
  }, [id, names, navigate]);

  useEffect(() => {
    getSubEvents();
  }, [getSubEvents]);

  //

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...subEvents];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredUsers;
  }, [filterValue, hasSearchFilter, subEvents]);

  //Bottom content
  const [page, setPage] = React.useState(1);
  const pages = Math.ceil(filteredItems.length / rowsPerPage);
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

  // Top Content
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

  const renderCell = React.useCallback((subEvent, columnKey) => {
    const cellValue = subEvent[columnKey];
    switch (columnKey) {
      case "subeventConfirmation":
        return (
          <div className="flex flex-col">
            <p
              className={`text-bold text-small text-center p-1 rounded-lg ${
                subEvent.subeventConfirmation === "Confirmado"
                  ? "bg-green-300 text-green-800"
                  : subEvent.subeventConfirmation === "Rechazado"
                  ? "bg-red-300 text-red-800"
                  : "bg-orange-300 text-orange-800"
              }`}
            >
              {subEvent.subeventConfirmation}
            </p>
          </div>
        );
      case "info":
        return (
          <Link
            to={`/admin/instructor/subeventos/info/${subEvent.id_sub_event}`}
          >
            <EyeIcon className="block m-auto text-green-600 hover:bg-gray-300 hover:rounded-lg hover:cursor-pointer" />
          </Link>
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
                  disabled={
                    subEvent.global_event_status === "Rechazado" ||
                    subEvent.global_event_status === "Aceptado"
                  }
                  textValue="Actualizar"
                  onClick={() => {
                    setStatusAlert(subEvent.global_event_status);
                    if (
                      subEvent.global_event_status === "Rechazado" ||
                      subEvent.global_event_status === "Aceptado"
                    ) {
                      setAlert(true);
                      setTimeout(() => {
                        setAlert(false);
                      }, 2000);
                      return;
                    }
                    setIdSubEvents(subEvent.id_sub_event);
                    setIsModalUpdateSubEventsOpen(true);
                  }}
                >
                  Actualizar SubEvento{" "}
                  <b className="capitalize">{subEvent.name}</b>
                </DropdownItem>
                <DropdownItem
                  textValue="Cambiar estado del subevento"
                  onClick={() => {
                    setIdSubEvents(subEvent.id_sub_event);
                    setIsSubEventConfirmationModalOpen(true);
                  }}
                >
                  Cambiar estado SubEvento
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
          message={`No se puede acceder a esa acción porque el estado del evento global es ${statusAlert}`}
        />
      )}
      <div>
        <Breadcrumbs>
          <BreadcrumbItem href="/admin/instructor/eventos">
            Eventos
          </BreadcrumbItem>
          <BreadcrumbItem href={`/admin/instructor/subeventos/${id}`}>
            SubEvento
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <ModalSubEventosActualizar
        idSubEvents={Number(idSubEvents)}
        isModalUpdateSubEventsOpen={isModalUpdateSubEventsOpen}
        setIsModalUpdateSubEventsOpen={setIsModalUpdateSubEventsOpen}
      />
      <OrganizadoresSubEventos
        idSubEvents={Number(idSubEvents)}
        isOrganizersModal={isOrganizersModal}
        setIsOrganizersModal={setIsOrganizersModal}
      />
      <SubEventConfirmationModal
        idSubEvents={Number(idSubEvents)}
        isSubEventConfirmationModalOpen={isSubEventConfirmationModalOpen}
        setIsSubEventConfirmationModalOpen={setIsSubEventConfirmationModalOpen}
      />
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
              module={subEvents}
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
          renderCell={renderCell}
          emptyContent="No hay subeventos para mostrar"
          id="id_sub_event"
          aria="Table to show the data of subEvents events"
        />
      </section>
    </main>
  );
}
