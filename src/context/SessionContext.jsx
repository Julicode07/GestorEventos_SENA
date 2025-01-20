import { createContext, useState, useCallback } from "react";

export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
  const [userSession, setUserSession] = useState({
    document: null,
    role: null,
  });

  const [names, setNames] = useState({
    id_user: null,
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
          id_user: data.data.id_user,
          name: data.data.name,
          lastName: data.data.last_name,
        });
        console.log(userSession);
        console.log(names);
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
