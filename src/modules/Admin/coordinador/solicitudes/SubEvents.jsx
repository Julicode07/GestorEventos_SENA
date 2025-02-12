import PropTypes from "prop-types";
import { memo } from "react";

const SubEvents = memo(({ subEvents }) => {
  return (
    <div className="flex flex-col border-1 rounded-lg p-3 mt-3 space-y-4">
      <h1 className="font-bold text-2xl">
        <i className="ri-calendar-2-line"></i> Subeventos
      </h1>
      {subEvents.map((subEvent) => (
        <div
          key={subEvent.id_sub_event}
          className="flex flex-col border-1 rounded-lg p-3 space-y-2"
        >
          <h2 className="font-bold text-xl">{subEvent.sub_event_name}</h2>
          <p>
            <span className="font-bold">Sede: </span>
            {subEvent.headquarters}
          </p>
          <p>
            <span className="font-bold">Fecha Inicio: </span>
            {subEvent.start_date}
          </p>
          <p>
            <span className="font-bold">Fecha Fin: </span>
            {subEvent.end_date}
          </p>
          <p>
            <span className="font-bold">Descripción: </span>
            {subEvent.sub_event_description}
          </p>
          <div className="flex items-center space-x-3">
            <span className="font-bold">Estado: </span>
            <p
              className={`rounded-full p-2 text-xs w-fit ${
                subEvent.sub_event_status === "Confirmado"
                  ? "bg-green-300 text-green-900"
                  : subEvent.sub_event_status === "Cancelado"
                  ? "bg-red-300 text-red-900"
                  : "bg-yellow-300 text-yellow-700"
              }`}
            >
              {subEvent.sub_event_status}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
});

SubEvents.displayName = "SubEvents";

SubEvents.propTypes = {
  subEvents: PropTypes.array,
};

export default SubEvents;
