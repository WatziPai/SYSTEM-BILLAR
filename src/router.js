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

// Muestra un overlay de carga ENCIMA del panel (sin tocar su HTML interno)
function mostrarOverlayCarga(panelEl) {
  // Evitar doble overlay
  if (panelEl.querySelector("#lazy-loading-overlay")) return;
  const overlay = document.createElement("div");
  overlay.id = "lazy-loading-overlay";
  overlay.style.cssText = [
    "position:absolute","inset:0","z-index:10",
    "display:flex","flex-direction:column","align-items:center","justify-content:center",
    "gap:14px","background:rgba(255,255,255,0.85)","border-radius:8px",
    "color:#6b7280","pointer-events:none",
  ].join(";");
  overlay.innerHTML = `
    <div style="width:38px;height:38px;border:4px solid #e5e7eb;border-top-color:#3b82f6;border-radius:50%;animation:spin 0.8s linear infinite;"></div>
    <span style="font-size:14px;font-weight:500;">Cargando datos...</span>
  `;
  // El panel necesita position relative para que el overlay lo cubra
  const prevPosition = panelEl.style.position;
  panelEl.style.position = "relative";
  panelEl._prevPosition = prevPosition;
  panelEl.appendChild(overlay);
}

function ocultarOverlayCarga(panelEl) {
  const overlay = panelEl?.querySelector("#lazy-loading-overlay");
  if (overlay) overlay.remove();
  if (panelEl && panelEl._prevPosition !== undefined) {
    panelEl.style.position = panelEl._prevPosition || "";
    delete panelEl._prevPosition;
  }
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
  // mostramos un overlay encima del panel (sin destruir su HTML) y esperamos.
  const necesitaCarga = MODULOS_LAZY.has(tabName) && !state.modulosCargados[tabName];

  if (necesitaCarga) {
    if (panelActivo) mostrarOverlayCarga(panelActivo);
    try {
      await cargarDatosModulo(tabName);
    } catch (err) {
      console.error(`Error cargando datos del módulo ${tabName}:`, err);
      ocultarOverlayCarga(panelActivo);
      return;
    }
    ocultarOverlayCarga(panelActivo);
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

