import { state, guardarDatosGenerico } from "./state";
import { COLLECTIONS, DOC_IDS } from "@/utils/constants";
import { debugLog } from "@/utils/debug";
import { toast } from "@/components/toast";
import { confirmDialog } from "@/components/confirm-dialog";
import { cajaService } from "./caja.service";
import { formatCurrency } from "@/utils/format";

export const reportesService = {
  saveCierres: async (omitSync = false) => {
    return await guardarDatosGenerico(
      COLLECTIONS.CIERRES,
      DOC_IDS.HISTORIAL,
      { lista: state.cierres },
      omitSync
    );
  },

  saveConsumosDueno: async (omitSync = false) => {
    return await guardarDatosGenerico(
      COLLECTIONS.CONSUMOS,
      DOC_IDS.DUENO,
      { lista: state.consumosDueno },
      omitSync
    );
  },

  // Process personal owner consumption order
  registrarConsumoDueno: async (carrito) => {
    if (carrito.length === 0) {
      toast.error("⚠️ El carrito de consumos está vacío");
      return false;
    }

    try {
      const totalVenta = carrito.reduce((sum, c) => sum + c.precio * c.cantidad, 0);
      let totalCosto = 0;

      const nuevoConsumo = {
        id: Date.now(),
        fecha: new Date().toLocaleString("es-PE"),
        tipo: "Consumo Dueño",
        productos: carrito.map((c) => {
          const p = state.productos.find((prod) => prod.id === c.id);
          const costo = p ? p.precioCosto || 0 : 0;
          totalCosto += costo * c.cantidad;
          return {
            nombre: c.nombre,
            precio: c.precio,
            precioCosto: costo,
            cantidad: c.cantidad,
          };
        }),
        totalVenta: totalVenta,
        total: totalVenta,
        totalCosto: totalCosto,
      };

      // Subtract stock via products service
      for (const c of carrito) {
        const prod = state.productos.find((p) => p.id === c.id);
        if (prod) {
          prod.stock -= c.cantidad;
          // Calculate owner consumption logs
          prod.unidadesConsumidasDueno = (prod.unidadesConsumidasDueno || 0) + c.cantidad;
          
          if (prod.stock === 0) {
            await reportesService.saveConsumosDueno(); // save before alert
            setTimeout(() => {
              const confirmStock = confirm(`⚠️ El producto ${prod.nombre} se ha agotado. ¿Deseas reponerlo ahora?`);
              if (confirmStock) {
                const event = new CustomEvent("triggerAdjustStock", { detail: { id: prod.id } });
                window.dispatchEvent(event);
              }
            }, 100);
          }
        }
      }

      state.consumosDueno.push(nuevoConsumo);
      
      // Save all products and consumos
      await guardarDatosGenerico(COLLECTIONS.PRODUCTOS, DOC_IDS.TODOS, { lista: state.productos });
      await reportesService.saveConsumosDueno();

      toast.success("✅ Consumo del dueño registrado.");
      return true;
    } catch (err) {
      debugLog("error", "Error saving owner consumption:", err);
      toast.error("❌ Error al guardar el consumo");
      return false;
    }
  },

  // Delete owner consumption and restore stock
  eliminarConsumoDueno: async (id) => {
    const confirmDel = await confirmDialog.show(
      "🗑️ Eliminar Registro de Consumo",
      "¿Estás seguro de eliminar este registro de consumo del dueño?\n\n📦 Las unidades se devolverán al inventario.",
      { confirmText: "Eliminar", cancelText: "Cancelar", isDestructive: true }
    );

    if (!confirmDel) return false;

    const consumo = state.consumosDueno.find((c) => c.id === id);
    if (!consumo) return false;

    // Restore stock
    consumo.productos.forEach((p) => {
      const prod = state.productos.find((prod) => prod.nombre === p.nombre);
      if (prod) {
        prod.stock += p.cantidad;
        prod.unidadesConsumidasDueno = Math.max(0, (prod.unidadesConsumidasDueno || 0) - p.cantidad);
      }
    });

    state.consumosDueno = state.consumosDueno.filter((c) => c.id !== id);

    await guardarDatosGenerico(COLLECTIONS.PRODUCTOS, DOC_IDS.TODOS, { lista: state.productos });
    await reportesService.saveConsumosDueno(true);

    toast.success("✅ Registro eliminado y stock devuelto");
    return true;
  },

  // Closing current Shift/Day
  cerrarDia: async () => {
    const ventasActuales = state.ultimoCierre
      ? state.ventas.filter((v) => v.id > state.ultimoCierre)
      : state.ventas;

    if (ventasActuales.length === 0) {
      toast.warning("⚠️ No hay ventas nuevas para cerrar");
      return false;
    }

    // Single pass over ventasActuales
    let totalCierre = 0, totalEfectivoPeriodo = 0, totalYapePeriodo = 0;
    let gananciaVentasPeriodo = 0, totalHorasBillar = 0, ventasMesas = 0, ventasProductos = 0;
    const ventasSnapshot = [];
    for (const v of ventasActuales) {
      const monto = v.monto || 0;
      totalCierre += monto;
      if (v.metodoPago === "Mixto") {
        totalEfectivoPeriodo += v.montoEfectivo || 0;
        totalYapePeriodo += v.montoYape || 0;
      } else if ((v.metodoPago || "Efectivo") === "Efectivo") {
        totalEfectivoPeriodo += monto;
      } else if (v.metodoPago === "Yape") {
        totalYapePeriodo += monto;
      }
      gananciaVentasPeriodo += v.ganancia || 0;
      if (v.tipo === "Mesa Billar") {
        ventasMesas += monto;
        if (v.detalle) totalHorasBillar += v.detalle.tiempoMinutos || 0;
      } else {
        ventasProductos += monto;
      }
      ventasSnapshot.push({ ...v });
    }
    totalHorasBillar /= 60;

    const confirmCierre = await confirmDialog.show(
      "📊 Confirmar Cierre de Turno",
      `RESUMEN DE CIERRE DE CAJA\n━━━━━━━━━━━━━━━━━━━━\n🛒 Ventas Totales: S/ ${totalCierre.toFixed(2)}\n   💵 Efectivo : S/ ${totalEfectivoPeriodo.toFixed(2)}\n   📱 Yape/Plin: S/ ${totalYapePeriodo.toFixed(2)}\n\n¿Estás seguro de registrar el cierre? Se archivarán estas ventas y se descargará el reporte en PDF.`,
      { confirmText: "Confirmar Cierre", cancelText: "Volver", isDestructive: false }
    );

    if (!confirmCierre) return false;

    const consumosDuenoActuales = state.ultimoCierre
      ? state.consumosDueno.filter((c) => c.id > state.ultimoCierre)
      : state.consumosDueno;

    // Single pass over consumosDuenoActuales
    let totalConsumosDuenoVenta = 0, totalConsumosDuenoCosto = 0;
    const consumosSnapshot = [];
    for (const c of consumosDuenoActuales) {
      totalConsumosDuenoVenta += c.totalVenta || c.total || 0;
      totalConsumosDuenoCosto += c.totalCosto || 0;
      consumosSnapshot.push({ ...c });
    }

    const movimientosActuales = state.ultimoCierre
      ? state.movimientos.filter((m) => m.id > state.ultimoCierre)
      : state.movimientos;

    // Single pass over movimientosActuales
    let totalIngresosExtra = 0, totalEgresos = 0;
    for (const m of movimientosActuales) {
      const monto = m.monto || 0;
      if (m.tipo === "ingreso") totalIngresosExtra += monto;
      else if (["egreso", "retiro", "reposicion"].includes(m.tipo)) totalEgresos += monto;
    }

    // NET PROFIT = Gross Profit (Sales) + Extra incomes - Expenses - Cost of Owner Consumos
    const utilidadNetaPeriodo = gananciaVentasPeriodo + totalIngresosExtra - totalEgresos - totalConsumosDuenoCosto;

    // Split Caja calculations for period
    const balancesActuales = cajaService.calcularBalances();

    const nuevoCierre = {
      id: Date.now(),
      timestamp: Date.now(),
      fecha: new Date().toLocaleString("es-PE"),
      usuario: state.usuarioActual.nombre,
      cantidadVentas: ventasActuales.length,
      total: totalCierre,
      totalEfectivo: totalEfectivoPeriodo,
      totalYape: totalYapePeriodo,
      balanceLocal: balancesActuales.balLocal,
      balanceChica: balancesActuales.balChica,
      gananciaVentas: gananciaVentasPeriodo,
      totalEgresos: totalEgresos,
      totalIngresosExtra: totalIngresosExtra,
      utilidadNeta: utilidadNetaPeriodo,
      ventas: ventasSnapshot,
      ventasMesas: ventasMesas,
      ventasProductos: ventasProductos,
      consumosDueno: consumosSnapshot,
      totalConsumosDuenoVenta: totalConsumosDuenoVenta,
      totalConsumosDuenoCosto: totalConsumosDuenoCosto,
      horasBillar: totalHorasBillar,
    };

    state.cierres.push(nuevoCierre);
    state.ultimoCierre = nuevoCierre.timestamp;

    await reportesService.saveCierres();
    toast.success("✅ Cierre registrado y archivado");
    
    // Auto-trigger printable PDF
    reportesService.descargarReporteCierre(nuevoCierre);
    return true;
  },

  // Undo (delete) a closure
  eliminarCierre: async (id) => {
    if ((state.usuarioActual.rol || "").toLowerCase() !== "admin") {
      toast.error("⚠️ Solo el administrador puede eliminar cierres.");
      return false;
    }

    const confirmDel = await confirmDialog.show(
      "🗑️ Deshacer Cierre de Turno",
      "¿Estás seguro de deshacer este cierre?\n\nLas ventas y consumos vuelven a estar activos en el periodo actual. El cierre se borrará permanentemente.",
      { confirmText: "Deshacer Cierre", cancelText: "Volver", isDestructive: true }
    );

    if (!confirmDel) return false;

    state.cierres = state.cierres.filter((c) => c.id !== id);
    
    if (state.cierres.length > 0) {
      state.ultimoCierre = state.cierres[state.cierres.length - 1].timestamp;
    } else {
      state.ultimoCierre = null;
    }

    await reportesService.saveCierres(true);
    toast.success("✅ Cierre eliminado. Ventas reactivadas.");
    return true;
  },

  // Generate closure PDF in new window
  descargarReporteCierre: (cierre) => {
    const w = window.open("", "_blank", "width=850,height=600");
    if (!w) {
      toast.error("⚠️ El navegador bloqueó la ventana emergente. Por favor habilítalas.");
      return;
    }

    w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">
    <title>Cierre - ${cierre.fecha}</title>
    <style>
      *{margin:0;padding:0;box-sizing:border-box}
      body{font-family:'Segoe UI',Arial,sans-serif;padding:30px;background:#f5f5f5;color:#333;font-size:13px}
      .container{max-width:850px;margin:0 auto;background:white;padding:30px;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.1)}
      h1{color:#2d7a4d;margin-bottom:20px;text-align:center;font-size:26px;border-bottom:3px solid #2d7a4d;padding-bottom:15px}
      .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:25px;padding:15px;background:#f8f9fa;border-radius:6px}
      .info-item{display:flex;flex-direction:column}
      .info-label{font-size:11px;color:#666;margin-bottom:4px}
      .info-value{font-size:15px;font-weight:600}
      .summary-box{background:linear-gradient(135deg,#2d7a4d,#1e5a35);color:white;padding:20px;border-radius:8px;margin-bottom:25px}
      .summary-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:15px}
      .summary-item{text-align:center}
      .summary-label{font-size:12px;opacity:.9;margin-bottom:5px}
      .summary-value{font-size:22px;font-weight:bold}
      .section{margin-bottom:25px}
      .section-title{font-size:16px;color:#2d7a4d;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid #dee2e6;font-weight:700}
      table{width:100%;border-collapse:collapse;font-size:12px}
      th{background:#f8f9fa;padding:10px;text-align:left;color:#495057;border-bottom:2px solid #dee2e6}
      td{padding:10px;border-bottom:1px solid #f0f0f0}
      .monto{color:#2d7a4d;font-weight:600;text-align:right}
      .right{text-align:right} .center{text-align:center}
      .consumo-dueno{background:#fff3cd;padding:15px;border-radius:6px;border-left:4px solid #ff9800}
      .consumo-item{padding:5px 0;border-bottom:1px solid #f0e5c9}
      .consumo-item:last-child{border-bottom:none}
      @media print{.no-print{display:none}body{background:white;padding:0}.container{box-shadow:none}}
    </style></head><body>
    <div class="no-print" style="margin-bottom:20px"><button onclick="window.print()" style="background:#2d7a4d;color:white;border:none;padding:10px 25px;border-radius:5px;cursor:pointer;font-weight:bold;">🖨️ Imprimir Cierre</button></div>
    <div class="container">
      <h1>📊 REPORTE DE CIERRE DE CAJA</h1>
      <div class="info-grid">
        <div class="info-item"><span class="info-label">Fecha del Reporte</span><span class="info-value">${cierre.fecha}</span></div>
        <div class="info-item"><span class="info-label">Responsable</span><span class="info-value">${cierre.usuario}</span></div>
      </div>
      <div class="summary-box">
        <div class="summary-grid">
          <div class="summary-item"><div class="summary-label">Total Recaudado</div><div class="summary-value">S/ ${cierre.total.toFixed(2)}</div></div>
          <div class="summary-item"><div class="summary-label">Operaciones</div><div class="summary-value">${cierre.cantidadVentas}</div></div>
          <div class="summary-item"><div class="summary-label">💵 Efectivo (Caja)</div><div class="summary-value">S/ ${cierre.totalEfectivo.toFixed(2)}</div></div>
          <div class="summary-item"><div class="summary-label">📱 Yape/Plin</div><div class="summary-value">S/ ${cierre.totalYape.toFixed(2)}</div></div>
          <div class="summary-item" style="grid-column: 1 / -1; margin-top: 10px; border-top: 1px dashed rgba(255,255,255,0.3); padding-top: 10px;">
            <div class="summary-label">🎱 Tiempo de Alquiler de Billar</div><div class="summary-value">${cierre.horasBillar.toFixed(1)} hrs</div>
          </div>
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">🏠 Resumen Estimado Cajas Físicas</div>
        <table style="max-width:500px">
          <tr><td>Caja Local (Físico Estimado):</td><td style="font-weight:600;text-align:right">S/ ${cierre.balanceLocal.toFixed(2)}</td></tr>
          <tr><td>Caja Chica:</td><td style="font-weight:600;text-align:right">S/ ${cierre.balanceChica.toFixed(2)}</td></tr>
        </table>
      </div>

      <div class="section">
        <div class="section-title">📋 Detalle de Ventas del Período</div>
        <table>
          <thead><tr><th>Fecha</th><th>Tipo</th><th>Descripción</th><th>Pago</th><th class="right">Monto</th></tr></thead>
          <tbody>
            ${cierre.ventas.map((v) => {
              let desc = "";
              if (v.detalle) {
                if (v.tipo === "Mesa Billar") {
                  desc = `${v.tipoDetalle} | ${v.detalle.horaInicio}-${v.detalle.horaFin} (${v.detalle.tiempoMinutos}min)`;
                  if (v.detalle.consumos.length > 0) desc += " + Consumos";
                } else if (v.tipo === "Cobro Parcial") {
                  desc = v.detalle.consumos.map((c) => `${c.producto} x${c.cantidad}`).join(", ");
                } else if (v.detalle.consumos) {
                  desc = v.detalle.consumos.map((c) => `${c.producto} x${c.cantidad}`).join(", ");
                }
              } else {
                desc = v.tipoDetalle || v.tipo;
              }
              return `<tr>
                <td>${v.fecha.split(",")[1]?.trim() || v.fecha}</td>
                <td>${v.tipo}</td>
                <td>${desc}</td>
                <td class="center">${v.metodoPago || "Efectivo"}</td>
                <td class="monto">S/ ${v.monto.toFixed(2)}</td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>

      ${cierre.consumosDueno && cierre.consumosDueno.length > 0 ? `
      <div class="section">
        <div class="section-title">🍽️ Consumo del Dueño (Descontado de Utilidades)</div>
        <div class="consumo-dueno">
          ${cierre.consumosDueno.map((c) => `
            <div class="consumo-item">
              <span style="font-weight:600">${c.fecha.split(",")[1]?.trim() || c.fecha}</span>: 
              ${c.productos.map((p) => `${p.nombre} x${p.cantidad}`).join(", ")}
              <strong style="float:right;color:#d97706">S/ ${c.totalCosto.toFixed(2)} (Costo)</strong>
            </div>
          `).join("")}
          <div style="margin-top:10px;text-align:right;font-weight:bold;color:#b45309">Valor Costo Total Lote: S/ ${cierre.totalConsumosDuenoCosto.toFixed(2)}</div>
        </div>
      </div>` : ""}

      <footer style="margin-top:40px;text-align:center;color:#aaa;font-size:11px;border-top:1px solid #eee;padding-top:15px">
        Sistema de Gestión de Billar • Reporte Cierre de Caja
      </footer>
    </div>
    <script>window.onload=function(){setTimeout(()=>window.print(),600)}<\/script>
    </body></html>`);
    w.document.close();
  },

  // Generate Owner Consumption PDF in new window
  descargarConsumoDuenoPDF: () => {
    const consumosActuales = state.ultimoCierre
      ? state.consumosDueno.filter((c) => c.id > state.ultimoCierre)
      : state.consumosDueno;

    if (consumosActuales.length === 0) {
      toast.warning("⚠️ No hay consumos para descargar");
      return;
    }

    const totalGeneral = consumosActuales.reduce((sum, c) => sum + (c.total || c.totalVenta || 0), 0);

    const w = window.open("", "_blank", "width=850,height=600");
    if (!w) {
      toast.error("⚠️ El navegador bloqueó la ventana emergente. Por favor habilítalas.");
      return;
    }

    w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">
    <title>Consumo del Dueño</title>
    <style>
      *{margin:0;padding:0;box-sizing:border-box}
      body{font-family:'Segoe UI',Arial,sans-serif;padding:30px;color:#333;font-size:13px}
      .header{text-align:center;border-bottom:3px solid #ff9800;padding-bottom:20px;margin-bottom:25px}
      h1{color:#ff9800;font-size:26px;margin-bottom:10px}
      .total-box{background:#fff3cd;padding:20px;border-radius:8px;margin-bottom:30px;border-left:4px solid #ff9800}
      .consumo-item{background:#f9f9f9;padding:15px;border-radius:6px;margin-bottom:12px;border-left:4px solid #ff9800;page-break-inside:avoid}
      .consumo-header{display:flex;justify-content:space-between;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #e0e0e0}
      .footer{margin-top:40px;text-align:center;color:#999;font-size:11px;border-top:1px solid #e0e0e0;padding-top:15px}
      @media print{.no-print{display:none}body{padding:15px}}
    </style></head><body>
    <div class="no-print"><button onclick="window.print()" style="background:#ff9800;color:white;border:none;padding:10px 25px;border-radius:5px;cursor:pointer;font-weight:bold;margin-bottom:20px">🖨️ Imprimir / Guardar como PDF</button></div>
    <div class="header">
      <h1>🍽️ REPORTE DE CONSUMO DEL DUEÑO</h1>
      <p style="color:#666">Generado: ${new Date().toLocaleString("es-PE")}</p>
      <p style="color:#856404;margin-top:10px;font-size:13px">⚠️ Estos consumos NO fueron cobrados pero se restaron de la utilidad final por costo de stock.</p>
    </div>
    <div class="total-box">
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div><strong>Total Consumo del Período</strong><div style="font-size:11px;color:#856404">${consumosActuales.length} registros</div></div>
        <div style="font-size:30px;font-weight:bold;color:#ff9800">S/ ${totalGeneral.toFixed(2)}</div>
      </div>
    </div>
    
    ${consumosActuales.reverse().map((c) => `
      <div class="consumo-item">
        <div class="consumo-header">
          <div style="font-weight:bold">${c.fecha}</div>
          <div style="font-size:18px;font-weight:bold;color:#ff9800">S/ ${(c.total || c.totalVenta || 0).toFixed(2)}</div>
        </div>
        <div style="background:#fff3cd;padding:10px;border-radius:4px">
          ${c.productos.map((p) => `
            <div style="display:flex;justify-content:space-between;padding:3px 0;color:#856404;font-size:12px">
              <span>• ${p.nombre} x${p.cantidad} (S/ ${(p.precio || 0).toFixed(2)} c/u)</span>
              <strong>S/ ${((p.precio || 0) * p.cantidad).toFixed(2)}</strong>
            </div>
          `).join("")}
        </div>
      </div>
    `).join("")}
    
    <div class="footer"><p>Sistema de Gestión de Billar • Consumos Dueño</p></div>
    </body></html>`);
    w.document.close();
  },

  // Monthly / Annual printable report (as extracted from lines 6720-6960)
  descargarReporteMensualPDF: (anio, mes) => {
    const NOMBRES_MESES = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const nombreMes = NOMBRES_MESES[mes];

    const parseDateHelper = (ts) => {
      let d;
      if (typeof ts === "number") {
        d = new Date(ts);
      } else if (typeof ts === "string") {
        const partes = ts.split(",")[0].trim().split("/");
        if (partes.length === 3) {
          d = new Date(`${partes[2]}-${partes[1].padStart(2, "0")}-${partes[0].padStart(2, "0")}`);
        } else {
          d = new Date(ts);
        }
      } else {
        d = new Date();
      }
      return { anio: d.getFullYear(), mes: d.getMonth() };
    };

    // 1. Filter sales, movements, owner consumptions for target month
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

    // 2. Calculation math
    const totalVentas = ventasMes.reduce((s, v) => s + (v.monto || 0), 0);
    const totalEfectivo = ventasMes.reduce((s, v) => {
      if (v.metodoPago === "Mixto") return s + (v.montoEfectivo || 0);
      if ((v.metodoPago || "Efectivo") === "Efectivo") return s + (v.monto || 0);
      return s;
    }, 0);
    const totalYape = ventasMes.reduce((s, v) => {
      if (v.metodoPago === "Mixto") return s + (v.montoYape || 0);
      if (v.metodoPago === "Yape") return s + (v.monto || 0);
      return s;
    }, 0);

    const totalGastos = movsMes
      .filter((m) => ["egreso", "retiro", "reposicion"].includes(m.tipo))
      .reduce((s, m) => s + (m.monto || 0), 0);
    const totalIngresos = movsMes
      .filter((m) => m.tipo === "ingreso")
      .reduce((s, m) => s + (m.monto || 0), 0);

    const totalMargen = ventasMes.reduce((s, v) => s + (v.ganancia || 0), 0);
    const totalConsumoDueno = consumosMes.reduce((s, c) => s + (c.totalCosto || 0), 0);
    const utilidadNeta = totalMargen + totalIngresos - totalGastos - totalConsumoDueno;

    const totalMinutosMes = ventasMes
      .filter((v) => v.tipo === "Mesa Billar")
      .reduce((s, v) => s + (v.detalle?.tiempoMinutos || 0), 0);
    const hMes = Math.floor(totalMinutosMes / 60);
    const mMes = totalMinutosMes % 60;

    // 3. Products sold list
    const productosVendidos = {};
    ventasMes.forEach((v) => {
      if (v.detalle && v.detalle.consumos) {
        v.detalle.consumos.forEach((c) => {
          const n = c.producto || "Desconocido";
          if (!productosVendidos[n]) productosVendidos[n] = { cant: 0, total: 0 };
          productosVendidos[n].cant += c.cantidad || 0;
          productosVendidos[n].total += c.subtotal || 0;
        });
      }
    });
    
    const listaProductos = Object.entries(productosVendidos).sort((a, b) => b[1].cant - a[1].cant);
    let htmlProductos = "";
    if (listaProductos.length > 0) {
      htmlProductos = `
        <div class="section">
          <div class="section-title">📦 PRODUCTOS VENDIDOS (UNIDADES Y MONTO)</div>
          <table>
            <thead><tr><th>Producto</th><th class="center">Unidades</th><th class="right">Subtotal</th></tr></thead>
            <tbody>
              ${listaProductos.map(([nombre, d]) => `
                <tr><td style="font-weight:600">${nombre}</td><td class="center" style="font-size:14px;font-weight:800;color:#1e40af">${d.cant}</td><td class="right green">S/ ${d.total.toFixed(2)}</td></tr>
              `).join("")}
            </tbody>
            <tfoot><tr style="background:#f8fafc;font-weight:800;"><td style="padding:10px;">TOTAL</td><td class="center">${listaProductos.reduce((s, p) => s + p[1].cant, 0)}</td><td class="right">S/ ${listaProductos.reduce((s, p) => s + p[1].total, 0).toFixed(2)}</td></tr></tfoot>
          </table>
        </div>`;
    }

    // 4. Escribir PDF final
    const w = window.open("", "_blank", "width=850,height=700");
    if (!w) {
      toast.error("⚠️ El navegador bloqueó la ventana emergente.");
      return;
    }

    w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8">
    <title>Reporte - ${nombreMes} ${anio}</title>
    <style>
      *{margin:0;padding:0;box-sizing:border-box}
      body{font-family:'Segoe UI',Arial,sans-serif;padding:30px;background:white;color:#333;font-size:13px}
      .header{text-align:center;border-bottom:4px solid #2d7a4d;padding-bottom:20px;margin-bottom:25px}
      h1{color:#2d7a4d;font-size:26px;margin-bottom:6px}
      .subtitle{color:#666;font-size:14px}
      .kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:15px;margin-bottom:25px}
      .kpi{padding:18px;border-radius:8px;text-align:center;color:white}
      .kpi-label{font-size:11px;font-weight:600;margin-bottom:6px;opacity:.8}
      .kpi-val{font-size:20px;font-weight:800}
      .section{margin-bottom:25px}
      .section-title{font-size:16px;font-weight:700;color:#2d7a4d;border-bottom:2px solid #e5e7eb;padding-bottom:8px;margin-bottom:12px}
      table{width:100%;border-collapse:collapse;font-size:12px}
      th{background:#f0fdf4;padding:9px;text-align:left;color:#1e5a35;border-bottom:2px solid #2d7a4d}
      td{padding:9px;border-bottom:1px solid #f0f0f0}
      .right{text-align:right} .center{text-align:center} .green{color:#16a34a;font-weight:700} .red{color:#dc2626;font-weight:700}
      .badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600}
      .badge-green{background:#dcfce7;color:#15803d} .badge-purple{background:#f3e8ff;color:#7e22ce}
      .badge-info{background:#e0f2fe;color:#0369a1}
      .utilidad-box{background:#eff6ff;border:2px solid #2563eb;border-radius:10px;padding:20px;display:flex;justify-content:space-between;align-items:center;margin-bottom:25px}
      @media print{.no-print{display:none}body{padding:10px}}
    </style></head><body>
    <div class="no-print"><button onclick="window.print()" style="background:#2d7a4d;color:white;border:none;padding:10px 25px;border-radius:6px;cursor:pointer;margin-bottom:20px;font-weight:bold;">🖨️ Imprimir Reporte Mensual</button></div>
    <div class="header"><h1>📅 REPORTE MENSUAL</h1><div class="subtitle">${nombreMes} ${anio}</div></div>

    <div class="kpi-grid">
      <div class="kpi" style="background:linear-gradient(135deg,#2d7a4d,#4ade80)"><div class="kpi-label">Ventas</div><div class="kpi-val">S/ ${totalVentas.toFixed(2)}</div></div>
      <div class="kpi" style="background:linear-gradient(135deg,#991b1b,#ef4444)"><div class="kpi-label">Gastos</div><div class="kpi-val">S/ ${totalGastos.toFixed(2)}</div></div>
      <div class="kpi" style="background:linear-gradient(135deg,#1e40af,#3b82f6)"><div class="kpi-label">Margen</div><div class="kpi-val">S/ ${totalMargen.toFixed(2)}</div></div>
      <div class="kpi" style="background:linear-gradient(135deg,#64748b,#94a3b8)"><div class="kpi-label">🎱 Billar</div><div class="kpi-val">${hMes}h ${mMes}min</div></div>
    </div>

    <div class="utilidad-box">
      <div><div style="font-weight:700;color:#1e40af">🚀 UTILIDAD NETA DEL MES</div></div>
      <div style="font-size:26px;font-weight:900;color:${utilidadNeta >= 0 ? "#1e40af" : "#dc2626"}">S/ ${utilidadNeta.toFixed(2)}</div>
    </div>

    ${htmlProductos}

    <div class="section">
      <div class="section-title">🧾 Detalle de Ventas del Mes</div>
      <table><thead><tr><th>Fecha</th><th>Tipo</th><th>Usuario</th><th class="center">Pago</th><th class="right">Monto</th></tr></thead>
      <tbody>
        ${ventasMes.map((v) => {
          const metodoTXT = v.metodoPago === "Mixto" 
            ? `Ef: S/${(v.montoEfectivo || 0).toFixed(2)} / Yp: S/${(v.montoYape || 0).toFixed(2)}`
            : v.metodoPago || "Efectivo";
          const classColor = v.metodoPago === "Yape" ? "badge-purple" : v.metodoPago === "Mixto" ? "badge-info" : "badge-green";
          return `<tr>
            <td>${v.fecha}</td>
            <td>${v.tipo} (${v.tipoDetalle || ""})</td>
            <td>${v.usuario}</td>
            <td class="center"><span class="badge ${classColor}">${metodoTXT}</span></td>
            <td class="monto">S/ ${v.monto.toFixed(2)}</td>
          </tr>`;
        }).join("")}
      </tbody></table>
    </div>

    ${consumosMes.length > 0 ? `
    <div class="section">
      <div class="section-title">🍽️ Consumos del Dueño</div>
      <table>
        <thead><tr><th>Fecha</th><th>Productos</th><th class="right">Costo</th></tr></thead>
        <tbody>
          ${consumosMes.map((c) => `<tr>
            <td>${c.fecha}</td>
            <td>${c.productos.map((p) => `${p.nombre} x${p.cantidad}`).join(", ")}</td>
            <td class="right red">S/ ${c.totalCosto.toFixed(2)}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>` : ""}

    <footer style="margin-top:30px;text-align:center;color:#aaa;font-size:11px;border-top:1px solid #eee;padding-top:15px">
      Sistema de Gestión de Billar
    </footer>
    <script>window.onload=function(){setTimeout(()=>window.print(),600)}<\/script>
    </body></html>`);
    w.document.close();
  }
};
