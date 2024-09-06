// pages/admin/Coordinador.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import NavSideBar from "./NavSideBar";
import NotFound from "../NotFoundAdmin";
import Panel from "@/modules/Admin/instructor/panel/Panel";
import Espacios from "@/modules/Admin/instructor/espacios/Espacios";
import Eventos from "@/modules/Admin/instructor/eventos/Eventos";
import Inventario from "@/modules/Admin/instructor/inventario/Inventario";
import Insumos from "@/modules/Admin/instructor/insumos/Insumos";

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
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/insumos" element={<Insumos />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Coordinador;
