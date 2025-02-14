import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useUpdate from "../../../hooks/useUpdate";
import PropTypes from "prop-types";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import dayjs from "dayjs";

const ModalSubEventosActualizar = ({
  idSubEvents,
  isModalUpdateSubEventsOpen,
  setIsModalUpdateSubEventsOpen,
}) => {
  const { update } = useUpdate();

  const [succesMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [restOfData, setRestOfData] = useState([]);

  const [updateSubEvents, setUpdateSubEvents] = useState({
    name: "",
    headquarters: "",
    start_date: "",
    end_date: "",
    description: "",
  });

  // update
  const [getDataToUpdate, setGetDataToUpdate] = useState([]);

  const getData = useCallback(async () => {
    if (!idSubEvents) return;
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/subEvents/${idSubEvents}`
    );
    const data = await response.json();
    setGetDataToUpdate(data);
  }, [idSubEvents]);

  useEffect(() => {
    if (getDataToUpdate.length > 0) {
      setUpdateSubEvents({
        name: getDataToUpdate[0].name || "",
        headquarters: getDataToUpdate[0].headquarters || "",
        start_date:
          dayjs(getDataToUpdate[0].start_date).format("YYYY-MM-DD HH:mm:ss") ||
          "",
        end_date:
          dayjs(getDataToUpdate[0].end_date).format("YYYY-MM-DD HH:mm:ss") ||
          "",
        description: getDataToUpdate[0].description || "",
      });
      setRestOfData(getDataToUpdate);
    }
  }, [getDataToUpdate]);

  useEffect(() => {
    getData();
  }, [getData]);

  //

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateSubEvents((prevDataEvent) => ({
      ...prevDataEvent,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(updateSubEvents);
    try {
      const { start_date, end_date, ...data } = updateSubEvents;
      const newDataToSend = {
        ...data,
        start_date: dayjs(start_date).format("YYYY-MM-DD HH:mm:ss"),
        end_date: dayjs(end_date).format("YYYY-MM-DD HH:mm:ss"),
      };
      console.log(newDataToSend);
      const result = await update(
        newDataToSend,
        `/api/subEvents/update/${idSubEvents}`
      );
      setSuccessMessage("El registro se actalizo exitosamente");
      setErrorMessage("");
      console.log("the data is: ", result);
      setUpdateSubEvents({
        id_global_event: "",
        name: "",
        headquarters: "",
        start_date: "",
        end_date: "",
        description: "",
      });
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      setErrorMessage("Ocurrio un error al actualizar el evento", error);
      setSuccessMessage("");
    }
  };

  return (
    <>
      {/* Modal to create event */}

      <AnimatePresence>
        {isModalUpdateSubEventsOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-40"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsModalUpdateSubEventsOpen(false);
                }
              }}
            >
              <div className="relative p-4 w-full max-w-2xl z-50">
                <div className="relative bg-white rounded-lg shadow">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                    <h3 className="text-3xl font-semibold text-gray-900">
                      Actualizar SubEvento `{restOfData[0]?.name}`
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                      onClick={() => setIsModalUpdateSubEventsOpen(false)}
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
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      <div className="overflow-y-auto max-h-[57vh] space-y-4">
                        <div className="flex flex-col gap-2 px-4">
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
                                onChange={handleChange}
                                value={updateSubEvents.name}
                              />
                            </div>
                            <div className="flex flex-col">
                              <div className="flex space-x-3">
                                <label
                                  className="block mb-2 text-base font-bold text-gray-900"
                                  htmlFor="sede"
                                >
                                  Sede Actual:
                                </label>
                                <span>{updateSubEvents.headquarters}</span>
                              </div>
                              <Select
                                size="xs"
                                id="sede"
                                label="Ecoge la sede"
                                name="headquarters"
                                data-testid="tipo-espacios"
                                onChange={handleChange}
                                value={updateSubEvents.headquarters}
                              >
                                <SelectItem key="">Seleccione el tipo</SelectItem>
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
                                onChange={handleChange}
                                name="start_date"
                                value={updateSubEvents.start_date}
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
                                onChange={handleChange}
                                name="end_date"
                                value={updateSubEvents.end_date}
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
                              onChange={handleChange}
                              value={updateSubEvents.description}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center pt-4 md:pt-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b">

                        <Button
                          type="submit"
                          className="focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white bg-primary"
                          aria-label="Crear evento"
                          data-testid="crear-evento"
                        >
                          Actualizar Subevento
                        </Button>
                        <Button
                          color="danger"
                          onClick={() => setIsModalUpdateSubEventsOpen(false)}
                        >
                          Cancelar
                        </Button>
                      </div>
                      <div className="flex justify-center pb-3">
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

ModalSubEventosActualizar.propTypes = {
  isModalUpdateSubEventsOpen: PropTypes.bool,
  setIsModalUpdateSubEventsOpen: PropTypes.func,
  idSubEvents: PropTypes.number,
};

export default ModalSubEventosActualizar;
