import PropTypes from "prop-types";
import { memo } from "react";
import Inventory from "./Inventory";

const Spaces = memo(({ spaces }) => {
  return (
    <div className="bg-gray-200 rounded-lg p-4 mt-4 shadow">
      <h1 className="font-bold text-2xl flex items-center gap-2 text-gray-800">
        <i className="ri-map-pin-line text-primary"></i> Espacios
      </h1>
      {spaces.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {spaces.map((space) => (
            <div
              key={space.id_space}
              className="bg-gray-100 shadow-md rounded-lg p-4"
            >
              <h2 className="font-semibold text-xl text-gray-700">{space?.space_name}</h2>

              <div className="mt-2 space-y-2 text-gray-600">
                <p>
                  <span className="font-bold">Capacidad:</span> {space?.space_capacity}
                </p>
                <p>
                  <span className="font-bold">Tipo:</span> {space?.type}
                </p>
                <p>
                  <span className="font-bold">Detalles:</span> {space?.space_details}
                </p>
                <p className="flex items-center">
                  <span className="font-bold">Estado:</span>{" "}
                  <span
                    className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${space?.space_status === "activo"
                      ? "bg-green-700 text-white"
                      : "text-red-700 bg-red-300"
                      }`}
                  >
                    {space?.space_status}
                  </span>
                </p>
              </div>

              <Inventory inventories={space.inventory} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 text-center font-bold mt-3">No hay espacios disponibles.</p>
      )}
    </div>
  );
});

Spaces.displayName = "Spaces";

Spaces.propTypes = {
  spaces: PropTypes.array.isRequired,
};

export default Spaces;
