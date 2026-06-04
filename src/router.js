import { state } from "@/services/state";
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

export function navigateTo(tabName) {
  if (state.tabActual === tabName) return;
  state.tabActual = tabName;

  // Update tab buttons
  document.querySelectorAll(".tab").forEach((btn) => {
    const isActive = btn.dataset.tab === tabName;
    btn.classList.toggle("active", isActive);
  });

  // Update tab content panels
  document.querySelectorAll(".tab-content").forEach((el) => {
    const panelTab = el.id.replace("tab", "").toLowerCase();
    const match = tabName.toLowerCase();
    el.classList.toggle("active", panelTab === match || el.id === `tab${capitalize(tabName)}`);
  });

  // Trigger render
  const renderFn = TAB_RENDERS[tabName];
  if (renderFn) {
    try {
      renderFn();
    } catch (err) {
      console.error(`Error rendering tab ${tabName}:`, err);
    }
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

  // Initial render for default tab
  const initialTab = state.tabActual || "mesas";
  navigateTo(initialTab);

  debugLog("sistema", "🧭 Router inicializado");
}
