import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { PlusIcon } from "@modules/Admin/components/PlusIcon";
import useRegister from "../../../hooks/useRegister";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import SubEventsHasSpaces from "./SubEventsHasSpaces";
import InsumesModal from "./InsumesModal";
import OrganizersModal from "./OrganizersModal";

const SubEventosModal = ({
  isSubEventosModalOpen,
  setIsSubEventosModalOpen,
  idEvent,
  globalEventname,
}) => {
  const { register } = useRegister();
  const [registerSubEvents, setRegisterSubEvents] = useState([
    {
      name: "",
      headquarters: "",
      start_date: "",
      end_date: "",
      description: "",
      subeventConfirmation: "Confirmado",
      spaces: [],
      insumes: [],
      organizers: [],
    },
  ]);

  useEffect(() => {
    if (idEvent !== 0) {
      setRegisterSubEvents([
        {
          name: "",
          headquarters: "",
          start_date: "",
          end_date: "",
          description: "",
          subeventConfirmation: "Confirmado",
          spaces: [],
          insumes: [],
          organizers: [],
        },
      ]);
    }
  }, [idEvent]);

  const [succesMessage, setSuccesMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //get Spaces
  const [spaces, setSpaces] = useState([]);
  const getSpaces = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/spaces/all`
      );
      const data = await response.json();
      setSpaces(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error("Ocurrio un error al traer la data", err);
    }
  }, []);

  useEffect(() => {
    getSpaces();
  }, [getSpaces]);

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

  const handleChangeSpaces = (e, subEventIndex, spaceIndex) => {
    const { name, value } = e.target;

    setRegisterSubEvents((prevDataEvent) => {
      const newEvents = [...prevDataEvent];
      const newSpaces = [...newEvents[subEventIndex].spaces];
      newSpaces[spaceIndex] = { ...newSpaces[spaceIndex], [name]: value };
      newEvents[subEventIndex] = {
        ...newEvents[subEventIndex],
        spaces: newSpaces,
      };
      return newEvents;
    });
  };

  const handleChangeInsumes = (e, subEventIndex, insumeIndex) => {
    const { name, value } = e.target;

    setRegisterSubEvents((prevDataEvent) => {
      const newEvents = [...prevDataEvent];
      const newInsumes = [...newEvents[subEventIndex].insumes];
      newInsumes[insumeIndex] = { ...newInsumes[insumeIndex], [name]: value };
      newEvents[subEventIndex] = {
        ...newEvents[subEventIndex],
        insumes: newInsumes,
      };
      return newEvents;
    });
  };

  const handleChangeOrganizers = (e, subEventIndex, organizerIndex) => {
    const { name, value } = e.target;
    setRegisterSubEvents((prevDataEvent) => {
      const newEvents = [...prevDataEvent];
      const newOrganizers = [...newEvents[subEventIndex].organizers];
      newOrganizers[organizerIndex] = {
        ...newOrganizers[organizerIndex],
        [name]: value,
      };
      newEvents[subEventIndex] = {
        ...newEvents[subEventIndex],
        organizers: newOrganizers,
      };
      return newEvents;
    });
  };

  const handleSubmitSubEvent = async (e) => {
    e.preventDefault();
    console.log(registerSubEvents);
    try {
      const newDataToSend = registerSubEvents.map((item) => ({
        ...item,
        start_date: dayjs(item.start_date).format("YYYY-MM-DD HH:mm:ss"),
        end_date: dayjs(item.end_date).format("YYYY-MM-DD HH:mm:ss"),
        spaces: item.spaces.map((space) => Number(space.id_space)),
        subeventConfirmation: "Confirmado",
      }));
      const dataToSend = [...newDataToSend];
      console.log(dataToSend);
      const result = await register(
        dataToSend,
        `/api/subEvents/create/${idEvent}`
      );
      setSuccesMessage("SubEvento creado correctamente");
      setErrorMessage("");
      console.log("Subevento registrado:", result);
      setRegisterSubEvents([
        {
          name: "",
          headquarters: "",
          start_date: "",
          end_date: "",
          description: "",
          subeventConfirmation: "Confirmado",
          spaces: [],
          insumes: [],
          organizers: [],
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
        subeventConfirmation: "",
        spaces: [],
        insumes: [],
        organizers: [],
      },
    ]);
  };

  const handleAddSpaces = async (subEventIndex, newSpace) => {
    setRegisterSubEvents((prevData) => {
      const updateSubEvents = [...prevData];
      updateSubEvents[subEventIndex] = {
        ...updateSubEvents[subEventIndex],
        spaces: [...updateSubEvents[subEventIndex].spaces, newSpace],
      };
      return updateSubEvents;
    });
  };

  const handleAddInsumes = async (subEventIndex, newInsume) => {
    setRegisterSubEvents((prevData) => {
      const updateSubEvents = [...prevData];
      updateSubEvents[subEventIndex] = {
        ...updateSubEvents[subEventIndex],
        insumes: [...updateSubEvents[subEventIndex].insumes, newInsume],
      };
      return updateSubEvents;
    });
  };

  const handleAddOrganizers = async (subEventIndex, newOrganizer) => {
    setRegisterSubEvents((prevData) => {
      const updateSubEvents = [...prevData];
      updateSubEvents[subEventIndex] = {
        ...updateSubEvents[subEventIndex],
        organizers: [
          ...updateSubEvents[subEventIndex].organizers,
          newOrganizer,
        ],
      };
      return updateSubEvents;
    });
  };

  const handleRemoveSubEvent = (index) => {
    setRegisterSubEvents((prevData) => {
      if (index === 0) {
        return prevData;
      }
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  const handleRemoveSpaces = (subEventIndex, spaceIndex) => {
    setRegisterSubEvents((prevData) => {
      const updateSubEvents = [...prevData];
      updateSubEvents[subEventIndex] = {
        ...updateSubEvents[subEventIndex],
        spaces: updateSubEvents[subEventIndex].spaces.filter(
          (_, index) => index !== spaceIndex
        ),
      };
      return updateSubEvents;
    });
  };

  const handleRemoveInsumes = (subEventIndex, insumeIndex) => {
    setRegisterSubEvents((prevData) => {
      const updateSubEvents = [...prevData];
      updateSubEvents[subEventIndex] = {
        ...updateSubEvents[subEventIndex],
        insumes: updateSubEvents[subEventIndex].insumes.filter(
          (_, index) => index !== insumeIndex
        ),
      };
      return updateSubEvents;
    });
  };

  const handleRemoveOrganizers = (subEventIndex, organizerIndex) => {
    setRegisterSubEvents((prevData) => {
      const updateSubEvents = [...prevData];
      updateSubEvents[subEventIndex] = {
        ...updateSubEvents[subEventIndex],
        organizers: updateSubEvents[subEventIndex].organizers.filter(
          (_, index) => index !== organizerIndex
        ),
      };
      return updateSubEvents;
    });
  };

  return (
    <>
      <AnimatePresence>
        {isSubEventosModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40"
              onClick={() => setIsSubEventosModalOpen(false)}
            >
              <div
                className="relative p-4 w-full z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative bg-white rounded-lg shadow">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-2xl font-semibold text-gray-900">
                      Crear SubEvento para `{globalEventname}`
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

                  <div className="px-4 pt-4 md:px-5 md:pt-5">
                    <form
                      className="min-h-full"
                      onSubmit={handleSubmitSubEvent}
                    >
                      <div className="flex flex-col">
                        <div>
                          <div className="overflow-y-auto max-h-[57vh] space-y-4">
                            {registerSubEvents &&
                              Array.isArray(registerSubEvents) &&
                              registerSubEvents.map((data, SubEventIndex) => (
                                <div
                                  key={SubEventIndex}
                                  className="rounded-xl px-4 flex flex-col gap-2"
                                >
                                  {SubEventIndex !== 0 && (
                                    <button
                                      className="flex items-end justify-end w-full"
                                      type="button"
                                      onClick={() =>
                                        handleRemoveSubEvent(SubEventIndex)
                                      }
                                    >
                                      <i className="ri-close-line text-2xl"></i>
                                    </button>
                                  )}
                                  <h2 className="font-bold text-3xl text-center">
                                    SubEvento {SubEventIndex + 1}
                                  </h2>
                                  <div className="grid grid-cols-2 gap-4 items-center">
                                    <div className="flex flex-col">
                                      <label
                                        className="mb-2 text-base font-bold text-gray-900"
                                        htmlFor="subeventName"
                                      >
                                        Nombre del SubEvento
                                      </label>
                                      <Input
                                        type="text"
                                        name="name"
                                        id="subeventName"
                                        placeholder="Semana del instructor"
                                        onChange={(e) =>
                                          handleChangeSubEvent(e, SubEventIndex)
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
                                        size="xs"
                                        id="sede"
                                        label="Ecoge la sede"
                                        name="headquarters"
                                        data-testid="tipo-espacios"
                                        onChange={(e) =>
                                          handleChangeSubEvent(e, SubEventIndex)
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
                                        <SelectItem key="La Ceja">
                                          La Ceja
                                        </SelectItem>
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
                                          handleChangeSubEvent(e, SubEventIndex)
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
                                          handleChangeSubEvent(e, SubEventIndex)
                                        }
                                        name="end_date"
                                        value={data.end_date}
                                      />
                                    </div>
                                  </div>

                                  <div className="flex flex-col">
                                    <label
                                      className="block mb-2 text-base font-bold text-gray-900"
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
                                        handleChangeSubEvent(e, SubEventIndex)
                                      }
                                      value={data.description}
                                    />
                                  </div>
                                  <hr className="border-2 my-3" />
                                  <div className="flex flex-col sm:flex-row justify-around sm:divide-x pb-6">
                                    <SubEventsHasSpaces
                                      spaces={spaces}
                                      subEventSpaces={data.spaces}
                                      SubEventIndex={SubEventIndex}
                                      onAddSpace={handleAddSpaces}
                                      onRemoveSpace={handleRemoveSpaces}
                                      onChangeSpace={handleChangeSpaces}
                                    />
                                    <InsumesModal
                                      insumes={data.insumes}
                                      SubEventIndex={SubEventIndex}
                                      onAddInsume={handleAddInsumes}
                                      onRemoveInsume={handleRemoveInsumes}
                                      onChangeInsume={handleChangeInsumes}
                                    />
                                    <OrganizersModal
                                      organizers={data.organizers}
                                      subEventIndex={SubEventIndex}
                                      onAddOrganizer={handleAddOrganizers}
                                      onRemoveOrganizer={handleRemoveOrganizers}
                                      onChangeOrganizer={handleChangeOrganizers}
                                    />
                                  </div>
                                </div>
                              ))}
                          </div>
                          <div className="max-h-[57vh]">
                            <Button
                              color="secondary"
                              className="my-2"
                              onClick={handleAddSubEvent}
                              endContent={<PlusIcon />}
                            >
                              Crear nuevo subevento {registerSubEvents.length}
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b">
                        <Button
                          type="submit"
                          className="focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white bg-primary"
                          aria-label="Crear evento"
                          data-testid="crear-evento"
                        >
                          Crear Subevento
                        </Button>
                        <Button
                          color="danger"
                          onClick={() => setIsSubEventosModalOpen(false)}
                        >
                          Cancelar
                        </Button>
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

SubEventosModal.propTypes = {
  isSubEventosModalOpen: PropTypes.bool,
  setIsSubEventosModalOpen: PropTypes.func,
  idEvent: PropTypes.number,
  globalEventname: PropTypes.string,
};

export default SubEventosModal;
