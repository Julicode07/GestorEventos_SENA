const columns = [
  { name: "ID", uid: "id_organizers", sortable: true },
  { name: "NOMBRE DEL EVENTO", uid: "sub_event_name", sortable: true },
  { name: "NOMBRE DEL ORGANIZADOR", uid: "organizer_name", sortable: true },
  { name: "ROLE", uid: "rol", sortable: true },
  { name: "EMAIL", uid: "email" },
  { name: "DIRECCION", uid: "address" },
  { name: "ACCIONES", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "id_organizers",
  "sub_event_name",
  "organizer_name",
  "rol",
  "email",
  "address",
  "actions",
];

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}
export { columns, INITIAL_VISIBLE_COLUMNS, capitalize };
