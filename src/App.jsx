import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./modules/MainPage/components/MainPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import IniciarSesion from "./modules/Auth/IniciarSesion.jsx";
import Registrarse from "./modules/Auth/Registrarse.jsx";
import { SessionContext } from "./context/SessionContext.jsx";
import { useContext, useee, useEffect } from "react";

function App() {
  const { updateSession } = useContext(SessionContext);

  useEffect(() => {
    updateSession();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/iniciarsesion" element={<IniciarSesion />} />
        <Route path="/registrarse" element={<Registrarse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
