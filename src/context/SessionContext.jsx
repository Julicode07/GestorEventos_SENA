import { createContext, useState, useCallback } from "react";

export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
  const [userSession, setUserSession] = useState({
    document: null,
    role: null,
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
          role: data.data.role,
        });
        console.log(userSession);
      } else {
        console.log("You don´t have any active session in eventos.");
        
        setUserSession({
          document: null,
          role: null,
        });
        console.log(userSession);
      }
    } catch (error) {
      setUserSession({
        document: null,
        role: null,
      });
      console.log(userSession);
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
