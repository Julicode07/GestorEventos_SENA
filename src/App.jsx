import MainPage from "./modules/MainPage/components/MainPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import IniciarSesion from "./modules/Auth/IniciarSesion.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/iniciarSesion" element={<IniciarSesion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
