import { state, guardarDatosGenerico } from "./state";
import { COLLECTIONS, DOC_IDS } from "@/utils/constants";
import { debugLog } from "@/utils/debug";
import { toast } from "@/components/toast";
import { confirmDialog } from "@/components/confirm-dialog";
import { productosService } from "./productos.service";

export const ventasService = {
  saveVentas: async (omitSync = false) => {
    return await guardarDatosGenerico(
      COLLECTIONS.VENTAS,
      DOC_IDS.TODAS,
      { lista: state.ventas },
      omitSync
    );
  },

  // Save manual sale entry
  agregarVentaManual: async (descripcion, monto, metodoPago) => {
    const valMonto = parseFloat(monto);
    if (!descripcion || isNaN(valMonto) || valMonto <= 0) {
      toast.error("⚠️ Por favor completa todos los campos correctamente");
      return false;
    }

    try {
      const venta = {
        id: Date.now(),
        tipo: "Venta Manual",
        tipoDetalle: descripcion,
        monto: valMonto,
        ganancia: valMonto, // manual sales are considered 100% utility in this system
        metodoPago: metodoPago,
        montoEfectivo: metodoPago === "Efectivo" ? valMonto : 0,
        montoYape: metodoPago === "Yape" ? valMonto : 0,
        fecha: new Date().toLocaleString("es-PE"),
        usuario: state.usuarioActual.nombre,
      };

      state.ventas.push(venta);
      await ventasService.saveVentas();
      
      toast.success(`✅ Venta manual registrada (S/ ${valMonto.toFixed(2)})`);
      debugLog("venta", "Manual sale added", venta);
      return true;
    } catch (err) {
      debugLog("error", "Error adding manual sale:", err);
      toast.error("❌ Error al guardar la venta manual");
      return false;
    }
  },

  // Sell products directly from quick inventory modal
  venderProductoDirecto: async (productoId, cantidad) => {
    const qty = parseInt(cantidad);
    const producto = state.productos.find((p) => p.id === productoId);
    
    if (!producto || qty <= 0 || qty > producto.stock) {
      toast.error("⚠️ Cantidad inválida o stock insuficiente");
      return false;
    }

    const metodoPago = document.getElementById("metodoPagoDirecto").value;
    const subtotal = producto.precio * qty;

    try {
      // Deduct stock, increase units sold and calculate profit margin
      const ganancia = await productosService.procesarConsumoProducto(productoId, qty, false);

      const venta = {
        id: Date.now(),
        tipo: "Venta Directa",
        tipoDetalle: `${producto.nombre} x${qty}`,
        monto: subtotal,
        ganancia: ganancia,
        metodoPago: metodoPago,
        montoEfectivo: metodoPago === "Efectivo" ? subtotal : 0,
        montoYape: metodoPago === "Yape" ? subtotal : 0,
        fecha: new Date().toLocaleString("es-PE"),
        usuario: state.usuarioActual.nombre,
        detalle: {
          consumos: [
            {
              producto: producto.nombre,
              cantidad: qty,
              precioUnitario: producto.precio,
              subtotal: subtotal
            }
          ]
        }
      };

      state.ventas.push(venta);
      await ventasService.saveVentas();

      toast.success(`🛒 Venta realizada: ${producto.nombre} x${qty} (S/ ${subtotal.toFixed(2)})`);
      return true;
    } catch (err) {
      debugLog("error", "Error in fast product sale:", err);
      toast.error("❌ Error al procesar la venta");
      return false;
    }
  },

  // Process partial payment for items left on a table
  procesarCobroParcial: async (itemsACobrar, totalCobrar, mesa, paymentInfo, tipo = null) => {
    // Generate description of selected items
    const descripcionItems = itemsACobrar
      .map((item) => {
        const prod = mesa.consumos.find((c) => c.id === item.id);
        const nombre = prod ? prod.nombre : "Producto";
        return `${item.cantidad} ${nombre}`;
      })
      .join(", ");

    // Calculate profit margin for partial pay
    let gananciaParcial = 0;
    itemsACobrar.forEach((item) => {
      const prod = state.productos.find((p) => p.id === item.id);
      const costo = prod ? prod.precioCosto || 0 : 0;
      gananciaParcial += (item.precio - costo) * item.cantidad;
    });

    // Use explicit tipo param if provided, otherwise fall back to state.tabActual
    const esBillar = tipo ? tipo === "billar" : state.tabActual === "mesas";
    const tipoMesaLabel = esBillar ? "Mesa Billar" : "Mesa Consumo";

    const venta = {
      id: Date.now(),
      tipo: "Cobro Parcial",
      tipoDetalle: `Parcial (${descripcionItems}) - ${tipoMesaLabel} ${mesa.id}`,
      monto: totalCobrar,
      ganancia: gananciaParcial,
      metodoPago: paymentInfo.metodoPago,
      montoEfectivo: paymentInfo.montoEfectivo,
      montoYape: paymentInfo.montoYape,
      fecha: new Date().toLocaleString("es-PE"),
      usuario: state.usuarioActual.nombre,
      detalle: {
        mesaId: mesa.id,
        tipoMesa: esBillar ? "billar" : "consumo",
        consumos: itemsACobrar.map((item) => {
          const prod = mesa.consumos.find((c) => c.id === item.id);
          return {
            producto: prod ? prod.nombre : "Producto",
            cantidad: item.cantidad,
            precioUnitario: item.precio,
            subtotal: item.cantidad * item.precio,
          };
        }),
      },
    };

    state.ventas.push(venta);
    try {
      await ventasService.saveVentas();
    } catch (err) {
      state.ventas.pop();
      toast.error("⚠️ Error al guardar la venta");
      return false;
    }

    // 2. Subtract from active table quantities
    itemsACobrar.forEach((item) => {
      const consumoEnMesa = mesa.consumos.find((c) => c.id === item.id);
      if (consumoEnMesa) {
        consumoEnMesa.cantidad -= item.cantidad;
      }
    });

    // Strip out 0-quantity consumptions
    mesa.consumos = mesa.consumos.filter((c) => c.cantidad > 0);

    if (!esBillar || mesa.total !== undefined) {
      mesa.total = mesa.consumos.reduce((sum, c) => sum + c.precio * c.cantidad, 0);
    }

    toast.success(`✅ Cobro parcial de S/ ${totalCobrar.toFixed(2)} registrado con éxito`);
    return true;
  },

  // Delete sales by date range (Admin only)
  eliminarVentasPorRango: async (fechaInicioStr, fechaFinStr) => {
    if ((state.usuarioActual.rol || "").toLowerCase() !== "admin") {
      toast.error("⚠️ Acceso denegado. Se requiere cuenta de Administrador.");
      return false;
    }

    if (!fechaInicioStr || !fechaFinStr) {
      toast.error("⚠️ Por favor selecciona un rango de fechas válido");
      return false;
    }

    // Convert inputs to date timestamps (start of day vs end of day)
    const inicio = new Date(fechaInicioStr);
    inicio.setHours(0, 0, 0, 0);
    const fin = new Date(fechaFinStr);
    fin.setHours(23, 59, 59, 999);

    if (inicio > fin) {
      toast.error("⚠️ La fecha de inicio no puede ser posterior a la fecha de fin");
      return false;
    }

    // Filter sales inside bounds
    const totalAntes = state.ventas.length;
    
    // We parse local Peru date "DD/MM/YYYY, HH:MM:SS" or ID timestamp
    const parsesDate = (v) => {
      if (v.id) return new Date(v.id);
      return new Date();
    };

    const confirmDel = await confirmDialog.show(
      "🚨 Confirmar Borrado Masivo",
      `Estás a punto de borrar ventas en el rango:\nDesde: ${inicio.toLocaleDateString()}\nHasta: ${fin.toLocaleDateString()}\n\n⚠️ ¡Esta acción no se puede deshacer! ¿Continuar?`,
      { confirmText: "Borrar Definitivamente", cancelText: "Cancelar", isDestructive: true }
    );

    if (!confirmDel) return false;

    state.ventas = state.ventas.filter((v) => {
      const f = parsesDate(v);
      return f < inicio || f > fin;
    });

    const borradas = totalAntes - state.ventas.length;
    await ventasService.saveVentas(true);

    toast.success(`✅ Operación terminada. Se eliminaron ${borradas} registros de venta.`);
    return true;
  }
};
