import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalEvent from "./GlobalEvent";
import SubEvents from "./SubEvents";
import { SessionContext } from "../../../../context/SessionContext";
const FullView = () => {
  const { updateSession, names } = useContext(SessionContext);
  const { id } = useParams();
  const [getAllInfoGlobalEvent, setGetAllInfoGlobalEvent] = useState([]);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        await updateSession();
      } catch (err) {
        console.error("Ocurrio un error al traer la data", err);
      }
    };

    fetchSession();
  }, [updateSession]);

  const getData = useCallback(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/events/global/info/${id}`
    );
    const data = await response.json();
    const arrayData = Array.isArray(data) ? data : [data];
    const userRequests = arrayData.filter(
      (event) => event?.id_host_user === names.id_user
    );
    setGetAllInfoGlobalEvent(
      Array.isArray(userRequests) ? userRequests : [userRequests]
    );
  }, [id, names]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <Breadcrumbs>
        <BreadcrumbItem href="/admin/instructor/solicitudes">
          Solicitudes hechas por ti
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
            <SubEvents subEvents={globalEvent.sub_events ?? []} />
          </div>
        ))}
      </div>
    </>
  );
};

export default FullView;
