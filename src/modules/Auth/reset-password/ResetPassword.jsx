import Images from "@/assets/img/images.js";
import { useNavigate } from "react-router-dom";
import useRegister from "../../hooks/useRegister";
import { useState } from "react";
import ConfirmationResetPassword from "./ConfirmationResetPassword";

const ResetPassword = () => {
  const { register } = useRegister();
  const [sendEmail, setSendEmail] = useState({
    email: "",
  });

  const [statusPassword, setStatusPassword] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSendEmail((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await register(sendEmail, "/api/users/forgot-password");
      setStatusPassword(result.success);
      setSendEmail({ email: "" });
    } catch {
      setStatusPassword(true);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center pt-8 py-2 px-4 gap-6 max-w-lg m-auto h-screen">
      <button
        onClick={() => navigate("/")}
        className="flex gap-1 items-center absolute top-2 left-2 bg-primary text-white p-2 rounded-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="rgba(255,255,255,1)"
          className="w-5 h-5"
        >
          <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
        </svg>
        Ir al inicio
      </button>
      <div className="flex flex-col items-center justify-center gap-6 border border-gray-200 shadow-xl rounded-3xl py-10 px-10 ">
        <header>
          <img
            src={Images.logoVerde}
            className="h-24 md:h-30"
            alt="Logo Blanco SENA"
          />
        </header>

        <main>
          <section className="flex flex-col gap-8 text-center">
            <h1 className="text-4xl font-bold">Restablece tu contraseña</h1>
            <p className="text-gray-600">
              Ingresa tu correo electrónico y te enviaremos un enlace para
              restablecer tu contraseña.
            </p>

            <form
              className="w-full mx-auto flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Correo electrónico"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-all cursor-pointer relative"
              >
                Enviar enlace
              </button>
            </form>
          </section>
          <ConfirmationResetPassword
            statusPassword={statusPassword}
            setStatusPassword={setStatusPassword}
          />
        </main>
      </div>
    </div>
  );
};

export default ResetPassword;
