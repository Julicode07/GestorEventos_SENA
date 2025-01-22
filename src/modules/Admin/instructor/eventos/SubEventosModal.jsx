import { Button, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useState, useEffect, useCallback } from "react";
import { PlusIcon } from "@modules/Admin/components/PlusIcon";
import useRegister from "../../../hooks/useRegister";
import dayjs from "dayjs";

const SubEventosModal = ({
  isSubEventosModalOpen,
  setIsSubEventosModalOpen,
  idEvent,
  globalEventname,
}) => {
  const { register } = useRegister();
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

  useEffect(() => {
    if (idEvent !== 0) {
      setRegisterSubEvents([
        {
          id_global_event: idEvent,
        },
        {
          name: "",
          headquarters: "",
          start_date: "",
          end_date: "",
          description: "",
        },
      ]);
    }
  }, [idEvent]);

  const [succesMessage, setSuccesMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleSubmitSubEvent = async (e) => {
    e.preventDefault();
    console.log(registerSubEvents);
    try {
      const idGlobalEvent = registerSubEvents[0].id_global_event;
      const newDataToSend = registerSubEvents.slice(1).map((item) => ({
        ...item,
        start_date: dayjs(item.start_date).format("YYYY-MM-DD HH:mm:ss"),
        end_date: dayjs(item.end_date).format("YYYY-MM-DD HH:mm:ss"),
      }));
      const dataToSend = [
        { id_global_event: Number(idGlobalEvent) },
        ...newDataToSend,
      ];
      console.log(dataToSend);
      const result = await register(dataToSend, "/api/subEvents/create");
      setSuccesMessage("SubEvento creado correctamente");
      setErrorMessage("");
      console.log("Subevento registrado:", result);
      setRegisterSubEvents([
        {
          id_global_event: "",
        },
        {
          name: "",
          headquarters: "",
          start_date: "",
          end_date: "",
          description: "",
        },
      ]);
      window.location.reload();
    } catch (error) {
      setErrorMessage("Error al registrar el subevento", error);
      console.error("Error al registrar el subevento", error);
      setSuccesMessage("");
    }
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

      {isSubEventosModalOpen && (
        <>
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40"
            onClick={() => setIsSubEventosModalOpen(false)}
          >
            <div
              className="relative p-4 w-full max-w-2xl z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    Crear SubEvento para "{globalEventname}"
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                    onClick={() => setIsSubEventosModalOpen(false)}
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
                  <form className="min-h-full" onSubmit={handleSubmitSubEvent}>
                    <div className="overflow-y-auto max-h-[57vh] space-y-4">
                      {registerSubEvents.slice(1).map((data, index) => (
                        <div key={index + 1} className="px-4">
                          <h2 className="font-bold text-xl text-center">
                            SubEvento {index + 1}
                          </h2>
                          <div className="grid grid-cols-2 gap-4 items-center">
                            <div className="flex flex-col">
                              <label
                                className="mb-2 text-base font-bold text-gray-900"
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
                                className="block mb-2 text-base font-bold text-gray-900"
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
                                className="block mb-2 text-base font-bold text-gray-900"
                                htmlFor="fechaInicio"
                              >
                                Fecha de Inicio
                              </label>
                              <input
                                type="datetime-local"
                                className="bg-gray-100 text-gray-900 text-base rounded-lg block w-full p-2.5 outline-none"
                                label={"Fecha Inicio"}
                                id="fechaInicio"
                                onChange={(e) =>
                                  handleChangeSubEvent(e, index + 1)
                                }
                                name="start_date"
                                value={data.start_date}
                              />
                            </div>
                            <div className="flex flex-col">
                              <label
                                className="block mb-2 text-base font-bold text-gray-900"
                                htmlFor="fechaFin"
                              >
                                Fecha de Fin
                              </label>
                              <input
                                type="datetime-local"
                                className="bg-gray-100 text-gray-900 text-base rounded-lg block w-full p-2.5 outline-none"
                                label={"Fecha Fin"}
                                id="fechaFin"
                                onChange={(e) =>
                                  handleChangeSubEvent(e, index + 1)
                                }
                                name="end_date"
                                value={data.end_date}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <label
                              className="block mb-2 text-center text-base font-bold text-gray-900"
                              htmlFor="descripcion"
                            >
                              Descripción
                            </label>
                            <Textarea
                              id="descripcion"
                              placeholder="Observaciones"
                              className="mb-4"
                              name="description"
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
                      Crear nuevo subevento {registerSubEvents.slice(1).length}
                    </Button>

                    <div className="flex items-center justify-center p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b">
                      <button
                        type="button"
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 "
                        onClick={() => setIsSubEventosModalOpen(false)}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white bg-primary"
                        aria-label="Crear evento"
                        data-testid="crear-evento"
                      >
                        Crear Subevento
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

export default SubEventosModal;
