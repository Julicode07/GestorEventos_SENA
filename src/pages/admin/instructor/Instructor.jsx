import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
const NavSideBar = React.lazy(() => import("./NavSideBar"));
const NotFoundAdmin = React.lazy(() => import("../NotFoundAdmin"));
const Panel = React.lazy(() =>
  import("@/modules/Admin/instructor/panel/Panel")
);
const Espacios = React.lazy(() =>
  import("@/modules/Admin/instructor/espacios/Espacios.jsx")
);
const Eventos = React.lazy(() =>
  import("@/modules/Admin/instructor/eventos/Eventos.jsx")
);
const SubEventos = React.lazy(() =>
  import("@/modules/Admin/instructor/SubEventos/SubEventos")
);
const Insumos = React.lazy(() =>
  import("@/modules/Admin/instructor/insumos/Insumos")
);
const InfoEvento = React.lazy(() =>
  import("@/modules/Admin/instructor/eventos/InfoEvento")
);
const Loader = React.lazy(() => import("../../../Loader/Loader"));
const Profile = React.lazy(() =>
  import("@/modules/Admin/coordinador/perfil/Perfil")
);
const Inventario = React.lazy(() =>
  import("@/modules/Admin/instructor/inventario/Inventario")
);
const Solicitudes = React.lazy(() =>
  import("@/modules/Admin/instructor/solicitudes/Solicitudes")
);
const FullView = React.lazy(() =>
  import("@/modules/Admin/instructor/solicitudes/FullView")
);

import { SessionContext } from "../../../context/SessionContext";
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
      {/* {userSession.role === "Instructor" ? ( */}
      <div>
        <NavSideBar />
        <div className="py-4 px-1 sm:ml-56">
          <div className="mt-12 p-4 h-full">
            <Routes>
              <Route path="/*" element={<NotFoundAdmin />} />
              <Route path="/inventario/espacio/:id" element={<Inventario />} />
              <Route path="/" element={<Panel />} />
              <Route path="/perfil" element={<Profile />} />
              <Route path="/espacios" element={<Espacios />} />
              <Route path="/eventos" element={<Eventos />} />
              <Route path="/eventos/:id" element={<InfoEvento />} />
              <Route path="/subeventos/:id" element={<SubEventos />} />
              <Route path="/insumos" element={<Insumos />} />
              <Route path="/solicitudes" element={<Solicitudes />} />
              <Route path="/solicitudes/ver/:id" element={<FullView />} />
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
