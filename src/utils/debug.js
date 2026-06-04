const DEBUG_MODE = import.meta.env.DEV || false;

const estilos = {
  sistema: "background: #2d7a4d; color: white; padding: 2px 5px; border-radius: 3px; font-weight: bold;",
  timer: "background: #007bff; color: white; padding: 2px 5px; border-radius: 3px; font-weight: bold;",
  venta: "background: #28a745; color: white; padding: 2px 5px; border-radius: 3px; font-weight: bold;",
  error: "background: #dc3545; color: white; padding: 2px 5px; border-radius: 3px; font-weight: bold;",
  stock: "background: #fd7e14; color: white; padding: 2px 5px; border-radius: 3px; font-weight: bold;",
  firebase: "background: #ffc107; color: black; padding: 2px 5px; border-radius: 3px; font-weight: bold;",
  seguridad: "background: #6f42c1; color: white; padding: 2px 5px; border-radius: 3px; font-weight: bold;",
};

export function debugLog(categoria, mensaje, datos = null) {
  if (!DEBUG_MODE) return;

  console.log(
    `%c${categoria.toUpperCase()}`,
    estilos[categoria] || "",
    mensaje,
    datos || ""
  );
}
