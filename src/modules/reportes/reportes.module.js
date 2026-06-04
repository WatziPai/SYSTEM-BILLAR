import { state } from "@/services/state";
import { reportesService } from "@/services/reportes.service";
import { cajaService } from "@/services/caja.service";
import { debugLog } from "@/utils/debug";
import { toast } from "@/components/toast";

// ======================================================
// =================== REPORTES (Diario) ===============
// ======================================================

export function renderReportes() {
  if (!state.usuarioActual) return;

  const ventasActuales = state.ultimoCierre
    ? state.ventas.filter((v) => v.id > state.ultimoCierre)
    : state.ventas;

  const totalVentas = ventasActuales.reduce((sum, v) => sum + (v.monto || 0), 0);
  const ventasMesas = ventasActuales
    .filter((v) => v.tipo === "Mesa Billar")
    .reduce((sum, v) => sum + (v.monto || 0), 0);
  const ventasProductos = ventasActuales
    .filter((v) => v.tipo !== "Mesa Billar")
    .reduce((sum, v) => sum + (v.monto || 0), 0);
  const totalEfectivo = ventasActuales.reduce((s, v) => {
    if (v.metodoPago === "Mixto") return s + (v.montoEfectivo || 0);
    if ((v.metodoPago || "Efectivo") === "Efectivo") return s + (v.monto || 0);
    return s;
  }, 0);
  const totalYape = ventasActuales.reduce((s, v) => {
    if (v.metodoPago === "Mixto") return s + (v.montoYape || 0);
    if (v.metodoPago === "Yape") return s + (v.monto || 0);
    return s;
  }, 0);
  const consumosDuenoActuales = state.ultimoCierre
    ? state.consumosDueno.filter((c) => c.id > state.ultimoCierre)
    : state.consumosDueno;
  const totalConsumoDueno = consumosDuenoActuales.reduce((s, c) => s + (c.totalCosto || 0), 0);

  const setEl = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setEl("reporteTotalVentas", `S/ ${totalVentas.toFixed(2)}`);
  setEl("reporteVentasMesas", `S/ ${ventasMesas.toFixed(2)}`);
  setEl("reporteVentasProductos", `S/ ${ventasProductos.toFixed(2)}`);
  setEl("reporteTransacciones", ventasActuales.length.toString());
  setEl("reporteConsumoDueno", `S/ ${totalConsumoDueno.toFixed(2)}`);
  setEl("reporteTotalEfectivo", `S/ ${totalEfectivo.toFixed(2)}`);
  setEl("reporteTotalYape", `S/ ${totalYape.toFixed(2)}`);

  // Render details table
  const tbody = document.getElementById("reporteDetalleTable");
  if (tbody) {
    if (ventasActuales.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:30px;color:#999;">No hay ventas en el período actual</td></tr>';
    } else {
      tbody.innerHTML = [...ventasActuales].reverse().map((v) => {
        const metodo = v.metodoPago || "Efectivo";
        const metodoColor = metodo === "Yape" ? "#742284" : metodo === "Mixto" ? "#0ea5e9" : "#10b981";
        const metodoTexto = metodo === "Mixto"
          ? `Ef:S/${(v.montoEfectivo||0).toFixed(2)} / Yp:S/${(v.montoYape||0).toFixed(2)}`
          : metodo;
        return `
          <tr>
            <td style="font-size:13px;">${v.fecha}</td>
            <td>${v.tipoDetalle || v.tipo}</td>
            <td style="font-size:13px;color:#666;">${v.usuario}</td>
            <td style="text-align:right;font-weight:600;color:#2d7a4d;">S/ ${v.monto.toFixed(2)}</td>
            <td style="text-align:center;">
              <span style="background:${metodoColor};color:white;padding:2px 6px;border-radius:4px;font-size:11px;">${metodoTexto}</span>
            </td>
          </tr>`;
      }).join("");
    }
  }

  // Render cierre history
  renderHistorialCierres();

  debugLog("sistema", "📊 Reportes actualizados");
}

function renderHistorialCierres() {
  const container = document.getElementById("historialCierresContainer");
  if (!container) return;

  if (state.cierres.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:#999;padding:20px;">No hay cierres registrados aún</p>';
    return;
  }

  const isAdmin = (state.usuarioActual?.rol || "").toLowerCase() === "admin";

  container.innerHTML = [...state.cierres].reverse().map((c) => `
    <div style="background:#f8f9fa;border-radius:12px;padding:16px;margin-bottom:12px;border-left:4px solid #10b981;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
      <div>
        <strong style="font-size:14px;">${c.fecha}</strong>
        <small style="display:block;color:#666;">${c.usuario} • ${c.cantidadVentas} transacciones</small>
      </div>
      <div style="text-align:center;">
        <div style="font-size:22px;font-weight:800;color:#2d7a4d;">S/ ${(c.total || 0).toFixed(2)}</div>
        <small style="color:#666;">Ef: S/${(c.totalEfectivo || 0).toFixed(2)} | Yp: S/${(c.totalYape || 0).toFixed(2)}</small>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn-small btn-blue" data-action="descargar-cierre" data-id="${c.id}">📥 PDF</button>
        ${isAdmin ? `<button class="btn-small btn-red" data-action="eliminar-cierre" data-id="${c.id}">🗑️</button>` : ""}
      </div>
    </div>
  `).join("");
}

// ======================================================
// ================== MENSUAL ==========================
// ======================================================

const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

function parseDateHelper(ts) {
  let d;
  if (typeof ts === "number") {
    d = new Date(ts);
  } else if (typeof ts === "string") {
    const partes = ts.split(",")[0].trim().split("/");
    if (partes.length === 3) {
      d = new Date(`${partes[2]}-${partes[1].padStart(2,"0")}-${partes[0].padStart(2,"0")}`);
    } else {
      d = new Date(ts);
    }
  } else {
    d = new Date();
  }
  return { anio: d.getFullYear(), mes: d.getMonth() };
}

export function renderMensual() {
  const selectAnio = document.getElementById("filtroAnioMensual");
  if (!selectAnio) return;

  // Populate years
  const anios = new Set();
  state.ventas.forEach((v) => {
    const d = parseDateHelper(v.fecha || v.id);
    if (!isNaN(d.anio)) anios.add(d.anio);
  });
  state.cierres.forEach((c) => {
    const d = parseDateHelper(c.fecha || c.id);
    if (!isNaN(d.anio)) anios.add(d.anio);
  });
  const aniosOrdenados = [...anios].sort((a, b) => b - a);
  if (aniosOrdenados.length === 0) aniosOrdenados.push(new Date().getFullYear());

  const anioActual = parseInt(selectAnio.value) || aniosOrdenados[0];

  if (!selectAnio.value || !aniosOrdenados.includes(parseInt(selectAnio.value))) {
    selectAnio.innerHTML = aniosOrdenados.map((a) => `<option value="${a}">${a}</option>`).join("");
    selectAnio.value = aniosOrdenados[0];
  }

  const anio = parseInt(selectAnio.value) || aniosOrdenados[0];

  // Build table by month
  const tbody = document.getElementById("tablaMensualBody");
  if (!tbody) return;

  let totalAnioVentas = 0, totalAnioGastos = 0, totalAnioMargen = 0, totalAnioUtil = 0;

  const rows = MESES.map((nombreMes, mes) => {
    const ventasMes = state.ventas.filter((v) => {
      const d = parseDateHelper(v.fecha || v.id);
      return d.anio === anio && d.mes === mes;
    });
    const movsMes = state.movimientos.filter((mv) => {
      const d = parseDateHelper(mv.fecha || mv.id);
      return d.anio === anio && d.mes === mes;
    });
    const consumosMes = state.consumosDueno.filter((c) => {
      const d = parseDateHelper(c.fecha || c.id);
      return d.anio === anio && d.mes === mes;
    });

    if (ventasMes.length === 0 && movsMes.length === 0) return null;

    const totalV = ventasMes.reduce((s, v) => s + (v.monto || 0), 0);
    const totalEf = ventasMes.reduce((s, v) => {
      if (v.metodoPago === "Mixto") return s + (v.montoEfectivo || 0);
      if ((v.metodoPago || "Efectivo") === "Efectivo") return s + (v.monto || 0);
      return s;
    }, 0);
    const totalYp = ventasMes.reduce((s, v) => {
      if (v.metodoPago === "Mixto") return s + (v.montoYape || 0);
      if (v.metodoPago === "Yape") return s + (v.monto || 0);
      return s;
    }, 0);
    const totalG = movsMes.filter((m) => ["egreso","retiro","reposicion"].includes(m.tipo)).reduce((s, m) => s + (m.monto || 0), 0);
    const margen = ventasMes.reduce((s, v) => s + (v.ganancia || 0), 0);
    const consumoCosto = consumosMes.reduce((s, c) => s + (c.totalCosto || 0), 0);
    const util = margen - totalG - consumoCosto;

    totalAnioVentas += totalV; totalAnioGastos += totalG; totalAnioMargen += margen; totalAnioUtil += util;

    return `
      <tr>
        <td style="font-weight:600;">${nombreMes}</td>
        <td style="text-align:right;font-weight:700;color:#2d7a4d;">S/ ${totalV.toFixed(2)}</td>
        <td style="text-align:right;">S/ ${totalEf.toFixed(2)}</td>
        <td style="text-align:right;">S/ ${totalYp.toFixed(2)}</td>
        <td style="text-align:right;color:#ef4444;">S/ ${totalG.toFixed(2)}</td>
        <td style="text-align:right;color:#3b82f6;">S/ ${margen.toFixed(2)}</td>
        <td style="text-align:right;font-weight:700;color:${util >= 0 ? "#2d7a4d" : "#ef4444"};">S/ ${util.toFixed(2)}</td>
        <td style="text-align:center;">${ventasMes.length}</td>
        <td style="text-align:center;">
          <button class="btn-small btn-blue" data-action="descargar-mensual" data-mes="${mes}" data-anio="${anio}" style="font-size:11px;">📥 PDF</button>
        </td>
      </tr>
    `;
  }).filter(Boolean);

  if (rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:30px;color:#999;">Sin datos para ${anio}</td></tr>`;
  } else {
    tbody.innerHTML = rows.join("") + `
      <tr style="background:#f0fdf4;font-weight:800;border-top:2px solid #10b981;">
        <td>📊 TOTAL ${anio}</td>
        <td style="text-align:right;color:#2d7a4d;">S/ ${totalAnioVentas.toFixed(2)}</td>
        <td style="text-align:right;">-</td>
        <td style="text-align:right;">-</td>
        <td style="text-align:right;color:#ef4444;">S/ ${totalAnioGastos.toFixed(2)}</td>
        <td style="text-align:right;color:#3b82f6;">S/ ${totalAnioMargen.toFixed(2)}</td>
        <td style="text-align:right;color:${totalAnioUtil >= 0 ? "#2d7a4d" : "#ef4444"};">S/ ${totalAnioUtil.toFixed(2)}</td>
        <td colspan="2"></td>
      </tr>
    `;
  }

  // Simple bar chart
  renderGraficaMensual(anio, rows.length > 0);

  // KPI top cards
  renderResumenAnual(anio, totalAnioVentas, totalAnioGastos, totalAnioMargen, totalAnioUtil);
}

function renderResumenAnual(anio, ventas, gastos, margen, util) {
  const container = document.getElementById("resumenAnualContainer");
  if (!container) return;

  const items = [
    { label: "🛒 Ventas Totales", value: `S/ ${ventas.toFixed(2)}`, color: "#2d7a4d" },
    { label: "📉 Gastos Totales", value: `S/ ${gastos.toFixed(2)}`, color: "#ef4444" },
    { label: "📈 Margen Bruto", value: `S/ ${margen.toFixed(2)}`, color: "#3b82f6" },
    { label: "💰 Utilidad Neta", value: `S/ ${util.toFixed(2)}`, color: util >= 0 ? "#2d7a4d" : "#ef4444" },
  ];

  container.innerHTML = items.map((item) => `
    <div style="background:white;border-radius:12px;padding:18px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,.08);border-top:4px solid ${item.color};">
      <small style="color:#666;font-weight:600;display:block;margin-bottom:8px;">${item.label}</small>
      <div style="font-size:22px;font-weight:800;color:${item.color};">${item.value}</div>
    </div>
  `).join("");
}

function renderGraficaMensual(anio, hayDatos) {
  const container = document.getElementById("graficaMensualContainer");
  if (!container) return;

  const mesesData = MESES.map((nombre, mes) => {
    const ventas = state.ventas.filter((v) => {
      const d = parseDateHelper(v.fecha || v.id);
      return d.anio === anio && d.mes === mes;
    });
    return { nombre: nombre.substring(0, 3), total: ventas.reduce((s, v) => s + (v.monto || 0), 0) };
  });

  const maxVal = Math.max(...mesesData.map((m) => m.total), 1);

  container.innerHTML = `
    <div style="display:flex;gap:8px;align-items:flex-end;height:140px;padding:10px 0;">
      ${mesesData.map((m) => {
        const pct = (m.total / maxVal) * 100;
        return `
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
            <span style="font-size:10px;color:#666;font-weight:600;">${m.total > 0 ? "S/"+Math.round(m.total) : ""}</span>
            <div style="width:100%;background:linear-gradient(180deg,#10b981,#059669);border-radius:6px 6px 0 0;height:${pct}%;min-height:${m.total > 0 ? 4 : 0}px;transition:height .5s ease;"></div>
            <span style="font-size:10px;color:#666;font-weight:600;">${m.nombre}</span>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

// ======================================================
// ================== DASHBOARD ========================
// ======================================================

export function renderDashboard() {
  if (!state.usuarioActual) return;

  const isAdmin = (state.usuarioActual?.rol || "").toLowerCase() === "admin";
  if (!isAdmin) return;

  const balances = cajaService.calcularBalances();
  const dineroCaja = (balances.balLocal || 0) + (balances.balChica || 0);

  const gananciaBruta = state.ventas.reduce((s, v) => s + (v.ganancia || 0), 0);

  const inversionStock = state.productos.reduce((s, p) => s + (p.precioCosto || 0) * p.stock, 0);
  const gananciaPotencial = state.productos.reduce((s, p) => {
    const margen = (p.precio || 0) - (p.precioCosto || 0);
    return s + (margen > 0 ? margen * p.stock : 0);
  }, 0);

  const totalEgresos = state.movimientos
    .filter((m) => ["egreso","retiro","reposicion"].includes(m.tipo))
    .reduce((s, m) => s + m.monto, 0);
  const totalIngresos = state.movimientos
    .filter((m) => m.tipo === "ingreso")
    .reduce((s, m) => s + m.monto, 0);
  const consumoDuenoCosto = state.consumosDueno.reduce((s, c) => s + (c.totalCosto || 0), 0);
  const utilidadNeta = gananciaBruta + totalIngresos - totalEgresos - consumoDuenoCosto;

  const totalVentas = state.ventas.reduce((s, v) => s + (v.monto || 0), 0);
  const margenPromedio = totalVentas > 0 ? (gananciaBruta / totalVentas) * 100 : 0;

  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setEl("dashDineroCaja", `S/ ${dineroCaja.toFixed(2)}`);
  setEl("dashGananciaBruta", `S/ ${gananciaBruta.toFixed(2)}`);
  setEl("dashGananciaPotencial", `S/ ${gananciaPotencial.toFixed(2)}`);
  setEl("dashUtilidadNeta", `S/ ${utilidadNeta.toFixed(2)}`);
  setEl("dashInversionStock", `S/ ${inversionStock.toFixed(2)}`);
  setEl("dashMargenPromedio", `${margenPromedio.toFixed(1)}%`);

  // Alertas de stock bajo
  const alertasContainer = document.getElementById("dashAlertasContainer");
  if (alertasContainer) {
    const productosBajoStock = state.productos.filter((p) => p.stock <= p.stockMin && p.stockMin > 0);
    if (productosBajoStock.length > 0) {
      alertasContainer.innerHTML = `
        <div style="background:#fef3c7;border:2px solid #f59e0b;border-radius:12px;padding:16px;margin-bottom:15px;">
          <strong style="color:#92400e;">⚠️ ${productosBajoStock.length} producto(s) con stock bajo:</strong>
          <div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:8px;">
            ${productosBajoStock.map((p) => `<span style="background:#fff3cd;border:1px solid #fcd34d;padding:3px 10px;border-radius:8px;font-size:13px;color:#92400e;">${p.nombre} (${p.stock})</span>`).join("")}
          </div>
        </div>
      `;
    } else {
      alertasContainer.innerHTML = "";
    }
  }

  // Rentabilidad por categoría
  const dashCategorias = document.getElementById("dashCategoriasContainer");
  if (dashCategorias) {
    const categorias = {};
    state.productos.forEach((p) => {
      if (!categorias[p.categoria]) categorias[p.categoria] = { ganancia: 0, stock: 0, nombre: p.categoria };
      const margen = (p.precio || 0) - (p.precioCosto || 0);
      categorias[p.categoria].ganancia += (p.gananciaAcumulada || 0);
      categorias[p.categoria].stock += p.stock;
    });

    const cats = Object.values(categorias).sort((a, b) => b.ganancia - a.ganancia);
    const maxG = Math.max(...cats.map((c) => c.ganancia), 1);

    dashCategorias.innerHTML = cats.map((cat) => {
      const pct = (cat.ganancia / maxG) * 100;
      return `
        <div style="margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;font-size:13px;">
            <span style="font-weight:600;">${cat.nombre || "Sin cat."}</span>
            <span style="color:#2d7a4d;font-weight:700;">S/ ${cat.ganancia.toFixed(2)}</span>
          </div>
          <div style="background:#e5e7eb;height:10px;border-radius:5px;overflow:hidden;">
            <div style="background:linear-gradient(90deg,#10b981,#059669);height:100%;width:${pct}%;border-radius:5px;transition:width .5s;"></div>
          </div>
        </div>
      `;
    }).join("") || "<p style='color:#999;'>Sin datos</p>";
  }

  // Top productos
  const dashTop = document.getElementById("dashTopProductos");
  if (dashTop) {
    const topProds = [...state.productos]
      .sort((a, b) => (b.gananciaAcumulada || 0) - (a.gananciaAcumulada || 0))
      .slice(0, 5);

    dashTop.innerHTML = topProds.map((p, i) => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background:${i % 2 === 0 ? "#f8f9fa" : "white"};border-radius:8px;margin-bottom:6px;">
        <span style="font-weight:600;font-size:14px;">${["🥇","🥈","🥉","4️⃣","5️⃣"][i]} ${p.nombre}</span>
        <span style="color:#2d7a4d;font-weight:700;">S/ ${(p.gananciaAcumulada || 0).toFixed(2)}</span>
      </div>
    `).join("") || "<p style='color:#999;'>Sin ventas aún</p>";
  }

  debugLog("sistema", "📈 Dashboard actualizado");
}

// ======================================================
// =================== EVENTS ==========================
// ======================================================

export function initReportesEvents() {
  document.addEventListener("click", async (e) => {
    const el = e.target.closest("[data-action]");
    const action = el?.dataset.action;

    switch (action) {
      case "cerrar-dia":
        if (await reportesService.cerrarDia()) {
          renderReportes();
          document.dispatchEvent(new CustomEvent("caja:changed"));
        }
        break;

      case "descargar-cierre": {
        const id = parseInt(el.dataset.id);
        const cierre = state.cierres.find((c) => c.id === id);
        if (cierre) reportesService.descargarReporteCierre(cierre);
        break;
      }

      case "eliminar-cierre": {
        const id = parseInt(el.dataset.id);
        if (await reportesService.eliminarCierre(id)) {
          renderReportes();
        }
        break;
      }

      case "descargar-mensual": {
        const mes = parseInt(el.dataset.mes);
        const anio = parseInt(el.dataset.anio);
        reportesService.descargarReporteMensualPDF(anio, mes);
        break;
      }

      case "actualizar-mensual":
        renderMensual();
        break;
    }
  });

  // "Actualizar" button for mensual tab
  document.getElementById("btnActualizarMensual")?.addEventListener("click", () => renderMensual());

  // Year selector change
  document.getElementById("filtroAnioMensual")?.addEventListener("change", () => renderMensual());

  // Rerender on external events
  document.addEventListener("ventas:changed", () => renderReportes());
  document.addEventListener("dashboard:changed", () => {
    renderDashboard();
    renderReportes();
  });
}
