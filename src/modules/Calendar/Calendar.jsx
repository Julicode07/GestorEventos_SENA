import dayjs from "dayjs";
import "dayjs/locale/es";
import updateLocale from "dayjs/plugin/updateLocale";
import { useCallback, useEffect, useState } from "react";
import { generateDate } from "./util/calendar";
import cn from "./util/cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

dayjs.extend(updateLocale);
dayjs.locale("es");
dayjs.updateLocale("es", {
  months: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
});

export default function Calendar() {
  const days = ["D", "L", "M", "X", "J", "V", "S"];
  const currentDate = dayjs();
  const [today, setToday] = useState(dayjs());
  const [selectDate, setSelectDate] = useState(currentDate);
  const [selectedYear, setSelectedYear] = useState(currentDate.year());
  const [selectedEvent, setSelectedEvent] = useState(null);

  //getEvents info
  const [eventsByMonth, setEventsByMonth] = useState([]);
  //

  const goToPreviousMonth = () => {
    const previousMonth = today.subtract(1, "month");
    setToday(previousMonth);
    setSelectedYear(previousMonth.year());
  };

  const goToNextMonth = () => {
    const nextMonth = today.add(1, "month");
    setToday(nextMonth);
    setSelectedYear(nextMonth.year());
  };

  const handleYearChange = (event) => {
    const year = parseInt(event.target.value);
    setSelectedYear(year);
    setToday(today.year(year));
  };

  function transformarEventos(eventos) {
    const eventosPorFecha = {};

    eventos.forEach((globalEvent) => {
      globalEvent.sub_events.forEach((subEvent) => {
        const fecha = subEvent.start_date.split("T")[0]; // Extraer solo la fecha (YYYY-MM-DD)

        if (!eventosPorFecha[fecha]) {
          eventosPorFecha[fecha] = [];
        }

        eventosPorFecha[fecha].push({
          title: subEvent.sub_event_name,
          description: subEvent.sub_event_description,
          status: subEvent.sub_event_status,
          startDate: subEvent.start_date,
          endDate: subEvent.end_date,
          location: subEvent.headquarters,
          spaces: subEvent.spaces,
          organizers: subEvent.organizers,
        });
      });
    }) ?? [];

    return eventosPorFecha;
  }

  const getEventsByMonth = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events/calendar/${selectedYear}/${today.month() + 1
        }`
      );
      const data = await response.json();
      const eventosTransformados = transformarEventos(
        Array.isArray(data) ? data : []
      );
      setEventsByMonth(eventosTransformados);
    } catch (err) {
      console.error("Ocurrió un error al traer la data", err);
    }
  }, [selectedYear, today]);

  useEffect(() => {
    getEventsByMonth();
  }, [getEventsByMonth]);

  return (
    <div
      id="calendario"
      className="max-w-5xl m-auto flex flex-col justify-center items-center gap-2 py-4"
    >
      <h1 className="text-4xl font-extrabold">Calendario</h1>
      <div className="bg-gray-100 mx-4 md:mx-0 rounded-xl flex flex-col lg:flex-row lg:gap-10  my-2 w-full h-full p-2 md:p-6">
        <div className="flex flex-col px-4 w-full lg:w-1/2 bg-white shadow-md rounded-lg flex-grow-0 h-full">
          <div className="flex justify-center items-center h-16">
            <div className="flex items-center justify-between w-full">
              <GrFormPrevious
                className="bg-secondary text-white rounded-lg w-6 h-6 cursor-pointer hover:scale-105 transition-all"
                onClick={goToPreviousMonth}
              />
              <div className="flex items-center justifiy-between gap-2 w-56 sm:w-1/2 m-auto">
                <label
                  htmlFor="year"
                  className="w-full cursor-pointer hover:scale-105 transition-all select-none font-bold"
                  onClick={() => {
                    setToday(currentDate);
                    setSelectDate(currentDate);
                  }}
                >
                  {today.format("MMMM")}
                </label>
                <div>
                  <select
                    id="year"
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="w-fullbg-slate-300 cursor-pointer hover:scale-105 transition-all rounded-lg p-1"
                  >
                    {[...Array(10).keys()].map((i) => (
                      <option key={i} value={currentDate.year() + i - 5}>
                        {currentDate.year() + i - 5}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <GrFormNext
                className="bg-secondary text-white rounded-lg w-6 h-6 cursor-pointer hover:scale-105 transition-all"
                onClick={goToNextMonth}
              />
            </div>
          </div>

          <div className="grid grid-cols-7 place-items-center">
            {days.map((day, index) => (
              <h1
                key={index}
                className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
              >
                {day}
              </h1>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {generateDate(today.month(), today.year()).map(
              ({ date, currentMonth, today }, index) => {
                const formattedDate = date.format("YYYY-MM-DD");
                const hasEvents = eventsByMonth[formattedDate];
                const isSelected =
                  selectDate.format("YYYY-MM-DD") === formattedDate;
                const eventCount = hasEvents ? eventsByMonth[formattedDate].length : 0;

                return (
                  <div
                    key={index}
                    className="relative text-center h-14 grid place-content-center text-sm border-t group"
                  >
                    <h1
                      className={cn(
                        currentMonth ? "" : "text-gray-600",
                        today ? "bg-secondary text-white" : "",
                        isSelected
                          ? "bg-black text-white"
                          : hasEvents
                            ? "bg-primary text-white"
                            : "",
                        "h-10 w-10 rounded-full grid place-content-center hover:bg-gray-200 hover:text-black transition-all cursor-pointer select-none"
                      )}
                      onClick={() => {
                        setSelectDate(date);
                      }}
                    >
                      {date.date()}
                    </h1>

                    {hasEvents && (
                      <div className="absolute top-0 left-0 bg-secondary text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                        {eventCount}
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>


        <div className="w-full lg:w-1/2 bg-white shadow-md rounded-lg p-4 flex flex-col h-full lg:h-auto mt-4 lg:mt-0">
          <h1 className="font-semibold text-lg mb-4">
            Agenda para {selectDate.format("dddd, D MMMM YYYY")}
          </h1>
          <div className="flex-1 overflow-y-auto max-h-96 w-full p-2">
            {eventsByMonth[selectDate.format("YYYY-MM-DD")] ? (
              <div className="space-y-4">
                {eventsByMonth[selectDate.format("YYYY-MM-DD")].map((event, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between"
                  >
                    <div className="flex flex-col w-full lg:w-auto lg:max-w-md truncate">
                      <h2 className="font-semibold text-md mb-1 truncate w-full">
                        {event.title}
                      </h2>
                      <p className="text-gray-600 text-sm truncate w-full lg:max-w-xs">
                        {event.description}
                      </p>
                    </div>
                    <button
                      className="bg-secondary text-white font-bold text-sm rounded-lg px-4 py-2 mt-2 lg:mt-0 hover:bg-secondary-dark transition-colors whitespace-nowrap"
                      onClick={() => setSelectedEvent(event)}
                    >
                      Ver evento
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">No hay reuniones para hoy.</p>
            )}
          </div>

          {selectedEvent && (
            <>
              {document.body.classList.add("overflow-hidden")}

              <div
                className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
                onClick={() => {
                  setSelectedEvent(null);
                  document.body.classList.remove("overflow-hidden");
                }}
              >
                <div
                  className="bg-white border border-gray-200 shadow-2xl p-6 md:p-8 rounded-2xl w-full max-w-2xl flex flex-col items-center relative transition-transform transform duration-300 ease-out
          scale-100 opacity-100"
                  onClick={(e) => e.stopPropagation()}
                  style={{ maxHeight: "90vh", height: "90vh", display: "flex", flexDirection: "column" }} // Fijar altura
                >
                  <button
                    className="absolute top-4 right-4 text-gray-500 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
                    onClick={() => {
                      setSelectedEvent(null);
                      document.body.classList.remove("overflow-hidden");
                    }}
                  >
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6-6M7 7l6 6m-6-6-6 6"
                      />
                    </svg>
                  </button>

                  <div className="overflow-y-auto w-full px-4 flex-1" style={{ maxHeight: "calc(90vh - 50px)" }}>
                    <div className="bg-gradient-to-r from-green-700 to-primary text-white rounded-full w-20 h-20 flex justify-center items-center mb-6 shadow-md">
                      <span className="text-4xl"><i className="ri-calendar-event-fill"></i></span>
                    </div>

                    <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">{selectedEvent.title}</h2>

                    <div className="bg-gray-50 w-full p-4 rounded-xl shadow-md">
                      <p className="text-gray-700 text-lg">
                        <span className="font-bold text-gray-800">📅 Fecha:</span> {selectDate.format("dddd, D MMMM YYYY")}
                      </p>
                      <p className="text-gray-700 text-lg mt-1">
                        <span className="font-bold text-gray-800">⏰ Hora:</span> {dayjs(selectedEvent.startDate).format("HH:mm")}
                      </p>

                      <hr className="border-t border-gray-300 my-4" />

                      <p className="text-gray-700">
                        <span className="font-bold text-gray-800">📍 Ubicación:</span> {selectedEvent.location}
                      </p>

                      <p className="text-gray-700 mt-4">{selectedEvent.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-6">
                      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                        <h2 className="font-bold text-xl text-primary mb-2">🏢 Espacios:</h2>
                        <ul className="text-gray-700">
                          {selectedEvent.spaces.length > 0 ? (
                            selectedEvent.spaces.map((space, index) => (
                              <li key={index} className="list-disc ml-4">{space.space_name}</li>
                            ))
                          ) : (
                            <li className="text-gray-500">No hay espacios</li>
                          )}
                        </ul>
                      </div>

                      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                        <h2 className="font-bold text-xl text-primary mb-2">👤 Organizadores:</h2>
                        <ul className="text-gray-700">
                          {selectedEvent.organizers.length > 0 ? (
                            selectedEvent.organizers.map((organizer, index) => (
                              <li key={index} className="list-disc ml-4">{organizer.organizer_name}</li>
                            ))
                          ) : (
                            <li className="text-gray-500">No hay organizadores</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
