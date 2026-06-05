import { state } from "@/services/state";
import { cajaService } from "@/services/caja.service";
import { debugLog } from "@/utils/debug";
import { toast } from "@/components/toast";
import { confirmDialog } from "@/components/confirm-dialog";

// ======================================================
// ============= BALANCE DISPLAY =======================
// ======================================================

export function renderTablaMovimientos() {
  const tbody = document.getElementById("movimientosTable");
  if (!tbody) return;

  const balances = cajaService.calcularBalances();

  // Update balance cards
  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setEl("saldoCajaLocal", `S/ ${(balances.balLocal || 0).toFixed(2)}`);
  setEl("saldoCajaChica", `S/ ${(balances.balChica || 0).toFixed(2)}`);
  setEl("saldoYape", `S/ ${(balances.balYape || 0).toFixed(2)}`);
  setEl("totalEgresos", `S/ ${(balances.totalEgresosTotal || 0).toFixed(2)}`);

  const movimientos = state.movimientos;

  if (movimientos.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:30px;color:#999;">No hay movimientos registrados</td></tr>';
    return;
  }

  const movsPagina = movimientos.slice(0, state.limiteMovimientos);

  tbody.innerHTML = movsPagina.map((m) => {
    if (m.oculto) return ""; // skip hidden entries

    const tipoLabel = {
      egreso: "Egreso",
      ingreso: "Ingreso",
      transferencia: "Transferencia",
      retiro: "Retiro",
      reposicion: "Reposición",
      ajuste: `Ajuste (${m.ajusteTipo === "positivo" ? "+" : "-"})`,
    }[m.tipo] || m.tipo;

    const cajaLabel = { local: "💼 Local", chica: "💰 Chica", yape: "📱 Yape" }[m.caja] || m.caja;
    const esEgreso = ["egreso", "retiro", "reposicion", "transferencia"].includes(m.tipo);
    const esAjusteNeg = m.tipo === "ajuste" && m.ajusteTipo === "negativo";
    const color = (esEgreso || esAjusteNeg) ? "#dc3545" : "#10b981";
    const signo = (esEgreso || esAjusteNeg) ? "-" : "+";
    const isAdmin = (state.usuarioActual?.rol || "").toLowerCase() === "admin";

    return `
      <tr>
        <td style="font-size:13px;">${m.fecha}</td>
        <td>${m.descripcion}</td>
        <td style="text-align:center;">
          <span style="background:#e5e7eb;padding:2px 8px;border-radius:4px;font-size:12px;">${cajaLabel}</span>
        </td>
        <td style="text-align:center;font-size:12px;">${tipoLabel}</td>
        <td style="text-align:right;font-weight:600;color:${color};">${signo} S/ ${(m.monto || 0).toFixed(2)}</td>
        <td style="text-align:center;">
          ${isAdmin
            ? `<div style="display:flex;gap:4px;justify-content:center;">
                <button class="btn-small btn-red" data-action="eliminar-movimiento" data-id="${m.id}" title="Deshacer" style="padding:3px 7px;font-size:11px;">↩️</button>
                <button class="btn-small btn-gray" data-action="ocultar-movimiento" data-id="${m.id}" title="Ocultar" style="padding:3px 7px;font-size:11px;">🙈</button>
              </div>`
            : "-"
          }
        </td>
      </tr>
    `;
  }).join("");

  if (movimientos.length > state.limiteMovimientos) {
    tbody.innerHTML += `
      <tr><td colspan="6" style="text-align:center;padding:15px;">
        <button data-action="cargar-mas-movimientos" style="background:#3b82f6;color:white;border:none;padding:8px 20px;border-radius:6px;cursor:pointer;font-weight:bold;">
          Ver más (+20)
        </button>
        <p style="font-size:11px;color:#666;margin-top:5px;">Mostrando ${state.limiteMovimientos} de ${movimientos.length}</p>
      </td></tr>
    `;
  }
}

// ======================================================
// ============= MODALS ================================
// ======================================================

export function showModalMovimiento() {
  const modal = document.getElementById("modalMovimiento");
  if (modal) {
    document.getElementById("movDesc")?.setAttribute("value", "");
    if (document.getElementById("movDesc")) document.getElementById("movDesc").value = "";
    if (document.getElementById("movMonto")) document.getElementById("movMonto").value = "";
    modal.classList.add("show");
  }
}

async function guardarMovimiento() {
  const tipo = document.getElementById("movTipo")?.value;
  const desc = document.getElementById("movDesc")?.value.trim();
  const monto = document.getElementById("movMonto")?.value;
  const caja = document.getElementById("movCaja")?.value;

  if (await cajaService.guardarMovimiento(tipo, desc, monto, caja)) {
    document.getElementById("modalMovimiento")?.classList.remove("show");
    renderTablaMovimientos();
  }
}

async function guardarTransferencia() {
  const monto = document.getElementById("montoTransferencia")?.value;
  if (await cajaService.guardarTransferencia(monto)) {
    if (document.getElementById("montoTransferencia")) document.getElementById("montoTransferencia").value = "";
    renderTablaMovimientos();
  }
}

async function guardarTransferenciaYape() {
  const monto = document.getElementById("montoTransYape")?.value;
  const destino = document.getElementById("destinoTransYape")?.value || "local";
  if (await cajaService.guardarTransferenciaYape(monto, destino)) {
    if (document.getElementById("montoTransYape")) document.getElementById("montoTransYape").value = "";
    renderTablaMovimientos();
  }
}

async function ajustarSaldoCaja(caja) {
  const inputId = { local: "ajusteMontoLocal", chica: "ajusteMontoChica", yape: "ajusteMontoYape" }[caja];
  const monto = document.getElementById(inputId)?.value;

  if (await cajaService.guardarAjusteCaja(caja, monto)) {
    if (document.getElementById(inputId)) document.getElementById(inputId).value = "";
    renderTablaMovimientos();
  }
}

async function limpiarMovimientos() {
  if (await cajaService.limpiarHistorialMovimientos()) {
    renderTablaMovimientos();
  }
}

// ======================================================
// =================== EVENTS ==========================
// ======================================================

export function initCajaEvents() {
  document.addEventListener("click", async (e) => {
    const el = e.target.closest("[data-action]");
    const action = el?.dataset.action;
    const id = parseInt(el?.dataset.id);

    switch (action) {
      case "show-modal-movimiento":
        showModalMovimiento();
        break;
      case "close-modal-movimiento":
        document.getElementById("modalMovimiento")?.classList.remove("show");
        break;
      case "show-modal-transferencia":
        document.getElementById("modalTransferencia")?.classList.add("show");
        break;
      case "close-modal-transferencia":
        document.getElementById("modalTransferencia")?.classList.remove("show");
        break;
      case "show-modal-transferencia-yape":
        document.getElementById("modalTransferenciaYape")?.classList.add("show");
        break;
      case "close-modal-transferencia-yape":
        document.getElementById("modalTransferenciaYape")?.classList.remove("show");
        break;
      case "show-modal-ajuste-caja": {
        const cajaType = el?.dataset.caja;
        const modal = document.getElementById("modalAjusteCaja");
        if (modal) {
          const tituloEl = document.getElementById("ajusteTitulo");
          if (tituloEl) tituloEl.textContent = `⚖️ Ajustar Saldo ${cajaType === "local" ? "Caja Local" : cajaType === "chica" ? "Caja Chica" : "Yape"}`;
          // Store target type and show correct input
          modal.dataset.cajaTarget = cajaType;
          document.getElementById("ajusteMontoLocal")?.classList.toggle("hidden", cajaType !== "local");
          document.getElementById("ajusteMontoChica")?.classList.toggle("hidden", cajaType !== "chica");
          document.getElementById("ajusteMontoYape")?.classList.toggle("hidden", cajaType !== "yape");
          // Clear inputs
          ["ajusteMontoLocal","ajusteMontoChica","ajusteMontoYape"].forEach(id => { const el2 = document.getElementById(id); if(el2) el2.value = ""; });
          modal.classList.add("show");
        }
        break;
      }
      case "close-modal-ajuste-caja":
        document.getElementById("modalAjusteCaja")?.classList.remove("show");
        break;
      case "guardar-ajuste-caja": {
        const modal = document.getElementById("modalAjusteCaja");
        const caja = modal?.dataset.cajaTarget || "local";
        await ajustarSaldoCaja(caja);
        modal?.classList.remove("show");
        break;
      }
      case "guardar-movimiento":
        await guardarMovimiento();
        break;
      case "guardar-transferencia":
        await guardarTransferencia();
        break;
      case "guardar-transferencia-yape":
        await guardarTransferenciaYape();
        break;
      case "ajuste-local":
        await ajustarSaldoCaja("local");
        break;
      case "ajuste-chica":
        await ajustarSaldoCaja("chica");
        break;
      case "ajuste-yape":
        await ajustarSaldoCaja("yape");
        break;
      case "limpiar-movimientos":
        await limpiarMovimientos();
        break;
      case "eliminar-movimiento":
        if (await cajaService.eliminarMovimiento(id)) {
          renderTablaMovimientos();
        }
        break;
      case "ocultar-movimiento":
        if (await cajaService.borrarRegistroSinEfecto(id)) {
          renderTablaMovimientos();
        }
        break;
      case "cargar-mas-movimientos":
        state.limiteMovimientos += 20;
        renderTablaMovimientos();
        break;
    }
  });

  // Listen for external updates
  document.addEventListener("caja:changed", () => renderTablaMovimientos());
}
