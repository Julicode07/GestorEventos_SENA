export const regexDocument = (document, feedBackRef, setEvent) => {
  const documentRegex = /^[0-9]{1,16}$/;
  const documentHasCorrectRegex = documentRegex.test(document);

  if (!documentHasCorrectRegex) {
    feedBackRef.current.textContent = "Documento inválido";
    feedBackRef.current.style.color = "red";
    setEvent(false);
  } else {
    feedBackRef.current.textContent = "";
    feedBackRef.current.style.color = "green";
    setEvent(true);
  }
};

export const regexName = (name, feedBackRef, setEvent) => {
  const nameRegex = /^[A-Za-zñ.Ñ:-á-|éí,óúÁÉÍ&%$ÓÚäëïöüÄËÏÖÜ0-9\s]{1,64}$/;
  const nameHasCorrectRegex = nameRegex.test(name);

  if (!nameHasCorrectRegex) {
    feedBackRef.current.textContent = "Nombre inválido";
    feedBackRef.current.style.color = "red";
    setEvent(false);
  } else {
    feedBackRef.current.textContent = "";
    feedBackRef.current.style.color = "green";
    setEvent(true);
  }
};

export const regexLastNames = (last_names, feedBackRef, setEvent) => {
  const lastNamesRegex = /^[A-Za-zñÑáéíóúÁÉÍÓÚäëïöüÄËÏÖÜ\s]{1,64}$/;
  const lastNamesHasCorrectRegex = lastNamesRegex.test(last_names);

  if (lastNamesHasCorrectRegex) {
    feedBackRef.current.textContent = "";
    feedBackRef.current.style.color = "green";
    setEvent(true);
  } else {
    feedBackRef.current.textContent = "Apellidos inválidos";
    feedBackRef.current.style.color = "red";
    setEvent(false);
  }
};

export const regexEmail = (email, feedBackRef, setEvent) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailHasCorrectRegex = emailRegex.test(email);

  if (!emailHasCorrectRegex) {
    feedBackRef.current.textContent = "Correo inválido";
    feedBackRef.current.style.color = "red";
    setEvent(false);
  } else {
    feedBackRef.current.textContent = "";
    feedBackRef.current.style.color = "green";
    setEvent(true);
  }
};

export const regexPhone = (phone, feedBackRef, setEvent) => {
  const regexPhone = /^[0-9]{1,16}$/;
  const phoneHasCorrectRegex = regexPhone.test(phone);

  if (!phoneHasCorrectRegex) {
    feedBackRef.current.textContent = "Teléfono inválido";
    feedBackRef.current.style.color = "red";
    setEvent(false);
  } else {
    feedBackRef.current.textContent = "";
    feedBackRef.current.style.color = "green";
    setEvent(true);
  }
};

export const regexPassword = (password, feedBackRef, setEvent) => {
  const regexPassword =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,256}$/;
  const passwordHasCorrectRegex = regexPassword.test(password);

  if (!passwordHasCorrectRegex) {
    feedBackRef.current.textContent = "Contraseña inválida";
    feedBackRef.current.style.color = "red";
    setEvent(false);
  } else {
    feedBackRef.current.textContent = "";
    feedBackRef.current.style.color = "green";
    setEvent(true);
  }
};
