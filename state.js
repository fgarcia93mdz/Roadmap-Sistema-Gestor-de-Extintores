// state.js
// Estado global, persistencia y selección de proyecto

const STORAGE_KEY = 'roadmap_projects_v1';

let state = {
  currentProjectId: null,
  projects: [
    {
      id: 'extintores',
      nombre: 'Sistema Extintores',
      content: {
        resumen: {
          objetivo: "Beta en 6–8 semanas",
          enfoque: "Operación real",
          resultado: "Trazabilidad total",
          detalle: "Agregar contexto..."
        },
        estado: {
          backend: "Arquitectura sólida",
          frontend: "Dashboard inicial",
          negocio: "Relevamiento en curso",
          detalle: "Agregar métricas..."
        }
      },
      timeline: [
        {
          id: "fase_1",
          semana: "Semana 1–2",
          titulo: "Definición de procesos",
          detalle: "Relevamiento completo",
          status: "done",
          progreso: 100
        },
        {
          id: "fase_2",
          semana: "Semana 2–3",
          titulo: "Modelado",
          detalle: "Estados y eventos",
          status: "active",
          progreso: 60
        }
      ]
    }
  ]
};

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      state = JSON.parse(data);
    } catch {
      // fallback seguro
    }
  }
  if (!state.currentProjectId && state.projects.length) {
    state.currentProjectId = state.projects[0].id;
  }
}

function getCurrentProject() {
  return state.projects.find(p => p.id === state.currentProjectId);
}

function setCurrentProject(id) {
  state.currentProjectId = id;
  saveState();
}
