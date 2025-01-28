import React, { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
const NavSideBar = React.lazy(() => import("./NavSideBar.jsx"));
const NotFoundAdmin = React.lazy(() => import("../NotFoundAdmin.jsx"));
const Panel = React.lazy(() =>
  import("@/modules/Admin/coordinador/panel/Panel.jsx")
);
const Espacios = React.lazy(() =>
  import("@/modules/Admin/coordinador/espacios/Espacios")
);
const Solicitudes = React.lazy(() =>
  import("@/modules/Admin/coordinador/solicitudes/Solicitudes")
);
const Eventos = React.lazy(() =>
  import("@/modules/Admin/coordinador/eventos/Eventos")
);
const Inventario = React.lazy(() =>
  import("@/modules/Admin/coordinador/inventario/Inventario")
);
const Insumos = React.lazy(() =>
  import("@/modules/Admin/coordinador/insumos/Insumos")
);
const Organizadores = React.lazy(() =>
  import("@/modules/Admin/coordinador/organizadores/Organizadores")
);
const InfoEvento = React.lazy(() =>
  import("@/modules/Admin/coordinador/eventos/InfoEvento")
);
const Usuarios = React.lazy(() =>
  import("@/modules/Admin/coordinador/usuarios/Usuarios")
);
const Loader = React.lazy(() => import("@/Loader/Loader.jsx"));
import { SessionContext } from "../../../context/SessionContext.jsx";
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
