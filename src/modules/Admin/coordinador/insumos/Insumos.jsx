import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
function Insumos() {
  return (
    <main className="flex flex-col gap-2 relative -z-10">
      <div>
        <Breadcrumbs>
          <BreadcrumbItem href=""> </BreadcrumbItem>
          <BreadcrumbItem href="/admin/coordinador/insumos">
            Insumos
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <h1 className="text-2xl font-bold">Insumos</h1>
      <section></section>
    </main>
  );
}

export default Insumos;
