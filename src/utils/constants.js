export const COLLECTIONS = {
  USUARIOS: "usuarios",
  VENTAS: "ventas",
  PRODUCTOS: "productos",
  MESAS: "mesas",
  ERRORES: "errores",
  CIERRES: "cierres",
  CONSUMOS: "consumos",
  CONFIGURACION: "configuracion",
  CAJA: "caja",
  LOTES: "lotes_agotados",
};

export const DOC_IDS = {
  TODOS: "todos",
  TODAS: "todas",
  BILLAR: "billar",
  CONSUMO: "consumo",
  HISTORIAL: "historial",
  DUENO: "dueno",
  GENERAL: "general",
};

export const SECURITY = {
  TIEMPO_EXPIRACION: 30 * 60 * 1000, // 30 minutes in milliseconds
};

export const USE_LOCAL_STORAGE = false; // Set to true to mock Firestore in development if needed
