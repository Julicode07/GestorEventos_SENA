const columns = [
  { name: "ID", uid: "id_inventory", sortable: true },
  { name: "ESPACIO", uid: "name", sortable: true },
  { name: "NOMBRE", uid: "article_name" },
  { name: "DESCRIPCIÓN", uid: "description", sortable: true },
  { name: "CANTIDAD", uid: "quantity", sortable: true },
  { name: "TIPO", uid: "type", sortable: true },
  { name: "Acciones", uid: "actions" },
];

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const INITIAL_VISIBLE_COLUMNS = [
  "id_inventory",
  "name",
  "article_name",
  "description",
  "quantity",
  "type",
  "actions",
];

export { columns, capitalize, INITIAL_VISIBLE_COLUMNS };
