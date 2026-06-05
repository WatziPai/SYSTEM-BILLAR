import { state } from "@/services/state";
import { cargarDatosModulo } from "@/services/state";
import { renderMesas, renderMesasConsumo } from "@/modules/mesas/mesas.module";
import { renderTablaVentas, calcularTotal } from "@/modules/ventas/ventas.module";
import { renderInventario, renderTablaLotes } from "@/modules/inventario/inventario.module";
import { renderTablaMovimientos } from "@/modules/caja/caja.module";
import { renderReportes, renderMensual, renderDashboard } from "@/modules/reportes/reportes.module";
import { renderErrores } from "@/modules/errores/errores.module";
import { renderConsumoDueno } from "@/modules/consumo-dueno/consumo-dueno.module";
import { debugLog } from "@/utils/debug";

const TAB_RENDERS = {
  mesas: () => { renderMesas(); renderMesasConsumo(); },
  ventas: () => { renderTablaVentas(); calcularTotal(); },
  inventario: () => { renderInventario(); renderTablaLotes(); },
  reportes: () => renderReportes(),
  dashboard: () => renderDashboard(),
  caja: () => renderTablaMovimientos(),
  mensual: () => renderMensual(),
  errores: () => renderErrores(),
  consumoDueno: () => renderConsumoDueno(),
};

// Módulos que requieren carga diferida (los demás usan datos críticos ya en memoria)
const MODULOS_LAZY = new Set(["caja", "inventario", "ventas", "reportes", "dashboard", "mensual", "errores", "consumoDueno"]);

// Muestra un skeleton de carga dentro del panel activo
function mostrarSkeletonCarga(panelEl) {
  panelEl.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 20px;gap:16px;color:#6b7280;">
      <div style="width:40px;height:40px;border:4px solid #e5e7eb;border-top-color:#3b82f6;border-radius:50%;animation:spin 0.8s linear infinite;"></div>
      <span style="font-size:14px;font-weight:500;">Cargando datos...</span>
    </div>
  `;
}

export async function navigateTo(tabName) {
  if (state.tabActual === tabName) return;
  state.tabActual = tabName;

  // Update tab buttons
  document.querySelectorAll(".tab").forEach((btn) => {
    const isActive = btn.dataset.tab === tabName;
    btn.classList.toggle("active", isActive);
  });

  // Update tab content panels & get reference to the active one
  let panelActivo = null;
  document.querySelectorAll(".tab-content").forEach((el) => {
    const panelTab = el.id.replace("tab", "").toLowerCase();
    const match = tabName.toLowerCase();
    const isActive = panelTab === match || el.id === `tab${capitalize(tabName)}`;
    el.classList.toggle("active", isActive);
    if (isActive) panelActivo = el;
  });

  const renderFn = TAB_RENDERS[tabName];
  if (!renderFn) return;

  // ── Lazy loading ──────────────────────────────────────────────────────────
  // Si este módulo tiene datos diferidos y aún no fueron cargados,
  // mostramos un skeleton y esperamos la descarga antes de renderizar.
  const necesitaCarga = MODULOS_LAZY.has(tabName) && !state.modulosCargados[tabName];

  if (necesitaCarga) {
    if (panelActivo) mostrarSkeletonCarga(panelActivo);
    try {
      await cargarDatosModulo(tabName);
    } catch (err) {
      console.error(`Error cargando datos del módulo ${tabName}:`, err);
      if (panelActivo) {
        panelActivo.innerHTML = `
          <div style="display:flex;flex-direction:column;align-items:center;padding:60px 20px;gap:12px;color:#dc3545;">
            <span style="font-size:24px;">⚠️</span>
            <span style="font-size:14px;font-weight:500;">Error al cargar datos. Intenta de nuevo.</span>
          </div>
        `;
      }
      return;
    }
  }
  // ─────────────────────────────────────────────────────────────────────────

  // Trigger render
  try {
    renderFn();
  } catch (err) {
    console.error(`Error rendering tab ${tabName}:`, err);
  }

  debugLog("sistema", `🧭 Navegando a tab: ${tabName}`);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function initRouter() {
  // Tab click delegation
  document.addEventListener("click", (e) => {
    const tab = e.target.closest("[data-tab]");
    if (!tab) return;
    const tabName = tab.dataset.tab;
    if (tabName) navigateTo(tabName);
  });

  // Initial render for default tab (mesas — usa datos críticos, sin lazy)
  const initialTab = state.tabActual || "mesas";
  navigateTo(initialTab);

  debugLog("sistema", "🧭 Router inicializado");
}

