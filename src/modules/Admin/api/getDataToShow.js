export const getAllUsers = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/all`);
  const data = await response.json();
  return data;
};

export const getAllSpaces = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/spaces/all`
  );
  const data = await response.json();
  return data;
};
