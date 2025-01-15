import { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavSideBar from "./NavSideBar";
import NotFoundAdmin from "../NotFoundAdmin.jsx";
import Panel from "@/modules/Admin/coordinador/panel/Panel";
import Espacios from "@/modules/Admin/coordinador/espacios/Espacios";
import Solicitudes from "@/modules/Admin/coordinador/solicitudes/Solicitudes";
import Eventos from "@/modules/Admin/coordinador/eventos/Eventos";
import Inventario from "@/modules/Admin/coordinador/inventario/Inventario";
import Insumos from "@/modules/Admin/coordinador/insumos/Insumos";
import Organizadores from "@/modules/Admin/coordinador/organizadores/Organizadores";
import InfoEvento from "../../../modules/Admin/coordinador/eventos/InfoEvento.jsx";
import Usuarios from "../../../modules/Admin/coordinador/usuarios/Usuarios.jsx";
import { SessionContext } from "../../../context/SessionContext.jsx";
import Loader from "../../../Loader/Loader.jsx";
function Coordinador() {
  const { updateSession, userSession } = useContext(SessionContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        await updateSession();
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, [updateSession]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      {/* {userSession.role === "Coordinador" ? ( */}
      <div>
        <NavSideBar />
        <div className="py-4 px-1 sm:ml-56">
          <div className="mt-12 p-4 h-full">
            <Routes>
              <Route path="/*" element={<NotFoundAdmin />} />
              <Route path="/" element={<Panel />} />
              <Route path="/espacios" element={<Espacios />} />
              <Route path="/solicitudes" element={<Solicitudes />} />
              <Route path="/eventos" element={<Eventos />} />
              <Route path="/eventos/:id" element={<InfoEvento />} />
              <Route path="/inventario/espacio/:id" element={<Inventario />} />
              <Route path="/insumos" element={<Insumos />} />
              <Route path="/organizadores" element={<Organizadores />} />
              <Route path="/usuarios" element={<Usuarios />} />
            </Routes>
          </div>
        </div>
      </div>
      {/* ) : (
        <Navigate to="/iniciarsesion" />
      )} */}
    </>
  );
}

export default Coordinador;
