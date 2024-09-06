import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./modules/MainPage/components/MainPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import IniciarSesion from "./modules/Auth/IniciarSesion.jsx";
import Registrarse from "./modules/Auth/Registrarse.jsx";

function App() {
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
