import PropTyopes from "prop-types";
import { memo } from "react";

const MesEventos = memo(({ eventCount }) => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center w-full lg:w-1/2 mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden md:max-w-2xl py-6 px-4 md:px-6 lg:px-8">
      <h2 className="flex flex-col text-center">
        <span className="block text-8xl font-bold text-primary">
          {eventCount}
        </span>
      </h2>
      <p className="text-3xl font-semibold text-gray-900 text-center">
        Total de eventos registrados  
      </p>
    </div>
  );
});

MesEventos.displayName = "MesEventos";

MesEventos.propTypes = {
  eventCount: PropTyopes.number,
};

export default MesEventos;
