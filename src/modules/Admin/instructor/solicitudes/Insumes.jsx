import PropTypes from "prop-types";
import { memo } from "react";

const Insumes = memo(({ insumes }) => {
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
              <span>{insume.insume_name}</span>
              <p className="bg-black text-white rounded-full p-2">
                {insume.insume_quantity}
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
  insumes: PropTypes.array,
};

export default Insumes;
