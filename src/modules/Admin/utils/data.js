// Columnas para la tabla
const columns = [
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "EVENTO GLOBAL", uid: "event" },
  { name: "FECHA INICIO", uid: "startDate", sortable: true },
  { name: "FECHA FIN", uid: "endDate", sortable: true },
  { name: "ESTADO", uid: "status" },
  { name: "ACCIONES", uid: "actions" },
];

// Opciones de estado
const statusOptions = [
  { name: "Aceptado", uid: "Aceptado" },
  { name: "Pendiente", uid: "Pendiente" },
  { name: "Rechazado", uid: "Rechazado" },
  { name: "Finalizado", uid: "Finalizado" },
];

// Eventos
const events = [
  {
    id: 1,
    user: {
      name: "Zoey Lang",
      email: "zoey.lang@example.com",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    name: "Semana del Aprendiz",
    type: "globalEvent",
    startDate: "2024-10-01",
    endDate: "2024-10-07",
    status: "Finalizado",
    description:
      "Un evento global que celebra el aprendizaje con diversas actividades y talleres.",
    subEvents: [
      {
        id: 2,
        user: {
          name: "Zoey Lang",
          email: "zoey.lang@example.com",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        },
        name: "Taller de Desarrollo Web",
        type: "subEvent",
        startDate: "2024-10-02",
        endDate: "2024-10-02",
        description:
          "Un taller práctico sobre desarrollo web utilizando las últimas tecnologías.",
        parentEventId: "global-1",
      },
      {
        id: 3,
        user: {
          name: "Zoey Lang",
          email: "zoey.lang@example.com",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        },
        name: "Charla de Motivación",
        type: "subEvent",
        startDate: "2024-10-03",
        endDate: "2024-10-03",
        description:
          "Una charla inspiradora con líderes en la industria de la tecnología.",
        parentEventId: "global-1",
      },
      {
        id: 4,
        user: {
          name: "Zoey Lang",
          email: "zoey.lang@example.com",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        },
        name: "Competencia de Programación",
        type: "subEvent",
        startDate: "2024-10-04",
        endDate: "2024-10-04",
        description:
          "Una competencia para probar tus habilidades de programación con otros aprendices.",
        parentEventId: "global-1",
      },
    ],
  },
  {
    id: 5,
    user: {
      name: "Zoey Lang",
      email: "zoey.lang@example.com",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    name: "Hackathon de Desarrollo",
    type: "normalEvent",
    space: "Sala de Reuniones 2",
    startDate: "2024-10-10",
    endDate: "2024-10-11",
    supplies: "Laptop, Pizarra",
    status: "Pendiente",
  },
  {
    id: 6,
    user: {
      name: "Zoey Lang",
      email: "zoey.lang@example.com",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    name: "Semana del Instructor",
    type: "globalEvent",
    startDate: "2024-10-01",
    endDate: "2024-10-07",
    status: "Aceptado",
    description:
      "Un evento global que celebra el aprendizaje con diversas actividades y talleres.",
    subEvents: [
      {
        id: 7,
        user: {
          name: "Zoey Lang",
          email: "zoey.lang@example.com",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        },
        name: "Taller de Desarrollo Web",
        type: "subEvent",
        startDate: "2024-10-02",
        endDate: "2024-10-02",
        description:
          "Un taller práctico sobre desarrollo web utilizando las últimas tecnologías.",
        parentEventId: "global-6",
      },
      {
        id: 8,
        user: {
          name: "Zoey Lang",
          email: "zoey.lang@example.com",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        },
        name: "Charla de Motivación",
        type: "subEvent",
        startDate: "2024-10-03",
        endDate: "2024-10-03",
        description:
          "Una charla inspiradora con líderes en la industria de la tecnología.",
        parentEventId: "global-6",
      },
      {
        id: 9,
        user: {
          name: "Zoey Lang",
          email: "zoey.lang@example.com",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        },
        name: "Competencia de Programación",
        type: "subEvent",
        startDate: "2024-10-04",
        endDate: "2024-10-04",
        description:
          "Una competencia para probar tus habilidades de programación con otros aprendices.",
        parentEventId: "global-6",
      },
    ],
  },
  {
    id: 10,
    user: {
      name: "Zoey Lang",
      email: "zoey.lang@example.com",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    name: "Hackathon de Desarrollo",
    type: "normalEvent",
    space: "Sala de Reuniones 2",
    startDate: "2024-10-10",
    endDate: "2024-10-11",
    supplies: "Laptop, Pizarra",
    status: "Finalizado",
  },
  {
    id: 11,
    user: {
      name: "Lucas Díaz",
      email: "lucas.diaz@example.com",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704a",
    },
    name: "Conferencia sobre IA",
    type: "normalEvent",
    space: "Auditorio Principal",
    startDate: "2024-11-15",
    endDate: "2024-11-15",
    supplies: "Proyector, Ordenadores",
    status: "Pendiente",
  },
  // Evento global
  {
    id: 12,
    user: {
      name: "María López",
      email: "maria.lopez@example.com",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704b",
    },
    name: "Semana de la Ciencia",
    type: "globalEvent",
    startDate: "2024-11-01",
    endDate: "2024-11-07",
    status: "Rechazado",
    description:
      "Una semana llena de actividades dedicadas a la ciencia y la tecnología.",
    subEvents: [
      {
        id: 13,
        user: {
          name: "María López",
          email: "maria.lopez@example.com",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704b",
        },
        name: "Seminario de Física Cuántica",
        type: "subEvent",
        startDate: "2024-11-02",
        endDate: "2024-11-02",
        description:
          "Un seminario sobre los últimos avances en física cuántica.",
        parentEventId: "global-12",
      },
      {
        id: 14,
        user: {
          name: "María López",
          email: "maria.lopez@example.com",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704b",
        },
        name: "Conferencia sobre Biotecnología",
        type: "subEvent",
        startDate: "2024-11-03",
        endDate: "2024-11-03",
        description:
          "Una conferencia que explora los últimos desarrollos en biotecnología.",
        parentEventId: "global-12",
      },
    ],
  },
  // Evento normal
  {
    id: 15,
    user: {
      name: "Carlos Herrera",
      email: "carlos.herrera@example.com",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704c",
    },
    name: "Hackathon de Fin de Semana",
    type: "normalEvent",
    space: "Laboratorio de Computación",
    startDate: "2024-12-12",
    endDate: "2024-12-14",
    supplies: "Ordenadores, Snacks",
    status: "Aceptado",
  },
  // Evento global
  {
    id: 16,
    user: {
      name: "Sofía Martínez",
      email: "sofia.martinez@example.com",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    name: "Semana de Innovación",
    type: "globalEvent",
    startDate: "2024-12-01",
    endDate: "2024-12-07",
    status: "Pendiente",
    description:
      "Un evento global que destaca las innovaciones recientes en varias industrias.",
    subEvents: [
      {
        id: 17,
        user: {
          name: "Sofía Martínez",
          email: "sofia.martinez@example.com",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        },
        name: "Foro de Innovación Empresarial",
        type: "subEvent",
        startDate: "2024-12-02",
        endDate: "2024-12-02",
        description:
          "Un foro para discutir la innovación en el ámbito empresarial.",
        parentEventId: "global-16",
      },
      {
        id: 18,
        user: {
          name: "Sofía Martínez",
          email: "sofia.martinez@example.com",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        },
        name: "Workshop sobre Startups",
        type: "subEvent",
        startDate: "2024-12-03",
        endDate: "2024-12-03",
        description:
          "Un taller interactivo para aquellos interesados en lanzar su propia startup.",
        parentEventId: "global-16",
      },
    ],
  },
  // Evento normal
  {
    id: 19,
    user: {
      name: "Laura Pérez",
      email: "laura.perez@example.com",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
    },
    name: "Taller de Inteligencia Artificial",
    type: "normalEvent",
    space: "Sala de Conferencias 1",
    startDate: "2024-12-05",
    endDate: "2024-12-05",
    supplies: "Laptop, Notas",
    status: "Rechazado",
  },
  // Evento normal
  {
    id: 20,
    user: {
      name: "Diego Fernández",
      email: "diego.fernandez@example.com",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f",
    },
    name: "Seminario de Marketing Digital",
    type: "normalEvent",
    space: "Sala de Reuniones 1",
    startDate: "2024-12-08",
    endDate: "2024-12-08",
    supplies: "Proyector, Wi-Fi",
    status: "Finalizado",
  },
  // Evento global
  {
    id: 21,
    user: {
      name: "Ana Torres",
      email: "ana.torres@example.com",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704g",
    },
    name: "Semana del Desarrollo Sostenible",
    type: "globalEvent",
    startDate: "2024-12-10",
    endDate: "2024-12-16",
    status: "Pendiente",
    description:
      "Actividades y conferencias dedicadas a promover el desarrollo sostenible.",
    subEvents: [
      {
        id: 22,
        user: {
          name: "Ana Torres",
          email: "ana.torres@example.com",
          avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704g",
        },
        name: "Charla sobre Energías Renovables",
        type: "subEvent",
        startDate: "2024-12-11",
        endDate: "2024-12-11",
        description:
          "Una charla sobre la implementación de energías renovables en la industria.",
        parentEventId: "global-21",
      },
    ],
  },
  // Evento normal
  {
    id: 23,
    user: {
      name: "Andrés Gómez",
      email: "andres.gomez@example.com",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704h",
    },
    name: "Jornada de Networking",
    type: "normalEvent",
    space: "Terraza",
    startDate: "2024-12-20",
    endDate: "2024-12-20",
    supplies: "Bebidas, Tarjetas de Visita",
    status: "Aceptado",
  },
  // Evento normal
  {
    id: 24,
    user: {
      name: "Luis Ramírez",
      email: "luis.ramirez@example.com",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704i",
    },
    name: "Seminario de Robótica",
    type: "normalEvent",
    space: "Auditorio 2",
    startDate: "2024-12-22",
    endDate: "2024-12-22",
    supplies: "Kits de Robótica",
    status: "Rechazado",
  },
  // Evento normal
  {
    id: 25,
    user: {
      name: "Isabel García",
      email: "isabel.garcia@example.com",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704j",
    },
    name: "Taller de Machine Learning",
    type: "normalEvent",
    space: "Laboratorio de Datos",
    startDate: "2025-01-05",
    endDate: "2025-01-05",
    supplies: "Ordenadores, Software ML",
    status: "Pendiente",
  },
];

export { columns, events, statusOptions };
