const columns = [
  { name: "ID", uid: "id_global_event", sortable: true },
  { name: "Nombre", uid: "global_event_name", sortable: true },
  { name: "Detalles", uid: "global_event_observations" },
  { name: "Estado", uid: "global_event_status" },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "id_global_event",
  "global_event_name",
  "global_event_observations",
  "global_event_status",
  "actions",
];

const statusOptions = [
  { name: "Activo", uid: "Activo" },
  { name: "Inactivo", uid: "Inactivo" },
];

export { columns, INITIAL_VISIBLE_COLUMNS, statusOptions };
