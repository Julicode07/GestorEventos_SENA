import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
const Organizers = React.lazy(() => import("./Organizers"));
const Insumes = React.lazy(() => import("./Insumes"));
const Spaces = React.lazy(() => import("./Spaces"));

const Info = () => {
  const { id } = useParams();
  const [subEvent, setSubEvent] = useState([]);
  const [idGlobalEvent, setIdGlobalEvent] = useState("");

  const getSubEvents = useCallback(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/subEvents/${id}`
    );
    const data = await response.json();
    setSubEvent(Array.isArray(data) ? data : []);
  }, [id]);

  useEffect(() => {
    getSubEvents();
  }, [getSubEvents]);

  useEffect(() => {
    if (subEvent.length > 0) {
      setIdGlobalEvent(subEvent[0].id_global_event);
    }
  }, [subEvent]);

  return (
    <>
      <Breadcrumbs>
        <BreadcrumbItem href={`/admin/instructor/subeventos/${idGlobalEvent}`}>
          Solicitudes
        </BreadcrumbItem>
        <BreadcrumbItem>Solicitud {id}</BreadcrumbItem>
      </Breadcrumbs>
      <div className="flex flex-col border-1 rounded-lg p-3 mt-3 space-y-4">
        {subEvent.map((subEvent) => (
          <div key={subEvent.id_sub_event}>
            <h1 className="font-bold text-2xl">{subEvent.name}</h1>
            <h2
              className={`text-xs rounded-full p-2 w-fit ${
                subEvent.subeventConfirmation === "Aceptado"
                  ? "bg-green-300 text-green-900"
                  : subEvent.subeventConfirmation === "Rechazado"
                  ? "bg-red-300 text-red-900"
                  : "bg-yellow-300 text-yellow-700"
              }`}
            >
              {subEvent.subeventConfirmation}
            </h2>
            <p>
              <span className="font-bold">ID: </span>
              {id}
            </p>
            <p>
              <span className="font-bold">Sede: </span>
              {subEvent.headquarters}
            </p>
            <p>
              <span className="font-bold">Fecha de Inicio: </span>
              {dayjs(subEvent.start_date).format("YYYY-MM-DD HH:mm:ss")}
            </p>
            <p>
              <span className="font-bold">Fecha de Fin: </span>
              {dayjs(subEvent.end_date).format("YYYY-MM-DD HH:mm:ss")}
            </p>
            <p>
              <span className="font-bold">Detalles: </span>
              {subEvent.description}
            </p>
            <Organizers id={Number(id)} />
            <Insumes id={Number(id)} />
            <Spaces id={Number(id)} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Info;
