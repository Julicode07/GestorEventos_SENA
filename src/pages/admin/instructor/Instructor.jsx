import { useState, useEffect, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NavSideBar from "./NavSideBar";
import NotFoundAdmin from "../NotFoundAdmin";
import Panel from "@/modules/Admin/instructor/panel/Panel";
import Espacios from "@/modules/Admin/instructor/espacios/Espacios";
import Eventos from "@/modules/Admin/instructor/eventos/Eventos";
import Inventario from "@/modules/Admin/instructor/inventario/Inventario";
import Insumos from "@/modules/Admin/instructor/insumos/Insumos";
import InfoEvento from "../../../modules/Admin/instructor/eventos/InfoEvento";
import Loader from "../../../Loader/Loader";
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
      {userSession === "Instructor" ? (
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
                <Route path="/inventario" element={<Inventario />} />
                <Route path="/insumos" element={<Insumos />} />
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
