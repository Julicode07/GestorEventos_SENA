import { Select, SelectItem, Input, Button } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useUpdate from "../../../hooks/useUpdate";

const ModalActualizarUsuarios = ({
  idUsers,
  isModalActualizarUsariosOpen,
  setIsModalActualizarUsariosOpen,
}) => {
  const { update } = useUpdate();
  const [userData, setUserData] = useState({
    document: "",
    name: "",
    last_names: "",
    email: "",
    phone: "",
    role: "",
  });
  const [originalUserData, setOriginalUserData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchUserData = useCallback(async () => {
    if (!idUsers) return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${idUsers}`
      );
      const data = await response.json();
      setUserData(data);
      setOriginalUserData(data); // Guardar los datos originales
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  }, [idUsers]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { document, ...data } = userData;
      const updatedData = { ...data, document: Number(document) };
      await update(updatedData, `/api/users/update/${idUsers}`);
      setErrorMessage("");
      window.location.reload();
    } catch (error) {
      console.error("Error updating user data:", error);
      setErrorMessage("No se pudo actualizar la información!");
    }
  };

  return (
    isModalActualizarUsariosOpen && (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-40"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsModalActualizarUsariosOpen(false);
          }
        }}
      >
        <div className="relative p-4 w-full max-w-2xl z-50">
          <div className="relative bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-5 border-b rounded-t">
              <h3 className="text-3xl font-semibold text-gray-900">
                Actualizar usuario: {originalUserData.name}{" "}
                {originalUserData.last_names}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                onClick={() => setIsModalActualizarUsariosOpen(false)}
              >
                <svg
                  className="w-4 h-4"
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
              </button>
            </div>

            <div className="px-4 pt-4 md:px-5 md:pt-5">
              <form
                className="grid grid-cols-2 gap-4 max-w-xl mx-auto"
                onSubmit={handleSubmit}
              >
                {[
                  {
                    label: "Documento",
                    type: "number",
                    name: "document",
                    placeholder: "Documento",
                  },
                  {
                    label: "Nombre",
                    type: "text",
                    name: "name",
                    placeholder: "Nombre",
                  },
                  {
                    label: "Apellidos",
                    type: "text",
                    name: "last_names",
                    placeholder: "Apellidos",
                  },
                  {
                    label: "Email",
                    type: "email",
                    name: "email",
                    placeholder: "Email",
                  },
                  {
                    label: "Teléfono",
                    type: "number",
                    name: "phone",
                    placeholder: "Teléfono",
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
                      value={userData[name] || ""}
                      placeholder={placeholder}
                      onChange={handleChange}
                    />
                  </div>
                ))}

                <div>
                  <label className="block mb-2 text-lg text-gray-900">
                    <span className="font-bold">Rol Actual:</span>{" "}
                    {userData.role}
                  </label>
                  <Select
                    id="role"
                    size="sm"
                    label="Rol"
                    name="role"
                    value={userData.role}
                    onChange={handleChange}
                  >
                    <SelectItem key="Coordinador">Coordinador</SelectItem>
                    <SelectItem key="Instructor">Instructor</SelectItem>
                  </Select>
                </div>

                <div className="col-span-2 flex items-center justify-center p-4 space-x-3 border-t border-gray-200">
                  <Button type="submit" color="primary">
                    Actualizar Usuario
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => setIsModalActualizarUsariosOpen(false)}
                  >
                    Cancelar
                  </Button>
                </div>
                {errorMessage && (
                  <div className="col-span-2 text-center mb-5">
                    {errorMessage && (
                      <p className="text-red-600">{errorMessage}</p>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

ModalActualizarUsuarios.propTypes = {
  idUsers: PropTypes.number,
  isModalActualizarUsariosOpen: PropTypes.bool,
  setIsModalActualizarUsariosOpen: PropTypes.func,
};

export default ModalActualizarUsuarios;
