import { Tooltip } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Solicitudes() {
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  const getRequests = useCallback(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/events/global/self/all`
    );
    const data = await response.json();

    // // Ordenar en orden descendente (más reciente primero)
    // const sortedData = Array.isArray(data)
    //   ? data.sort((a, b) => b.id_global_event - a.id_global_event)
    //   : [data];

    setAcceptedRequests(Array.isArray(data) ? data : [data]);
  }, []);

  useEffect(() => {
    getRequests();
  }, [getRequests]);

  const pendient = acceptedRequests.filter(
    (request) => request.global_event_status === "Aceptado"
  );

  useEffect(() => {
    console.log(pendient);
  }, [pendient]);

  if (pendient.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full px-4 pt-4 pb-2 bg-white border border-gray-200 rounded-lg shadow sm:pt-6">
        <h5 className="text-xl sm:text-4xl font-bold text-gray-900 py-10 sm:py-0">
          No hay solicitudes pendientes
        </h5>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center w-full px-4 pt-4 pb-2 bg-white border border-gray-200 rounded-lg shadow sm:pt-6">
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h5 className="text-xl sm:text-2xl text-center md:text-left font-bold text-gray-900">
          Solicitudes Pendientes
        </h5>
        <a
          href="/admin/instructor/solicitudes"
          className="bg-secondary text-white p-2 text-sm sm:text-base text-center md:text-left font-medium rounded-lg transition-all duration-300 mt-3 md:mt-0"
        >
          Ver todas <i className="ri-arrow-right-line"></i>
        </a>
      </div>

      <div className="w-full max-h-[220px] px-3 overflow-y-auto">
        <ul className="divide-y divide-gray-200">
          {pendient.map((event) => (
            <li key={event.id_global_event} className="py-2 sm:py-3">
              <div className="flex items-center justify-between gap-2">
                <Tooltip color="" content="Ver la solicitud">
                  <Link
                    to={`/admin/instructor/solicitudes/ver/${event.id_global_event}`}
                    className="flex-1 px-2 py-1 rounded-xl hover:bg-gray-100 transition-all duration-300"
                  >
                    <p className="text-sm font-medium text-gray-900 truncate">
                      <span className="font-bold">Nombre: </span>
                      {event.global_event_name}
                    </p>
                    <div className="flex text-center text-sm">
                      <span className="font-bold">Estado: </span>
                      <p className="bg-green-200 text-green-800 px-2 rounded-full">
                        {event.global_event_status}
                      </p>
                    </div>
                  </Link>
                </Tooltip>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-1 justify-center text-sm mt-2">
        <span className="font-bold">Total de solicitudes: </span>
        <span className="font-medium">{pendient.length}</span>
      </div>
    </div>
  );
}

export default Solicitudes;
