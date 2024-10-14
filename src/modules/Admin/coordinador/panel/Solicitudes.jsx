import { Chip } from "@nextui-org/react";
import { events } from "@/modules/Admin/utils/data";

const filteredEvents = events.filter((event) => event.status === "Pendiente");

const recentEvents = filteredEvents.slice(0, 3);

const statusColorMap = {
  Pendiente: "warning",
};

function Solicitudes() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full px-4 pt-4 pb-2 bg-white border border-gray-200 rounded-lg shadow sm:pt-6">
      <div className="w-full flex items-center justify-between mb-4">
        <h5 className="text-xl sm:text-2xl font-bold leading-none text-gray-900 whitespace-nowrap">
          Últimas solicitudes
        </h5>
        <a
          href="/admin/coordinador/solicitudes"
          className="bg-primary p-2 text-sm sm:text-base font-medium text-white rounded-lg transition-all duration-300 ease-in-out whitespace-nowrap"
        >
          Ver todas
        </a>
      </div>
      <div className="w-full flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {recentEvents.map((event) => (
            <li key={event.id} className="py-3 sm:py-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={event.user.avatar}
                    alt={event.user.name}
                  />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {event.user.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {event.name}
                  </p>
                </div>
                <div className="inline-flex items-center text-sm font-medium text-gray-900">
                  <Chip
                    className="capitalize"
                    color={statusColorMap[event.status]}
                    size="sm"
                    variant="flat"
                  >
                    {event.status}
                  </Chip>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-1 justify-center text-sm">
        <span className="font-bold">Total de solicitudes:</span>
        <span className="font-medium"> {filteredEvents.length}</span>
      </div>
    </div>
  );
}

export default Solicitudes;
