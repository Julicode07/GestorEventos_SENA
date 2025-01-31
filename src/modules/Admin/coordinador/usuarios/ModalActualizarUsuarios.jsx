import { Select, SelectItem } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import useUpdate from "../../../hooks/useUpdate";
import PropTypes from "prop-types";

const ModalActualizarUsuarios = ({
  idUsers,
  isModalActualizarUsariosOpen,
  setIsModalActualizarUsariosOpen,
}) => {
  const { update } = useUpdate();
  const [userById, setUserById] = useState([]);
  const [updateUserById, setUpdateUserById] = useState({
    document: "",
    name: "",
    last_names: "",
    email: "",
    phone: "",
    role: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getUserById = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${idUsers}`
      );
      const data = await response.json();
      setUserById(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error("No se pudo traer la data", err);
    }
  }, [idUsers]);

  useEffect(() => {
    getUserById();
  }, [getUserById]);

  useEffect(() => {
    if (!idUsers || userById.length === 0) return;
    setUpdateUserById({
      document: userById[0]?.document || "",
      name: userById[0]?.name || "",
      last_names: userById[0]?.last_names || "",
      email: userById[0]?.email || "",
      phone: userById[0]?.phone || "",
      role: userById[0]?.role || "",
    });
  }, [idUsers, userById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateUserById((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { document, ...data } = updateUserById;
      const newData = {
        ...data,
        document: Number(document),
      };
      const result = await update(
        newData,
        `/api/users/update/${userById[0]?.id_user}`
      );
      console.log(result);
      setSuccessMessage("Usuario actualizado correctamente!");
      setErrorMessage("");
      setUpdateUserById({
        document: "",
        name: "",
        last_names: "",
        email: "",
        phone: "",
        role: "",
      });
      window.location.reload();
    } catch (error) {
      console.error("No se pudo actualizar la data", error);
      setErrorMessage("No se pudo actualizar la info!");
      setSuccessMessage("");
    }
  };
  return (
    <>
      {/* Modal to create event */}

      {isModalActualizarUsariosOpen && (
        <>
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
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                  <h3 className="text-3xl font-semibold text-gray-900">
                    Actualizar evento `{userById[0]?.name}{" "}
                    {userById[0]?.last_names}`
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                    onClick={() => setIsModalActualizarUsariosOpen(false)}
                  >
                    <svg
                      className="w-3 h-3"
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
                    <span className="sr-only">Cerrar modal</span>
                  </button>
                </div>

                <div className="p-4 md:p-5">
                  <form
                    className="grid grid-cols-2 gap-4 max-w-xl mx-auto p-4"
                    onSubmit={handleSubmit}
                  >
                    <div>
                      <label
                        className="block mb-2 text-lg font-bold text-gray-900"
                        htmlFor="document"
                      >
                        Documento
                      </label>
                      <input
                        type="number"
                        name="document"
                        id="document"
                        value={updateUserById.document}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5 outline-none"
                        placeholder="Documento"
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label
                        className="block mb-2 text-lg font-bold text-gray-900"
                        htmlFor="name"
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={updateUserById.name}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5 outline-none"
                        placeholder="Nombre"
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label
                        className="block mb-2 text-lg font-bold text-gray-900"
                        htmlFor="last_name"
                      >
                        Apellidos
                      </label>
                      <input
                        type="text"
                        name="last_names"
                        id="last_name"
                        value={updateUserById.last_names}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5 outline-none"
                        placeholder="Apellidos"
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label
                        className="block mb-2 text-lg font-bold text-gray-900"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={updateUserById.email}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5 outline-none"
                        placeholder="Nuevo nombre del Evento"
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label
                        className="block mb-2 text-lg font-bold text-gray-900"
                        htmlFor="phone"
                      >
                        Teléfono
                      </label>
                      <input
                        type="number"
                        name="phone"
                        id="phone"
                        value={updateUserById.phone}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5 outline-none"
                        placeholder="Email"
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label
                        className="block mb-2 text-lg text-gray-900"
                        htmlFor="role"
                      >
                        <b>Role Actual: </b> {updateUserById.role}
                      </label>
                      <Select
                        id="role"
                        size="sm"
                        label="Rol"
                        name="role"
                        value={updateUserById.role}
                        onChange={handleChange}
                      >
                        <SelectItem key="Coordinador">Coordinador</SelectItem>
                        <SelectItem key="Instructor">Instructor</SelectItem>
                      </Select>
                    </div>

                    {/* Botones */}
                    <div className="col-span-2 flex items-center justify-center p-4 space-x-3 border-t border-gray-200 rounded-b">
                      <button
                        type="button"
                        className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700"
                        onClick={() => setIsModalActualizarUsariosOpen(false)}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary text-white"
                        aria-label="Crear evento"
                        data-testid="crear-evento"
                      >
                        Actualizar Usuario
                      </button>
                    </div>

                    {/* Mensajes de éxito/error (opcional) */}

                    <div className="col-span-2 flex justify-center">
                      {successMessage && (
                        <p className="text-green-600 text-center">
                          {successMessage}
                        </p>
                      )}
                      {errorMessage && (
                        <p className="text-red-600 text-center">
                          {errorMessage}
                        </p>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

ModalActualizarUsuarios.propTypes = {
  idUsers: PropTypes.number,
  isModalActualizarUsariosOpen: PropTypes.bool,
  setIsModalActualizarUsariosOpen: PropTypes.func,
};

export default ModalActualizarUsuarios;
