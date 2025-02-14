import { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Input, Textarea } from "@nextui-org/react";
import useRegister from "../../../hooks/useRegister";
import { SessionContext } from "@/context/SessionContext.jsx";
import { PlusIcon } from "@modules/Admin/components/PlusIcon";

const ModalEventos = () => {
  const { register } = useRegister();
  const { names, updateSession } = useContext(SessionContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [succesMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Sesión
  useEffect(() => {
    updateSession();
  }, [updateSession]);
  //

  const [registerEvent, setRegisterEvent] = useState({
    id_user: names.id_user,
    name: "",
    details: "",
    status: "Pendiente",
  });

  const handleChangeEvent = (e) => {
    const { name, value } = e.target;
    setRegisterEvent((prevDataEvent) => ({
      ...prevDataEvent,
      [name]: value,
    }));
  };

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    console.log(registerEvent);
    try {
      const result = await register(registerEvent, "/api/events/global");
      setSuccessMessage("Registro exitoso");
      setErrorMessage("");
      console.log("the data is: ", result);
      setRegisterEvent({
        name: "",
        details: "",
        status: "Pendiente",
      });
      window.location.reload();
    } catch (error) {
      setErrorMessage("Ocurrio un error al registrar el evento", error);
      setSuccessMessage("");
    }
  };

  return (
    <>
      {/* Modal to create event */}
      <Button
        className="bg-primary/80 hover:bg-primary/100 text-white"
        onClick={() => setIsModalOpen(true)}
        endContent={<PlusIcon />}
      >
        Crear Evento Global
      </Button>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-40"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsModalOpen(false);
                }
              }}
            >
              <div className="relative p-4 w-full max-w-2xl z-50">
                <div className="relative bg-white rounded-lg shadow">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                    <h3 className="text-3xl font-semibold text-gray-900">
                      Crear evento global
                    </h3>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                      onClick={() => setIsModalOpen(false)}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6-6M7 7l6 6m-6-6-6 6"
                        />
                      </svg>
                      <span className="sr-only">Cerrar modal</span>
                    </button>
                  </div>

                  <div className="px-4 pt-4 md:px-5 md:pt-5">
                    <form className="space-y-4" onSubmit={handleSubmitEvent}>
                      <div>
                        <label
                          className="block mb-2 text-lg font-bold text-gray-900"
                          htmlFor="eventName"
                        >
                          Nombre del Evento
                        </label>
                        <Input
                          type="text"
                          name="name"
                          id="eventName"
                          value={registerEvent.name}
                          placeholder="Semana del instructor"
                          onChange={handleChangeEvent}
                        />
                      </div>
                      <div>
                        <label
                          className="block mb-2 text-lg font-bold text-gray-900"
                          htmlFor="eventDetails"
                        >
                          Descripción del evento
                        </label>
                        <Textarea
                          name="details"
                          id="eventDetails"
                          value={registerEvent.details}
                          placeholder="Escribe la descripción del evento"
                          rows="4"
                          onChange={handleChangeEvent}
                        />
                      </div>
                      <div className="flex items-center justify-center p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b">
                        <Button
                          type="submit"
                          color="primary"
                          aria-label="Crear evento"
                          data-testid="crear-evento"
                        >
                          Crear Evento
                        </Button>
                        <Button
                          color="danger"
                          onClick={() => setIsModalOpen(false)}
                        >
                          Cancelar
                        </Button>
                      </div>
                      <div className="flex justify-center">
                        {succesMessage && (
                          <p className="text-green-600 text-center">
                            {succesMessage}
                          </p>
                        )}
                        {errorMessage === "Evento creado correctamente" ? (
                          <p className="text-green-600 text-center">
                            {errorMessage}
                          </p>
                        ) : (
                          <p className="text-red-600 text-center">
                            {errorMessage}
                          </p>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModalEventos;
