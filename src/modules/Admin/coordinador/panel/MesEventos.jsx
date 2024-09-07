import React from "react";

const MesEventos = ({ month, eventCount }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full lg:w-1/2 mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden md:max-w-2xl py-6 px-4 md:px-6 lg:px-8">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 text-center">
        Eventos en {month}
      </h2>

      <p className="flex flex-col gap-4 md:gap-6 mt-4 text-center">
        <span className="block text-8xl font-bold text-primary">
          {eventCount}
        </span>
        <span className="block text-secondary text-xl md:text-2xl font-bold mt-2">
          Eventos registrados para este mes
        </span>
      </p>
    </div>
  );
};

export default MesEventos;
