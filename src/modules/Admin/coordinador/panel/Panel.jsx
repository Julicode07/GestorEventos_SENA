import React from "react";
import { Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import Solicitudes from "./Solicitudes";
import MesEventos from "./MesEventos";
import { events } from "../../utils/data";
const getCurrentMonthName = () => {
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const currentMonthIndex = new Date().getMonth();
  return months[currentMonthIndex];
};

const countEventsForCurrentMonth = (events) => {
  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  return events.filter((event) => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);

    return (
      startDate.getFullYear() === currentYear &&
      startDate.getMonth() === currentMonthIndex
    );
  }).length;
};

const month = getCurrentMonthName();
const eventCount = countEventsForCurrentMonth(events);


function Panel() {
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
          <MesEventos month={month} eventCount={eventCount} />
          <Solicitudes />
        </div>
      </section>
    </main>
  );
}

export default Panel;
