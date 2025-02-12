import PropTypes from "prop-types";
import { memo } from "react";

const Organizers = memo(({ organizers }) => {
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
              <p>{organizer?.organizer_name}</p>
            </div>
            <div className="flex space-x-2">
              <span className="font-bold">Rol: </span>{" "}
              <p>{organizer?.organizer_rol}</p>
            </div>
            <div className="flex space-x-2">
              <span className="font-bold">Email: </span>{" "}
              <p>{organizer?.organizer_email}</p>
            </div>
            <div className="flex space-x-2">
              <span className="font-bold">Dirección: </span>{" "}
              <p>{organizer?.organizer_address}</p>
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
  organizers: PropTypes.array,
};

export default Organizers;
