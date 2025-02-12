const columns = [
  { name: "ID", uid: "id_global_event", sortable: true },
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "DESCRIPCIÓN", uid: "details", sortable: true },
  { name: "ESTADO", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "id_global_event",
  "name",
  "details",
  "status",
  "actions",
];

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}
export { columns, INITIAL_VISIBLE_COLUMNS, capitalize };
