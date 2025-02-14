import PropTypes from "prop-types";
import { memo, useCallback, useEffect, useState } from "react";

const Inventory = memo(({ id }) => {
  const [inventories, setInventories] = useState([]);

  const getInventory = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/inventory/get/space/${id}`
      );
      const data = await response.json();
      setInventories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Ocurrio un error al traer la data", err);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    getInventory();
  }, [getInventory, id]);

  return (
    <div className="bg-white rounded-lg p-4 mt-4 shadow">
      <h1 className="font-bold text-2xl flex items-center gap-2 text-gray-800">
        <i className="ri-table-fill text-primary"></i> Inventario
      </h1>

      {inventories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {inventories.map((inventory) => (
            <div
              key={inventory.id_inventory}
              className="bg-gray-100 shadow-md rounded-lg p-2"
            >
              <h2 className="font-semibold text-xl text-gray-700">
                {inventory?.inventory_article_name}
              </h2>

              <div className="mt-2 space-y-2 text-gray-600">
                <p>
                  <span className="font-bold">Nombre:</span>{" "}
                  {inventory?.inventory_article_name}
                </p>
                <p>
                  <span className="font-bold">Descripción:</span>{" "}
                  {inventory?.inventory_description}
                </p>
                <p>
                  <span className="font-bold">Cantidad:</span>{" "}
                  {inventory?.inventory_quantity}
                </p>
                <p>
                  <span className="font-bold">Tipo:</span>{" "}
                  {inventory?.inventory_type}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-3">
          No hay inventario disponible.
        </p>
      )}
    </div>
  );
});

Inventory.displayName = "Inventory";

Inventory.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Inventory;
