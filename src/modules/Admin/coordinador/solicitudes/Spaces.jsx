import PropTypes from "prop-types";
import { memo } from "react";
import Inventory from "./Inventory";

const Spaces = memo(({ spaces }) => {
  return (
    <div className="border-1 rounded-lg p-3 mt-3">
      <h1 className="font-bold text-2xl">
        <i className="ri-map-pin-line"></i> Espacios
      </h1>
      {spaces.length > 0 ? (
        spaces.map((space) => (
          <div className="mt-3 border-1 rounded-lg p-3" key={space.id_space}>
            <h2 className="font-bold text-xl">{space?.space_name}</h2>
            <div className="flex space-x-2 mt-3">
              <span className="font-bold">Capacidad: </span>{" "}
              <p>{space?.space_capacity}</p>
            </div>
            <div className="flex space-x-2">
              <span className="font-bold">Tipo: </span> <p>{space?.type}</p>
            </div>
            <div className="flex space-x-2 items-center">
              <span className="font-bold">Estado: </span>{" "}
              <p
                className={`rounded-full p-2 text-xs w-fit ${
                  space?.space_status === "activo"
                    ? "text-green-800 bg-green-300"
                    : "text-red-700 bg-red-300"
                }`}
              >
                {space?.space_status}
              </p>
            </div>
            <div className="flex space-x-2">
              <span className="font-bold">Detalles: </span>{" "}
              <p>{space?.space_details}</p>
            </div>
            <Inventory inventories={space.inventory} />
          </div>
        ))
      ) : (
        <p>No hay espacios</p>
      )}
    </div>
  );
});

Spaces.displayName = "Spaces";

Spaces.propTypes = {
  spaces: PropTypes.array,
};

export default Spaces;
