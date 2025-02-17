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
        `${import.meta.env.VITE_API_URL}/api/events/calendar/${selectedYear}/${
          today.month() + 1
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
      className="flex flex-col justify-center items-center gap-2 py-4"
    >
      <h1 className="text-4xl font-extrabold">Calendario</h1>
      <div className="bg-gray-100 mx-4 md:mx-0 rounded-xl flex flex-col lg:flex-row lg:gap-10  my-2 max-w-screen-xl h-full p-2 md:p-6">
        <div className="flex flex-col px-4 w-full lg:w-1/2 bg-white shadow-md rounded-lg flex-grow-0 h-full">
          <div className="flex justify-center items-center h-16">
            <div className="flex items-center gap-3">
              <GrFormPrevious
                className="bg-secondary text-white rounded-lg w-6 h-6 cursor-pointer hover:scale-105 transition-all"
                onClick={goToPreviousMonth}
              />
              <label
                htmlFor="year"
                className="cursor-pointer hover:scale-105 transition-all select-none font-bold"
                onClick={() => {
                  setToday(currentDate);
                  setSelectDate(currentDate);
                }}
              >
                {today.format("MMMM")}
              </label>
              <select
                id="year"
                value={selectedYear}
                onChange={handleYearChange}
                className="bg-slate-300 cursor-pointer hover:scale-105 transition-all rounded-lg p-1"
              >
                {[...Array(10).keys()].map((i) => (
                  <option key={i} value={currentDate.year() + i - 5}>
                    {currentDate.year() + i - 5}
                  </option>
                ))}
              </select>

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
                          ? "bg-gray-200"
                          : "",
                        "h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                      )}
                      onClick={() => {
                        setSelectDate(date);
                      }}
                    >
                      {date.date()}
                    </h1>

                    {hasEvents && (
                      <div className="absolute top-1.5 left-2.5 w-3.5 h-3.5 bg-green-500 rounded-full" />
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
          <div className="flex-1 overflow-auto">
            {eventsByMonth[selectDate.format("YYYY-MM-DD")] ? (
              <div>
                {eventsByMonth[selectDate.format("YYYY-MM-DD")].map(
                  (event, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 border border-gray-200 rounded-lg p-4 mb-4 shadow-sm flex justify-between items-center"
                    >
                      <div>
                        <h2 className="font-semibold text-md mb-2">
                          {event.title} -{" "}
                          {dayjs(event.startDate).format(
                            "YYYY-MM-DD dddd HH:mm"
                          )}
                        </h2>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                      <button
                        className="bg-secondary text-white font-bold text-sm rounded-lg p-3 hover:bg-secondary transition-colors"
                        onClick={() => setSelectedEvent(event)}
                      >
                        Ver evento
                      </button>
                    </div>
                  )
                )}
              </div>
            ) : (
              <p className="text-gray-500">No hay reuniones para hoy.</p>
            )}
          </div>

          {selectedEvent && (
            <div
              className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 h-screen"
              onClick={() => setSelectedEvent(null)}
            >
              <div
                className={`bg-white border border-gray-300 shadow-2xl p-8 rounded-2xl w-4/5 max-w-2xl flex flex-col items-center relative transition-transform transform scale-95 opacity-0
        ${
          selectedEvent ? "scale-100 opacity-100" : "scale-95 opacity-0"
        } transition-all duration-300 ease-out`}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setSelectedEvent(null)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path>
                  </svg>
                </button>

                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                  {selectedEvent.title}
                </h2>

                <div className="bg-blue-500 text-white rounded-full w-20 h-20 flex justify-center items-center mb-6">
                  <span className="text-3xl">📅</span>
                </div>

                <div className="flex flex-col items-center mb-6 w-full">
                  <p className="text-gray-700 text-lg text-center mb-2">
                    {selectDate.format("dddd, D MMMM YYYY")}
                  </p>
                  <p className="text-gray-600 text-md text-center">
                    Hora: {dayjs(selectedEvent.startDate).format("HH:mm")}
                  </p>

                  <hr className="border-t border-gray-300 w-full my-4" />

                  <p className="text-gray-500 text-center mt-2">
                    <strong>Ubicación:</strong> {selectedEvent.location}
                  </p>

                  <p className="text-gray-700 text-center mt-4 px-4">
                    {selectedEvent.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h2 className="font-bold text-xl">Espacios:</h2>
                    <ul>
                      {selectedEvent.spaces.length > 0 ? (
                        selectedEvent.spaces.map((space, index) => (
                          <li key={index} className="list-disc">
                            {space.space_name}
                          </li>
                        ))
                      ) : (
                        <li>No hay espacios</li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h2 className="font-bold text-xl">Organizadores:</h2>
                    <ul>
                      {selectedEvent.organizers.length > 0 ? (
                        selectedEvent.organizers.map((organizer, index) => (
                          <li key={index}>{organizer.organizer_name}</li>
                        ))
                      ) : (
                        <li>No hay organizadores</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
