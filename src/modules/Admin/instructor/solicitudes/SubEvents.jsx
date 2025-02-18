import PropTypes from "prop-types";
import { memo } from "react";
import Insumes from "./Insumes";
import Organizers from "./Organizers";
import Spaces from "./Spaces";
import dayjs from "dayjs";

const SubEvents = memo(({ subEvents }) => {
  const validSubEvents = subEvents.filter(subEvent => subEvent.id_sub_event !== null);

  return (
    <div className="flex flex-col border-1 rounded-lg p-3 mt-3 space-y-4">
      <h1 className="font-bold text-2xl">
        <i className="ri-calendar-2-line text-primary"></i> Subeventos
      </h1>
      {validSubEvents.length === 0 ? (
        <p className="text-gray-800 text-xl font-bold text-center py-6">No hay subeventos disponibles.</p>
      ) : (
        validSubEvents.map((subEvent) => (
          <div key={subEvent.id_sub_event} className="flex flex-col rounded-lg p-3 space-y-2  bg-gray-100">
            <h2 className="font-bold text-xl">Subevento: {subEvent.sub_event_name}</h2>
            <p><span className="font-bold">Sede: </span>{subEvent.headquarters}</p>
            <p><span className="font-bold">Fecha Inicio: </span>{dayjs(subEvent.start_date).format("DD/MM/YYYY HH:mm:ss")}</p>
            <p><span className="font-bold">Fecha Fin: </span>{dayjs(subEvent.end_date).format("DD/MM/YYYY HH:mm:ss")}</p>
            <p><span className="font-bold">Descripción: </span>{subEvent.sub_event_description}</p>
            <div className="flex items-center space-x-3">
              <span className="font-bold">Estado: </span>
              <p className={`rounded-full px-2 py-1 text-xs w-fit ${subEvent.sub_event_status === "Confirmado"
                ? "bg-green-700 text-white"
                : subEvent.sub_event_status === "Cancelado"
                  ? "bg-red-300 text-red-900"
                  : "bg-yellow-300 text-yellow-700"
                }`}>
                {subEvent.sub_event_status}
              </p>
            </div>
            <Insumes insumes={subEvent.insumes} />
            <Organizers organizers={subEvent.organizers} />
            <Spaces spaces={subEvent.spaces} />
          </div>
        ))
      )}
    </div>
  );
});

SubEvents.displayName = "SubEvents";

SubEvents.propTypes = {
  subEvents: PropTypes.array.isRequired,
};

export default SubEvents;
