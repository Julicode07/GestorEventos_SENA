import { Button } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useState, useEffect } from "react";
import useUpdate from "../../../hooks/useUpdate";
import PropTypes from "prop-types";

const ModalUpdateGlobalEventState = ({
  idGlobalEvents,
  isModalUpdateGlobalEventStateOpen,
  setIsModalUpdateGlobalEventStateOpen,
}) => {
  const { update } = useUpdate();
  const [globalEventStatus, setGlobalEventStatus] = useState([]);
  const [updateStatus, setUpdateStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleStatus = (status) => {
    setUpdateStatus(status);
  };

  const getStatus = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/events/global/${idGlobalEvents}`
      );
      const data = await response.json();
      setGlobalEventStatus(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error("No se pudo traer la data", err);
    }
  }, [idGlobalEvents]);

  useEffect(() => {
    if (!idGlobalEvents) {
      setGlobalEventStatus([]);
      return;
    }
    getStatus();
  }, [idGlobalEvents, getStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await update(
        { status: updateStatus },
        `/api/events/update/state/${idGlobalEvents}`
      );
      setErrorMessage("");
      setUpdateStatus("");
      window.location.reload();
    } catch (error) {
      setErrorMessage("No se pudo actualizar la data");
      console.error("No se pudo actualizar la data", error);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isModalUpdateGlobalEventStateOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsModalUpdateGlobalEventStateOpen(false);
              }
            }}
          >
            <div className="relative p-6 w-full max-w-2xl z-50">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
                <div className="flex items-center justify-between border-b pb-4 mb-4">
                  <h1 className="font-bold text-2xl text-gray-900 dark:text-white">
                    Estado del evento: {globalEventStatus[0]?.event_name}
                  </h1>
                  <button
                    type="button"
                    className="text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg p-2"
                    onClick={() => setIsModalUpdateGlobalEventStateOpen(false)}
                  >
                    ✕
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-1">
                  <div className="flex flex-col">
                    <label className="text-lg font-bold text-gray-800 dark:text-gray-300">
                      Estado del subEvento:
                    </label>
                    <p
                      className={`text-sm font-bold text-center rounded-lg p-2 mt-2 ${
                        globalEventStatus[0]?.global_event_status === "Aceptado"
                          ? "bg-green-500 text-white"
                          : globalEventStatus[0]?.global_event_status ===
                            "Rechazado"
                          ? "bg-red-500 text-white"
                          : "bg-orange-300 text-orange-800"
                      }`}
                    >
                      {globalEventStatus[0]?.global_event_status}
                    </p>
                  </div>
                  <p className="text-lg font-semibold">Seleccione el estado:</p>
                  <div className="flex justify-center space-x-4">
                    {globalEventStatus[0]?.global_event_status ===
                    "Pendiente" ? (
                      <>
                        <Button
                          type="submit"
                          className="bg-green-700 text-white text-base font-semibold rounded-lg w-full p-3 flex justify-center items-center"
                          onClick={() => handleStatus("Confirmado")}
                        >
                          Aceptar
                        </Button>
                        <Button
                          type="submit"
                          className="bg-red-700 text-white text-base font-semibold rounded-lg w-full p-3 flex justify-center items-center"
                          onClick={() => handleStatus("Rechazado")}
                        >
                          Rechazar
                        </Button>
                      </>
                    ) : globalEventStatus[0]?.global_event_status ===
                      "Aceptado" ? (
                      <Button
                        type="submit"
                        className="bg-red-700 text-white text-base font-semibold rounded-lg w-full p-3 flex justify-center items-center"
                        onClick={() => handleStatus("Rechazado")}
                      >
                        Rechazar
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="bg-green-700 text-white text-base font-semibold rounded-lg w-full p-3 flex justify-center items-center"
                        onClick={() => handleStatus("Aceptado")}
                      >
                        Aceptar
                      </Button>
                    )}
                  </div>

                  {errorMessage && (
                    <p className="text-red-600 text-center font-medium my-2">
                      {errorMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

ModalUpdateGlobalEventState.propTypes = {
  idGlobalEvents: PropTypes.number,
  isModalUpdateGlobalEventStateOpen: PropTypes.bool,
  setIsModalUpdateGlobalEventStateOpen: PropTypes.func,
};

export default ModalUpdateGlobalEventState;
