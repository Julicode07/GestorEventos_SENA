export const databaseRegex = {
  users: {
    id_user: /^[0-9]{1,9}$/,
    document: /^[0-9]{1,16}$/,
    name: /^[A-Za-zñ.Ñ:-á-|éí,óúÁÉÍ&%$ÓÚäëïöüÄËÏÖÜ0-9\s]{1,64}$/,
    last_names: /^[A-Za-zñ.Ñ:-á-|éí,óúÁÉÍ&%$ÓÚäëïöüÄËÏÖÜ0-9\s]{1,64}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^[0-9]{1,16}$/,
    role: /^(Instructor|Coordinador)$/,
    password:
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,256}$/,
  },

  global_events: {
    id_global_event: /^[0-9]{1,9}$/,
    id_user: /^[0-9]{1,9}$/,
    name: /^[A-Za-zñ.Ñ:-á-|éí,.ó'úÁÉÍ&%$ÓÚäëïöüÄËÏÖÜ0-9\s]{1,64}$/,
    details: /^[A-Za-zñ.Ñ:-á-|éí,.'óúÁÉÍ&%$ÓÚäëïöüÄËÏÖÜ0-9\s]{1,255}$/,
    status: /^(Rechazado|Pendiente|Aceptado)$/,
  },

  spaces: {
    id_space: /^[0-9]{1,9}$/,
    name: /^[A-Za-zñ.Ñ:-á-|éí,óúÁÉÍ&%$ÓÚäëïöüÄËÏÖÜ0-9\s]{1,45}$/,
    capacity: /^[0-9]{1,9}$/,
    type: /^[A-Za-zñ.Ñ:-á-|éí,óúÁÉÍ&%$ÓÚäëïöüÄËÏÖÜ0-9\s]{1,45}$/,
    status: /^[A-Za-zñ.Ñ:-á-|éí,óúÁÉÍ&%$ÓÚäëïöüÄËÏÖÜ0-9\s]{1,64}$/,
    details: /^[A-Za-zñ.Ñ:-á-|éí,óúÁÉÍ&%$ÓÚäëïöüÄËÏÖÜ0-9\s]{1,255}$/,
  },

  inventory: {
    id_inventory: /^[0-9]{1,9}$/,
    id_space: /^[0-9]{1,9}$/,
    article_name: /^[A-Za-zñ.Ñ:-á-|éí,óúÁÉÍ&%$ÓÚäëïöüÄËÏÖÜ0-9\s]{1,45}$/,
    description: /^[A-Za-zñ.Ñ:-á-|éí,óúÁÉÍ&%$ÓÚäëïöüÄËÏÖÜ0-9\s]{1,255}$/,
    quantity: /^[0-9]{1,9}$/,
    type: /^[A-Za-zñ.Ñ:-á-|éí,óúÁÉÍ&%$ÓÚäëïöüÄËÏÖÜ0-9\s]{1,45}$/,
  },

  subEvents: {
    id_sub_event: /^[0-9]{1,9}$/,
    id_global_event: /^[0-9]{1,9}$/,
    name: /^[A-Za-zñ.Ñ:-á-|éí,óúÁÉÍ&%$ÓÚäëïöüÄËÏÖÜ0-9\s]{1,64}$/,
    headquarters: /^[A-Za-zñ.Ñ:-á-|éí,óúÁÉÍ&%$ÓÚäëïöüÄËÏÖÜ0-9\s]{1,64}$/,
    start_date:
      /^(?:[1-9]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,
    end_date:
      /^(?:[1-9]\d{3})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,
    description: /^[A-Za-zñ.Ñ:-á-|éí,.'óúÁÉÍ&%$ÓÚäëïöüÄËÏÖÜ0-9\s]{1,255}$/,
    subeventConfirmation:
      /^(Programado|Confirmado|Cancelado|Pospuesto|Completado)$/,
  },

  organizers: {
    id_organizer: /^[0-9]{1,9}$/,
    id_sub_event: /^[0-9]{1,9}$/,
    name: /^[A-Za-zñ.Ñ:-á-|éí,óúÁÉÍ&%$ÓÚäëïöüÄËÏÖÜ0-9\s]{1,64}$/,
    rol: /^(Figura externa|Estudiante|Docente|Personal de comercio)$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    address: /^[A-Za-zñ.Ñ:-á|éí,'ó#úÁÉÍ&%$ÓÚäëïöüÄËÏÖÜ0-9\s-_]{1,64}$/,
  },
};
