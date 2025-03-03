const columns = [
  { name: "ID", uid: "id_global_event", sortable: true },
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "DESCRIPCIÓN", uid: "details", sortable: true },
  { name: "ESTADO", uid: "status", sortable: true },
  { name: "Acciones", uid: "actions" },
  { name: "ACEPTAR O RECHAZAR", uid: "actions2" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "id_global_event",
  "name",
  "details",
  "status",
  "actions",
  "actions2",
];

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}
export { columns, INITIAL_VISIBLE_COLUMNS, capitalize };
