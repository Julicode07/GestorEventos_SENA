import PropTypes from "prop-types";
import { memo } from "react";

const Organizers = memo(({ organizers }) => {
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
                {organizer.organizer_name}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Rol:</span> {organizer.organizer_rol}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Email:</span> {organizer.organizer_email}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-bold">Dirección:</span> {organizer.organizer_address}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 text-center font-bold mt-3">No hay organizadores disponibles.</p>
      )}
    </div>
  );
});

Organizers.displayName = "Organizers";

Organizers.propTypes = {
  organizers: PropTypes.array.isRequired,
};

export default Organizers;
