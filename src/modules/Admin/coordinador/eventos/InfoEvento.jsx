import React from "react";
import { useParams } from "react-router-dom";
import { events } from "@modules/Admin/utils/data";

function InfoEvento() {
  const { id } = useParams();
  const event = events.find((event) => event.id.toString() === id);

  if (!event) {
    return <div>No se encontro el evento</div>;
  }
  return (
    <div>
      <h1>Detalles del Evento: {id}</h1>
    </div>
  );
}

export default InfoEvento;
