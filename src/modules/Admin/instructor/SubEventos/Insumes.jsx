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
    <div className="border-1 rounded-lg p-3 mt-3">
      <h1 className="font-bold text-2xl">
        <i className="ri-tools-line"></i> Insumos
      </h1>
      {insumes.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
          {insumes.map((insume) => (
            <div
              key={insume.id_insumes}
              className="flex justify-between border-1 p-2"
            >
              <span>{insume.insumes_name}</span>
              <p className="bg-black text-white rounded-full p-2">
                {insume.insumes_quantity}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay insumos</p>
      )}
    </div>
  );
});

Insumes.displayName = "Insumes";

Insumes.propTypes = {
  id: PropTypes.number,
};

export default Insumes;
