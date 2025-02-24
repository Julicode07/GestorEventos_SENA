import { Input } from "@nextui-org/input";
import { EyeSlashFilledIcon } from "./components/EyeSlashFilledIcon.jsx";
import { EyeFilledIcon } from "./components/EyeFilledIcon.jsx";
/* import Images from "@/assets/img/images.js"; */
import { useRef, useState } from "react";
import useRegister from "../hooks/useRegister.jsx";
import {
  regexDocument,
  regexName,
  regexLastNames,
  regexEmail,
  regexPhone,
} from "./validations/registerValidation.js";
import { Select, SelectItem } from "@nextui-org/react";

const Registrarse = () => {
  const { register } = useRegister();
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

  const [documentEvent, setDocumentEvent] = useState(false);
  const [nameEvent, setNameEvent] = useState(false);
  const [lastNamesEvent, setLastNamesEvent] = useState(false);
  const [emailEvent, setEmailEvent] = useState(false);
  const [phoneEvent, setPhoneEvent] = useState(false);

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
      }
      return newDataRegister;
    });
  };

  const handleSubmitRegisterUsers = async (e) => {
    e.preventDefault();
    try {
      const result = await register(formData, "/api/users");
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
      window.location.reload();
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error registering user:", error);
      setSuccessMessage("");
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  const [validations, setValidations] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const requirements = [
    { regex: /.{8,}/, message: "Al menos 8 caracteres de longitud" },
    { regex: /[0-9]/, message: "Al menos 1 número (0...9)" },
    { regex: /[a-z]/, message: "Al menos 1 letra minúscula (a...z)" },
    { regex: /[^A-Za-z0-9]/, message: "Al menos 1 símbolo especial (!...$)" },
    { regex: /[A-Z]/, message: "Al menos 1 letra mayúscula (A...Z)" },
  ];

  const handlePasswordChange = (e) => {
    handleChangeRegisterUser(e);
    const value = e.target.value;
    const updatedValidations = requirements.map((req) => req.regex.test(value));
    setValidations(updatedValidations);
  };
  return (
    <div className="flex flex-col items-center justify-center px-4 gap-6 max-w-[700px] m-auto">
      {/*       <header>
        <img
          src={Images.logoVerde}
          className="h-24 md:h-30"
          alt="Logo Blanco SENA"
        />
      </header> */}

      <main>
        <section className="flex flex-col gap-7">
          <div>
            <h1 className="text-3xl font-bold text-center">Crea una cuenta</h1>
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
                    className="block mb-1 text-sm font-bold text-primary "
                  >
                    Rol de cuenta
                  </label>
                  <Select
                    size="xs"
                    id="role"
                    name="role"
                    placeholder="Selecciona tu rol"
                    value={formData.role}
                    onChange={handleChangeRegisterUser}
                    aria-label="Selecciona tu rol"
                  >
                    <SelectItem value="Coordinador" key={"Coordinador"}>
                      Coordinador
                    </SelectItem>
                    <SelectItem value="Instructor" key={"Instructor"}>
                      Instructor
                    </SelectItem>
                  </Select>
                </div>
                <div>
                  <label
                    htmlFor="document"
                    className="block mb-1 text-sm font-bold text-primary "
                  >
                    Documento
                  </label>
                  <Input
                    id="document"
                    type="number"
                    placeholder="Ingresa tu documento"
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
                    className="block mb-1 text-sm font-bold text-primary "
                  >
                    Nombres
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ingresa tus nombres"
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
                    className="block mb-1 text-sm font-bold text-primary "
                  >
                    Apellidos
                  </label>
                  <Input
                    id="last_names"
                    type="text"
                    placeholder="Ingresa tus apellidos"
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
                    className="block mb-1 text-sm font-bold text-primary "
                  >
                    Correo electrónico
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Ingresa tu correo"
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
                    className="block mb-1 text-sm font-bold text-primary "
                  >
                    Teléfono
                  </label>
                  <Input
                    id="phone"
                    type="number"
                    placeholder="Ingresa tu número de teléfono"
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
                    className="block mb-1 text-sm font-bold text-primary "
                  >
                    Contraseña
                  </label>
                  <div className="relative mb-4">
                    <Input
                      size="base"
                      id="password"
                      name="password"
                      placeholder="Crea una contraseña"
                      value={formData.password}
                      onChange={handlePasswordChange}
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
                  <div className="bg-gray-100 p-4 rounded-xl shadow-md">
                    <p className="text-sm font-semibold text-gray-700">
                      La contraseña debe contener:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      {requirements.map((req, index) => (
                        <li
                          key={index}
                          className={`flex items-center gap-2 ${
                            validations[index] ? "text-green-600" : ""
                          }`}
                        >
                          <i
                            className={`fa-solid ${
                              validations[index]
                                ? "fa-check text-green-500"
                                : "fa-circle text-gray-400"
                            }`}
                          ></i>
                          <span>{req.message}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
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
                  validations.every((validation) => validation === true)
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
                    validations.every((validation) => validation === true)
                  )
                }
              >
                Crear cuenta
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Registrarse;
