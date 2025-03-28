import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SessionContext } from "@/context/SessionContext.jsx";
import { useContext, useEffect } from "react";
import Loader from "./Loader/Loader";
import NewPassword from "./modules/Auth/reset-password/NewPassword";
const MainPage = React.lazy(() => import("@/modules/MainPage/MainPage.jsx"));
const Coordinador = React.lazy(() =>
  import("@/pages/admin/coordinador/Coordinador.jsx")
);
const Instructor = React.lazy(() =>
  import("@/pages/admin/instructor/Instructor.jsx")
);
const ResetPassword = React.lazy(() =>
  import("@/modules/Auth/reset-password/ResetPassword.jsx")
);

const NotFound = React.lazy(() => import("@/pages/NotFound.jsx"));
const IniciarSesion = React.lazy(() =>
  import("@/modules/Auth/IniciarSesion.jsx")
);

function App() {
  const { updateSession } = useContext(SessionContext);

  useEffect(() => {
    updateSession();
  }, [updateSession]);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/iniciarsesion" element={<IniciarSesion />} />
          <Route path="/recuperarcontrasena" element={<ResetPassword />} />
          <Route
            path="/restablecercontrasena/nuevacontrasena/:token"
            element={<NewPassword />}
          />
          <Route path="/admin/coordinador/*" element={<Coordinador />} />
          <Route path="/admin/instructor/*" element={<Instructor />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
