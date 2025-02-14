import { Button } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useState, useEffect } from "react";
import useUpdate from "../../../hooks/useUpdate";
import PropTypes from "prop-types";

const SubEventConfirmationModal = ({
  idSubEvents,
  isSubEventConfirmationModalOpen,
  setIsSubEventConfirmationModalOpen,
}) => {
  const { update } = useUpdate();
  const [subEventStatus, setSubEventStatus] = useState([]);
  const [updateStatus, setUpdateStatus] = useState("");
  const [succesMessage, setSuccesMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleStatus = (status) => {
    setUpdateStatus(status);
  };

  const getStatus = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/subEvents/${idSubEvents}`
      );
      const data = await response.json();
      setSubEventStatus(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error("No se pudo traer la data", err);
    }
  }, [idSubEvents]);

  useEffect(() => {
    if (!idSubEvents) {
      setSubEventStatus([]);
      return;
    }
    getStatus();
  }, [idSubEvents, getStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await update(
        { subeventConfirmation: updateStatus },
        `/api/subEvents/update/${idSubEvents}`
      );
      console.log(result);
      setSuccesMessage("El estado del evento se actualizo exitosamente");
      setErrorMessage("");
      setUpdateStatus("");
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      setSuccesMessage("");
      setErrorMessage("No se pudo actualizar la data");
      console.error("No se pudo actualizar la data", error);
    }
  };
  return (
    <>
      <AnimatePresence>
        {isSubEventConfirmationModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsSubEventConfirmationModalOpen(false);
              }
            }}
          >
            <div className="relative p-4 w-full max-w-2xl z-50">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                  <h1 className="font-bold text-2xl">
                    Organizadores del evento de `{subEventStatus[0]?.name}`
                  </h1>

                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                    onClick={() => {
                      setIsSubEventConfirmationModalOpen(false);
                    }}
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
                <form action="" className="p-3" onSubmit={handleSubmit}>
                  <div className="flex flex-col m-4">
                    <label
                      htmlFor="subEventConfirmation"
                      className="flex items-center space-x-3 text-xl my-3"
                    >
                      <b>Estado del subEvento:</b>{" "}
                      <p
                        className={`text-bold text-small text-center rounded-lg p-1 ${subEventStatus[0]?.subeventConfirmation === "Aceptado"
                          ? "bg-green-300 text-green-800"
                          : subEventStatus[0]?.subeventConfirmation ===
                            "Rechazado"
                            ? "bg-red-300 text-red-800"
                            : "bg-orange-300 text-orange-800"
                          }`}
                      >
                        {subEventStatus[0]?.subeventConfirmation}
                      </p>
                    </label>
                  </div>
                  <p className="text-lg font-semibold">Seleccione el estado:</p>
                  <div className="grid grid-cols-3 gap-4">
                    <Button
                      type="submit"
                      className="bg-green-700 text-white text-base font-semibold rounded-lg w-full p-3 flex justify-center items-center"
                      onClick={() => handleStatus("Confirmado")}
                    >
                      Confirmado
                    </Button>
                    <Button
                      type="submit"
                      className="bg-orange-300 text-orange-800 text-base font-semibold rounded-lg w-full p-3 flex justify-center items-center"
                      onClick={() => handleStatus("Pospuesto")}
                    >
                      Pospuesto
                    </Button>
                    <Button
                      type="submit"
                      className="bg-red-700 text-white text-base font-semibold rounded-lg w-full p-3 flex justify-center items-center"
                      onClick={() => handleStatus("Rechazado")}
                    >
                      Rechazado
                    </Button>
                  </div>
                  <div>
                    {succesMessage && (
                      <p className="text-green-600 text-center">
                        {succesMessage}
                      </p>
                    )}
                    {errorMessage && (
                      <p className="text-red-600">{errorMessage}</p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

SubEventConfirmationModal.propTypes = {
  idSubEvents: PropTypes.number,
  isSubEventConfirmationModalOpen: PropTypes.bool,
  setIsSubEventConfirmationModalOpen: PropTypes.func,
};

export default SubEventConfirmationModal;
