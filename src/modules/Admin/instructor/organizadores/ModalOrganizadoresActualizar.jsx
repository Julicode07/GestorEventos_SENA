import { Input, Button, Textarea, Select, SelectItem } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import useUpdate from "../../../hooks/useUpdate";
import PropTypes from "prop-types";

const ModalOrganizadoresActualizar = ({
  isOrganizersUpdateModalOpen,
  setIsOrganizersUpdateModalOpen,
  idOrganizer,
}) => {
  const { update } = useUpdate();
  const [organizersById, setOrganizersById] = useState([]);
  const [updateOrganizers, setUpdateOrganizers] = useState({
    id_organizer: idOrganizer,
    name: "",
    rol: "",
    email: "",
    address: "",
  });
  const [restOfData, setRestOfData] = useState({});

  const getOrganizers = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/organizers/get/${idOrganizer}`
      );
      const data = await response.json();
      setOrganizersById(data);
    } catch (err) {
      console.error("No se pudo traer la data", err);
    }
  }, [idOrganizer]);

  useEffect(() => {
    getOrganizers();
  }, [getOrganizers]);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (organizersById.length !== 0) {
      setUpdateOrganizers({
        name: organizersById.name || "",
        rol: organizersById.rol || "",
        email: organizersById.email || "",
        address: organizersById.address || "",
      });
    }
    setRestOfData(organizersById);
  }, [organizersById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateOrganizers((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { id_organizer, ...data } = updateOrganizers;
      const newData = {
        id_organizer: Number(id_organizer),
        ...data,
      };
      await update(newData, `/api/organizers/update/${idOrganizer}`);
      setErrorMessage("");
      setUpdateOrganizers({
        id_organizer: "",
        name: "",
        rol: "",
        email: "",
        address: "",
      });
      window.location.reload();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  return (
    <>
      <AnimatePresence>
        {isOrganizersUpdateModalOpen && (
          <form action="" onSubmit={handleSubmit}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 h-screen"
              onClick={() => setIsOrganizersUpdateModalOpen(false)}
            >
              <div
                className={`bg-white border border-gray-300 shadow-2xl px-8 pt-8 rounded-2xl w-4/5 max-w-2xl flex flex-col items-center relative transition-transform transform ${isOrganizersUpdateModalOpen
                  ? "scale-100 opacity-100"
                  : "scale-95 opacity-0"
                  } transition-all duration-300 ease-out`}
                onClick={(e) => e.stopPropagation()}
                style={{ maxHeight: "90vh" }}
              >
                <a
                  href="#"
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setIsOrganizersUpdateModalOpen(false)}
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
                  Actualizar Organizador `{restOfData?.name}`
                </h2>
                <div className="w-full overflow-y-auto max-h-[50vh] px-2">
                  <div className="w-full">
                    <label className="pl-1" htmlFor="nombre-organizador">
                      Ingrese el nombre para actualizar
                    </label>
                    <Input
                      id="nombre-organizador"
                      className="w-full mb-4"
                      placeholder="Nombre"
                      name="name"
                      onChange={handleChange}
                      value={updateOrganizers.name || ""}
                    />
                  </div>
                  <div className="w-full">
                    <label className="pl-1" htmlFor="address">
                      Ingrese la dirección para actualizar
                    </label>
                    <Textarea
                      id="address"
                      className="w-full mb-4"
                      placeholder="Dirección"
                      name="address"
                      value={updateOrganizers.address || ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full mb-4">
                    <label className="pl-1" htmlFor="role">
                      Seleccione el role para actualizar
                    </label>
                    <span className="block my-2">
                      <b>Espacio actual:</b> {updateOrganizers.rol}
                    </span>
                    <Select
                      id="role"
                      size="sm"
                      placeholder="Rol"
                      name="rol"
                      value={updateOrganizers.rol}
                      onChange={handleChange}
                    >
                      <SelectItem key="Aprendiz">Aprendiz</SelectItem>
                      <SelectItem key="Docente">Docente</SelectItem>
                      <SelectItem key="Coordinador">Coordinador</SelectItem>
                      <SelectItem key="Personal">Personal</SelectItem>
                      <SelectItem key="Persona externa">
                        Persona externa
                      </SelectItem>
                    </Select>
                  </div>
                  <div className="w-full mb-4">
                    <label className="pl-1" htmlFor="email">
                      Ingresa el nuevo email para actualizar
                    </label>
                    <Input
                      id="email"
                      placeholder="Ingresa el email"
                      name="email"
                      type="email"
                      value={updateOrganizers.email || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="w-full h-full sticky -bottom-2 z-50 p-2 bg-white border-t border-gray-200 mt-3">
                  <div className="flex items-center justify-center space-x-4 my-3 md:my-0">
                    <Button type="submit" color="primary">
                      Actualizar Organizador
                    </Button>
                    <Button
                      color="danger"
                      onClick={() => setIsOrganizersUpdateModalOpen(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                  <div className="col-span-2 text-center my-4">
                    {errorMessage && (
                      <p className="text-red-600">{errorMessage}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </form>
        )}
      </AnimatePresence>
    </>
  );
};
ModalOrganizadoresActualizar.propTypes = {
  isOrganizersUpdateModalOpen: PropTypes.bool,
  setIsOrganizersUpdateModalOpen: PropTypes.func,
  idOrganizer: PropTypes.number,
};

export default ModalOrganizadoresActualizar;
