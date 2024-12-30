import { createContext, useState, useCallback } from "react";

export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
  const [userSession, setUserSession] = useState({
    document: null,
    role: null,
  });

  const [names, setNames] = useState({
    name: null,
    lastName: null,
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
        setNames({
          name: "Felipe",
          lastName: "Alzate",
        });
      } else {
        setUserSession({
          document: null,
          role: null,
        });
        setNames({
          name: null,
          lastName: null,
        });
      }
    } catch (error) {
      setUserSession({
        document: null,
        role: null,
      });
      setNames({
        name: null,
        lastName: null,
      });
      console.log("We had an error", error);
    }
  }, []);

  return (
    <SessionContext.Provider
      value={{
        userSession,
        setUserSession,
        updateSession,
        names,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
