import { Button, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useState, useEffect, useCallback } from "react";
import { PlusIcon } from "@modules/Admin/components/PlusIcon";

const SubEventosModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registerSubEvents, setRegisterSubEvents] = useState([
    { id_global_event: "" },
    {
      name: "",
      headquarters: "",
      start_date: "",
      end_date: "",
      description: "",
    },
  ]);

  const [globalEvents, setGlobalEvents] = useState([]);

  const getGlobalEvent = useCallback(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/events/global/all`
    );
    const data = await response.json();
    setGlobalEvents(data);
  }, []);

  useEffect(() => {
    getGlobalEvent();
  }, [getGlobalEvent]);

  const handleChangeSubEvent = (e, index) => {
    const { name, value } = e.target;

    setRegisterSubEvents((prevDataEvent) => {
      const newDataToRegister = [...prevDataEvent];
      newDataToRegister[index] = {
        ...newDataToRegister[index],
        [name]: value,
      };
      return newDataToRegister;
    });
  };

  const handleAddSubEvent = async () => {
    setRegisterSubEvents((prevData) => [
      ...prevData,
      {
        name: "",
        headquarters: "",
        start_date: "",
        end_date: "",
        description: "",
      },
    ]);
  };
  return (
    <>
      {/* Modal to create event */}
      <Button
        color="secondary"
        onClick={() => setIsModalOpen(true)}
        endContent={<PlusIcon />}
      >
        Crear SubEvento
      </Button>

      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <div className="relative p-4 w-full max-w-2xl z-50">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                  <h3 className="text-3xl font-semibold text-gray-900">
                    Crear SubEvento
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
                  <form className="min-h-full">
                    <div className="overflow-y-auto max-h-[57vh] space-y-4">
                      <div className="flex flex-col mb-5">
                        <label
                          className="mb-2 text-lg text-center font-bold text-gray-900"
                          htmlFor="globalEvent"
                        >
                          Escoge el evento Global para asociarlo
                        </label>
                        <Select
                          id="globalEvent"
                          label="Ecoge el evento Global"
                          name="id_global_event"
                          data-testid="tipo-espacios"
                          value={registerSubEvents[0].id_global_event}
                          onChange={(e) => handleChangeSubEvent(e, 0)}
                        >
                          {globalEvents.map((event) => (
                            <SelectItem
                              key={event.id_global_event}
                              textValue={event.name}
                            >
                              {event.name}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>

                      {registerSubEvents.slice(1).map((data, index) => (
                        <div key={index + 1} className="px-4">
                          <h2 className="font-bold text-2xl text-center mt-5">
                            SubEvento {index + 1}
                          </h2>
                          <div className="grid grid-cols-2 gap-4 items-center">
                            <div className="flex flex-col">
                              <label
                                className="mb-2 text-lg font-bold text-gray-900"
                                htmlFor="subeventName"
                              >
                                Nombre del SubEvento
                              </label>
                              <input
                                type="text"
                                name="name"
                                id="subeventName"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5 outline-none"
                                placeholder="Semana del instructor"
                                onChange={(e) =>
                                  handleChangeSubEvent(e, index + 1)
                                }
                                value={data.name}
                              />
                            </div>
                            <div className="flex flex-col">
                              <label
                                className="block mb-2 text-lg font-bold text-gray-900"
                                htmlFor="sede"
                              >
                                Sede
                              </label>
                              <Select
                                id="sede"
                                label="Ecoge la sede"
                                name="headquarters"
                                data-testid="tipo-espacios"
                                onChange={(e) =>
                                  handleChangeSubEvent(e, index + 1)
                                }
                                value={data.headquarters}
                              >
                                <SelectItem key="">
                                  Seleccione el tipo
                                </SelectItem>
                                <SelectItem key="San Francisco">
                                  San Francisco
                                </SelectItem>
                                <SelectItem key="Uniremington">
                                  Uniremington
                                </SelectItem>
                                <SelectItem key="La Ceja">La Ceja</SelectItem>
                              </Select>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 items-center">
                            <div className="flex flex-col">
                              <label
                                className="block mb-2 text-lg font-bold text-gray-900"
                                htmlFor="fechaInicio"
                              >
                                Fecha de Inicio
                              </label>
                              <input
                                type="date"
                                className="bg-gray-100 text-gray-900 text-base rounded-lg block w-full p-2.5 outline-none"
                                label={"Fecha Inicio"}
                                id="fechaInicio"
                                onChange={(e) =>
                                  handleChangeSubEvent(e, index + 1)
                                }
                                value={data.start_date}
                              />
                            </div>
                            <div className="flex flex-col">
                              <label
                                className="block mb-2 text-lg font-bold text-gray-900"
                                htmlFor="fechaFin"
                              >
                                Fecha de Fin
                              </label>
                              <input
                                type="date"
                                className="bg-gray-100 text-gray-900 text-base rounded-lg block w-full p-2.5 outline-none"
                                label={"Fecha Fin"}
                                id="fechaFin"
                                onChange={(e) =>
                                  handleChangeSubEvent(e, index + 1)
                                }
                                value={data.end_date}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <label
                              className="block mb-2 text-center text-lg font-bold text-gray-900"
                              htmlFor="descripcion"
                            >
                              Descripción
                            </label>
                            <Textarea
                              id="descripcion"
                              placeholder="Observaciones"
                              className="mb-4"
                              name="details"
                              onChange={(e) =>
                                handleChangeSubEvent(e, index + 1)
                              }
                              value={data.description}
                            />
                          </div>
                          <hr className="border-2 my-3" />
                        </div>
                      ))}
                    </div>

                    <Button
                      color="secondary"
                      className="self-start mt-4"
                      onClick={handleAddSubEvent}
                      endContent={<PlusIcon />}
                    >
                      Añadir más subEventos {registerSubEvents.slice(1).length}
                    </Button>

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
                        className="focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white bg-primary"
                        aria-label="Crear evento"
                        data-testid="crear-evento"
                      >
                        Crear Evento
                      </button>
                    </div>
                    {/* <div className="flex justify-center">
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
                    </div> */}
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

export default SubEventosModal;
