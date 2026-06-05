import { state, guardarDatosGenerico } from "@/services/state";
import { ventasService } from "@/services/ventas.service";
import { productosService } from "@/services/productos.service";
import { COLLECTIONS, DOC_IDS } from "@/utils/constants";
import { debugLog } from "@/utils/debug";
import { toast } from "@/components/toast";
import { confirmDialog } from "@/components/confirm-dialog";
import { paymentModal } from "@/components/payment-modal";

// ======================================================
// ================== RENDER TABLE ======================
// ======================================================

export function renderTablaVentas() {
  const tbody = document.getElementById("ventasTable");
  if (!tbody) return;

  if (state.ventas.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 30px; color: #999;">No hay ventas registradas</td></tr>';
    return;
  }

  const ventasOrdenadas = [...state.ventas].reverse();
  const ventasParaMostrar = ventasOrdenadas.slice(0, state.limiteVentas);

  tbody.innerHTML = ventasParaMostrar.map((v) => {
    const metodo = v.metodoPago || "Efectivo";
    const metodoColor =
      metodo === "Yape" ? "#742284" : metodo === "Mixto" ? "#0ea5e9" : "#10b981";
    const metodoTexto =
      metodo === "Mixto"
        ? `Ef: S/${(v.montoEfectivo || 0).toFixed(2)} | Yp: S/${(v.montoYape || 0).toFixed(2)}`
        : metodo;

    const isAdmin = (state.usuarioActual?.rol || "").toLowerCase() === "admin";

    return `
      <tr>
        <td style="font-size: 13px;">${v.fecha}</td>
        <td>${v.tipoDetalle || v.tipo}</td>
        <td style="font-size: 13px; color: #666;">${v.usuario}</td>
        <td style="text-align: right; font-weight: 600; color: #2d7a4d;">S/ ${v.monto.toFixed(2)}</td>
        <td style="text-align: center;">
          <span style="background: ${metodoColor}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 11px;">${metodoTexto}</span>
        </td>
        <td style="text-align: center;">
          ${isAdmin ? `<button class="delete-btn" data-action="eliminar-venta" data-id="${v.id}">🗑️</button>` : "-"}
        </td>
      </tr>
    `;
  }).join("");

  // "Ver más" button
  if (state.ventas.length > state.limiteVentas) {
    tbody.innerHTML += `
      <tr>
        <td colspan="6" style="text-align: center; padding: 15px;">
          <button data-action="cargar-mas-ventas" style="background: #3b82f6; color: white; border: none; padding: 8px 20px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 13px;">
            Ver más ventas (+20)
          </button>
          <p style="font-size: 11px; color: #666; margin-top: 5px;">Mostrando ${state.limiteVentas} de ${state.ventas.length} ventas</p>
        </td>
      </tr>
    `;
  }
}

export function calcularTotal() {
  const ventasActuales = state.ultimoCierre
    ? state.ventas.filter((v) => v.id > state.ultimoCierre)
    : state.ventas;

  const total = ventasActuales.reduce((sum, v) => sum + v.monto, 0);
  const totalEl = document.getElementById("totalDia");
  if (totalEl) totalEl.textContent = `S/ ${total.toFixed(2)}`;
}

// Función para actualizar solo el total del día en el header (sin renderizar la tabla)
export function actualizarTotalHeader() {
  calcularTotal();
}

// ======================================================
// =============== VENTA MANUAL ========================
// ======================================================

export function showModalVentaManual() {
  const modal = document.getElementById("modalVentaManual");
  if (modal) {
    document.getElementById("ventaDescripcionManual").value = "";
    document.getElementById("ventaMontoManual").value = "";
    modal.classList.add("show");
  }
}

export function closeModalVentaManual() {
  document.getElementById("modalVentaManual")?.classList.remove("show");
}

async function guardarVentaManual() {
  const btn = document.getElementById("btnGuardarVentaManual");
  const descripcion = document.getElementById("ventaDescripcionManual")?.value.trim();
  const monto = parseFloat(document.getElementById("ventaMontoManual")?.value);
  const metodoPago = document.getElementById("metodoPagoManual")?.value;

  if (!descripcion || isNaN(monto) || monto <= 0) {
    toast.error("Por favor completa todos los campos correctamente");
    return;
  }

  btn.disabled = true;
  btn.textContent = "Guardando...";

  const venta = {
    id: Date.now(),
    tipo: "Venta Manual",
    tipoDetalle: descripcion,
    monto: monto,
    ganancia: monto,
    metodoPago: metodoPago || "Efectivo",
    montoEfectivo: metodoPago === "Efectivo" ? monto : 0,
    montoYape: metodoPago === "Yape" ? monto : 0,
    fecha: new Date().toLocaleString("es-PE"),
    usuario: state.usuarioActual.nombre,
  };

  state.ventas.push(venta);
  
  // Optimistic UI Update
  closeModalVentaManual();
  renderTablaVentas();
  calcularTotal();
  document.dispatchEvent(new CustomEvent("dashboard:changed"));
  document.dispatchEvent(new CustomEvent("caja:changed"));
  toast.success("✅ Guardando venta...");

  // Background save
  guardarDatosGenerico(COLLECTIONS.VENTAS, DOC_IDS.TODAS, { lista: state.ventas }).catch(err => {
    console.error("Error al guardar venta:", err);
    toast.error("❌ Error al sincronizar venta con la nube");
  });

  btn.disabled = false;
  btn.textContent = "Guardar";
}

// ======================================================
// =============== VENTA POR PRODUCTOS =================
// ======================================================

let _productosBusqueda = "";

function ordenarProductosPorCategoria(productos) {
  const orden = { Licores: 1, Gaseosas: 2, Golosinas: 3, Otros: 4 };
  return [...productos].sort((a, b) => {
    const oA = orden[a.categoria] || 99;
    const oB = orden[b.categoria] || 99;
    return oA !== oB ? oA - oB : a.nombre.localeCompare(b.nombre);
  });
}

function renderProductosVenta() {
  const container = document.getElementById("productosVentaContainer");
  if (!container) return;

  const termino = _productosBusqueda.toLowerCase().trim();
  let productosOrdenados = ordenarProductosPorCategoria(state.productos);

  if (termino) {
    productosOrdenados = productosOrdenados.filter((p) =>
      p.nombre.toLowerCase().includes(termino)
    );
  }

  if (productosOrdenados.length === 0) {
    container.innerHTML = '<p style="text-align: center; padding: 30px; color: #999;">No se encontraron productos</p>';
    return;
  }

  container.innerHTML = productosOrdenados.map((p) => {
    const disponible = p.stock > 0;
    return `
      <div class="producto-venta-card ${!disponible ? "no-stock" : ""}">
        <h4>${p.nombre}</h4>
        <div class="producto-precio-venta">S/ ${p.precio.toFixed(2)}</div>
        <div style="font-size: 14px; color: ${p.stock <= 5 ? "#dc3545" : "#6c757d"};">Stock: ${p.stock}</div>
        ${disponible
          ? `
            <div style="display: flex; gap: 5px; margin-top: 10px;">
              <input type="number" id="qty-${p.id}" value="1" min="1" max="${p.stock}"
                style="width: 60px; text-align: center; border: 1px solid #ccc; border-radius: 5px; padding: 5px;">
              <button class="btn btn-green" id="btn-vender-${p.id}"
                data-action="vender-producto" data-id="${p.id}" style="flex: 1;">
                Vender
              </button>
            </div>
          `
          : `<button class="btn btn-red" disabled style="width: 100%; margin-top: 10px;">Agotado</button>`
        }
      </div>
    `;
  }).join("");
}

export function showModalVentaProductos() {
  const modal = document.getElementById("modalVentaProductos");
  if (modal) {
    _productosBusqueda = "";
    const inputBusqueda = document.getElementById("buscarVentaProducto");
    if (inputBusqueda) inputBusqueda.value = "";
    renderProductosVenta();
    modal.classList.add("show");
  }
}

export function closeModalVentaProductos() {
  document.getElementById("modalVentaProductos")?.classList.remove("show");
}

async function venderProducto(productoId) {
  const btn = document.getElementById(`btn-vender-${productoId}`);
  if (btn?.disabled) return;
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Procesando...";
  }

  const qtyInput = document.getElementById(`qty-${productoId}`);
  const cantidad = parseInt(qtyInput?.value);
  const producto = state.productos.find((p) => p.id === productoId);

  if (!producto || isNaN(cantidad) || cantidad <= 0 || cantidad > producto.stock) {
    toast.error("Cantidad inválida o stock insuficiente");
    if (btn) { btn.disabled = false; btn.textContent = "Vender"; }
    return;
  }

  const montoTotal = producto.precio * cantidad;
  const metodoPago = document.getElementById("metodoPagoDirecto")?.value || "Efectivo";

  const venta = {
    id: Date.now(),
    tipo: "Venta Directa",
    tipoDetalle: `${producto.nombre} x${cantidad}`,
    monto: montoTotal,
    metodoPago: metodoPago,
    montoEfectivo: metodoPago === "Efectivo" ? montoTotal : 0,
    montoYape: metodoPago === "Yape" ? montoTotal : 0,
    fecha: new Date().toLocaleString("es-PE"),
    usuario: state.usuarioActual.nombre,
    detalle: {
      consumos: [{ producto: producto.nombre, cantidad, precioUnitario: producto.precio, subtotal: montoTotal }],
      totalConsumos: montoTotal,
    },
  };

  state.ventas.push(venta);
  producto.stock -= cantidad;

  // Background async operations
  productosService.procesarConsumoProducto(productoId, cantidad, false).then(gananciaVenta => {
    venta.ganancia = gananciaVenta;
    guardarDatosGenerico(COLLECTIONS.VENTAS, DOC_IDS.TODAS, { lista: state.ventas });
  }).catch(err => console.error(err));

  // Optimistic UI Update
  renderProductosVenta();
  renderTablaVentas();
  calcularTotal();
  document.dispatchEvent(new CustomEvent("inventario:changed"));
  document.dispatchEvent(new CustomEvent("dashboard:changed"));
  document.dispatchEvent(new CustomEvent("caja:changed"));

  toast.success(`✅ Procesando venta de ${cantidad}x ${producto.nombre}...`);

  if (btn) { btn.disabled = false; btn.textContent = "Vender"; }
}

async function eliminarVenta(id) {
  if ((state.usuarioActual?.rol || "").toLowerCase() !== "admin") {
    toast.error("Solo los administradores pueden eliminar ventas");
    return;
  }

  const ok = await confirmDialog.show(
    "🗑️ Eliminar Venta",
    "¿Estás seguro de eliminar esta venta? Esta acción no se puede deshacer.",
    { confirmText: "Eliminar", cancelText: "Cancelar", isDestructive: true }
  );

  if (!ok) return;

  state.ventas = state.ventas.filter((v) => v.id !== id);
  
  // Optimistic UI Update
  renderTablaVentas();
  calcularTotal();
  toast.success("✅ Eliminando venta...");

  // Background save
  guardarDatosGenerico(COLLECTIONS.VENTAS, DOC_IDS.TODAS, { lista: state.ventas }, true).catch(err => {
    console.error("Error al eliminar venta:", err);
    toast.error("❌ Error al sincronizar eliminación con la nube");
  });
}

// ======================================================
// =================== EVENTS ==========================
// ======================================================

export function initVentasEvents() {
  // Event delegation
  document.addEventListener("click", async (e) => {
    const el = e.target.closest("[data-action]");
    const action = el?.dataset.action;

    switch (action) {
      case "eliminar-venta":
        await eliminarVenta(parseInt(el.dataset.id));
        break;
      case "vender-producto":
        await venderProducto(parseInt(el.dataset.id));
        break;
      case "cargar-mas-ventas":
        state.limiteVentas += 20;
        renderTablaVentas();
        break;
      case "show-venta-manual":
        showModalVentaManual();
        break;
      case "close-venta-manual":
        closeModalVentaManual();
        break;
      case "guardar-venta-manual":
        await guardarVentaManual();
        break;
      case "show-venta-productos":
        showModalVentaProductos();
        break;
      case "close-venta-productos":
        closeModalVentaProductos();
        break;
      case "show-eliminar-ventas":
        document.getElementById("modalEliminarVentas")?.classList.add("show");
        break;
      case "close-eliminar-ventas":
        document.getElementById("modalEliminarVentas")?.classList.remove("show");
        break;
    }
  });

  // Product search
  document.getElementById("buscarVentaProducto")?.addEventListener("input", (e) => {
    _productosBusqueda = e.target.value;
    renderProductosVenta();
  });
}
