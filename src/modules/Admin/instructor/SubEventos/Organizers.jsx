import PropTypes from "prop-types";
import { memo, useCallback, useEffect, useState } from "react";

const Organizers = memo(({ id, idUser }) => {
  const [organizers, setOrganizers] = useState([]);

  const getOrganizers = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/organizers/sub-events/${id}`
      );
      const data = await response.json();
      setOrganizers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Ocurrio un error al traer la data", err);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    getOrganizers();
  }, [getOrganizers, id]);

  return (
    <div className="bg-gray-200 rounded-lg p-4 mt-4 shadow">
      <h1 className="font-bold text-2xl flex items-center gap-2 text-gray-800">
        <i className="ri-group-line text-primary"></i> Organizadores
      </h1>
      {organizers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {organizers.map((organizer) => (
            <div
              key={organizer.id_organizers}
              className="bg-gray-100 shadow-md rounded-lg p-4"
            >
              <p className="text-lg font-semibold text-gray-700">
                {organizer.name}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Rol:</span>{" "}
                {organizer.rol}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Email:</span>{" "}
                {organizer.email}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Dirección:</span>{" "}
                {organizer.address}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 text-center font-bold mt-3">
          No hay organizadores disponibles.
        </p>
      )}
    </div>
  );
});

Organizers.displayName = "Organizers";

Organizers.propTypes = {
  id: PropTypes.number,
  idUser: PropTypes.number,
};

export default Organizers;
