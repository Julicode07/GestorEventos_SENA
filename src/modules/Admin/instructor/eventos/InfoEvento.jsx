import { useParams } from "react-router-dom";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { events } from "@modules/Admin/utils/data";

function InfoEvento() {
  const { id } = useParams();
  const event = events.find((event) => event.id.toString() === id);

  if (!event) {
    return <div>No se encontro el evento</div>;
  }
  return (
    <main className="flex flex-col gap-2">
      <div>
        <Breadcrumbs>
          <BreadcrumbItem href=""> </BreadcrumbItem>
          <BreadcrumbItem href="/admin/instructor/eventos">
            Eventos
          </BreadcrumbItem>
          <BreadcrumbItem href="">{event.name}</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <h1 className="text-2xl font-bold">{event.name}</h1>
      <section></section>
    </main>
  );
}

export default InfoEvento;
