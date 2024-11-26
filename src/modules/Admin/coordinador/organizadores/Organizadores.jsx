import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

function Organizadores() {
  return (
    <main className="flex flex-col gap-2 relative -z-10">
      <div>
        <Breadcrumbs>
          <BreadcrumbItem href=""> </BreadcrumbItem>
          <BreadcrumbItem href="/admin/coordinador/organizadores">
            Organizadores
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <h1 className="text-2xl font-bold">Organizadores</h1>
      <section></section>
    </main>
  );
}

export default Organizadores;
