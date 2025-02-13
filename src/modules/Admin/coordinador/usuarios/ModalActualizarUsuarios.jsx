import { Select, SelectItem, Input } from "@nextui-org/react";
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
  const [successMessage, setSuccessMessage] = useState("");
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
      setSuccessMessage("Usuario actualizado correctamente!");
      setErrorMessage("");
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error("Error updating user data:", error);
      setErrorMessage("No se pudo actualizar la información!");
      setSuccessMessage("");
    }
  };

  return (
    isModalActualizarUsariosOpen && (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40"
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
                className="absolute top-9 right-6 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setIsModalActualizarUsariosOpen(false)}
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
            </div>

            <div className="p-5">
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
                  <button
                    type="submit"
                    className="font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary/80 text-white cursor-pointer hover:bg-primary/100"
                  >
                    Actualizar Usuario
                  </button>
                  <button
                    type="button"
                    className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700"
                    onClick={() => setIsModalActualizarUsariosOpen(false)}
                  >
                    Cancelar
                  </button>
                </div>
                {(successMessage || errorMessage) && (
                  <div className="col-span-2 text-center">
                    {successMessage && (
                      <p className="text-green-600">{successMessage}</p>
                    )}
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
