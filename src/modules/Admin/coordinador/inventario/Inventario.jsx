import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
function Inventario() {
  return (
    <main className="flex flex-col gap-2">
      <div>
        <Breadcrumbs>
          <BreadcrumbItem href=""> </BreadcrumbItem>
          <BreadcrumbItem href="/admin/coordinador/inventario">
            Inventario
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <h1 className="text-2xl font-bold">Inventario</h1>
      <section></section>
    </main>
  );
}

export default Inventario;
