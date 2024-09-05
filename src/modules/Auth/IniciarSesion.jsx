import Images from "../../assets/img/images.js";
import { Input } from "@nextui-org/input";
import { EyeSlashFilledIcon } from "./Components/EyeSlashFilledIcon.jsx";
import { EyeFilledIcon } from "./Components/EyeFilledIcon.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";

const IniciarSesion = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="flex flex-col items-center justify-center py-4 px-4 gap-6 max-w-96 m-auto">
      <Link
        to="/"
        className="flex gap-1 items-center absolute top-6 left-4 bg-primary text-white p-2 rounded-lg"
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
      </Link>
      <header>
        <img
          src={Images.logoVerde}
          className="h-16 md:h-16"
          alt="Logo Blanco SENA"
        />
      </header>

      <main>
        <section className="flex flex-col gap-12">
          <div>
            <h1 className="text-4xl font-bold text-center">
              Te damos de nuevo la bienvenida
            </h1>
          </div>
          <div>
            <form className="w-full mx-auto">
              <div className="mb-5">
                <label
                  htmlFor="id"
                  className="block mb-2 text-base font-bold text-primary "
                >
                  Número de documento
                </label>
                <Input
                  size="lg"
                  type="number"
                  id="id"
                  name="document"
                  pattern="[0-9]{1,16}"
                  placeholder="Ingresa tu numero de documento"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-2xl block w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block mb-2 text-base font-bold text-primary"
                >
                  Contraseña
                </label>

                <Input
                  size="lg"
                  id="password"
                  name="password"
                  placeholder="Ingresa tu contraseña"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-2xl block w-full "
                  required
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label="toggle password visibility"
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                />
              </div>
              <div className="flex flex-col gap-2">
                <a
                  href="/auth/recuperar"
                  className="text-primary font-medium text-sm"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <button
                type="submit"
                className="mt-4 w-full  font-bold rounded-lg text-sm px-5 py-2.5 text-center bg-[#277400] text-white hover:bg-[#277400]"
              >
                Iniciar sesión
              </button>
            </form>
          </div>
        </section>
      </main>
      <footer>
        <p className=" text-black font-medium text-sm text-center">
          ¿No tienes una cuenta?{" "}
          <a
            href="/auth/registrarse"
            className="text-primary font-medium text-sm"
          >
            Regístrate
          </a>
        </p>
      </footer>
    </div>
  );
};

export default IniciarSesion;
