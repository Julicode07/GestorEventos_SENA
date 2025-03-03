import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import useUpdate from "../../../hooks/useUpdate";
import PropTypes from "prop-types";

const ModalInventarioActualizar = ({
  isModalOpen,
  setIsModalOpen,
  idInventory,
}) => {
  const { update } = useUpdate();
  const [getInventoryById, setGetInventoryById] = useState([]);
  const [updateInventory, setUpdateInventory] = useState({
    article_name: "",
    description: "",
    quantity: "",
    type: "",
  });

  const getInventory = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/inventory/get/${idInventory}`
      );
      const data = await response.json();
      setGetInventoryById(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Ocurrio un error al traer la data", error);
    }
  }, [idInventory]);

  useEffect(() => {
    if (getInventoryById.length > 0) {
      setUpdateInventory({
        article_name: getInventoryById[0].article_name,
        description: getInventoryById[0].description,
        quantity: getInventoryById[0].quantity,
        type: getInventoryById[0].type,
      });
    }
  }, [getInventoryById]);

  useEffect(() => {
    getInventory();
  }, [getInventory]);

  const [errorMessage, setErrorMessage] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateInventory((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await update(
        updateInventory,
        `/api/inventory/update/space/${idInventory}`
      );

      setUpdateInventory({
        id_inventory: "",
        id_space: "",
        article_name: "",
        description: "",
        quantity: "",
        type: "",
      });
      window.location.reload();
    } catch (error) {
      setErrorMessage("No se pudo actualizar el inventario");
      console.error("No se pudo registrar la data", error);
    }
  };
  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <form action="" onSubmit={handleSubmit}>
            <div
              className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 h-screen"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`bg-white border border-gray-300 shadow-2xl px-8 pt-8 rounded-2xl w-4/5 max-w-2xl flex flex-col items-center relative transition-transform transform ${isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
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
                  Actualizar Inventario {idInventory} del espacio de `
                  {getInventoryById[0]?.name}`
                </h2>
                <div className="w-full overflow-y-auto max-h-[50vh] px-2">
                  <div className="w-full">
                    <label className="pl-1" htmlFor="nombre">
                      Ingrese el nombre
                    </label>
                    <Input
                      id="nombre"
                      className="w-full mb-4"
                      placeholder="Nombre"
                      name="article_name"
                      onChange={handleChange}
                      value={updateInventory.article_name || ""}
                    />
                  </div>
                  <div className="w-full">
                    <label className="pl-1" htmlFor="descripcion">
                      Ingrese la descripcion
                    </label>
                    <Input
                      id="descripcion"
                      className="w-full mb-4"
                      placeholder="Descripcion"
                      type="text"
                      name="description"
                      onChange={handleChange}
                      value={updateInventory.description || ""}
                    />
                  </div>
                  <div className="w-full">
                    <label className="pl-1" htmlFor="cantidad">
                      Ingrese la cantidad
                    </label>
                    <Input
                      id="cantidad"
                      className="w-full mb-4"
                      placeholder="Cantidad"
                      type="number"
                      name="quantity"
                      onChange={handleChange}
                      value={updateInventory.quantity || ""}
                    />
                  </div>
                  <div className="w-full mb-4">
                    <label className="pl-1" htmlFor="tipo-objeto">
                      <b>Seleccione el tipo de objeto: </b>
                      {updateInventory.type}
                    </label>

                    <Select
                      id="tipo-objeto"
                      placeholder="Tipo de objeto"
                      className=""
                      size="sm"
                      name="type"
                      onChange={handleChange}
                      value={updateInventory.article_name || ""}
                      data-testid="tipo-objeto"
                    >
                      <SelectItem key="sonido">Sonido</SelectItem>
                      <SelectItem key="proyeccion">Proyección</SelectItem>
                      <SelectItem key="mobiliario">Mobiliario</SelectItem>
                    </Select>
                  </div>
                  <hr className="border-2 my-3" />
                </div>

                <div className="w-full h-full sticky -bottom-2 z-50 p-2 bg-white border-t border-gray-200 mt-3">
                  <div className="flex items-center justify-center space-x-4 my-3 md:my-0">
                    <Button type="submit" color="primary">
                      Actualizar Inventario
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
              </motion.div>
            </div>
          </form>
        )}
      </AnimatePresence>
    </>
  );
};
ModalInventarioActualizar.propTypes = {
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
  idInventory: PropTypes.number,
};

export default ModalInventarioActualizar;
