import { useState } from "react";

const useRegisterUser = () => {
  const [error, setError] = useState(null);

  const registerUser = async (userData) => {
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };
  return { registerUser, error };
};

export default useRegisterUser;
