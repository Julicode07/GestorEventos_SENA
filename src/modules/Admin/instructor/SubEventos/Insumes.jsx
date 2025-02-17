import PropTypes from "prop-types";
import { memo, useCallback, useEffect, useState } from "react";

const Insumes = memo(({ id }) => {
  const [insumes, setInsumes] = useState([]);

  const getInsumes = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/subEvents/get/insumes/${id}`
      );
      const data = await response.json();
      setInsumes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Ocurrio un error al traer la data", err);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    getInsumes();
  }, [getInsumes, id]);

  return (
    <div className="bg-gray-200 rounded-lg p-4 mt-4 shadow">
      <h1 className="font-bold text-2xl flex items-center gap-2 text-gray-800">
        <i className="ri-tools-line text-primary"></i> Insumos
      </h1>
      {insumes.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {insumes.map((insume) => (
            <div
              key={insume.id_insumes}
              className="bg-gray-100 shadow-md rounded-lg p-4 flex flex-col gap-2 border border-gray-200"
            >
              <span className="text-lg font-semibold text-gray-700">
                {insume.insumes_name}
              </span>
              <p className="text-sm font-bold text-gray-600">
                Cantidad:{" "}
                <span className="bg-primary text-white px-3 rounded-full font-medium">
                  {insume.insumes_quantity}
                </span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 text-center font-bold mt-3">
          No hay insumos disponibles.
        </p>
      )}
    </div>
  );
});

Insumes.displayName = "Insumes";

Insumes.propTypes = {
  id: PropTypes.number,
};

export default Insumes;
