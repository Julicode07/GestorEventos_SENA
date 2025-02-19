import { Route, Routes } from "react-router-dom";
import NavSideBar from "./NavSideBar";
import NotFoundAdmin from "../NotFoundAdmin.jsx";
import Panel from "@/modules/Admin/coordinador/panel/Panel";
import Usuarios from "@/modules/Admin/coordinador/usuarios/Usuarios.jsx";
import Espacios from "@/modules/Admin/coordinador/espacios/Espacios";
import Solicitudes from "@/modules/Admin/coordinador/solicitudes/Solicitudes";
import Eventos from "@/modules/Admin/coordinador/eventos/Eventos";
import Inventario from "@/modules/Admin/coordinador/inventario/Inventario";
import InfoEvento from "@/modules/Admin/coordinador/eventos/InfoEvento.jsx";
import Profile from "../../../modules/Admin/coordinador/perfil/Perfil.jsx";
import FullView from "@/modules/Admin/coordinador/solicitudes/FullView.jsx";
import React from "react";
const Registrarse = React.lazy(() => import("@/modules/Auth/Registrarse.jsx"));

function Coordinador() {
  return (
    <div>
      <NavSideBar />
      <div className="py-4 px-1 sm:ml-56">
        <div className="mt-12 p-4 h-full">
          <Routes>
            <Route path="/*" element={<NotFoundAdmin />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/" element={<Panel />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/espacios" element={<Espacios />} />
            <Route path="/solicitudes" element={<Solicitudes />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/eventos/:id" element={<InfoEvento />} />
            <Route path="/inventario/espacio/:id" element={<Inventario />} />
            <Route path="/solicitudes/ver/:id" element={<FullView />} />
            <Route path="/registrarse" element={<Registrarse />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Coordinador;
