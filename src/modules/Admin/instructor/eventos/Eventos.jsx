import React, { useRef, useState } from "react";
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

  // Register a global event
  const [registerEvent, setRegisterEvent] = useState({
    name: "",
    details: "",
  });

  const eventNameRef = useRef();
  const eventDetailsRef = useRef();

  const [succesMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [eventNameRegexIsOk, setEventNameRegexIsOk] = useState(false);
  const [eventDetailsRegexOk, setEventDetailsRegexOk] = useState(false);

  const regexEventName = (eventName) => {
    const regex = /^[A-Za-zñ.Ñ:-á-|éí,.ó'úÁÉÍ&%$ÓÚäëïöüÄËÏÖÜ0-9\s]{1,64}$/;
    const regexTest = regex.test(eventName);

    if (regexTest) {
      eventNameRef.current.textContent = "";
      setEventNameRegexIsOk(true);
    } else {
      eventNameRef.current.textContent = "El nombre del evento no es valido";
      eventNameRef.current.style.color = "red";
      setEventNameRegexIsOk(false);
    }
  };

  const regexEventDetails = (eventDetails) => {
    const regex = /^[A-Za-zñ.Ñ:-á-|éí,.'óúÁÉÍ&%$ÓÚäëïöüÄËÏÖÜ0-9\s]{1,255}$/;
    const regexTest = regex.test(eventDetails);

    if (regexTest) {
      eventDetailsRef.current.textContent = "";
      setEventDetailsRegexOk(true);
    } else {
      eventDetailsRef.current.textContent =
        "Los detalles del evento no son validos";
      eventDetailsRef.current.style.color = "red";
      setEventDetailsRegexOk(false);
    }
  };

  const handleChangeEvent = (e) => {
    const { name, value } = e.target;
    setRegisterEvent((prevDataEvent) => ({
      ...prevDataEvent,
      [name]: value,
    }));

    if (name === "name") {
      regexEventName(value);
    } else if (name === "details") {
      regexEventDetails(value);
    }
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    console.log(registerEvent);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events/global`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerEvent),
        }
      );
      const data = await response.json();
      console.log("the data is: ", data);
      if (data.status === 200) {
        setSuccessMessage("Registro exitoso");
        setErrorMessage("");
      } else {
        setSuccessMessage("");
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("Ocurrio un error al registrar el evento", error);
      setSuccessMessage("");
    }
  };

  //

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
        <div className="flex items-center gap-2 md:gap-3">
          <span className="hidden sm:flex font-bold text-default-800">
            Filtros:
          </span>
          <Dropdown className="hidden sm:flex">
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
                      <form className="space-y-4" onSubmit={handleSubmitEvent}>
                        <div>
                          <label className="block mb-2 text-lg font-bold text-gray-900 ">
                            Nombre del Evento
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="eventName"
                            value={registerEvent.name}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5 outline-none"
                            placeholder="Semana del instructor"
                            onChange={handleChangeEvent}
                          />
                          <span ref={eventNameRef}></span>
                        </div>
                        <div>
                          <label className="block mb-2 text-lg font-bold text-gray-900">
                            Descripción del evento
                          </label>
                          <textarea
                            name="details"
                            id="eventDetails"
                            value={registerEvent.details}
                            placeholder="Escribe la descripción del evento"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5 outline-none"
                            rows="4"
                            onChange={handleChangeEvent}
                          ></textarea>
                          <span ref={eventDetailsRef}></span>
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
                            type="submit"
                            className="focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            style={{
                              background:
                                eventNameRegexIsOk && eventDetailsRegexOk
                                  ? "green"
                                  : "rgba(0, 0, 0, 0.2)",
                              PointerEvent:
                                eventNameRegexIsOk && eventDetailsRegexOk
                                  ? "auto"
                                  : "none",
                              color:
                                eventNameRegexIsOk && eventDetailsRegexOk
                                  ? "white"
                                  : "black",
                            }}
                          >
                            Crear Evento
                          </button>
                        </div>
                        <div className="flex justify-center">
                          {succesMessage && (
                            <p className="text-green-600 text-center">
                              {succesMessage}
                            </p>
                          )}
                          {errorMessage === "Evento creado correctamente" ? (
                            <p className="text-green-600 text-center">
                              {errorMessage}
                            </p>
                          ) : (
                            (<p className="text-red-600 text-center">
                              {errorMessage}
                            </p>)
                          )}
                        </div>  
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
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
      {/* table */}
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
        <div className="py-2 px-2 flex justify-center items-center">
          <Pagination
            showControls
            isCompact
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
}
