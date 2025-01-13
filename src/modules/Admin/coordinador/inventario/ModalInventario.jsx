import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import useRegister from "../../../hooks/useRegister";
import { PlusIcon } from "@modules/Admin/components/PlusIcon";

const ModalInventario = () => {
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
    } catch (error) {
      setErrorMessage("Error al registrar el espacio");
      console.error("Error registering user:", error);
      setSuccess("");
    }
  };
  return (
    <>
      <Button
        color="primary"
        onClick={() => setIsModalOpen(true)}
        endContent={<PlusIcon />}
      >
        Añadir
      </Button>
      {isModalOpen && (
        <form action="" onSubmit={handleSubmitRegisterSpaces}>
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
                Añadir objeto al inventario
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
                    name="name"
                    onChange={handleChangeRegisterSpaces}
                    value={formData.name}
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
                    type="number"
                    name="description"
                    value={formData.capacity}
                    onChange={handleChangeRegisterSpaces}
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
                    value={formData.capacity}
                    onChange={handleChangeRegisterSpaces}
                  />
                </div>
                <div className="w-full mb-4">
                  <label className="pl-1" htmlFor="tipo-objeto">
                    Seleccione el tipo de objeto
                  </label>

                  <Select
                    id="tipo-objeto"
                    label="Tipo de objeto"
                    className=""
                    size="sm"
                    name="type"
                    value={formData.type}
                    data-testid="tipo-objeto"
                    onChange={handleChangeRegisterSpaces}
                  >
                    <SelectItem key="sonido">Sonido</SelectItem>
                    <SelectItem key="proyeccion">Proyección</SelectItem>
                    <SelectItem key="mobiliario">Mobiliario</SelectItem>
                  </Select>
                </div>
                <div className="w-full mb-4">
                  <label className="pl-1" htmlFor="nombre-espacio">
                    Seleccione el espacio al que pertenece
                  </label>

                  <Select
                    id="nombre-espacio"
                    label="Nombre del espacio"
                    className=""
                    size="sm"
                    name="space_name"
                    value={formData.type}
                    data-testid="tipo-objeto"
                    onChange={handleChangeRegisterSpaces}
                  >
                    <SelectItem key="sonido">Aditorio principal</SelectItem>
                    <SelectItem key="proyeccion">Salon 101</SelectItem>
                    <SelectItem key="mobiliario">Salon 202</SelectItem>
                  </Select>
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
                Crear objeto
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default ModalInventario;
