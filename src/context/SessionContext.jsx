import { createContext, useState, useCallback } from "react";

export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
  const [userSession, setUserSession] = useState({
    document: null,
    role: "Instructor",
  });

  const updateSession = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/check-my-session`
      );
      const data = await response.json();
      if (response.ok) {
        setUserSession({
          document: data.data.document,
          role: "Instructor",
        });
      } else {
        console.log("You don´t have any active session in eventos.");
        setUserSession({
          document: null,
          role: null,
        });
      }
    } catch (error) {
      setUserSession({
        document: null,
        role: null,
      });
    }
  }, []);

  return (
    <SessionContext.Provider
      value={{
        userSession,
        setUserSession,
        updateSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
