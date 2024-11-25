import { useState } from "react";

const useRegister = () => {
  const [error, setError] = useState(null);

  const register = async (data, endpoint) => {
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to register the data");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };
  return { register, error };
};

export default useRegister;
