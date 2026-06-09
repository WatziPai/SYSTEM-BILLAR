import { state, guardarDatosGenerico } from "@/services/state";
import { mesasService, calcularCostoTiempo } from "@/services/mesas.service";
import { COLLECTIONS, DOC_IDS } from "@/utils/constants";
import { debugLog } from "@/utils/debug";
import { toast } from "@/components/toast";
import { confirmDialog } from "@/components/confirm-dialog";
import { paymentModal } from "@/components/payment-modal";
import { ventasService } from "@/services/ventas.service";

// ======================================================
// =================== BILLAR TABLES ===================
// ======================================================

function actualizarTimer(id) {
  const mesa = state.mesas.find((m) => m.id === id);
  if (!mesa || !mesa.ocupada) return;

  mesa.tiempoTranscurrido = Math.floor((Date.now() - mesa.inicio) / 1000);

  const horas = Math.floor(mesa.tiempoTranscurrido / 3600);
  const minutos = Math.floor((mesa.tiempoTranscurrido % 3600) / 60);
  const segundos = mesa.tiempoTranscurrido % 60;

  const tiempoStr = `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
  const resultado = calcularCostoTiempo(mesa.tiempoTranscurrido);

  const timerEl = document.querySelector(`#mesa-${id} .timer-display`);
  const costoEl = document.querySelector(`#mesa-${id} .costo-display`);

  if (timerEl) timerEl.textContent = tiempoStr;
  if (costoEl) costoEl.textContent = `S/ ${resultado.costo.toFixed(2)}`;
}

export function renderMesas() {
  const container = document.getElementById("mesasContainer");
  if (!container || !state.usuarioActual) return;

  debugLog("sistema", "🔄 Actualizando mesas billar...", { total: state.mesas.length });

  // Clean timers for deleted tables
  Object.keys(state.timers).forEach((id) => {
    if (!state.mesas.find((m) => m.id === parseInt(id))) {
      clearInterval(state.timers[id]);
      delete state.timers[id];
    }
  });

  // Remove stale DOM elements
  const mesasExistentes = Array.from(container.children).map((el) =>
    parseInt(el.id.replace("mesa-", ""))
  );
  const mesasIds = state.mesas.map((m) => m.id);
  mesasExistentes.forEach((id) => {
    if (!mesasIds.includes(id)) {
      document.getElementById(`mesa-${id}`)?.remove();
    }
  });

  state.mesas.forEach((mesa) => {
    let mesaDiv = document.getElementById(`mesa-${mesa.id}`);
    const isNew = !mesaDiv;

    if (isNew) {
      mesaDiv = document.createElement("div");
      mesaDiv.id = `mesa-${mesa.id}`;
      container.appendChild(mesaDiv);
    }

    const nuevaClase = `mesa-card ${mesa.ocupada ? "mesa-ocupada" : "mesa-disponible"}`;
    if (mesaDiv.className !== nuevaClase) {
      mesaDiv.className = nuevaClase;
    }

    const isAdmin = (state.usuarioActual.rol || "").toLowerCase() === "admin";

    const htmlContent = `
      ${isAdmin ? `<button class="delete-mesa-btn" data-action="eliminar-mesa" data-id="${mesa.id}">×</button>` : ""}
      <h3>Mesa ${mesa.id}</h3>
      <span class="mesa-status ${mesa.ocupada ? "status-ocupada" : "status-disponible"}">
        ${mesa.ocupada ? "OCUPADA" : "DISPONIBLE"}
      </span>
      <div id="timer-${mesa.id}" class="mesa-timer ${mesa.ocupada ? "" : "hidden"}">
        <div class="timer-display">00:00:00</div>
        <div class="costo-display">S/ 0.00</div>
      </div>
      <button class="btn ${mesa.ocupada ? "btn-red" : "btn-primary"}" 
        data-action="toggle-mesa" data-id="${mesa.id}"
        style="width: 100%; margin-bottom: 8px;">
        ${mesa.ocupada ? "⏹️ Finalizar" : "▶️ Iniciar"}
      </button>
      ${mesa.ocupada ? `<button class="btn btn-blue" data-action="abrir-consumo" data-id="${mesa.id}" data-tipo="billar" style="width: 100%;">🛒 Consumo</button>` : ""}
    `;

    if (mesaDiv.innerHTML !== htmlContent) {
      mesaDiv.innerHTML = htmlContent;
    }

    // Timer management
    if (mesa.ocupada && mesa.inicio) {
      mesa.tiempoTranscurrido = Math.floor((Date.now() - mesa.inicio) / 1000);
      actualizarTimer(mesa.id);

      if (!state.timers[mesa.id]) {
        state.timers[mesa.id] = setInterval(() => actualizarTimer(mesa.id), 1000);
      }
    } else if (state.timers[mesa.id]) {
      clearInterval(state.timers[mesa.id]);
      delete state.timers[mesa.id];
    }
  });
}

async function toggleMesa(id) {
  const mesa = state.mesas.find((m) => m.id === id);
  if (!mesa) return;

  if (mesa.ocupada) {
    const tiempoTranscurrido = Math.floor((Date.now() - mesa.inicio) / 1000);
    const resultado = calcularCostoTiempo(tiempoTranscurrido);
    const totalConsumos = mesa.consumos
      ? mesa.consumos.reduce((sum, c) => sum + c.precio * c.cantidad, 0)
      : 0;
    const totalFinal = resultado.costo + totalConsumos;

    if (totalFinal <= 0) {
      // Confirm close with no charge
      const ok = await confirmDialog.show(
        "⏹️ Cerrar Mesa",
        `¿Finalizar Mesa ${id}?\n\nNo hay cobro (tiempo y consumos mínimos).`,
        { confirmText: "Cerrar", cancelText: "Cancelar" }
      );
      if (!ok) return;
      await mesasService.finalizarMesa(id, { metodoPago: "Sin cobro", montoEfectivo: 0, montoYape: 0 });
    } else {
      // Show payment modal
      const paymentInfo = await paymentModal.show(totalFinal, `Cierre de Mesa Billar ${id}`);
      if (!paymentInfo || !paymentInfo.metodoPago) return;
      await mesasService.finalizarMesa(id, paymentInfo);
    }
  } else {
    await mesasService.iniciarMesa(id);
  }

  renderMesas();
  // Notify other modules via event
  document.dispatchEvent(new CustomEvent("ventas:changed"));
  document.dispatchEvent(new CustomEvent("caja:changed"));
  document.dispatchEvent(new CustomEvent("dashboard:changed"));
}

// ======================================================
// ================= CONSUMPTION TABLES ================
// ======================================================

export function renderMesasConsumo() {
  const container = document.getElementById("mesasConsumoContainer");
  if (!container || !state.usuarioActual) return;

  debugLog("sistema", "🔄 Actualizando mesas consumo...", { total: state.mesasConsumo.length });

  container.innerHTML = "";

  state.mesasConsumo.forEach((mesa) => {
    const isAdmin = (state.usuarioActual.rol || "").toLowerCase() === "admin";

    const card = document.createElement("div");
    card.id = `mesa-consumo-${mesa.id}`;
    card.className = `mesa-card ${mesa.ocupada ? "mesa-ocupada" : "mesa-disponible"}`;

    card.innerHTML = `
      ${isAdmin ? `<button class="delete-mesa-btn" data-action="eliminar-mesa-consumo" data-id="${mesa.id}">×</button>` : ""}
      <h3>Mesa C-${mesa.id}</h3>
      <span class="mesa-status ${mesa.ocupada ? "status-ocupada" : "status-disponible"}">
        ${mesa.ocupada ? "OCUPADA" : "DISPONIBLE"}
      </span>
      ${mesa.ocupada ? `
        <div class="mesa-timer">
          <div class="costo-display">S/ ${(mesa.total || 0).toFixed(2)}</div>
        </div>
        <div style="font-size: 12px; color: #666; margin-bottom: 8px;">
          ${(mesa.consumos || []).length} consumo(s) registrado(s)
        </div>
      ` : ""}
      <button class="btn ${mesa.ocupada ? "btn-red" : "btn-primary"}"
        data-action="toggle-mesa-consumo" data-id="${mesa.id}"
        style="width: 100%; margin-bottom: 8px;">
        ${mesa.ocupada ? "⏹️ Finalizar" : "▶️ Iniciar"}
      </button>
      ${mesa.ocupada ? `
        <button class="btn btn-blue" data-action="abrir-consumo" data-id="${mesa.id}" data-tipo="consumo" style="width: 100%;">
          🛒 Agregar Consumo
        </button>
      ` : ""}
    `;

    container.appendChild(card);
  });
}

async function toggleMesaConsumo(id) {
  const mesa = state.mesasConsumo.find((m) => m.id === id);
  if (!mesa) return;

  if (mesa.ocupada) {
    if (mesa.total <= 0) {
      const ok = await confirmDialog.show(
        "⏹️ Cerrar Mesa Consumo",
        `¿Finalizar Mesa Consumo ${id}? No hay consumos registrados.`,
        { confirmText: "Cerrar", cancelText: "Cancelar" }
      );
      if (!ok) return;
      await mesasService.finalizarMesaConsumo(id, { metodoPago: "Sin cobro", montoEfectivo: 0, montoYape: 0 });
    } else {
      const paymentInfo = await paymentModal.show(mesa.total, `Cierre de Mesa Consumo ${id}`);
      if (!paymentInfo || !paymentInfo.metodoPago) return;
      await mesasService.finalizarMesaConsumo(id, paymentInfo);
    }
  } else {
    await mesasService.iniciarMesaConsumo(id);
  }

  renderMesasConsumo();
  document.dispatchEvent(new CustomEvent("ventas:changed"));
  document.dispatchEvent(new CustomEvent("caja:changed"));
  document.dispatchEvent(new CustomEvent("dashboard:changed"));
}

// ======================================================
// =================== CONSUMO MODAL ===================
// ======================================================

let _modalConsumoState = { mesaId: null, tipo: null };

export function abrirModalConsumo(mesaId, tipo) {
  _modalConsumoState = { mesaId, tipo };
  const modal = document.getElementById("modalConsumo");
  if (!modal) return;

  // Set title
  const title = document.getElementById("modalConsumoTitulo");
  if (title) {
    title.textContent = tipo === "billar"
      ? `🎱 Consumos - Mesa Billar ${mesaId}`
      : `🪑 Consumos - Mesa Consumo ${mesaId}`;
  }

  renderModalConsumo();
  modal.classList.add("show");
}

function renderModalConsumo() {
  const { mesaId, tipo } = _modalConsumoState;
  const mesa = tipo === "billar"
    ? state.mesas.find((m) => m.id === mesaId)
    : state.mesasConsumo.find((m) => m.id === mesaId);

  const listaContainer = document.getElementById("listaConsumosMesa");
  const productosContainer = document.getElementById("productosConsumoContainer");

  if (!mesa) return;

  // List existing consumptions
  const consumos = mesa.consumos || [];
  const total = consumos.reduce((sum, c) => sum + c.precio * c.cantidad, 0);

  // Update total and close button text in the billing footer
  const totalConsumoEl = document.getElementById("totalConsumo");
  if (totalConsumoEl) totalConsumoEl.textContent = `S/ ${total.toFixed(2)}`;
  const btnCerrarMesa = document.getElementById("btnCerrarMesa");
  if (btnCerrarMesa) {
    btnCerrarMesa.textContent = `💰 Cerrar Mesa y Cobrar Todo (Total: S/ ${total.toFixed(2)})`;
  }

  if (consumos.length === 0) {
    listaContainer.innerHTML = '<p style="color: #999; text-align: center; padding: 15px;">Sin consumos aún</p>';
  } else {
    listaContainer.innerHTML = `
      ${consumos.map((c) => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; border-bottom: 1px solid #eee;">
          <span>${c.nombre} x${c.cantidad}</span>
          <span>S/ ${(c.precio * c.cantidad).toFixed(2)}</span>
          <div style="display: flex; gap: 4px;">
            <button class="btn-small btn-blue" data-action="editar-consumo" data-producto-id="${c.id}" data-mesa-id="${mesaId}" data-tipo="${tipo}" style="padding: 3px 8px; font-size: 11px;" title="Editar cantidad">✏️</button>
            <button class="btn-small btn-red" data-action="eliminar-consumo" data-producto-id="${c.id}" data-mesa-id="${mesaId}" data-tipo="${tipo}" style="padding: 3px 8px; font-size: 11px;" title="Remover producto">✕</button>
          </div>
        </div>
      `).join("")}
      <div style="padding: 10px; font-weight: bold; text-align: right; background: #f0fdf4; border-radius: 6px; margin-top: 8px;">
        Total: S/ ${total.toFixed(2)}
      </div>
    `;
  }

  // Product list
  if (!productosContainer) return;

  const productosOrdenados = ordenarProductosPorCategoria(state.productos);
  const terminoBusqueda = (document.getElementById("buscarConsumoProducto")?.value || "").toLowerCase().trim();
  const productosFiltrados = terminoBusqueda
    ? productosOrdenados.filter((p) => p.nombre.toLowerCase().includes(terminoBusqueda))
    : productosOrdenados;

  if (productosFiltrados.length === 0) {
    productosContainer.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">No hay productos disponibles</p>';
    return;
  }

  productosContainer.innerHTML = productosFiltrados.map((p) => {
    const disponible = p.stock > 0;
    return `
      <div class="producto-venta-card ${!disponible ? "no-stock" : ""}">
        <h4>${p.nombre}</h4>
        <div class="producto-precio-venta">S/ ${p.precio.toFixed(2)}</div>
        <div style="font-size: 13px; color: ${p.stock <= 5 ? "#dc3545" : "#6c757d"};">Stock: ${p.stock}</div>
        ${disponible
          ? `<button class="btn btn-green" data-action="agregar-consumo" data-producto-id="${p.id}" data-mesa-id="${mesaId}" data-tipo="${tipo}" style="width: 100%; margin-top: 8px;">
              ➕ Agregar
             </button>`
          : `<button class="btn btn-red" disabled style="width: 100%; margin-top: 8px;">Agotado</button>`
        }
      </div>
    `;
  }).join("");
}

function ordenarProductosPorCategoria(productos) {
  const orden = { Licores: 1, Gaseosas: 2, Golosinas: 3, Otros: 4 };
  return [...productos].sort((a, b) => {
    const oA = orden[a.categoria] || 99;
    const oB = orden[b.categoria] || 99;
    return oA !== oB ? oA - oB : a.nombre.localeCompare(b.nombre);
  });
}

// ======================================================
// =================== COBRO PARCIAL ===================
async function handleCobroParcial() {
  const { mesaId, tipo } = _modalConsumoState;
  const mesa = tipo === "billar"
    ? state.mesas.find((m) => m.id === mesaId)
    : state.mesasConsumo.find((m) => m.id === mesaId);

  if (!mesa) return;
  const consumos = mesa.consumos || [];
  if (consumos.length === 0) {
    toast.error("⚠️ No hay consumos en esta mesa para cobrar");
    return;
  }

  // Create dedicated selection modal
  const itemsACobrar = await new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "confirm-dialog-overlay confirm-overlay-show";
    overlay.style.cssText = "z-index:10001;";

    const itemsHtml = consumos.map((c, i) => `
      <div style="display:flex; align-items:center; gap:10px; padding:10px 8px; border-bottom:1px solid #eee;">
        <input type="checkbox" id="parcial-check-${i}" checked style="width:18px;height:18px;cursor:pointer; accent-color:#2d7a4d;">
        <label for="parcial-check-${i}" style="flex:1; cursor:pointer; font-weight:500;">${c.nombre} <span style="color:#888;">x${c.cantidad}</span></label>
        <span style="color:#2d7a4d; font-weight:600; min-width:70px; text-align:right;">S/ ${(c.precio * c.cantidad).toFixed(2)}</span>
        <input type="number" id="parcial-qty-${i}" value="${c.cantidad}" min="1" max="${c.cantidad}"
          style="width:55px; text-align:center; border:1px solid #ccc; border-radius:6px; padding:5px; font-size:13px;">
      </div>
    `).join("");

    overlay.innerHTML = `
      <div class="confirm-dialog confirm-card-show" style="max-width:480px; width:90%;">
        <div class="confirm-header">
          <h3>💵 Cobrar Parcial</h3>
        </div>
        <div class="confirm-body" style="padding:0;">
          <p style="padding:12px 16px; color:#666; font-size:13px;">Selecciona los productos y cantidades a cobrar ahora:</p>
          <div style="max-height:280px; overflow-y:auto; border:1px solid #e2e8f0; border-radius:6px; margin:0 16px 16px;">
            ${itemsHtml}
          </div>
          <div style="padding:8px 16px 16px; text-align:right; font-weight:700; font-size:15px; color:#2d7a4d;" id="parcialTotalPreview">
            Total seleccionado: S/ 0.00
          </div>
        </div>
        <div class="confirm-dialog-btns">
          <button id="parcialCancelBtn" class="btn btn-gray">Cancelar</button>
          <button id="parcialOkBtn" class="btn btn-green">Cobrar</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Live total preview
    const updateTotal = () => {
      let t = 0;
      consumos.forEach((c, i) => {
        const check = overlay.querySelector(`#parcial-check-${i}`);
        const qtyInput = overlay.querySelector(`#parcial-qty-${i}`);
        if (check && check.checked) {
          const qty = Math.min(parseInt(qtyInput?.value) || 0, c.cantidad);
          t += c.precio * (qty > 0 ? qty : 0);
        }
      });
      const preview = overlay.querySelector("#parcialTotalPreview");
      if (preview) preview.textContent = `Total seleccionado: S/ ${t.toFixed(2)}`;
    };
    overlay.addEventListener("change", updateTotal);
    overlay.addEventListener("input", updateTotal);
    updateTotal();

    overlay.querySelector("#parcialCancelBtn").addEventListener("click", () => {
      overlay.remove();
      resolve(null);
    });

    overlay.querySelector("#parcialOkBtn").addEventListener("click", () => {
      const selected = [];
      consumos.forEach((c, i) => {
        const check = overlay.querySelector(`#parcial-check-${i}`);
        const qtyInput = overlay.querySelector(`#parcial-qty-${i}`);
        if (check && check.checked) {
          const qty = Math.min(parseInt(qtyInput?.value) || c.cantidad, c.cantidad);
          if (qty > 0) {
            selected.push({ id: c.id, cantidad: qty, precio: c.precio });
          }
        }
      });
      overlay.remove();
      resolve(selected);
    });
  });

  if (!itemsACobrar || itemsACobrar.length === 0) {
    if (itemsACobrar !== null) toast.error("⚠️ No seleccionaste ningún producto para cobrar");
    return;
  }

  const totalCobrar = itemsACobrar.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  if (totalCobrar <= 0) {
    toast.error("⚠️ El total a cobrar debe ser mayor a S/ 0.00");
    return;
  }

  // Show payment modal
  const paymentInfo = await paymentModal.show(totalCobrar, `Cobro Parcial - Mesa ${tipo === "billar" ? "Billar" : "Consumo"} ${mesaId}`);
  if (!paymentInfo || !paymentInfo.metodoPago) return;

  const ok = await ventasService.procesarCobroParcial(itemsACobrar, totalCobrar, mesa, paymentInfo, tipo);
  if (!ok) return;

  // Save mesa state to Firestore
  if (tipo === "billar") {
    mesasService.saveMesas().catch(console.error);
    renderMesas();
  } else {
    mesasService.saveMesasConsumo().catch(console.error);
    renderMesasConsumo();
  }

  renderModalConsumo();
  document.dispatchEvent(new CustomEvent("ventas:changed"));
  document.dispatchEvent(new CustomEvent("caja:changed"));
  document.dispatchEvent(new CustomEvent("dashboard:changed"));
}

async function handleCerrarMesaDesdeModal() {
  const { mesaId, tipo } = _modalConsumoState;
  // Close the consumo modal first
  document.getElementById("modalConsumo")?.classList.remove("show");
  // Trigger the normal toggle (which shows payment modal and closes table)
  if (tipo === "billar") {
    await toggleMesa(mesaId);
  } else {
    await toggleMesaConsumo(mesaId);
  }
}

// ======================================================
// =================== EVENT DELEGATION ================
// ======================================================

export function initMesasEvents() {
  // Wire billing panel buttons
  const btnCobroParcial = document.getElementById("btnCobroParcial");
  if (btnCobroParcial) {
    btnCobroParcial.addEventListener("click", handleCobroParcial);
  }
  const btnCerrarMesa = document.getElementById("btnCerrarMesa");
  if (btnCerrarMesa) {
    btnCerrarMesa.addEventListener("click", handleCerrarMesaDesdeModal);
  }

  // Product search filter in consumo modal
  const buscarInput = document.getElementById("buscarConsumoProducto");
  if (buscarInput) {
    buscarInput.addEventListener("input", () => {
      renderModalConsumo();
    });
  }

  document.addEventListener("click", async (e) => {
    const action = e.target.closest("[data-action]")?.dataset.action;
    if (!action) return;

    const el = e.target.closest("[data-action]");
    const id = parseInt(el?.dataset.id);
    const tipo = el?.dataset.tipo;
    const productoId = parseInt(el?.dataset.productoId);
    const mesaId = parseInt(el?.dataset.mesaId);

    switch (action) {
      case "toggle-mesa":
        await toggleMesa(id);
        break;

      case "eliminar-mesa":
        if (await mesasService.eliminarMesa(id)) {
          renderMesas();
        }
        break;

      case "toggle-mesa-consumo":
        await toggleMesaConsumo(id);
        break;

      case "eliminar-mesa-consumo":
        if (await mesasService.eliminarMesaConsumo(id)) {
          renderMesasConsumo();
        }
        break;

      case "abrir-consumo":
        abrirModalConsumo(id, tipo);
        break;

      case "agregar-consumo":
        if (await mesasService.agregarConsumo(productoId, mesaId, tipo)) {
          renderModalConsumo();
          if (tipo === "billar") renderMesas();
          else renderMesasConsumo();
        }
        break;

      case "eliminar-consumo":
        if (await mesasService.eliminarConsumo(productoId, mesaId, tipo)) {
          renderModalConsumo();
          if (tipo === "billar") renderMesas();
          else renderMesasConsumo();
        }
        break;

      case "editar-consumo": {
        const qtyStr = prompt("Ingrese la nueva cantidad:");
        if (qtyStr !== null && qtyStr.trim() !== "") {
          if (await mesasService.editarConsumo(productoId, mesaId, tipo, qtyStr)) {
            renderModalConsumo();
            if (tipo === "billar") renderMesas();
            else renderMesasConsumo();
          }
        }
        break;
      }

      case "agregar-mesa":
        if (await mesasService.agregarMesa()) {
          renderMesas();
        }
        break;

      case "agregar-mesa-consumo":
        if (await mesasService.agregarMesaConsumo()) {
          renderMesasConsumo();
        }
        break;

      case "close-modal-consumo":
        document.getElementById("modalConsumo")?.classList.remove("show");
        break;
    }
  });

  // Close modal on backdrop
  document.getElementById("modalConsumo")?.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.classList.remove("show");
    }
  });
}
