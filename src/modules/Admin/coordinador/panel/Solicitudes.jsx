import { Button } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useUpdate from "../../../hooks/useUpdate";

function Solicitudes() {
  const { update } = useUpdate();
  const [updateState, setUpdateState] = useState({
    status: "",
  });
  const [idGlobalEvent, setIdGlobalEvent] = useState("");
  const [pendientRequests, setPendientRequests] = useState([]);

  const getRequests = useCallback(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/events/global/all`
    );
    const data = await response.json();
    setPendientRequests(Array.isArray(data) ? data : [data]);
  }, []);

  useEffect(() => {
    getRequests();
  }, [getRequests]);

  const handleStatus = (id, status) => {
    setIdGlobalEvent(id);
    setUpdateState({ status: status });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await update(
        updateState,
        `/api/events/update/state/${idGlobalEvent}`
      );
      console.log(result);
      setUpdateState({ status: "" });
      window.location.reload();
    } catch (err) {
      console.error("Ocurrio un error al actualizar el estado", err);
    }
  };

  const pendientRequestsCount = pendientRequests.filter(
    (request) => request.status === "Pendiente"
  ).length;

  const pendient = pendientRequests.filter(
    (request) => request.status === "Pendiente"
  );

  const recentEvents = pendient.slice(0, 3);

  if (pendientRequestsCount.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full px-4 pt-4 pb-2 bg-white border border-gray-200 rounded-lg shadow sm:pt-6">
        <h5 className="text-xl sm:text-4xl font-bold leading-none text-gray-900 whitespace-nowrap py-10 sm:py-0">
          No hay solicitudes pendientes
        </h5>
      </div>
    );
  } else
    return (
      <div className="relative flex flex-col items-center justify-center w-full px-4 pt-4 pb-2 bg-white border border-gray-200 rounded-lg shadow sm:pt-6">
        <div className="md:w-full md:flex md:items-center md:justify-between flex-col md:flex-row md:mb-4 flex items-center w-full">
          <h5 className="text-xl sm:text-2xl font-bold leading-none text-gray-900 whitespace-nowrap">
            Solicitudes Pendientes
          </h5>
          <a
            href="/admin/coordinador/solicitudes"
            className="flex flex-col items-center w-fit bg-primary p-2 text-sm sm:text-base font-medium text-white rounded-lg transition-all duration-300 ease-in-out whitespace-nowrap mt-3"
          >
            Ver todas
          </a>
        </div>
        <div className="w-full flow-root">
          <ul role="list" className="divide-y divide-gray-200">
            {recentEvents.map((event) => (
              <li key={event.id_global_event} className="py-3 sm:py-4">
                <div className="md:flex md:justify-between md:items-center md:flex-1 md:min-w-0 md:ms-4 md:space-y-0 block space-y-3">
                  <Link
                    to={`/admin/coordinador/solicitudes/ver/${event.id_global_event}`}
                  >
                    <div className="">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {event.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {event.status}
                      </p>
                    </div>
                  </Link>

                  <form className="flex space-x-2" onSubmit={handleSubmit}>
                    <Button
                      type="submit"
                      className="text-green-800 bg-green-300"
                      onClick={() =>
                        handleStatus(event.id_global_event, "Aceptado")
                      }
                    >
                      <i className="ri-check-line"></i>
                    </Button>
                    <Button
                      type="submit"
                      className="text-red-800 bg-red-300"
                      onClick={() =>
                        handleStatus(event.id_global_event, "Rechazado")
                      }
                    >
                      <i className="ri-close-large-line"></i>
                    </Button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-1 justify-center text-sm">
          <span className="font-bold">Total de solicitudes: </span>
          <span className="font-medium"> {pendientRequestsCount}</span>
        </div>
      </div>
    );
}

export default Solicitudes;
