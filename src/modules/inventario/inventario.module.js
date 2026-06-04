import { state, guardarDatosGenerico } from "@/services/state";
import { productosService } from "@/services/productos.service";
import { COLLECTIONS, DOC_IDS } from "@/utils/constants";
import { debugLog } from "@/utils/debug";
import { toast } from "@/components/toast";
import { confirmDialog } from "@/components/confirm-dialog";

// ======================================================
// =================== RENDER GRID =====================
// ======================================================

const CATEGORIA_EMOJI = { Golosinas: "🍬", Gaseosas: "🥤", Licores: "🍺", Otros: "📦" };

function ordenarProductosPorCategoria(prods) {
  const orden = { Licores: 1, Gaseosas: 2, Golosinas: 3, Otros: 4 };
  return [...prods].sort((a, b) => {
    const oA = orden[a.categoria] || 99;
    const oB = orden[b.categoria] || 99;
    return oA !== oB ? oA - oB : a.nombre.localeCompare(b.nombre);
  });
}

export function renderInventario() {
  const grid = document.getElementById("inventarioGrid");
  if (!grid) return;

  const isAdmin = (state.usuarioActual?.rol || "").toLowerCase() === "admin";
  let prods = [...state.productos];

  // Sorting
  if (state.ordenInventarioActual === "masVendidos") {
    prods.sort((a, b) => (b.unidadesVendidas || 0) - (a.unidadesVendidas || 0));
  } else if (state.ordenInventarioActual === "menosStock") {
    prods.sort((a, b) => a.stock - b.stock);
  } else if (state.ordenInventarioActual === "categoria") {
    prods = ordenarProductosPorCategoria(prods);
  }

  if (prods.length === 0) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:40px;color:#999;">No hay productos en el inventario</p>';
    return;
  }

  grid.innerHTML = prods.map((p, index) => {
    const stockBajo = p.stock <= p.stockMin;
    const precioCosto = p.precioCosto || 0;
    const precioVenta = p.precio || 0;
    const margenPorUnidad = precioVenta - precioCosto;
    const margenPct = precioCosto > 0 ? (margenPorUnidad / precioVenta) * 100 : 0;
    const stockInicial = p.stockInicial || p.stock;
    const unidadesVendidas = p.unidadesVendidas || 0;
    const gananciaAcum = p.gananciaAcumulada || 0;
    const gananciaPot = margenPorUnidad * p.stock;
    const gananciaTotal = gananciaAcum + gananciaPot;
    const pctVendido = stockInicial > 0 ? (unidadesVendidas / stockInicial) * 100 : 0;
    const emoji = CATEGORIA_EMOJI[p.categoria] || "📦";

    let separador = "";
    if (state.ordenInventarioActual === "categoria") {
      const prev = prods[index - 1];
      if (!prev || prev.categoria !== p.categoria) {
        separador = `<div style="grid-column:1/-1;margin-top:15px;margin-bottom:5px;border-bottom:2px solid #e5e7eb;padding-bottom:5px;font-weight:bold;color:#4b5563;">${emoji} ${p.categoria || "Sin Categoría"}</div>`;
      }
    }

    return `
      ${separador}
      <div class="producto-card" style="border-left:4px solid ${stockBajo ? "#dc3545" : "#10b981"};">
        <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:10px;">
          <div>
            <h4 style="margin:0;">${emoji} ${p.nombre}</h4>
            <small style="color:#666;">${p.categoria || "Sin categoría"}</small>
          </div>
          ${isAdmin
            ? `<div style="display:flex;gap:5px;">
                <button class="btn-small btn-blue" data-action="show-stock" data-id="${p.id}" title="Ajustar Stock">📊</button>
                <button class="btn-small btn-green" data-action="editar-producto" data-id="${p.id}" title="Editar">✏️</button>
                <button class="btn-small btn-red" data-action="eliminar-producto" data-id="${p.id}" title="Eliminar">🗑️</button>
              </div>`
            : `<button class="btn-small btn-green" data-action="show-stock" data-id="${p.id}" style="font-size:11px;">➕ Stock</button>`
          }
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
          ${isAdmin && precioCosto > 0
            ? `<div style="background:#f3f4f6;padding:8px;border-radius:6px;"><small style="color:#666;display:block;">💰 Costo</small><strong>S/ ${precioCosto.toFixed(2)}</strong></div>
               <div style="background:#f3f4f6;padding:8px;border-radius:6px;"><small style="color:#666;display:block;">💵 Venta</small><strong>S/ ${precioVenta.toFixed(2)}</strong></div>`
            : `<div style="background:#f3f4f6;padding:8px;border-radius:6px;grid-column:1/-1;"><small style="color:#666;display:block;">💵 Precio de Venta</small><strong>S/ ${precioVenta.toFixed(2)}</strong></div>`
          }
        </div>

        ${isAdmin && precioCosto > 0 && margenPct > 0
          ? `<div style="background:linear-gradient(135deg,#10b981 0%,#059669 100%);color:white;padding:8px;border-radius:6px;margin-bottom:12px;text-align:center;">
               <small style="opacity:.9;display:block;">📊 Margen</small>
               <strong style="font-size:16px;">${margenPct.toFixed(1)}%</strong>
               <span style="font-size:12px;">(S/ ${margenPorUnidad.toFixed(2)}/u)</span>
             </div>`
          : ""
        }

        <div style="margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
            <span style="color:#666;font-size:13px;">📦 Stock: <strong class="${stockBajo ? "stock-bajo" : ""}">${p.stock}</strong> / ${stockInicial}</span>
            ${unidadesVendidas > 0 ? `<span style="color:#10b981;font-size:13px;">✅ ${unidadesVendidas} vendidas</span>` : ""}
          </div>
          ${stockInicial > 0
            ? `<div style="background:#e5e7eb;height:8px;border-radius:4px;overflow:hidden;">
                <div style="background:linear-gradient(90deg,#10b981,#059669);height:100%;width:${pctVendido}%;transition:width .3s;"></div>
               </div>
               <small style="color:#666;font-size:11px;">${pctVendido.toFixed(0)}% vendido</small>`
            : ""
          }
        </div>

        ${isAdmin && precioCosto > 0 && (gananciaAcum > 0 || gananciaPot > 0)
          ? `<div style="background:#f0f9ff;border:2px solid #3b82f6;padding:10px;border-radius:6px;margin-bottom:8px;">
               ${gananciaAcum > 0 ? `<div style="display:flex;justify-content:space-between;margin-bottom:5px;"><span style="color:#1e40af;font-size:13px;">💚 Ganancia Acum.:</span><strong style="color:#10b981;">S/ ${gananciaAcum.toFixed(2)}</strong></div>` : ""}
               ${gananciaPot > 0 ? `<div style="display:flex;justify-content:space-between;margin-bottom:5px;"><span style="color:#1e40af;font-size:13px;">💛 Potencial:</span><strong style="color:#f59e0b;">S/ ${gananciaPot.toFixed(2)}</strong></div>` : ""}
               <div style="border-top:1px dashed #3b82f6;margin:8px 0 5px;padding-top:5px;display:flex;justify-content:space-between;">
                 <span style="color:#1e40af;font-weight:600;">🎯 Total Lote:</span>
                 <strong style="color:#1e40af;font-size:16px;">S/ ${gananciaTotal.toFixed(2)}</strong>
               </div>
             </div>`
          : ""
        }

        ${stockBajo ? '<div style="padding:8px;background:#fff3cd;border-radius:5px;font-size:12px;color:#856404;">⚠️ Stock bajo</div>' : ""}
      </div>
    `;
  }).join("");
}

export function renderTablaLotes() {
  const container = document.getElementById("lotesAgotadosContainer");
  if (!container) return;

  if (state.lotesAgotados.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:#991b1b;padding:20px;">No hay reportes de lotes agotados aún</p>';
    return;
  }

  let totalGanancia = 0;

  const rows = state.lotesAgotados.map((l) => {
    const costoLote = (l.unidadesVendidas || 0) * (l.precioCosto || 0);
    const gananciaLote = l.gananciaGenerada || 0;
    const ventaLote = costoLote + gananciaLote;
    totalGanancia += gananciaLote;
    const esParcial = l.tipo === "Lote Acumulado";
    const colorFondo = esParcial ? "#f0f9ff" : "#fff5f5";
    const colorBorde = esParcial ? "#bae6fd" : "#fecaca";

    return `
      <tr style="border-bottom:1px solid ${colorBorde};background:${colorFondo};">
        <td style="padding:10px;"><strong>${l.nombre}</strong><br><small style="color:#666;">${l.categoria} • ${esParcial ? "📦" : "📉"} ${l.tipo || "Stock Agotado"}</small></td>
        <td style="padding:10px;text-align:center;">${l.unidadesVendidas} / ${l.stockInicial}</td>
        <td style="padding:10px;text-align:center;color:#856404;">${l.unidadesConsumidasDueno || 0}</td>
        <td style="padding:10px;text-align:right;">S/ ${costoLote.toFixed(2)}</td>
        <td style="padding:10px;text-align:right;font-weight:600;color:#1e40af;">S/ ${ventaLote.toFixed(2)}</td>
        <td style="padding:10px;text-align:right;color:#10b981;font-weight:bold;">+ S/ ${gananciaLote.toFixed(2)}</td>
        <td style="padding:10px;text-align:center;font-size:11px;color:#666;">${new Date(l.fechaInicio).toLocaleDateString()}<br>--<br>${new Date(l.fechaFin).toLocaleDateString()}</td>
      </tr>
    `;
  }).join("");

  container.innerHTML = `
    <table class="ventas-table" style="width:100%;border-collapse:collapse;font-size:13px;">
      <thead>
        <tr style="background:#e5e7eb;color:#374151;border-bottom:2px solid #d1d5db;">
          <th style="padding:10px;text-align:left;">Producto</th>
          <th style="padding:10px;text-align:center;">Vendido</th>
          <th style="padding:10px;text-align:center;">Consumo</th>
          <th style="padding:10px;text-align:right;">Costo Total</th>
          <th style="padding:10px;text-align:right;">VENTA TOTAL</th>
          <th style="padding:10px;text-align:right;">GANANCIA</th>
          <th style="padding:10px;text-align:center;">Fecha</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
      <tfoot style="background:#fef2f2;font-weight:bold;color:#991b1b;border-top:2px solid #fecaca;">
        <tr>
          <td colspan="3" style="padding:15px;text-align:right;font-size:14px;">TOTAL HISTÓRICO LOTES:</td>
          <td style="padding:15px;text-align:right;font-size:14px;">-</td>
          <td style="padding:15px;text-align:right;font-size:14px;color:#1e40af;">-</td>
          <td style="padding:15px;text-align:right;font-size:14px;color:#10b981;">S/ ${totalGanancia.toFixed(2)}</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  `;
}

// ======================================================
// ================ MODAL PRODUCTO =====================
// ======================================================

let _productoEditando = null;

export function showModalProducto(productoId = null) {
  const isAdmin = (state.usuarioActual?.rol || "").toLowerCase() === "admin";
  const isEmpleado = (state.usuarioActual?.rol || "").toLowerCase() === "empleado";

  if (isEmpleado && productoId !== null) {
    toast.error("Los empleados no pueden editar productos existentes");
    return;
  }

  if (!isAdmin && !isEmpleado) {
    toast.error("No tienes permisos para gestionar productos");
    return;
  }

  _productoEditando = productoId !== null
    ? state.productos.find((p) => p.id === productoId) || null
    : null;

  const modal = document.getElementById("modalProducto");
  const title = document.getElementById("productoModalTitle");

  if (_productoEditando) {
    title.textContent = "Editar Producto";
    document.getElementById("productoNombre").value = _productoEditando.nombre;
    document.getElementById("productoPrecio").value = _productoEditando.precio;
    document.getElementById("productoPrecioCosto").value = _productoEditando.precioCosto || "";
    document.getElementById("productoCategoria").value = _productoEditando.categoria || "Otros";
    document.getElementById("productoStock").value = _productoEditando.stock;
    document.getElementById("productoStockMin").value = _productoEditando.stockMin;
    document.getElementById("productoTamanoLote").value = _productoEditando.tamanoLote || "";
    setTimeout(() => calcularMargenProducto(), 100);
  } else {
    title.textContent = "Agregar Producto";
    ["productoNombre", "productoPrecio", "productoPrecioCosto", "productoStock", "productoTamanoLote"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
    document.getElementById("productoCategoria").value = "Otros";
    document.getElementById("productoStockMin").value = "5";
    document.getElementById("margenIndicador")?.classList.add("hidden");
    document.getElementById("gananciaTotalIndicador")?.classList.add("hidden");
  }

  document.getElementById("productoError")?.classList.add("hidden");
  modal?.classList.add("show");
}

function calcularMargenProducto() {
  const precioVenta = parseFloat(document.getElementById("productoPrecio")?.value) || 0;
  const precioCosto = parseFloat(document.getElementById("productoPrecioCosto")?.value) || 0;
  const stock = parseInt(document.getElementById("productoStock")?.value) || 0;

  const margenEl = document.getElementById("margenIndicador");
  const gananciaEl = document.getElementById("gananciaTotalIndicador");

  if (precioVenta > 0 && precioCosto > 0 && precioCosto < precioVenta) {
    const margenU = precioVenta - precioCosto;
    const margenPct = (margenU / precioVenta) * 100;
    document.getElementById("margenPorcentaje").textContent = margenPct.toFixed(1) + "%";
    document.getElementById("margenMonto").textContent = margenU.toFixed(2);
    margenEl?.classList.remove("hidden");

    if (stock > 0) {
      document.getElementById("gananciaTotalEsperada").textContent = (margenU * stock).toFixed(2);
      gananciaEl?.classList.remove("hidden");
    } else {
      gananciaEl?.classList.add("hidden");
    }
  } else {
    margenEl?.classList.add("hidden");
    gananciaEl?.classList.add("hidden");
  }
}

async function guardarProducto() {
  const isAdmin = (state.usuarioActual?.rol || "").toLowerCase() === "admin";
  const isEmpleado = (state.usuarioActual?.rol || "").toLowerCase() === "empleado";
  if (isEmpleado && _productoEditando) { toast.error("Los empleados no pueden editar productos"); return; }
  if (!isAdmin && !isEmpleado) return;

  const nombre = document.getElementById("productoNombre")?.value.trim();
  const precio = parseFloat(document.getElementById("productoPrecio")?.value);
  const precioCosto = parseFloat(document.getElementById("productoPrecioCosto")?.value);
  const categoria = document.getElementById("productoCategoria")?.value;
  const stock = parseInt(document.getElementById("productoStock")?.value);
  const stockMin = parseInt(document.getElementById("productoStockMin")?.value);
  const tamanoLote = parseInt(document.getElementById("productoTamanoLote")?.value) || 0;
  const errorDiv = document.getElementById("productoError");

  if (!nombre || isNaN(precio) || precio < 0 || isNaN(stock) || stock < 0 || isNaN(stockMin) || stockMin < 0) {
    errorDiv.textContent = "Por favor completa todos los campos correctamente";
    errorDiv?.classList.remove("hidden");
    return;
  }

  if (!isNaN(precioCosto) && precioCosto > 0 && precioCosto >= precio) {
    errorDiv.textContent = "⚠️ El precio de costo debe ser menor que el precio de venta";
    errorDiv?.classList.remove("hidden");
    return;
  }

  if (_productoEditando) {
    Object.assign(_productoEditando, { nombre, precio, precioCosto: precioCosto || 0, categoria, stock, stockMin, tamanoLote });
    if (!_productoEditando.stockInicial) {
      Object.assign(_productoEditando, { stockInicial: stock, unidadesVendidas: 0, gananciaAcumulada: 0, fechaUltimaReposicion: Date.now() });
    }
  } else {
    state.productos.push({
      id: Date.now(), nombre, precio, precioCosto: precioCosto || 0, categoria, stock, stockInicial: stock,
      stockMin, tamanoLote, unidadesVendidas: 0, gananciaAcumulada: 0, conteoAcumuladoLote: 0, fechaUltimaReposicion: Date.now(),
    });
  }

  await productosService.save();
  renderInventario();
  document.getElementById("modalProducto")?.classList.remove("show");
  _productoEditando = null;
  toast.success("✅ Producto guardado correctamente");
}

// ======================================================
// ================ MODAL STOCK ========================
// ======================================================

export function showModalStock(productoId) {
  const producto = state.productos.find((p) => p.id === productoId);
  if (!producto) return;

  _productoEditando = producto;
  document.getElementById("stockProductoNombre").textContent = producto.nombre;
  document.getElementById("stockActual").textContent = producto.stock;
  document.getElementById("stockAjuste").value = "";

  const isAdmin = (state.usuarioActual?.rol || "").toLowerCase() === "admin";
  const inputAjuste = document.getElementById("stockAjuste");
  if (inputAjuste) {
    inputAjuste.placeholder = isAdmin ? "Ej: +10 o -5" : "Ej: +10 (solo positivos)";
    inputAjuste.setAttribute("min", isAdmin ? "" : "1");
  }

  document.getElementById("modalStock")?.classList.add("show");
}

async function ajustarStock() {
  const ajuste = parseInt(document.getElementById("stockAjuste")?.value);

  if (isNaN(ajuste) || ajuste === 0) { toast.error("Por favor ingresa un valor válido"); return; }

  const isAdmin = (state.usuarioActual?.rol || "").toLowerCase() === "admin";
  if (!isAdmin && ajuste < 0) { toast.error("Los empleados solo pueden agregar stock"); return; }

  const nuevoStock = _productoEditando.stock + ajuste;
  if (nuevoStock < 0) { toast.error("El stock no puede ser negativo"); return; }

  if (isAdmin && ajuste > 0 && (_productoEditando.unidadesVendidas || 0) > 0) {
    const confirmar = await confirmDialog.show(
      "📦 Reposición de Stock",
      `¿Tratar este ingreso como REPOSICIÓN?\n\nEsto archivará las estadísticas actuales (${_productoEditando.unidadesVendidas} vendidas) y reiniciará el contador.`,
      { confirmText: "Sí, reponer", cancelText: "Solo agregar stock" }
    );

    if (confirmar) {
      await productosService.generarReporteAgotamiento(_productoEditando);
      Object.assign(_productoEditando, { stockInicial: nuevoStock, unidadesVendidas: 0, unidadesConsumidasDueno: 0, gananciaAcumulada: 0, conteoAcumuladoLote: 0, fechaUltimaReposicion: Date.now() });
    } else if (ajuste > 0) {
      _productoEditando.stockInicial = nuevoStock;
    }
  } else if (isAdmin && ajuste > 0 && (_productoEditando.unidadesVendidas || 0) === 0) {
    _productoEditando.stockInicial = nuevoStock;
    _productoEditando.fechaUltimaReposicion = _productoEditando.fechaUltimaReposicion || Date.now();
  }

  _productoEditando.stock = nuevoStock;
  await productosService.save();
  renderInventario();
  renderTablaLotes();
  document.getElementById("modalStock")?.classList.remove("show");
  _productoEditando = null;
  toast.success("✅ Stock actualizado correctamente");
}

async function eliminarProducto(id) {
  if ((state.usuarioActual?.rol || "").toLowerCase() !== "admin") {
    toast.error("Solo los administradores pueden eliminar productos");
    return;
  }
  const ok = await confirmDialog.show("🗑️ Eliminar Producto", "¿Estás seguro de eliminar este producto?", { confirmText: "Eliminar", cancelText: "Cancelar", isDestructive: true });
  if (!ok) return;

  state.productos = state.productos.filter((p) => p.id !== id);
  await productosService.save(true);
  renderInventario();
  toast.success("✅ Producto eliminado");
}

// ======================================================
// =================== EVENTS ==========================
// ======================================================

export function initInventarioEvents() {
  document.addEventListener("click", async (e) => {
    const el = e.target.closest("[data-action]");
    const action = el?.dataset.action;
    const id = parseInt(el?.dataset.id);

    switch (action) {
      case "show-modal-producto":
        showModalProducto(null);
        break;
      case "editar-producto":
        showModalProducto(id);
        break;
      case "eliminar-producto":
        await eliminarProducto(id);
        break;
      case "guardar-producto":
        await guardarProducto();
        break;
      case "close-modal-producto":
        document.getElementById("modalProducto")?.classList.remove("show");
        _productoEditando = null;
        break;
      case "show-stock":
        showModalStock(id);
        break;
      case "ajustar-stock":
        await ajustarStock();
        break;
      case "close-modal-stock":
        document.getElementById("modalStock")?.classList.remove("show");
        _productoEditando = null;
        break;
      case "cambiar-orden-inventario":
        state.ordenInventarioActual = el.dataset.valor || "default";
        renderInventario();
        break;
    }
  });

  // Real-time margin calculator
  ["productoPrecio", "productoPrecioCosto", "productoStock"].forEach(id => {
    document.getElementById(id)?.addEventListener("input", calcularMargenProducto);
  });

  // Listen for external events
  document.addEventListener("inventario:changed", () => {
    renderInventario();
    renderTablaLotes();
  });
}
