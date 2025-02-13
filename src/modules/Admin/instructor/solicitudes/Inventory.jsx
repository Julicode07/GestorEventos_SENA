import PropTypes from "prop-types";
import { memo } from "react";

const Inventory = memo(({ inventories }) => {
  return (
    <div className="p-3 border-1 rounded-lg mt-3">
      <h1 className="font-bold text-2xl">
        <i className="ri-table-fill"></i> Inventario
      </h1>
      {inventories.length > 0 ? (
        inventories.map((inventory) => (
          <div
            className="mt-3 border-1 rounded-lg p-3"
            key={inventory.id_inventory}
          >
            <h2 className="font-bold text-xl">{inventory?.space_name}</h2>
            <div className="flex space-x-2 mt-3">
              <span className="font-bold">Nombre: </span>{" "}
              <p>{inventory?.article_name}</p>
            </div>
            <div className="flex space-x-2">
              <span className="font-bold">Descripción: </span>{" "}
              <p>{inventory?.inventory_description}</p>
            </div>
            <div className="flex space-x-2">
              <span className="font-bold">Cantidad: </span>{" "}
              <p>{inventory?.inventory_quantity}</p>
            </div>
            <div className="flex space-x-2">
              <span className="font-bold">Tipo: </span>{" "}
              <p>{inventory?.inventory_type}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No hay espacios</p>
      )}
    </div>
  );
});

Inventory.displayName = "Inventory";

Inventory.propTypes = {
  inventories: PropTypes.array,
};

export default Inventory;
