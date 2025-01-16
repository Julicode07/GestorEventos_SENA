import { Input, Button, Textarea, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import useRegister from "../../../hooks/useRegister";
import { PlusIcon } from "@modules/Admin/components/PlusIcon";

const ModalEspaciosActualizar = ({ isOpen, setIsOpen }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <>
      {isOpen && (
        <form action="">
          <div
            className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 h-screen"
            onClick={() => setIsOpen(false)}
          >
            <div
              className={`bg-white border border-gray-300 shadow-2xl p-8 rounded-2xl w-4/5 max-w-2xl flex flex-col items-center relative transition-transform transform ${
                isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
              } transition-all duration-300 ease-out`}
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: "90vh" }}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setIsOpen(false)}
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
                Añadir un nuevo espacio
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
                    // onChange={handleChangeRegisterSpaces}
                    // value={formData.name}
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
                    // value={formData.capacity}
                    // onChange={handleChangeRegisterSpaces}
                  />
                </div>
                <div className="w-full mb-4">
                  <label className="pl-1" htmlFor="tipo-espacio">
                    Seleccione el tipo de espacio
                  </label>

                  <Select
                    id="tipo-espacio"
                    label="Tipo de espacio"
                    className=""
                    name="type"
                    // value={formData.type}
                    // data-testid="tipo-espacios"
                    // onChange={handleChangeRegisterSpaces}
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
                  <Select
                    id="estado-espacio"
                    label="Estado del espacio"
                    className=""
                    name="status"
                    // value={formData.status}
                    // data-testid="estado-espacio"
                    // onChange={handleChangeRegisterSpaces}
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
                    // value={formData.details}
                    // onChange={handleChangeRegisterSpaces}
                  />
                </div>
              </div>

              <div className="my-2">
                {successMessage && (
                  <div className="text-center text-sm text-green-600 font-bold">
                    {successMessage}
                  </div>
                )}
                {errorMessage && (
                  <div className="text-center text-sm text-red-600 font-bold">
                    {errorMessage}
                  </div>
                )}
              </div>
              <Button color="primary" type="submit">
                Crear espacio
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default ModalEspaciosActualizar;
