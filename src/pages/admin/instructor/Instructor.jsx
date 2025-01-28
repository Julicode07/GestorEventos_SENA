import React, { useState, useEffect, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
const NavSideBar = React.lazy(() => import("./NavSideBar"));
const NotFoundAdmin = React.lazy(() => import("../NotFoundAdmin"));
const Panel = React.lazy(() =>
  import("@/modules/Admin/instructor/panel/Panel")
);
const Espacios = React.lazy(() =>
  import("@/modules/Admin/instructor/espacios")
);
const Eventos = React.lazy(() => import("@/modules/Admin/instructor/eventos"));
const SubEventos = React.lazy(() =>
  import("@/modules/Admin/instructor/SubEventos")
);
const Insumos = React.lazy(() => import("@/modules/Admin/instructor/insumos"));
const InfoEvento = React.lazy(() =>
  import("@/modules/Admin/instructor/eventos/InfoEvento")
);
const Loader = React.lazy(() => import("../../../Loader/Loader"));
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
              <Route path="/" element={<Panel />} />
              <Route path="/espacios" element={<Espacios />} />
              <Route path="/eventos" element={<Eventos />} />
              <Route path="/eventos/:id" element={<InfoEvento />} />
              <Route path="/subeventos/:id" element={<SubEventos />} />
              <Route path="/insumos" element={<Insumos />} />
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
