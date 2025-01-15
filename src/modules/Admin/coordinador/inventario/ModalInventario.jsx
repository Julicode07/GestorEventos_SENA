import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useState, useCallback, useEffect } from "react";
import useRegister from "../../../hooks/useRegister";
import { PlusIcon } from "@modules/Admin/components/PlusIcon";

const ModalInventario = () => {
  const { register } = useRegister();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState([
    { id_space: "" },
    {
      article_name: "",
      description: "",
      quantity: "",
      type: "",
    },
  ]);

  const [spaceInfo, setSpaceInfo] = useState([]);

  const getAllSpaces = useCallback(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/spaces/all`
    );
    const data = await response.json();
    setSpaceInfo(data);
  }, []);

  useEffect(() => {
    getAllSpaces();
  }, [getAllSpaces]);

  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeRegisterInventory = (e, index) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const newDataRegister = [...prevData];
      newDataRegister[index] = {
        ...newDataRegister[index],
        [name]: value,
      };
      return newDataRegister;
    });
  };

  const handleSubmitRegisterInventory = async (e) => {
    e.preventDefault();

    try {
      const id_space = formData[0].id_space;
      const newDataToSend = formData.slice(1).map((item) => ({
        ...item,
        quantity: Number(item.quantity),
      }));

      const dataToSend = [{ id_space: Number(id_space) }, ...newDataToSend];

      console.log(dataToSend);
      const result = await register(dataToSend, "/api/inventory/create");

      setSuccess("Inventario registrado con éxito!");
      setErrorMessage("");
      console.log("Inventario registrado:", result);

      setFormData([
        { id_space: "" },
        { article_name: "", description: "", quantity: "", type: "" },
      ]);
      window.location.reload();
    } catch (error) {
      setErrorMessage("Error al registrar el inventario");
      console.error("Error registering inventory:", error);
      setSuccess("");
    }
  };

  const handleAddItem = () => {
    setFormData((prevData) => [
      ...prevData,
      { article_name: "", description: "", quantity: "", type: "" },
    ]);
  };

  return (
    <>
      <Button
        color="secondary"
        onClick={() => setIsModalOpen(true)}
        endContent={<PlusIcon />}
      >
        Añadir Inventario
      </Button>
      {isModalOpen && (
        <form action="" onSubmit={handleSubmitRegisterInventory}>
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
                  <label className="pl-1" htmlFor="space">
                    Ingrese al espacio al que quiere asignar
                  </label>
                  <Select
                    id="space"
                    label="Espacio"
                    size="sm"
                    name="id_space"
                    value={formData[0].id_space}
                    data-testid="space"
                    onChange={(e) => handleChangeRegisterInventory(e, 0)}
                  >
                    {spaceInfo.map((space) => (
                      <SelectItem key={space.id_space}>{space.name}</SelectItem>
                    ))}
                  </Select>
                </div>

                {formData.slice(1).map((data, index) => (
                  <div key={index + 1}>
                    <h2 className="font-bold text-xl text-center mt-5">
                      Item {index + 1}
                    </h2>
                    <div className="w-full">
                      <label className="pl-1" htmlFor="nombre">
                        Ingrese el nombre
                      </label>
                      <Input
                        id="nombre"
                        className="w-full mb-4"
                        placeholder="Nombre"
                        name="article_name"
                        onChange={(e) =>
                          handleChangeRegisterInventory(e, index + 1)
                        }
                        value={data.article_name}
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
                        value={data.description}
                        onChange={(e) =>
                          handleChangeRegisterInventory(e, index + 1)
                        }
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
                        value={data.quantity}
                        onChange={(e) =>
                          handleChangeRegisterInventory(e, index + 1)
                        }
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
                        value={data.type}
                        data-testid="tipo-objeto"
                        onChange={(e) =>
                          handleChangeRegisterInventory(e, index + 1)
                        }
                      >
                        <SelectItem key="sonido">Sonido</SelectItem>
                        <SelectItem key="proyeccion">Proyección</SelectItem>
                        <SelectItem key="mobiliario">Mobiliario</SelectItem>
                      </Select>
                    </div>
                    <hr className="border-2 my-3" />
                  </div>
                ))}
              </div>

              <Button
                color="secondary"
                className="self-start mt-4"
                onClick={handleAddItem}
                endContent={<PlusIcon />}
              >
                Añadir más inventario {formData.slice(1).length}
              </Button>

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
                Crear Inventario
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default ModalInventario;
