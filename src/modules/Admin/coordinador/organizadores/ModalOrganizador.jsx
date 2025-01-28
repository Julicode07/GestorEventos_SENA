import { Input, Button, Select, SelectItem, Textarea } from "@nextui-org/react";
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
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [subEvents, setSubEvents] = useState([]);

  const getSubEvents = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/subEvents/get/all`
      );
      const data = await response.json();
      setSubEvents(data);
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
      console.log(newData);
      const result = await register(newData, "/api/organizers/new");
      setSuccess("Organizador registrado con exito!");
      setErrorMessage("");
      console.log("Organizador registrado:", result);
      setFormData({
        id_sub_event: "",
        name: "",
        rol: "",
        email: "",
        address: "",
      });
      // window.location.reload();
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error registering organizer:", error);
      setSuccess("");
    }
  };

  // const [selectedOption, setSelectedOption] = useState("");
  return (
    <>
      <Button
        color="primary"
        onClick={() => setIsModalOpen(true)}
        endContent={<PlusIcon />}
      >
        Nuevo Organizador
      </Button>
      {isModalOpen && (
        <form action="" onSubmit={handleSubmitSubEvents}>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 h-screen"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className={`bg-white border border-gray-300 shadow-2xl p-8 rounded-2xl w-4/5 max-w-2xl flex flex-col items-center relative transition-transform transform ${
                isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
              } transition-all duration-300 ease-out`}
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: "90vh" }}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                type="button"
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
              </button>

              <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Añadir un nuevo organizador
              </h2>
              <div className="w-full overflow-y-auto max-h-[50vh] px-2">
                <div>
                  <SearchableSelect
                    options={subEvents}
                    value={formData.id_sub_event}
                    onChange={handleChangeSubEvents}
                    label="Seleccione el evento"
                    name="id_sub_event"
                  />
                </div>
                <div className="w-full">
                  <label className="pl-1" htmlFor="organizer">
                    Ingrese el nombre del organizador
                  </label>
                  <Input
                    id="organizer"
                    className="w-full mb-4"
                    placeholder="Nombre del organizador"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChangeSubEvents}
                  />
                </div>
                <div className="w-full mb-4">
                  <label className="pl-1" htmlFor="role">
                    Seleccione el rol
                  </label>

                  <Select
                    id="role"
                    size="sm"
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
                <div className="w-full">
                  <label className="pl-1" htmlFor="email">
                    Ingrese el correo
                  </label>
                  <Input
                    id="email"
                    className="w-full mb-4"
                    placeholder="Correo"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChangeSubEvents}
                  />
                </div>
                <div className="w-full">
                  <label className="pl-1" htmlFor="address">
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

              <div className="my-2">
                {success && (
                  <div className="text-center text-sm text-green-600 font-bold">
                    {success}
                  </div>
                )}
                {errorMessage && (
                  <div className="text-center text-sm text-red-600 font-bold">
                    {errorMessage}
                  </div>
                )}
              </div>
              <Button color="primary" type="submit">
                Crear organizador
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default ModalOrganizador;
