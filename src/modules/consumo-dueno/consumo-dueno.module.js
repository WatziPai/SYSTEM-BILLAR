import { state, guardarDatosGenerico } from "@/services/state";
import { productosService } from "@/services/productos.service";
import { COLLECTIONS, DOC_IDS } from "@/utils/constants";
import { debugLog } from "@/utils/debug";
import { toast } from "@/components/toast";
import { confirmDialog } from "@/components/confirm-dialog";

// ======================================================
// ================= RENDER LIST =======================
// ======================================================

export function renderConsumoDueno() {
  const container = document.getElementById("consumoDuenoContainer");
  if (!container) return;

  const consumosActuales = state.ultimoCierre
    ? state.consumosDueno.filter((c) => c.id > state.ultimoCierre)
    : state.consumosDueno;

  const isAdmin = (state.usuarioActual?.rol || "").toLowerCase() === "admin";

  if (consumosActuales.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:50px;color:#666;background:white;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,.1);min-height:300px;">
        <p style="font-size:64px;margin:0;">🍽️</p>
        <p style="margin-top:20px;font-size:18px;font-weight:600;color:#333;">No hay consumos registrados</p>
        <p style="margin-top:10px;font-size:14px;color:#666;">${state.ultimoCierre ? "desde el último cierre" : "en el sistema"}</p>
        <button class="btn btn-primary" data-action="show-modal-consumo-dueno" style="margin-top:30px;padding:15px 40px;font-size:16px;">
          ➕ Registrar Primer Consumo
        </button>
      </div>
    `;
    return;
  }

  const totalGeneral = consumosActuales.reduce((sum, c) => sum + (c.total || c.totalVenta || 0), 0);

  const htmlConsumos = consumosActuales.slice().reverse().map((c) => `
    <div style="background:white;border:1px solid #e0e0e0;border-radius:8px;padding:15px;margin-bottom:10px;box-shadow:0 2px 5px rgba(0,0,0,.05);">
      <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:10px;">
        <div style="font-weight:600;font-size:15px;color:#333;">🍽️ ${c.fecha}</div>
        <div style="font-size:20px;font-weight:bold;color:#ff9800;">S/ ${(c.total || c.totalVenta || 0).toFixed(2)}</div>
      </div>
      <div style="background:#fff3cd;padding:10px;border-radius:4px;margin-top:10px;">
        ${c.productos.map((p) => `
          <div style="display:flex;justify-content:space-between;padding:3px 0;font-size:13px;color:#856404;">
            <span>• ${p.nombre} x${p.cantidad} (S/ ${(p.precio || 0).toFixed(2)} c/u)</span>
            <strong>S/ ${((p.precio || 0) * p.cantidad).toFixed(2)}</strong>
          </div>
        `).join("")}
      </div>
      ${isAdmin
        ? `<div style="margin-top:10px;display:flex;justify-content:flex-end;">
            <button class="btn btn-red btn-small" data-action="eliminar-consumo-dueno" data-id="${c.id}">🗑️ Eliminar</button>
           </div>`
        : ""
      }
    </div>
  `).join("");

  container.innerHTML = `
    <div style="background:#fff3cd;padding:15px;border-radius:8px;margin-bottom:20px;border-left:4px solid #ff9800;">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div>
          <strong style="font-size:16px;color:#856404;">💰 Total Consumido</strong>
          <div style="font-size:13px;color:#856404;margin-top:5px;">
            ${consumosActuales.length} ${consumosActuales.length === 1 ? "registro" : "registros"}
            ${state.ultimoCierre ? "desde el último cierre" : ""}
          </div>
        </div>
        <div style="font-size:28px;font-weight:bold;color:#ff9800;">S/ ${totalGeneral.toFixed(2)}</div>
      </div>
      ${isAdmin
        ? `<button class="btn btn-blue" data-action="descargar-consumo-pdf" style="width:100%;margin-top:15px;">📄 Descargar Reporte PDF</button>`
        : ""
      }
    </div>
    ${htmlConsumos}
  `;
}

// ======================================================
// ================ REGISTER CONSUMPTION ===============
// ======================================================

let _carritoConsumoDueno = [];

function renderCarritoConsumoDueno() {
  const carritoEl = document.getElementById("carritoConsumoDueno");
  const totalEl = document.getElementById("totalConsumoDueno");
  if (!carritoEl) return;

  const total = _carritoConsumoDueno.reduce((sum, c) => sum + c.precio * c.cantidad, 0);
  if (totalEl) totalEl.textContent = `S/ ${total.toFixed(2)}`;

  if (_carritoConsumoDueno.length === 0) {
    carritoEl.innerHTML = '<p style="color:#999;text-align:center;padding:20px;">No hay productos seleccionados</p>';
    return;
  }

  carritoEl.innerHTML = _carritoConsumoDueno.map((c) => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;border-bottom:1px solid #eee;">
      <div>
        <strong>${c.nombre}</strong><br>
        <small style="color:#666;">S/ ${c.precio.toFixed(2)} x ${c.cantidad}</small>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <strong style="color:#ff9800;">S/ ${(c.precio * c.cantidad).toFixed(2)}</strong>
        <button class="btn-small btn-red" data-action="quitar-carrito-dueno" data-id="${c.id}" style="padding:3px 7px;">✕</button>
      </div>
    </div>
  `).join("");
}

function renderProductosConsumoDueno() {
  const container = document.getElementById("productosConsumoDuenoGrid");
  if (!container) return;

  const orden = { Licores: 1, Gaseosas: 2, Golosinas: 3, Otros: 4 };
  const prods = [...state.productos].sort((a, b) => {
    const oA = orden[a.categoria] || 99;
    const oB = orden[b.categoria] || 99;
    return oA !== oB ? oA - oB : a.nombre.localeCompare(b.nombre);
  });

  container.innerHTML = prods.filter(p => p.stock > 0).map((p) => `
    <div style="background:#f9f9f9;padding:12px;border-radius:8px;border:1px solid #e0e0e0;text-align:center;">
      <div style="font-weight:600;font-size:14px;margin-bottom:5px;">${p.nombre}</div>
      <div style="font-size:12px;color:#666;margin-bottom:8px;">Stock: ${p.stock}</div>
      <button class="btn btn-orange btn-small" data-action="agregar-carrito-dueno" data-id="${p.id}"
        style="width:100%;background:#ff9800;color:white;border:none;padding:6px 10px;border-radius:5px;cursor:pointer;font-size:12px;">
        ➕ Agregar
      </button>
    </div>
  `).join("");

  if (prods.filter(p => p.stock > 0).length === 0) {
    container.innerHTML = '<p style="color:#999;text-align:center;padding:20px;grid-column:1/-1;">No hay productos con stock disponible</p>';
  }
}

export function showModalConsumoDueno() {
  _carritoConsumoDueno = [];
  renderProductosConsumoDueno();
  renderCarritoConsumoDueno();
  document.getElementById("modalConsumoDueno")?.classList.add("show");
}

async function guardarConsumoDueno() {
  if (_carritoConsumoDueno.length === 0) {
    toast.error("⚠️ Selecciona al menos un producto");
    return;
  }

  const btn = document.getElementById("btnGuardarConsumoDueno");
  try {
    if (btn) { btn.disabled = true; btn.textContent = "Guardando..."; }

    const totalVenta = _carritoConsumoDueno.reduce((sum, c) => sum + c.precio * c.cantidad, 0);
    let totalCosto = 0;

    const consumo = {
      id: Date.now(),
      fecha: new Date().toLocaleString("es-PE"),
      tipo: "Consumo Dueño",
      productos: _carritoConsumoDueno.map((c) => {
        const prod = state.productos.find((p) => p.id === c.id);
        const costo = prod ? prod.precioCosto || 0 : 0;
        totalCosto += costo * c.cantidad;
        return { nombre: c.nombre, precio: c.precio, precioCosto: costo, cantidad: c.cantidad };
      }),
      totalVenta,
      total: totalVenta,
      totalCosto,
    };

    // Update stock and stats
    for (const c of _carritoConsumoDueno) {
      const producto = state.productos.find((p) => p.id === c.id);
      if (producto) {
        producto.stock -= c.cantidad;
        await productosService.procesarConsumoProducto(c.id, c.cantidad, true);
      }
    }

    state.consumosDueno.push(consumo);
    await guardarDatosGenerico(COLLECTIONS.CONSUMOS, DOC_IDS.DUENO, { lista: state.consumosDueno });

    toast.success(`✅ Consumo registrado. Valor: S/ ${totalVenta.toFixed(2)} | Costo: S/ ${totalCosto.toFixed(2)}`);
    _carritoConsumoDueno = [];
    document.getElementById("modalConsumoDueno")?.classList.remove("show");

    renderConsumoDueno();
    document.dispatchEvent(new CustomEvent("inventario:changed"));
    document.dispatchEvent(new CustomEvent("dashboard:changed"));
  } catch (error) {
    debugLog("error", "❌ Error al guardar consumo dueño", error);
    toast.error("No se pudo guardar el consumo. Intenta de nuevo.");
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = "Guardar Consumo"; }
  }
}

async function eliminarConsumoDueno(consumoId) {
  const ok = await confirmDialog.show("🗑️ Eliminar Consumo", "¿Estás seguro de eliminar este registro?", { confirmText: "Eliminar", cancelText: "Cancelar", isDestructive: true });
  if (!ok) return;

  const consumo = state.consumosDueno.find((c) => c.id === consumoId);
  if (!consumo) return;

  // Restore stock
  consumo.productos.forEach((p) => {
    const producto = state.productos.find((prod) => prod.nombre === p.nombre);
    if (producto) producto.stock += p.cantidad;
  });

  state.consumosDueno = state.consumosDueno.filter((c) => c.id !== consumoId);
  await guardarDatosGenerico(COLLECTIONS.CONSUMOS, DOC_IDS.DUENO, { lista: state.consumosDueno }, true);
  await productosService.save(true);

  renderConsumoDueno();
  document.dispatchEvent(new CustomEvent("inventario:changed"));
  toast.success("✅ Registro eliminado y stock devuelto");
}

function descargarConsumoDuenoPDF() {
  const consumosActuales = state.ultimoCierre
    ? state.consumosDueno.filter((c) => c.id > state.ultimoCierre)
    : state.consumosDueno;

  if (consumosActuales.length === 0) { toast.warning("⚠️ No hay consumos para descargar"); return; }

  const totalGeneral = consumosActuales.reduce((sum, c) => sum + (c.total || c.totalVenta || 0), 0);
  const ventanaImpresion = window.open("", "_blank", "width=800,height=600");

  ventanaImpresion.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Consumo del Dueño</title>
  <style>
    * { margin:0;padding:0;box-sizing:border-box; }
    body { font-family:'Segoe UI',Arial,sans-serif;padding:30px;background:white;color:#333; }
    .header { text-align:center;border-bottom:3px solid #ff9800;padding-bottom:20px;margin-bottom:25px; }
    h1 { color:#ff9800;font-size:28px;margin-bottom:10px; }
    .total-box { background:#fff3cd;padding:20px;border-radius:8px;margin-bottom:30px;border-left:4px solid #ff9800; }
    .consumo-item { background:#f9f9f9;padding:15px;border-radius:6px;margin-bottom:12px;border-left:4px solid #ff9800;page-break-inside:avoid; }
    .btn-imprimir { background:#ff9800;color:white;border:none;padding:12px 30px;border-radius:5px;cursor:pointer;font-size:14px;margin:15px 0; }
    @media print { .no-print { display:none; } @page { margin:1cm; } }
  </style>
</head>
<body>
  <div class="no-print"><button class="btn-imprimir" onclick="window.print()">🖨️ Imprimir / Guardar como PDF</button></div>
  <div class="header">
    <h1>🍽️ CONSUMO DEL DUEÑO</h1>
    <p style="color:#666;margin-top:5px;">Generado: ${new Date().toLocaleString("es-PE")}</p>
    <p style="color:#856404;margin-top:10px;font-size:14px;">⚠️ Estos consumos NO fueron cobrados pero se descontaron del stock</p>
  </div>
  <div class="total-box">
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <div>
        <strong style="font-size:16px;color:#856404;">Total Consumido</strong>
        <div style="font-size:13px;color:#856404;margin-top:5px;">${consumosActuales.length} registros</div>
      </div>
      <div style="font-size:32px;font-weight:bold;color:#ff9800;">S/ ${totalGeneral.toFixed(2)}</div>
    </div>
  </div>
  ${consumosActuales.slice().reverse().map((c) => `
    <div class="consumo-item">
      <div style="display:flex;justify-content:space-between;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #e0e0e0;">
        <div style="font-weight:bold;">${c.fecha}</div>
        <div style="font-size:20px;font-weight:bold;color:#ff9800;">S/ ${(c.total || c.totalVenta || 0).toFixed(2)}</div>
      </div>
      <div style="background:#fff3cd;padding:10px;border-radius:4px;">
        ${c.productos.map((p) => `
          <div style="display:flex;justify-content:space-between;padding:3px 0;font-size:13px;color:#856404;">
            <span>• ${p.nombre} x${p.cantidad} (S/ ${(p.precio || 0).toFixed(2)} c/u)</span>
            <strong>S/ ${((p.precio || 0) * p.cantidad).toFixed(2)}</strong>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("")}
  <div style="margin-top:30px;text-align:center;color:#999;font-size:11px;border-top:1px solid #e0e0e0;padding-top:15px;">
    <p>Sistema de Gestión de Billar • Reporte generado automáticamente</p>
  </div>
</body>
</html>`);

  ventanaImpresion.document.close();
  setTimeout(() => ventanaImpresion.focus(), 250);
}

// ======================================================
// =================== EVENTS ==========================
// ======================================================

export function initConsumoDuenoEvents() {
  document.addEventListener("click", async (e) => {
    const el = e.target.closest("[data-action]");
    const action = el?.dataset.action;
    const id = parseInt(el?.dataset.id);

    switch (action) {
      case "show-modal-consumo-dueno":
        showModalConsumoDueno();
        break;
      case "close-modal-consumo-dueno":
        document.getElementById("modalConsumoDueno")?.classList.remove("show");
        break;
      case "guardar-consumo-dueno":
        await guardarConsumoDueno();
        break;
      case "agregar-carrito-dueno": {
        const producto = state.productos.find((p) => p.id === id);
        if (!producto || producto.stock <= 0) { toast.error("Sin stock disponible"); break; }
        const existente = _carritoConsumoDueno.find((c) => c.id === id);
        if (existente) {
          if (existente.cantidad < producto.stock) existente.cantidad++;
          else { toast.warning("No hay más stock disponible"); break; }
        } else {
          _carritoConsumoDueno.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
        }
        renderCarritoConsumoDueno();
        break;
      }
      case "quitar-carrito-dueno": {
        const idx = _carritoConsumoDueno.findIndex((c) => c.id === id);
        if (idx !== -1) {
          _carritoConsumoDueno[idx].cantidad--;
          if (_carritoConsumoDueno[idx].cantidad <= 0) _carritoConsumoDueno.splice(idx, 1);
        }
        renderCarritoConsumoDueno();
        break;
      }
      case "eliminar-consumo-dueno":
        await eliminarConsumoDueno(id);
        break;
      case "descargar-consumo-pdf":
        descargarConsumoDuenoPDF();
        break;
    }
  });
}
