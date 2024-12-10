export const regexEventName = (eventName, feedBackRef, setEvent) => {
  const regex = /^[A-Za-zñ.Ñ:-á-|éí,.ó'úÁÉÍ&%$ÓÚäëïöüÄËÏÖÜ0-9\s]{1,64}$/;
  const regexTest = regex.test(eventName);

  if (regexTest) {
    feedBackRef.current.textContent = "";
    setEvent(true);
  } else {
    feedBackRef.current.textContent = "El nombre del evento no es valido";
    feedBackRef.current.style.color = "red";
    setEvent(false);
  }
};

export const regexEventDetails = (eventDetails, feedBackRef, setEvent) => {
  const regex = /^[A-Za-zñ.Ñ:-á-|éí,.'óúÁÉÍ&%$ÓÚäëïöüÄËÏÖÜ0-9\s]{1,255}$/;
  const regexTest = regex.test(eventDetails);

  if (regexTest) {
    feedBackRef.current.textContent = "";
    setEvent(true);
  } else {
    feedBackRef.current.textContent = "Los detalles del evento no son validos";
    feedBackRef.current.style.color = "red";
    setEvent(false);
  }
};
