import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Listbox, ListboxItem } from "@nextui-org/react";

const OrganizadoresSubEventos = ({
  isOrganizersModal,
  setIsOrganizersModal,
  idSubEvents,
}) => {
  const [organizersByIdSubEvents, setOrganizersByIdSubEvents] = useState([]);

  const getOrganizersByIdSubEvents = useCallback(async () => {
    try {
      setOrganizersByIdSubEvents([]);
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/organizers/sub-events/${idSubEvents}`
      );
      const data = await response.json();
      setOrganizersByIdSubEvents(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error("No se pudo traer la data", err);
    }
  }, [idSubEvents]);

  useEffect(() => {
    if (!idSubEvents) {
      setOrganizersByIdSubEvents([]);
      return;
    }
    getOrganizersByIdSubEvents();
  }, [idSubEvents, getOrganizersByIdSubEvents]);

  return (
    <>
      {/* Modal to create event */}

      {isOrganizersModal && (
        <>
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsOrganizersModal(false);
              }
            }}
          >
            <div className="relative p-4 w-full max-w-2xl z-50">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                  <h1 className="font-bold text-2xl">
                    Organizadores del evento de{" ''"}
                    {organizersByIdSubEvents.length > 0 &&
                    organizersByIdSubEvents[0].sub_event_name
                      ? organizersByIdSubEvents[0].sub_event_name
                      : "No hay organizadores"}
                    {" ''"}
                  </h1>

                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                    onClick={() => {
                      setIsOrganizersModal(false);
                    }}
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
                  <ul>
                    {organizersByIdSubEvents.map((organizer, index) => (
                      <li
                        className="text-black list-disc m-2"
                        key={`${organizer.id_sub_event || "no-id"}-${index}`}
                      >
                        {organizer.name
                          ? organizer.name
                          : "No hay organizadores"}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrganizadoresSubEventos;
