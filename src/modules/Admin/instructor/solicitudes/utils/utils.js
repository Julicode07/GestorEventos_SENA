const columns = [
  { name: "ID", uid: "id_global_event", sortable: true },
  { name: "NOMBRE", uid: "global_event_name", sortable: true },
  { name: "DESCRIPCIÓN", uid: "global_event_observations", sortable: true },
  { name: "ESTADO", uid: "global_event_status", sortable: true },
  { name: "ACCIONES", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "id_global_event",
  "global_event_name",
  "global_event_observations",
  "global_event_status",
  "actions",
];

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}
export { columns, INITIAL_VISIBLE_COLUMNS, capitalize };
