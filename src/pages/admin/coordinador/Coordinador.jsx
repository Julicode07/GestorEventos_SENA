// pages/admin/Coordinador.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import NavSideBar from "./NavSideBar";
import NotFound from "../NotFoundAdmin.jsx";
import Panel from "@/modules/Admin/coordinador/panel/Panel";
import Espacios from "@/modules/Admin/coordinador/espacios/Espacios";
import Solicitudes from "@/modules/Admin/coordinador/solicitudes/Solicitudes";
import Eventos from "@/modules/Admin/coordinador/eventos/Eventos";
import Inventario from "@/modules/Admin/coordinador/inventario/Inventario";
import Insumos from "@/modules/Admin/coordinador/insumos/Insumos";
import Organizadores from "@/modules/Admin/coordinador/organizadores/Organizadores";

function Coordinador() {
  return (
    <div>
      <NavSideBar />
      <div className="p-4 sm:ml-56">
        <div className="mt-12 p-4 h-full">
          <Routes>
            <Route path="/*" element={<NotFound />} />
            <Route path="/" element={<Panel />} />
            <Route path="/espacios" element={<Espacios />} />
            <Route path="/solicitudes" element={<Solicitudes />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/insumos" element={<Insumos />} />
            <Route path="/organizadores" element={<Organizadores />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Coordinador;
