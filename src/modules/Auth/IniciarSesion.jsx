import Images from "@/assets/img/images.js";
import { Input } from "@nextui-org/input";
import { EyeSlashFilledIcon } from "./components/EyeSlashFilledIcon.jsx";
import { EyeFilledIcon } from "./components/EyeFilledIcon.jsx";
import { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SessionContext } from "@/context/SessionContext.jsx";

const IniciarSesion = () => {
  const { setUserSession } = useContext(SessionContext);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    document: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [regexDocumentState, setRegexDocumentState] = useState(false);
  const [regexPasswordState, setRegexPasswordState] = useState(false);

  const documentRef = useRef(null);
  const passwordRef = useRef(null);

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => {
      const newData = { ...prevData, [name]: value };
      if (name === "document") {
        regexDocument(value);
      } else if (name === "password") {
        regexPassword(value);
      }
      return newData;
    });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const { document, ...restLogin } = loginData;
    const dataToSend = {
      ...restLogin,
      document: parseInt(document),
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setSuccessMessage("Inicio exitoso");
        setErrorMessage("");

        setUserSession({
          document: data.data.document,
          role: data.data.role,
        });
        navigate("/");
      } else {
        setErrorMessage(data.message);
        setSuccessMessage("");
      }
    } catch {
      setErrorMessage("Ocurrio un error al iniciar sesión");
      setSuccessMessage("");
    }
  };

  const regexDocument = (document) => {
    const documentRegex = /^[0-9]{1,16}$/;
    const documentHasCorrectRegex = documentRegex.test(document);
    if (!documentHasCorrectRegex) {
      documentRef.current.textContent = "Documento inválido";
      documentRef.current.style.color = "red";
      setRegexDocumentState(false);
    } else {
      documentRef.current.textContent = "Documento válido";
      documentRef.current.style.color = "green";
      setRegexDocumentState(true);
    }
  };

  const regexPassword = (password) => {
    const regexPassword =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,256}$/;
    const passwordHasCorrectRegex = regexPassword.test(password);
    if (!passwordHasCorrectRegex) {
      passwordRef.current.textContent = "Contraseña inválida";
      passwordRef.current.style.color = "red";
      setRegexPasswordState(false);
    } else {
      passwordRef.current.textContent = "Contraseña válida";
      passwordRef.current.style.color = "green";
      setRegexPasswordState(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-8 py-2 px-4 gap-6 max-w-96 m-auto">
      <Link
        to="/"
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
      </Link>
      <header>
        <img
          src={Images.logoVerde}
          className="h-24 md:h-30"
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
            <form className="w-full mx-auto" onSubmit={handleSubmitLogin}>
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
                  value={loginData.document}
                  onChange={handleChangeLogin}
                  name="document"
                  pattern="[0-9]{1,16}"
                  placeholder="Ingresa tu numero de documento"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-2xl block w-full "
                  required
                />
                <p ref={documentRef}></p>
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-2xl block w-full focus:none active:none"
                  value={loginData.password}
                  onChange={handleChangeLogin}
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
                <p ref={passwordRef}></p>
              </div>
              <div className="flex flex-col gap-2 text-center">
                <a
                  href="/recuperarcontrasena"
                  className="text-primary font-medium text-sm"
                >
                  ¿Has olvidado la contraseña?
                </a>
              </div>
              <button
                type="submit"
                className={`mt-4 w-full  font-bold rounded-lg text-lg px-5 py-2.5 text-center
                  ${regexDocumentState && regexPasswordState
                    ? "bg-[#277400] text-white hover:bg-[#277400]"
                    : "bg-gray-300 text-black cursor-not-allowed"
                  }`}
                disabled={!(regexDocumentState && regexPasswordState)}
              >
                Iniciar sesión
              </button>
              <div className="text-center mt-3">
                {<p className="text-green-600">{successMessage}</p>}
                {<p className="text-red-600">{errorMessage}</p>}
              </div>
            </form>
          </div>
        </section>
      </main>
      <footer>
        <p className=" text-black font-medium text-sm text-center">
          ¿No tienes una cuenta?{" "}
          <Link to="/registrarse" className="text-primary/100 font-medium text-sm">
            Regístrate
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default IniciarSesion;
