import PropTypes from "prop-types";
import { memo, useCallback, useEffect, useState } from "react";

const Organizers = memo(({ id }) => {
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
    <div className="rounded-lg border-1 p-3 mt-3">
      <h1 className="font-bold text-2xl">
        <i className="ri-group-line"></i> Organizadores
      </h1>
      {organizers.length > 0 ? (
        organizers.map((organizer) => (
          <div
            className="mt-3 border-1 rounded-lg p-3"
            key={organizer.id_organizers}
          >
            <div className="flex space-x-2">
              <span className="font-bold">Nombre: </span>{" "}
              <p>{organizer?.name}</p>
            </div>
            <div className="flex space-x-2">
              <span className="font-bold">Rol: </span> <p>{organizer?.rol}</p>
            </div>
            <div className="flex space-x-2">
              <span className="font-bold">Email: </span>{" "}
              <p>{organizer?.email}</p>
            </div>
            <div className="flex space-x-2">
              <span className="font-bold">Dirección: </span>{" "}
              <p>{organizer?.address}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No hay organizadores</p>
      )}
    </div>
  );
});

Organizers.displayName = "Organizers";

Organizers.propTypes = {
  id: PropTypes.number,
};

export default Organizers;
