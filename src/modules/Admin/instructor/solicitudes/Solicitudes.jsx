import { useCallback, useEffect, useState } from "react";

const Solicitudes = () => {
  const [requests, setRequests] = useState([]);

  const getRequests = useCallback(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/events/global/self/all`
    );
    const data = await response.json();
    setRequests(Array.isArray(data) ? data : [data]);
  }, []);

  useEffect(() => {
    getRequests();
  }, [getRequests]);

  useEffect(() => {
    console.log(requests);
  }, [requests]);

  return (
    <div>
      <h1>Solicitudes</h1>
    </div>
  );
};

export default Solicitudes;
