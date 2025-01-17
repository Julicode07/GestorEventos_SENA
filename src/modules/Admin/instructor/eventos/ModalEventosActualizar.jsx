import { useState, useRef } from "react";
import { regexEventName, regexEventDetails } from "./eventsValidation";
import useUpdate from "../../../hooks/useUpdate";

const ModalEventosActualizar = ({ isModalOpen, setIsModalOpen, idEvent }) => {
  const { update } = useUpdate();

  const [succesMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [eventNameRegexIsOk, setEventNameRegexIsOk] = useState(false);
  const [eventDetailsRegexOk, setEventDetailsRegexOk] = useState(false);

  const [registerEvent, setRegisterEvent] = useState({
    name: "",
    details: "",
  });

  const eventNameRef = useRef();
  const eventDetailsRef = useRef();

  const handleChangeEvent = (e) => {
    const { name, value } = e.target;
    setRegisterEvent((prevDataEvent) => ({
      ...prevDataEvent,
      [name]: value,
    }));

    if (name === "name") {
      regexEventName(value, eventNameRef, setEventNameRegexIsOk);
    } else if (name === "details") {
      regexEventDetails(value, eventDetailsRef, setEventDetailsRegexOk);
    }
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    console.log(registerEvent);
    try {
      const result = await update(
        registerEvent,
        `/api/events/update/global/${idEvent}`
      );
      setSuccessMessage("El registro se actalizo exitosamente");
      setErrorMessage("");
      console.log("the data is: ", result);
      setRegisterEvent({
        name: "",
        details: "",
      });
    } catch (error) {
      setErrorMessage("Ocurrio un error al actualizar el evento", error);
      setSuccessMessage("");
    }
  };

  return (
    <>
      {/* Modal to create event */}

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
                    Actualizar evento {idEvent}
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
                      <label
                        className="block mb-2 text-lg font-bold text-gray-900"
                        htmlFor="eventName"
                      >
                        Nuevo nombre del Evento
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
                      <label
                        className="block mb-2 text-lg font-bold text-gray-900"
                        htmlFor="eventDetails"
                      >
                        Nueva descripción del evento
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
                        disabled={!eventNameRegexIsOk && !eventDetailsRegexOk}
                        style={{
                          background:
                            eventNameRegexIsOk && eventDetailsRegexOk
                              ? "green"
                              : "rgba(0, 0, 0, 0.2)",
                          color:
                            eventNameRegexIsOk && eventDetailsRegexOk
                              ? "white"
                              : "black",
                          cursor:
                            eventNameRegexIsOk && eventDetailsRegexOk
                              ? "pointer"
                              : "not-allowed",
                        }}
                        aria-label="Crear evento"
                        data-testid="crear-evento"
                      >
                        Actualizar Evento
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
                        <p className="text-red-600 text-center">
                          {errorMessage}
                        </p>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ModalEventosActualizar;
