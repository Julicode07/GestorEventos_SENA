import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

function Espacios() {
  return (
    <main className="flex flex-col gap-2">
      <div>
        <Breadcrumbs>
          <BreadcrumbItem href=""> </BreadcrumbItem>
          <BreadcrumbItem href="/admin/coordinador/espacios">Espacios</BreadcrumbItem>
        </Breadcrumbs>
      </div>
    </main>
  );
}

export default Espacios;
