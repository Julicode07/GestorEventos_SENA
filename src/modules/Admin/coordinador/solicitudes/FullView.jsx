import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalEvent from "./GlobalEvent";
import SubEvents from "./SubEvents";

const FullView = () => {
  const { id } = useParams();
  const [getAllInfoGlobalEvent, setGetAllInfoGlobalEvent] = useState([]);

  const getData = useCallback(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/events/global/info/${id}`
    );
    const data = await response.json();
    setGetAllInfoGlobalEvent(Array.isArray(data) ? data : [data]);
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <Breadcrumbs>
        <BreadcrumbItem href="/admin/coordinador/solicitudes">
          Solicitudes
        </BreadcrumbItem>
        <BreadcrumbItem>Solicitud {id}</BreadcrumbItem>
      </Breadcrumbs>
      <div>
        <h1 className="font-bold text-3xl">Detalles del evento global {id}</h1>
        {getAllInfoGlobalEvent.map((globalEvent) => (
          <div key={globalEvent.id_global_event}>
            <GlobalEvent
              globalEventitle={globalEvent.global_event_name}
              status={globalEvent.global_event_status}
              id={globalEvent.id_global_event}
              details={globalEvent.global_event_observations}
            />
            {/* Validación adicional para evitar valores undefined */}
            <SubEvents subEvents={globalEvent.sub_events ?? []} />
          </div>
        ))}
      </div>
    </>
  );
};

export default FullView;
