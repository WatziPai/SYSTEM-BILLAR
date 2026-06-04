import { state, guardarDatosGenerico } from "@/services/state";
import { COLLECTIONS, DOC_IDS } from "@/utils/constants";
import { debugLog } from "@/utils/debug";
import { toast } from "@/components/toast";
import { confirmDialog } from "@/components/confirm-dialog";

// ======================================================
// =================== ERRORES =========================
// ======================================================

export function renderErrores() {
  const tabErrores = document.getElementById("tabErrores");
  if (!tabErrores) return;

  let container = tabErrores.querySelector("#erroresContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "erroresContainer";
    container.style.padding = "20px";
    container.style.minHeight = "300px";
    tabErrores.appendChild(container);
  }

  if (state.erroresReportados.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:50px;background:#f0f0f0;border-radius:10px;border:3px solid #28a745;min-height:300px;">
        <p style="font-size:64px;margin:0;">✅</p>
        <p style="margin-top:20px;font-size:18px;font-weight:600;color:#333;">No hay errores reportados</p>
        <p style="margin-top:10px;font-size:14px;color:#666;">El sistema está funcionando correctamente</p>
      </div>
    `;
    return;
  }

  const erroresOrdenados = [...state.erroresReportados].reverse();

  container.innerHTML = erroresOrdenados.map((e) => `
    <div class="error-card ${e.estado === "resuelto" ? "error-resuelto" : ""}" 
      style="background:white;border:3px solid #dc3545;border-radius:8px;margin-bottom:12px;padding:15px;box-shadow:0 4px 8px rgba(0,0,0,.2);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
        <span style="padding:5px 12px;border-radius:15px;font-size:12px;font-weight:600;${e.estado === "pendiente" ? "background:#ffc107;color:#000;" : "background:#28a745;color:white;}"}">
          ${e.estado === "pendiente" ? "⏳ Pendiente" : "✅ Resuelto"}
        </span>
        <span style="font-size:13px;color:#666;font-weight:bold;">${e.fecha}</span>
      </div>
      <div style="margin:12px 0;background:#f8f9fa;padding:10px;border-radius:5px;">
        <p style="margin:8px 0;"><strong style="color:#dc3545;">📝 Descripción:</strong> ${e.descripcion}</p>
        <p style="margin:8px 0;color:#666;"><strong>👤 Reportado por:</strong> ${e.usuario}</p>
      </div>
      <div style="display:flex;gap:8px;margin-top:12px;">
        <button class="btn-small btn-blue" data-action="toggle-error" data-id="${e.id}" style="flex:1;padding:8px 12px;font-size:13px;font-weight:bold;">
          ${e.estado === "pendiente" ? "✓ Marcar Resuelto" : "↻ Reabrir"}
        </button>
        <button class="btn-small btn-red" data-action="eliminar-error" data-id="${e.id}" style="padding:8px 12px;font-size:13px;font-weight:bold;">
          🗑️ Eliminar
        </button>
      </div>
    </div>
  `).join("");
}

async function reportarError() {
  const descripcion = document.getElementById("errorMensaje")?.value.trim();
  if (!descripcion) { toast.error("Por favor describe el error"); return; }

  const error = {
    id: Date.now(),
    descripcion,
    fecha: new Date().toLocaleString("es-PE"),
    usuario: state.usuarioActual.nombre,
    estado: "pendiente",
  };

  state.erroresReportados.push(error);
  await guardarDatosGenerico(COLLECTIONS.ERRORES, DOC_IDS.TODOS, { lista: state.erroresReportados });

  toast.success("✅ Error reportado correctamente. Gracias.");
  document.getElementById("modalError")?.classList.remove("show");
  debugLog("sistema", "⚠️ Error reportado", { descripcion });
}

async function toggleEstadoError(id) {
  const error = state.erroresReportados.find((e) => e.id === id);
  if (!error) return;
  error.estado = error.estado === "pendiente" ? "resuelto" : "pendiente";
  await guardarDatosGenerico(COLLECTIONS.ERRORES, DOC_IDS.TODOS, { lista: state.erroresReportados });
  renderErrores();
}

async function eliminarError(id) {
  const ok = await confirmDialog.show(
    "🗑️ Eliminar Error",
    "¿Estás seguro de eliminar este reporte?",
    { confirmText: "Eliminar", cancelText: "Cancelar", isDestructive: true }
  );
  if (!ok) return;

  state.erroresReportados = state.erroresReportados.filter((e) => e.id !== id);
  await guardarDatosGenerico(COLLECTIONS.ERRORES, DOC_IDS.TODOS, { lista: state.erroresReportados }, true);
  renderErrores();
}

export function initErroresEvents() {
  document.addEventListener("click", async (e) => {
    const el = e.target.closest("[data-action]");
    const action = el?.dataset.action;
    const id = parseInt(el?.dataset.id);

    switch (action) {
      case "show-modal-error":
        document.getElementById("errorMensaje") && (document.getElementById("errorMensaje").value = "");
        document.getElementById("modalError")?.classList.add("show");
        break;
      case "close-modal-error":
        document.getElementById("modalError")?.classList.remove("show");
        break;
      case "reportar-error":
        await reportarError();
        break;
      case "toggle-error":
        await toggleEstadoError(id);
        break;
      case "eliminar-error":
        await eliminarError(id);
        break;
    }
  });
}
