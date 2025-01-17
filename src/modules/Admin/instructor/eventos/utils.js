const columns = [
  { name: "ID", uid: "id_global_event", sortable: true },
  { name: "Nombre", uid: "name", sortable: true },
  { name: "Detalles", uid: "details" },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = ["id_global_event", "name", "details", "actions"];

const statusOptions = [
  { name: "Activo", uid: "Activo" },
  { name: "Inactivo", uid: "Inactivo" },
];

export { columns, INITIAL_VISIBLE_COLUMNS, statusOptions };
