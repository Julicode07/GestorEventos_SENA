import PropTyopes from "prop-types";
import { memo } from "react";

const GlobalEvent = memo(({ globalEventitle, status, id, details }) => {
  return (
    <div className="flex flex-col border-1 rounded-lg p-3 mt-3 space-y-4">
      <h1 className="font-bold text-2xl">{globalEventitle}</h1>
      <p
        className="font-bold">Estado: {" "}
        <span className={`text-sm rounded-full px-1 w-fit ${status === "Aceptado"
          ? "bg-green-300 text-green-900"
          : status === "Rechazado"
            ? "bg-red-300 text-red-900"
            : "bg-yellow-300 text-yellow-700"
          }`}>{status}</span>
      </p>

      <p>
        <span className="font-bold">ID del evento: </span>
        {id}
      </p>
      <p>
        <span className="font-bold">Detalles: </span>
        {details}
      </p>
    </div>
  );
});

GlobalEvent.displayName = "GlobalEvent";

GlobalEvent.propTypes = {
  globalEventitle: PropTyopes.string,
  status: PropTyopes.string,
  id: PropTyopes.number,
  details: PropTyopes.string,
};
export default GlobalEvent;
