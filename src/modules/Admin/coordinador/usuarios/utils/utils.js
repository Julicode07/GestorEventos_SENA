const INITIAL_VISIBLE_COLUMNS = [
  "id_user",
  "document",
  "name",
  "last_names",
  "email",
  "phone",
  "role",
  "actions",
];

function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export { INITIAL_VISIBLE_COLUMNS, capitalize };
