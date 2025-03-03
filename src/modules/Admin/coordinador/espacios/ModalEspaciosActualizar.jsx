import { Input, Button, Textarea, Select, SelectItem } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import useUpdate from "../../../hooks/useUpdate";
import PropTypes from "prop-types";

const ModalEspaciosActualizar = ({ isModalOpen, setIsModalOpen, idSpaces }) => {
  const { update } = useUpdate();
  const [getSpaceById, setGetSpaceById] = useState([]);
  const [updateSpace, setUpdateSpace] = useState({
    name: "",
    capacity: "",
    type: "",
    status: "",
    details: "",
  });

  const getSpace = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/spaces/${idSpaces}`
      );
      const data = await response.json();
      setGetSpaceById(data);
    } catch (err) {
      console.error("No se pudo traer la data", err);
    }
  }, [idSpaces]);

  useEffect(() => {
    if (getSpaceById.length > 0) {
      setUpdateSpace({
        name: getSpaceById[0].name,
        capacity: getSpaceById[0].capacity,
        type: getSpaceById[0].type,
        status: getSpaceById[0].status,
        details: getSpaceById[0].details,
      });
    }
  }, [getSpaceById]);

  useEffect(() => {
    getSpace();
  }, [getSpace]);

  const [errorMessage, setErrorMessage] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateSpace((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await update(updateSpace, `/api/spaces/update/${idSpaces}`);
      setUpdateSpace({
        name: "",
        capacity: "",
        type: "",
        status: "",
      });
      window.location.reload();
    } catch (error) {
      setErrorMessage("No se pudo actualizar el espacio");
      console.error("No se pudo actualizar el espacio", error);
    }
  };
  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <form action="" onSubmit={handleSubmit}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 h-screen"
              onClick={() => setIsModalOpen(false)}
            >
              <div
                className={`bg-white border border-gray-300 shadow-2xl px-6 pt-8 rounded-2xl w-4/5 max-w-2xl flex flex-col items-center relative transition-transform transform ${isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                  } transition-all duration-300 ease-out`}
                onClick={(e) => e.stopPropagation()}
                style={{ maxHeight: "90vh" }}
              >
                <a
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setIsModalOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path>
                  </svg>
                </a>

                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                  Actualizar espacio {getSpaceById.name}
                </h2>
                <div className="w-full overflow-y-auto max-h-[50vh] px-2">
                  <div className="w-full">
                    <label className="pl-1" htmlFor="nombre-espacio">
                      Ingrese el nombre del espacio
                    </label>
                    <Input
                      id="nombre-espacio"
                      className="w-full mb-4"
                      placeholder="Nombre"
                      name="name"
                      onChange={handleChange}
                      value={updateSpace.name || ""}
                    />
                  </div>
                  <div className="w-full">
                    <label className="pl-1" htmlFor="capacidad">
                      Ingrese la capacidad
                    </label>
                    <Input
                      id="capacidad"
                      className="w-full mb-4"
                      placeholder="Capacidad"
                      type="number"
                      name="capacity"
                      value={updateSpace.capacity || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full mb-4">
                    <label className="pl-1" htmlFor="tipo-espacio">
                      Seleccione el tipo de espacio
                    </label>
                    <span className="block my-2">
                      <b>Espacio actual:</b> {updateSpace.type}
                    </span>
                    <Select
                      id="tipo-espacio"
                      label="Seleccione el tipo"
                      className=""
                      name="type"
                      value={updateSpace.type || ""}
                      data-testid="tipo-espacios"
                      onChange={handleChange}
                    >
                      <SelectItem key="">Seleccione el tipo</SelectItem>
                      <SelectItem key="aula">Aula</SelectItem>
                      <SelectItem key="piso">Piso</SelectItem>
                      <SelectItem key="edificio">Edificio</SelectItem>
                      <SelectItem key="oficina">Oficina</SelectItem>
                    </Select>
                  </div>
                  <div className="w-full mb-4">
                    <label className="pl-1" htmlFor="estado-espacio">
                      Seleccione el estado del espacio
                    </label>
                    <span className="block my-2">
                      <b>Estado actual:</b> {updateSpace.status}
                    </span>
                    <Select
                      id="estado-espacio"
                      label="Seleccione el estado"
                      className=""
                      name="status"
                      value={updateSpace.status || ""}
                      data-testid="estado-espacio"
                      onChange={handleChange}
                    >
                      <SelectItem key="activo">Activo</SelectItem>
                      <SelectItem key="inactivo">Inactivo</SelectItem>
                    </Select>
                  </div>
                  <div className="w-full">
                    <label className="pl-1" htmlFor="observaciones">
                      Ingrese las observaciones
                    </label>
                    <Textarea
                      id="observaciones"
                      placeholder="Observaciones"
                      className="mb-4"
                      name="details"
                      value={updateSpace.details || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="w-full h-full sticky -bottom-2 z-50 p-2 bg-white border-t border-gray-200 mt-3">
                  <div className="flex items-center justify-center space-x-4 my-3 md:my-0">
                    <Button type="submit" color="primary">
                      Actualizar Espacio
                    </Button>
                    <Button
                      color="danger"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                  {errorMessage && (
                    <div className="col-span-2 text-center my-4">
                      {errorMessage && (
                        <p className="text-red-600">{errorMessage}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </form>
        )}
      </AnimatePresence>
    </>
  );
};
ModalEspaciosActualizar.propTypes = {
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
  idSpaces: PropTypes.number,
};

export default ModalEspaciosActualizar;
