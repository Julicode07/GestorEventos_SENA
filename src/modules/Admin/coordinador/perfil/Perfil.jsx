import { Select, SelectItem } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import useUpdate from "../../../hooks/useUpdate";

function Profile() {
  const { update } = useUpdate();

  const [userUpdated, setUserUpdated] = useState({
    document: "",
    name: "",
    last_name: "",
    email: "",
    phone: "",
    role: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [userById, setUserById] = useState([]);

  const getUserById = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/me`
      );
      const data = await response.json();
      setUserById(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error("No se pudo traer la data", err);
    }
  }, []);

  useEffect(() => {
    getUserById();
  }, [getUserById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserById((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const [document, ...data] = userUpdated;
      const newData = {
        ...data,
        document: Number(document),
      };
      console.log(newData);
      const result = await update(
        newData,
        `/api/users/update/${userById.id_user}`
      );
      setSuccessMessage("Usuario registrado correctamente!");
      setErrorMessage("");
      setUserUpdated({
        document: "",
        name: "",
        last_name: "",
        email: "",
        phone: "",
        role: "",
      });
      console.log(result);
    } catch (err) {
      setSuccessMessage("");
      setErrorMessage(err.message);
      console.error("No se pudo actualizar la data", err);
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const fullName = `${userById.length > 1 ? userById[0].name : "Sin Nombre"} ${
    userById.length > 1 ? userById[0].last_name : "Sin Apellido"
  }`;

  return (
    <main>
      <section className="flex flex-col items-center gap-2 py-1">
        <div className="bg-primary text-white rounded-full p-2 w-32 h-32 flex items-center justify-center shadow-lg">
          <i className="ri-user-fill text-6xl"></i>
        </div>

        <h1 className="text-3xl font-semibold text-gray-800">{fullName}</h1>
        <p className="text-gray-600 text-lg italic">
          {userById.length > 1 ? userById[0].role : "Sin rol"}
        </p>

        <form
          action=""
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 w-full max-w-4xl px-4"
          onSubmit={handleSubmit}
        >
          <div className="bg-white p-4 rounded-lg shadow-lg transition-all hover:shadow-2xl">
            <p className="text-gray-500 text-sm">Nombre</p>
            <div className="transition-all">
              {isEditing ? (
                <input
                  type="text"
                  value={userById.name || ""}
                  onChange={handleChange}
                  className="bg-gray-100 border-2 border-gray-300 rounded-lg p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ease-in-out duration-300"
                />
              ) : (
                <p className="text-gray-700 font-semibold">
                  {userById.name || "Sin Nombre"}
                </p>
              )}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg transition-all hover:shadow-2xl">
            <p className="text-gray-500 text-sm">Apellidos</p>
            <div className="transition-all">
              {isEditing ? (
                <input
                  type="text"
                  value={userById.last_name || ""}
                  onChange={handleChange}
                  className="bg-gray-100 border-2 border-gray-300 rounded-lg p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ease-in-out duration-300"
                />
              ) : (
                <p className="text-gray-700 font-semibold">
                  {userById.last_name || "Sin Apellido"}
                </p>
              )}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg transition-all hover:shadow-2xl">
            <p className="text-gray-500 text-sm">Documento</p>
            <div className="transition-all">
              {isEditing ? (
                <input
                  type="number"
                  value={userById.document || ""}
                  onChange={handleChange}
                  className="bg-gray-100 border-2 border-gray-300 rounded-lg p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ease-in-out duration-300"
                />
              ) : (
                <p className="text-gray-700 font-semibold">
                  {userById.document || "Sin documento"}
                </p>
              )}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg transition-all hover:shadow-2xl">
            <p className="text-gray-500 text-sm">Email</p>
            <div className="transition-all">
              {isEditing ? (
                <input
                  type="text"
                  value={userById.email || ""}
                  onChange={handleChange}
                  className="bg-gray-100 border-2 border-gray-300 rounded-lg p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ease-in-out duration-300"
                />
              ) : (
                <p className="text-gray-700 font-semibold">
                  {userById.email || "Sin email"}
                </p>
              )}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg transition-all hover:shadow-2xl">
            <p className="text-gray-500 text-sm">Teléfono</p>
            <div className="transition-all">
              {isEditing ? (
                <input
                  type="text"
                  value={userById.phone || ""}
                  onChange={handleChange}
                  className="bg-gray-100 border-2 border-gray-300 rounded-lg p-2 w-full mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all ease-in-out duration-300"
                />
              ) : (
                <p className="text-gray-700 font-semibold">
                  {userById.phone || "Sin teléfono"}
                </p>
              )}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg transition-all hover:shadow-2xl">
            <p className="text-gray-500 text-sm">Rol</p>
            <div className="transition-all">
              {isEditing ? (
                <Select
                  id="role"
                  size="sm"
                  label="Rol"
                  name="rol"
                  value={userById.role || ""}
                  onChange={handleChange}
                >
                  <SelectItem key="Aprendiz">Aprendiz</SelectItem>
                  <SelectItem key="Docente">Docente</SelectItem>
                  <SelectItem key="Coordinador">Coordinador</SelectItem>
                  <SelectItem key="Personal">Personal</SelectItem>
                  <SelectItem key="Persona externa">Persona externa</SelectItem>
                </Select>
              ) : (
                <p className="text-gray-700 font-semibold">
                  {userById.role || "Sin rol"}
                </p>
              )}
            </div>
          </div>
        </form>
        <button
          onClick={() => {
            if (isEditing) {
              handleSubmit();
            }
            handleEdit();
          }}
          className="grid place-items-center bg-primary/90 text-white py-2 px-6 rounded-lg mt-4 transition-colors hover:bg-primary ease-in-out duration-300"
        >
          {isEditing ? "Guardar cambios" : "Editar"}
        </button>
        <div>
          {successMessage && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}
          {errorMessage && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Profile;
