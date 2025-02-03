const columns = [
  { name: "ID", uid: "id_space", sortable: true },
  { name: "Nombre", uid: "name", sortable: true },
  { name: "Capacidad", uid: "capacity", sortable: true },
  { name: "Tipo", uid: "type", sortable: true },
  { name: "Estado", uid: "status", sortable: true },
  { name: "Detalles", uid: "details" },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "id_space",
  "name",
  "capacity",
  "type",
  "status",
  "details",
  "actions",
];

const statusOptions = [
  { name: "Activo", uid: "Activo" },
  { name: "Inactivo", uid: "Inactivo" },
];

export { columns, INITIAL_VISIBLE_COLUMNS, statusOptions };
