import React from "react";
import { Input } from "@nextui-org/input";
import { EyeSlashFilledIcon } from "./components/EyeSlashFilledIcon.jsx";
import { EyeFilledIcon } from "./components/EyeFilledIcon.jsx";
import Images from "@/assets/img/images.js";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useRegisterUser from "./hooks/useRegisterUser.jsx";
import {
  regexDocument,
  regexName,
  regexLastNames,
  regexEmail,
  regexPhone,
  regexPassword,
} from "./validations/registerValidation.js";

const Registrarse = () => {
  const navigate = useNavigate();

  const { registerUser, error } = useRegisterUser();
  const [formData, setFormData] = useState({
    document: "",
    name: "",
    last_names: "",
    email: "",
    phone: "",
    role: "Instructor",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const feedbackRegexDocument = useRef(null);
  const feedbackRegexName = useRef(null);
  const feedbackRegexLastNames = useRef(null);
  const feedbackRegexEmail = useRef(null);
  const feedbackRegexPhone = useRef(null);
  const feedbackRegexPassword = useRef(null);

  const [documentEvent, setDocumentEvent] = useState(false);
  const [nameEvent, setNameEvent] = useState(false);
  const [lastNamesEvent, setLastNamesEvent] = useState(false);
  const [emailEvent, setEmailEvent] = useState(false);
  const [phoneEvent, setPhoneEvent] = useState(false);
  const [passwordEvent, setPasswordEvent] = useState(false);

  const handleChangeRegisterUser = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newDataRegister = {
        ...prevData,
        [name]: value,
      };
      if (name === "document") {
        regexDocument(value, feedbackRegexDocument, setDocumentEvent);
      } else if (name === "name") {
        regexName(value, feedbackRegexName, setNameEvent);
      } else if (name === "last_names") {
        regexLastNames(value, feedbackRegexLastNames, setLastNamesEvent);
      } else if (name === "email") {
        regexEmail(value, feedbackRegexEmail, setEmailEvent);
      } else if (name === "phone") {
        regexPhone(value, feedbackRegexPhone, setPhoneEvent);
      } else if (name === "password") {
        regexPassword(value, feedbackRegexPassword, setPasswordEvent);
      }
      return newDataRegister;
    });
  };

  const handleSubmitRegisterUsers = async (e) => {
    e.preventDefault();
    try {
      const result = await registerUser(formData);
      setSuccessMessage("Usuario registrado correctamente!");
      setErrorMessage("");
      console.log("Usuario registrado:", result);
      setFormData({
        document: "",
        name: "",
        last_names: "",
        email: "",
        phone: "",
        role: "Instructor",
        password: "",
      });
      navigate("/iniciarsesion");
    } catch (error) {
      setErrorMessage("Error al registrar el usuario");
      console.error("Error registering user:", error);
      setSuccessMessage("");
    }
  };

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex flex-col items-center justify-center pt-8 py-2 px-4 gap-6 max-w-[700px] m-auto">
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
        <section className="flex flex-col gap-7">
          <div>
            <h1 className="text-4xl font-bold text-center">Crea tu cuenta</h1>
          </div>
          <div>
            <form
              className="w-full mx-auto"
              onSubmit={handleSubmitRegisterUsers}
            >
              <div className="grid sm:grid-cols-2 gap-4 mb-3">
                <div>
                  <label
                    htmlFor="role"
                    className=" block mb-1 text-base font-bold text-primary "
                  >
                    Rol de cuenta
                  </label>
                  <select
                    id="role"
                    name="role"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full px-2.5 py-3"
                    value={formData.role}
                    onChange={handleChangeRegisterUser}
                  >
                    <option value="Coordinador">Coordinador</option>
                    <option value="Instructor">Instructor</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="document"
                    className="block mb-1 text-base font-bold text-primary "
                  >
                    Documento
                  </label>
                  <input
                    id="document"
                    type="number"
                    placeholder="Ingresa tu documento"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full px-2.5 py-3"
                    name="document"
                    required
                    value={formData.document}
                    onChange={handleChangeRegisterUser}
                  />
                  <span
                    ref={feedbackRegexDocument}
                    className="text-xs font-semibold"
                  ></span>
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-1 text-base font-bold text-primary "
                  >
                    Nombres
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Ingresa tus nombres"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full px-2.5 py-3"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChangeRegisterUser}
                  />
                  <span
                    ref={feedbackRegexName}
                    className="text-xs font-semibold"
                  ></span>
                </div>
                <div>
                  <label
                    htmlFor="last_names"
                    className="block mb-1 text-base font-bold text-primary "
                  >
                    Apellidos
                  </label>
                  <input
                    id="last_names"
                    type="text"
                    placeholder="Ingresa tus apellidos"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full px-2.5 py-3"
                    name="last_names"
                    required
                    value={formData.last_names}
                    onChange={handleChangeRegisterUser}
                  />
                  <span
                    ref={feedbackRegexLastNames}
                    className="text-xs font-semibold"
                  ></span>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-base font-bold text-primary "
                  >
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Ingresa tu correo"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full px-2.5 py-3"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChangeRegisterUser}
                  />
                  <span
                    ref={feedbackRegexEmail}
                    className="text-xs font-semibold"
                  ></span>
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-1 text-base font-bold text-primary "
                  >
                    Teléfono
                  </label>
                  <input
                    id="phone"
                    type="number"
                    placeholder="Ingresa tu número de teléfono"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full px-2.5 py-3"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChangeRegisterUser}
                  />
                  <span
                    ref={feedbackRegexPhone}
                    className="text-xs font-semibold"
                  ></span>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="password"
                    className="block mb-1 text-base font-bold text-primary "
                  >
                    Contraseña
                  </label>
                  <div className="relative">
                    <Input
                      size="lg"
                      id="password"
                      name="password"
                      placeholder="Crea una contraseña"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-2xl block w-full "
                      value={formData.password}
                      onChange={handleChangeRegisterUser}
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
                  <span
                    ref={feedbackRegexPassword}
                    className="text-xs font-semibold"
                  ></span>
                </div>
              </div>
              {successMessage && (
                <div className="text-center text-sm text-green-600 font-bold">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="text-center text-sm text-red-600 font-bold">
                  {errorMessage}
                </div>
              )}
              <button
                type="submit"
                className={`mt-4 w-full font-bold rounded-lg text-lg px-5 py-2.5 text-center ${
                  documentEvent &&
                  nameEvent &&
                  lastNamesEvent &&
                  emailEvent &&
                  phoneEvent &&
                  passwordEvent
                    ? "bg-[#277400] text-white hover:bg-[#277400]"
                    : "bg-gray-300 text-black cursor-not-allowed"
                }`}
                disabled={
                  !(
                    documentEvent &&
                    nameEvent &&
                    lastNamesEvent &&
                    emailEvent &&
                    phoneEvent &&
                    passwordEvent
                  )
                }
              >
                Crear cuenta
              </button>
            </form>
          </div>
        </section>
      </main>
      <footer className="my-3">
        <p className="text-black font-medium text-sm text-center">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/iniciarsesion" className="text-primary">
            Iniciar sesión
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default Registrarse;
