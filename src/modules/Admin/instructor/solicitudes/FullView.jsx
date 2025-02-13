import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import GlobalEvent from "./GlobalEvent";
import SubEvents from "./SubEvents";

const FullView = () => {
  const [getAllInfoGlobalEvent, setGetAllInfoGlobalEvent] = useState([]);

  const getData = useCallback(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/events/global/self/all`
    );
    const data = await response.json();
    setGetAllInfoGlobalEvent(Array.isArray(data) ? data : [data]);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <Breadcrumbs>
        <BreadcrumbItem href="/admin/instructor/solicitudes">
          Solicitudes
        </BreadcrumbItem>
        <BreadcrumbItem>Solicitud</BreadcrumbItem>
      </Breadcrumbs>
      <div>
        {getAllInfoGlobalEvent.map((globalEvent) => (
          <div key={globalEvent.id_global_event}>
            <GlobalEvent
              globalEventitle={globalEvent.global_event_name}
              status={globalEvent.global_event_status}
              id={globalEvent.id_global_event}
              details={globalEvent.global_event_observations}
            />
            <SubEvents subEvents={globalEvent.sub_events} />
          </div>
        ))}
      </div>
    </>
  );
};
export default FullView;
