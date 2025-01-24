const columns = [
  { name: "ID", uid: "id_sub_event", sortable: true },
  { name: "ESPACIO GLOBAL", uid: "global_event_name", sortable: true },
  { name: "NOMBRE", uid: "name" },
  { name: "SEDE", uid: "headquarters", sortable: true },
  { name: "FECHA DE INICIO", uid: "start_date", sortable: true },
  { name: "FECHA DE FIN", uid: "end_date", sortable: true },
  { name: "DESCRIPCIÓN", uid: "description", sortable: true },
  {
    name: "ESTADO DE CONFIRMACIÓN",
    uid: "subeventConfirmation",
    sortable: true,
  },
  { name: "ACTIONS", uid: "actions" },
];

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const INITIAL_VISIBLE_COLUMNS = [
  "id_sub_event",
  "global_event_name",
  "name",
  "headquarters",
  "start_date",
  "end_date",
  "description",
  "subeventConfirmation",
  "actions",
];

export { columns, capitalize, INITIAL_VISIBLE_COLUMNS };
