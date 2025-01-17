import { useState } from "react";

const useUpdate = () => {
  const [error, setError] = useState(null);

  const update = async (data, endpoint) => {
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message);
      }

      const result = await response.json();
      return result;
    } catch (err) {
      setError(error.message);
      throw err;
    }
  };
  return { update, error };
};

export default useUpdate;
