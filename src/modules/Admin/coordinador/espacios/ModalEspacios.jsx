import { Input, Button, Textarea, Select, SelectItem } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import useRegister from "../../../hooks/useRegister";
import { PlusIcon } from "@modules/Admin/components/PlusIcon";

const ModalEspacios = () => {
  const { register } = useRegister();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    type: "",
    status: "",
    details: "",
  });
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeRegisterSpaces = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newDataRegister = {
        ...prevData,
        [name]: value,
      };
      return newDataRegister;
    });
  };

  const handleSubmitRegisterSpaces = async (e) => {
    e.preventDefault();
    try {
      const { capacity, ...data } = formData;
      const newDataToSend = {
        ...data,
        capacity: Number(capacity),
      };
      console.log(newDataToSend);
      const result = await register(newDataToSend, "/api/spaces/new");
      setSuccess("Espacio registrado con exito!");
      setErrorMessage("");
      console.log("Espacio registrado:", result);
      setFormData({
        name: "",
        capacity: "",
        type: "",
        status: "",
        details: "",
      });
      window.location.reload();
    } catch (error) {
      setErrorMessage("Error al registrar el espacio");
      console.error("Error registering user:", error);
      setSuccess("");
    }
  };
  return (
    <>
      <Button
        className="bg-primary/80 text-white"
        onClick={() => setIsModalOpen(true)}
        endContent={<PlusIcon />}
      >
        Nuevo Espacio
      </Button>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsModalOpen(false);
              }
            }}
          >
            <div className="relative p-4 w-full h-auto sm:h-auto max-w-2xl z-50 flex flex-col">
              <div className="relative bg-white rounded-lg shadow h-full overflow-hidden flex flex-col my-8">
                <div className="flex items-center justify-between py-4 px-8 border-b rounded-t">
                  <h3 className="text-3xl text-start font-semibold text-gray-900">
                    Añadir un nuevo espacio
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <svg
                      className="w-3 h-3"
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
                  </button>
                </div>

                <div
                  className="px-5 pt-5 pb-3 overflow-y-auto flex-grow"
                  style={{ maxHeight: "calc(100vh - 180px)" }}
                >
                  <form className="" onSubmit={handleSubmitRegisterSpaces}>
                    <div className="flex flex-col md:grid md:grid-cols-2 gap-4 max-w-xl mx-auto">
                      {[
                        {
                          label: "Nombre del espacio",
                          type: "text",
                          name: "name",
                          placeholder: "Nombre",
                        },
                        {
                          label: "Capacidad",
                          type: "number",
                          name: "capacity",
                          placeholder: "Capacidad",
                        },
                      ].map(({ label, type, name, placeholder }) => (
                        <div key={name}>
                          <label
                            className="block mb-2 text-lg font-bold text-gray-900"
                            htmlFor={name}
                          >
                            {label}
                          </label>
                          <Input
                            type={type}
                            name={name}
                            id={name}
                            value={formData[name] || ""}
                            placeholder={placeholder}
                            onChange={handleChangeRegisterSpaces}
                          />
                        </div>
                      ))}
                      <div>
                        <label className="block mb-2 text-lg font-bold text-gray-900">
                          Tipo de espacio
                        </label>
                        <Select
                          id="tipo-espacio"
                          label="Tipo de espacio"
                          name="type"
                          value={formData.type}
                          onChange={handleChangeRegisterSpaces}
                        >
                          <SelectItem key="">Seleccione el tipo</SelectItem>
                          <SelectItem key="aula">Aula</SelectItem>
                          <SelectItem key="piso">Piso</SelectItem>
                          <SelectItem key="edificio">Edificio</SelectItem>
                          <SelectItem key="oficina">Oficina</SelectItem>
                        </Select>
                      </div>
                      <div>
                        <label className="block mb-2 text-lg font-bold text-gray-900">
                          Estado del espacio
                        </label>
                        <Select
                          id="estado-espacio"
                          label="Estado del espacio"
                          name="status"
                          value={formData.status}
                          onChange={handleChangeRegisterSpaces}
                        >
                          <SelectItem key="">Seleccione el estado</SelectItem>
                          <SelectItem key="activo">Activo</SelectItem>
                          <SelectItem key="inactivo">Inactivo</SelectItem>
                        </Select>
                      </div>
                      <div className="col-span-2">
                        <label className="block mb-2 text-lg font-bold text-gray-900">
                          Detalles
                        </label>
                        <Textarea
                          id="observaciones"
                          name="details"
                          placeholder="Detalles adicionales"
                          value={formData.details}
                          onChange={handleChangeRegisterSpaces}
                        />
                      </div>

                      {/* Mensajes de éxito y error */}
                    </div>
                    {/* Los botones dentro del formulario */}
                    <div className="w-full h-full sticky -bottom-2 z-50 p-2 bg-white border-t border-gray-200 mt-3">

                      <div className="flex items-center justify-center space-x-4 my-3 md:my-0">
                        <Button
                          type="submit"
                          color="primary"
                          onClick={handleSubmitRegisterSpaces}
                        >
                          Registrar Espacio
                        </Button>
                        <Button
                          color="danger"
                          onClick={() => setIsModalOpen(false)}
                        >
                          Cancelar
                        </Button>
                      </div>
                      {(success || errorMessage) && (
                        <div className="col-span-2 text-center mt-2">
                          {success && <p className="text-green-600">{success}</p>}
                          {errorMessage && (
                            <p className="text-red-600">{errorMessage}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModalEspacios;
