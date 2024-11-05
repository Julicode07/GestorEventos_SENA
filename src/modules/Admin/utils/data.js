const columns = [
  { name: "ID", uid: "id_user", sortable: true },
  { name: "DOCUMENTO", uid: "document" },
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "APELLIDOS", uid: "last_names", sortable: true },
  { name: "EMAIL", uid: "email", sortable: true },
  { name: "TELEFONO", uid: "phone", sortable: true },
  { name: "ROL", uid: "role", sortable: true },
  { name: "ACCIONES", uid: "actions" },
];

const statusOptions = [
  { name: "Aceptado", uid: "Aceptado" },
  { name: "Pendiente", uid: "Pendiente" },
  { name: "Rechazado", uid: "Rechazado" },
  { name: "Finalizado", uid: "Finalizado" },
];

const events = [];

export { columns, events, statusOptions };
