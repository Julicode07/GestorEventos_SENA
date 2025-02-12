import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import Solicitudes from "./Solicitudes";
import MesEventos from "./MesEventos";
import { useCallback, useEffect, useState } from "react";

function Panel() {
  const [subEvents, setSubEvents] = useState([]);

  const getSubEvents = useCallback(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/subEvents/get/all`
    );
    const data = await response.json();
    setSubEvents(data);
  }, []);

  useEffect(() => {
    getSubEvents();
  }, [getSubEvents]);

  return (
    <main className="flex flex-col gap-2">
      <div>
        <Breadcrumbs>
          <BreadcrumbItem href=""> </BreadcrumbItem>
          <BreadcrumbItem href="/admin/coordinador">Panel</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <section>
        <div className="w-full flex flex-col lg:flex-row gap-4 justify-between">
          <MesEventos eventCount={subEvents.length} />
          <Solicitudes />
        </div>
      </section>
    </main>
  );
}

export default Panel;
