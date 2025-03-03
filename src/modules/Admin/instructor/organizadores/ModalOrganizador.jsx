import { Input, Button, Select, SelectItem, Textarea } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import useRegister from "../../../hooks/useRegister";
import { PlusIcon } from "@modules/Admin/components/PlusIcon";
import SearchableSelect from "./SearchableSelect";

const ModalOrganizador = () => {
  const { register } = useRegister();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    id_sub_event: "",
    name: "",
    rol: "",
    email: "",
    address: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [subEvents, setSubEvents] = useState([]);

  const getSubEvents = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/subEvents/get/all`
      );
      const data = await response.json();
      setSubEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Ocurrio un error al traer la data", err);
    }
  }, []);

  useEffect(() => {
    getSubEvents();
  }, [getSubEvents]);

  const handleChangeSubEvents = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newDataRegister = {
        ...prevData,
        [name]: value,
      };
      return newDataRegister;
    });
  };

  const handleSubmitSubEvents = async (e) => {
    e.preventDefault();
    try {
      const { id_sub_event, ...data } = formData;
      const newData = {
        id_sub_event: Number(id_sub_event),
        ...data,
      };
      await register(newData, "/api/organizers/new");
      setErrorMessage("");
      setFormData({
        id_sub_event: "",
        name: "",
        rol: "",
        email: "",
        address: "",
      });
      window.location.reload();
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error registering organizer:", error);
    }
  };

  return (
    <>
      <Button
        className="bg-primary/80 text-white"
        onClick={() => setIsModalOpen(true)}
        endContent={<PlusIcon />}
      >
        Nuevo Organizador
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
                    {" "}
                    Añadir un nuevo organizador
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
                  <form className="" onSubmit={handleSubmitSubEvents}>
                    <div className="flex flex-col md:grid md:grid-cols-2 gap-4 max-w-xl mx-auto">
                      <div>
                        <SearchableSelect
                          options={subEvents}
                          value={formData.id_sub_event}
                          onChange={handleChangeSubEvents}
                          placeholder="Seleccione el evento"
                          name="id_sub_event"
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-lg font-bold text-gray-900">
                          Nombre del organizador
                        </label>
                        <Input
                          id="organizer"
                          placeholder="Nombre del organizador"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChangeSubEvents}
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-lg font-bold text-gray-900">
                          Seleccione el rol
                        </label>

                        <Select
                          id="role"
                          size="xl"
                          label="Rol"
                          name="rol"
                          value={formData.rol}
                          onChange={handleChangeSubEvents}
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
                      <div className="">
                        <label className="block mb-2 text-lg font-bold text-gray-900">
                          Ingrese el correo
                        </label>
                        <Input
                          id="email"
                          placeholder="Correo"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChangeSubEvents}
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block mb-2 text-lg font-bold text-gray-900">
                          Ingrese la direccion
                        </label>
                        <Textarea
                          id="address"
                          className="w-full mb-4"
                          placeholder="Direccion"
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChangeSubEvents}
                        />
                      </div>
                    </div>

                    <div className="w-full h-full sticky -bottom-2 z-50 p-2 bg-white border-t border-gray-200 mt-3">
                      <div className="flex items-center justify-center space-x-4 my-3 md:my-0">
                        <Button type="submit" color="primary">
                          Crear Organizador
                        </Button>
                        <Button
                          color="danger"
                          onClick={() => setIsModalOpen(false)}
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

export default ModalOrganizador;
