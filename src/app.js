import { initAuth } from "@/modules/auth/auth.module";
import { initAuthEvents, initKeyboardShortcuts } from "@/modules/auth/auth.module";
import { initMesasEvents } from "@/modules/mesas/mesas.module";
import { initVentasEvents } from "@/modules/ventas/ventas.module";
import { initInventarioEvents } from "@/modules/inventario/inventario.module";
import { initCajaEvents } from "@/modules/caja/caja.module";
import { initReportesEvents } from "@/modules/reportes/reportes.module";
import { initErroresEvents } from "@/modules/errores/errores.module";
import { initConsumoDuenoEvents } from "@/modules/consumo-dueno/consumo-dueno.module";
import { initUsuariosEvents } from "@/modules/usuarios/usuarios.module";
import { initRouter, navigateTo } from "@/router";
import { state, guardarDatosGenerico } from "@/services/state";
import { COLLECTIONS, DOC_IDS } from "@/utils/constants";
import { debugLog } from "@/utils/debug";
import { toast } from "@/components/toast";

// ======================================================
// =================== APP INIT ========================
// ======================================================

function initConfigEvents() {
  document.addEventListener("click", async (e) => {
    const el = e.target.closest("[data-action]");
    const action = el?.dataset.action;

    if (action === "guardar-configuracion") {
      const tarifaHora = parseFloat(document.getElementById("tarifaHora")?.value);
      const tarifaExtra5Min = parseFloat(document.getElementById("tarifaExtra5Min")?.value);

      if (isNaN(tarifaHora) || isNaN(tarifaExtra5Min)) {
        toast.error("Por favor ingresa valores válidos");
        return;
      }

      state.config.tarifaHora = tarifaHora;
      state.config.tarifaExtra5Min = tarifaExtra5Min;

      await guardarDatosGenerico(
        COLLECTIONS.CONFIGURACION,
        DOC_IDS.GENERAL,
        { tarifaHora, tarifaExtra5Min },
        true
      );

      toast.success("✅ Configuración guardada correctamente");
    }
  });
}

function onLoginSuccess() {
  // Init router (will render the initial tab)
  initRouter();
  debugLog("sistema", "✅ App inicializada correctamente");
}

export async function initApp() {
  debugLog("sistema", "🚀 Iniciando Sistema de Billar...");

  // Register all event listeners first (order matters for delegation)
  initAuthEvents();
  initKeyboardShortcuts();
  initMesasEvents();
  initVentasEvents();
  initInventarioEvents();
  initCajaEvents();
  initReportesEvents();
  initErroresEvents();
  initConsumoDuenoEvents();
  initUsuariosEvents();
  initConfigEvents();

  // Start Firebase auth observer — will call onLoginSuccess when user logs in
  await initAuth(onLoginSuccess);

  debugLog("sistema", "✅ Event listeners registrados");
}
