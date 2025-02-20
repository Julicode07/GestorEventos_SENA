import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { SessionContext } from "../../../context/SessionContext.jsx";
const NavSideBar = React.lazy(() => import("./NavSideBar"));
const NotFoundAdmin = React.lazy(() => import("../NotFoundAdmin"));
const Panel = React.lazy(() =>
  import("@/modules/Admin/coordinador/panel/Panel")
);
const Usuarios = React.lazy(() =>
  import("@/modules/Admin/coordinador/usuarios/Usuarios.jsx")
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
const InfoEvento = React.lazy(() =>
  import("@/modules/Admin/coordinador/eventos/InfoEvento.jsx")
);
const Profile = React.lazy(() =>
  import("../../../modules/Admin/coordinador/perfil/Perfil.jsx")
);
const FullView = React.lazy(() =>
  import("@/modules/Admin/coordinador/solicitudes/FullView.jsx")
);
const Registrarse = React.lazy(() => import("@/modules/Auth/Registrarse.jsx"));

function Coordinador() {
  const { updateSession, userSession } = useContext(SessionContext);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        await updateSession();
      } catch (error) {
        console.log(error);
      }
    };

    fetchSession();
  }, [updateSession]);

  return (
    <>
      {userSession.role === "Coordinador" ? (
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
                <Route
                  path="/inventario/espacio/:id"
                  element={<Inventario />}
                />
                <Route path="/solicitudes/ver/:id" element={<FullView />} />
                <Route path="/registrarse" element={<Registrarse />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/iniciarsesion" />
      )}
    </>
  );
}

export default Coordinador;
