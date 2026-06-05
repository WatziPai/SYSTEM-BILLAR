import { state, guardarDatosGenerico } from "./state";
import { COLLECTIONS, DOC_IDS } from "@/utils/constants";
import { debugLog } from "@/utils/debug";
import { toast } from "@/components/toast";
import { confirmDialog } from "@/components/confirm-dialog";
import { productosService } from "./productos.service";

export function calcularCostoTiempo(segundos, config = state.config) {
  const tarifaHora = parseFloat(config.tarifaHora) || 5.00;
  const tarifaExtra = parseFloat(config.tarifaExtra5Min) || 1.00;

  const minutosTotales = Math.floor(segundos / 60);
  const horasCompletas = Math.floor(minutosTotales / 60);
  const minutosRestantes = minutosTotales % 60;

  const costoHoras = horasCompletas * tarifaHora;
  let costoExtra = 0;
  if (minutosRestantes > 5) {
    const minutosDesde6 = minutosRestantes - 5;
    const bloques = Math.ceil(minutosDesde6 / 10);
    costoExtra = bloques * tarifaExtra;
  }

  return {
    costo: costoHoras + costoExtra,
    minutos: minutosTotales,
    horas: horasCompletas,
    minutosExtra: minutosRestantes,
    bloques: minutosRestantes > 5 ? Math.ceil((minutosRestantes - 5) / 10) : 0,
  };
}

export const mesasService = {
  saveMesas: async (omitSync = false) => {
    return await guardarDatosGenerico(
      COLLECTIONS.MESAS,
      DOC_IDS.BILLAR,
      { lista: state.mesas },
      omitSync
    );
  },

  saveMesasConsumo: async (omitSync = false) => {
    return await guardarDatosGenerico(
      COLLECTIONS.MESAS,
      DOC_IDS.CONSUMO,
      { lista: state.mesasConsumo },
      omitSync
    );
  },

  // --- BILLAR TABLES ---
  agregarMesa: async () => {
    if ((state.usuarioActual.rol || "").toLowerCase() !== "admin") {
      toast.error("⚠️ Solo los administradores pueden agregar mesas");
      return false;
    }

    const nuevoId = state.mesas.length > 0 ? Math.max(...state.mesas.map((m) => m.id)) + 1 : 1;
    state.mesas.push({
      id: nuevoId,
      ocupada: false,
      inicio: null,
      tiempoTranscurrido: 0,
      consumos: [],
    });
    
    mesasService.saveMesas().catch(console.error);
    toast.success(`✅ Agregando mesa de billar ${nuevoId}...`);
    debugLog("timer", "➕ Mesa billar agregada", { id: nuevoId });
    return true;
  },

  eliminarMesa: async (id) => {
    if ((state.usuarioActual.rol || "").toLowerCase() !== "admin") {
      toast.error("⚠️ Solo los administradores pueden eliminar mesas");
      return false;
    }

    const mesa = state.mesas.find((m) => m.id === id);
    if (mesa && mesa.ocupada) {
      toast.error("⚠️ No puedes eliminar una mesa ocupada. Finalízala primero.");
      return false;
    }

    const confirmDel = await confirmDialog.show(
      "🗑️ Eliminar Mesa",
      `¿Estás seguro de eliminar la Mesa ${id} del billar?`,
      { confirmText: "Eliminar", cancelText: "Cancelar", isDestructive: true }
    );

    if (!confirmDel) return false;

    state.mesas = state.mesas.filter((m) => m.id !== id);
    
    if (state.timers[id]) {
      clearInterval(state.timers[id]);
      delete state.timers[id];
    }
    
    mesasService.saveMesas(true).catch(console.error);
    toast.success(`✅ Eliminando mesa ${id}...`);
    debugLog("timer", "🗑️ Mesa billar eliminada", { id });
    return true;
  },

  iniciarMesa: async (id) => {
    const mesa = state.mesas.find((m) => m.id === id);
    if (!mesa) return false;
    
    mesa.ocupada = true;
    mesa.inicio = Date.now();
    mesa.tiempoTranscurrido = 0;
    mesa.consumos = [];
    
    mesasService.saveMesas().catch(console.error);
    toast.success(`▶️ Iniciando mesa de billar ${id}...`);
    debugLog("timer", "▶️ Mesa billar iniciada", { id });
    return true;
  },

  finalizarMesa: async (id, paymentInfo) => {
    const mesa = state.mesas.find((m) => m.id === id);
    if (!mesa || !mesa.ocupada) return false;

    const horaInicio = new Date(mesa.inicio).toLocaleString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const horaFin = new Date().toLocaleString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const resultado = calcularCostoTiempo(mesa.tiempoTranscurrido);
    const costoTiempo = resultado.costo;

    let totalConsumos = 0;
    let detalleConsumos = [];
    
    if (mesa.consumos && mesa.consumos.length > 0) {
      mesa.consumos.forEach((c) => {
        const subtotal = c.precio * c.cantidad;
        totalConsumos += subtotal;
        detalleConsumos.push({
          producto: c.nombre,
          cantidad: c.cantidad,
          precioUnitario: c.precio,
          subtotal: subtotal,
        });
      });
    }

    const totalFinal = costoTiempo + totalConsumos;

    if (totalFinal <= 0) {
      // Free/insignificant session
      if (state.timers[id]) {
        clearInterval(state.timers[id]);
        delete state.timers[id];
      }

      mesa.ocupada = false;
      mesa.inicio = null;
      mesa.tiempoTranscurrido = 0;
      mesa.consumos = [];
      mesasService.saveMesas().catch(console.error);

      toast.info(`⏹️ Cerrando mesa ${id} sin costo...`);
      debugLog("timer", "⏹️ Mesa billar cerrada (sin cobro)", { id });
      return true;
    }

    // calculate profit margin
    let gananciaMesa = costoTiempo; // play time is 100% profit
    mesa.consumos.forEach((c) => {
      const prod = state.productos.find((p) => p.id === c.id);
      const costo = prod ? prod.precioCosto || 0 : 0;
      gananciaMesa += (c.precio - costo) * c.cantidad;
    });

    const venta = {
      id: Date.now(),
      tipo: "Mesa Billar",
      tipoDetalle: `Mesa ${mesa.id}`,
      monto: totalFinal,
      ganancia: gananciaMesa,
      metodoPago: paymentInfo.metodoPago,
      montoEfectivo: paymentInfo.montoEfectivo,
      montoYape: paymentInfo.montoYape,
      fecha: new Date().toLocaleString("es-PE"),
      usuario: state.usuarioActual.nombre,
      detalle: {
        mesaId: mesa.id,
        horaInicio: horaInicio,
        horaFin: horaFin,
        tiempoMinutos: resultado.minutos,
        tiempoHoras: resultado.horas,
        tiempoMinutosExtra: resultado.minutosExtra,
        costoTiempo: costoTiempo,
        consumos: detalleConsumos,
        totalConsumos: totalConsumos,
      },
    };

    state.ventas.push(venta);
    
    // Save sales in background
    guardarDatosGenerico(COLLECTIONS.VENTAS, DOC_IDS.TODAS, { lista: state.ventas }).catch(console.error);

    if (state.timers[id]) {
      clearInterval(state.timers[id]);
      delete state.timers[id];
    }

    mesa.ocupada = false;
    mesa.inicio = null;
    mesa.tiempoTranscurrido = 0;
    mesa.consumos = [];
    mesasService.saveMesas().catch(console.error);

    toast.success(`✅ Procesando cobro de Mesa ${id} (S/ ${totalFinal.toFixed(2)})...`);
    return true;
  },

  // --- CONSUMPTION TABLES ---
  agregarMesaConsumo: async () => {
    if ((state.usuarioActual.rol || "").toLowerCase() !== "admin") {
      toast.error("⚠️ Solo los administradores pueden agregar mesas");
      return false;
    }

    const nuevoId = state.mesasConsumo.length > 0 ? Math.max(...state.mesasConsumo.map((m) => m.id)) + 1 : 1;
    state.mesasConsumo.push({
      id: nuevoId,
      ocupada: false,
      consumos: [],
      total: 0,
    });
    
    mesasService.saveMesasConsumo().catch(console.error);
    toast.success(`✅ Agregando mesa de consumo ${nuevoId}...`);
    debugLog("sistema", "➕ Mesa consumo agregada", { id: nuevoId });
    return true;
  },

  eliminarMesaConsumo: async (id) => {
    if ((state.usuarioActual.rol || "").toLowerCase() !== "admin") {
      toast.error("⚠️ Solo los administradores pueden eliminar mesas");
      return false;
    }

    const mesa = state.mesasConsumo.find((m) => m.id === id);
    if (mesa && mesa.ocupada) {
      toast.error("⚠️ No puedes eliminar una mesa ocupada. Finalízala primero.");
      return false;
    }

    const confirmDel = await confirmDialog.show(
      "🗑️ Eliminar Mesa Consumo",
      `¿Estás seguro de eliminar la Mesa de Consumo ${id}?`,
      { confirmText: "Eliminar", cancelText: "Cancelar", isDestructive: true }
    );

    if (!confirmDel) return false;

    state.mesasConsumo = state.mesasConsumo.filter((m) => m.id !== id);
    mesasService.saveMesasConsumo(true).catch(console.error);
    toast.success(`✅ Eliminando mesa de consumo ${id}...`);
    debugLog("sistema", "🗑️ Mesa consumo eliminada", { id });
    return true;
  },

  iniciarMesaConsumo: async (id) => {
    const mesa = state.mesasConsumo.find((m) => m.id === id);
    if (!mesa) return false;
    
    mesa.ocupada = true;
    mesa.consumos = [];
    mesa.total = 0;
    
    mesasService.saveMesasConsumo().catch(console.error);
    toast.success(`▶️ Iniciando mesa de consumo ${id}...`);
    debugLog("sistema", "▶️ Mesa consumo iniciada", { id });
    return true;
  },

  finalizarMesaConsumo: async (id, paymentInfo) => {
    const mesa = state.mesasConsumo.find((m) => m.id === id);
    if (!mesa || !mesa.ocupada) return false;

    if (mesa.total <= 0) {
      mesa.ocupada = false;
      mesa.consumos = [];
      mesa.total = 0;
      mesasService.saveMesasConsumo().catch(console.error);
      toast.info(`⏹️ Cerrando mesa de consumo ${id} sin costo...`);
      return true;
    }

    let detalleConsumos = [];
    mesa.consumos.forEach((c) => {
      const subtotal = c.precio * c.cantidad;
      detalleConsumos.push({
        producto: c.nombre,
        cantidad: c.cantidad,
        precioUnitario: c.precio,
        subtotal: subtotal,
      });
    });

    let gananciaMesaConsumo = 0;
    mesa.consumos.forEach((c) => {
      const prod = state.productos.find((p) => p.id === c.id);
      const costo = prod ? prod.precioCosto || 0 : 0;
      gananciaMesaConsumo += (c.precio - costo) * c.cantidad;
    });

    const venta = {
      id: Date.now(),
      tipo: "Mesa Consumo",
      tipoDetalle: `Mesa Consumo ${mesa.id}`,
      monto: mesa.total,
      ganancia: gananciaMesaConsumo,
      metodoPago: paymentInfo.metodoPago,
      montoEfectivo: paymentInfo.montoEfectivo,
      montoYape: paymentInfo.montoYape,
      fecha: new Date().toLocaleString("es-PE"),
      usuario: state.usuarioActual.nombre,
      detalle: {
        mesaId: mesa.id,
        consumos: detalleConsumos,
        totalConsumos: mesa.total,
      },
    };

    state.ventas.push(venta);
    guardarDatosGenerico(COLLECTIONS.VENTAS, DOC_IDS.TODAS, { lista: state.ventas }).catch(console.error);

    const totalCobrado = mesa.total;
    mesa.ocupada = false;
    mesa.consumos = [];
    mesa.total = 0;
    mesasService.saveMesasConsumo().catch(console.error);

    toast.success(`✅ Procesando cobro de Mesa de consumo ${id} (S/ ${totalCobrado.toFixed(2)})...`);
    return true;
  },

  // --- COMMON CONSUMPTION ORDERS IN TABLES ---
  agregarConsumo: async (productoId, mesaId, tipo) => {
    const producto = state.productos.find((p) => p.id === productoId);
    if (!producto || producto.stock <= 0) {
      toast.error("⚠️ El producto no tiene stock disponible");
      return false;
    }

    let mesa = tipo === "billar" 
      ? state.mesas.find((m) => m.id === mesaId)
      : state.mesasConsumo.find((m) => m.id === mesaId);

    if (!mesa || !mesa.ocupada) {
      toast.error("⚠️ La mesa seleccionada no está ocupada");
      return false;
    }

    if (!mesa.consumos) mesa.consumos = [];

    const existente = mesa.consumos.find((c) => c.id === productoId);
    if (existente) {
      existente.cantidad++;
    } else {
      mesa.consumos.push({
        id: productoId,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1,
      });
    }

    // Background sync
    productosService.procesarConsumoProducto(productoId, 1, false).catch(console.error);

    if (tipo === "consumo") {
      mesa.total = mesa.consumos.reduce((sum, c) => sum + c.precio * c.cantidad, 0);
    }

    if (tipo === "billar") {
      mesasService.saveMesas().catch(console.error);
    } else {
      mesasService.saveMesasConsumo().catch(console.error);
    }

    toast.success(`➕ ${producto.nombre} agregado a la mesa`);
    return true;
  },

  eliminarConsumo: async (productoId, mesaId, tipo) => {
    let mesa = tipo === "billar"
      ? state.mesas.find((m) => m.id === mesaId)
      : state.mesasConsumo.find((m) => m.id === mesaId);

    if (!mesa) return false;

    const consumo = mesa.consumos.find((c) => c.id === productoId);
    if (!consumo) return false;

    const producto = state.productos.find((p) => p.id === productoId);
    if (producto) {
      // Revert stock, sales count and batch logs
      producto.stock += consumo.cantidad;
      const margen = (producto.precio || 0) - (producto.precioCosto || 0);
      const gananciaARevertir = margen * consumo.cantidad;

      producto.unidadesVendidas = Math.max(0, (producto.unidadesVendidas || 0) - consumo.cantidad);
      producto.gananciaAcumulada = Math.max(0, (producto.gananciaAcumulada || 0) - gananciaARevertir);

      if (producto.tamanoLote && producto.tamanoLote > 0) {
        producto.conteoAcumuladoLote = Math.max(0, (producto.conteoAcumuladoLote || 0) - consumo.cantidad);
      }
      productosService.save().catch(console.error);
    }

    mesa.consumos = mesa.consumos.filter((c) => c.id !== productoId);

    if (tipo === "consumo") {
      mesa.total = mesa.consumos.reduce((sum, c) => sum + c.precio * c.cantidad, 0);
    }

    if (tipo === "billar") {
      mesasService.saveMesas(true).catch(console.error);
    } else {
      mesasService.saveMesasConsumo(true).catch(console.error);
    }

    toast.success(`🗑️ Producto removido de la mesa`);
    return true;
  },

  editarConsumo: async (productoId, mesaId, tipo, nuevaCantidad) => {
    let mesa = tipo === "billar"
      ? state.mesas.find((m) => m.id === mesaId)
      : state.mesasConsumo.find((m) => m.id === mesaId);

    if (!mesa) return false;

    const consumo = mesa.consumos.find((c) => c.id === productoId);
    if (!consumo) return false;

    const producto = state.productos.find((p) => p.id === productoId);
    const qty = parseInt(nuevaCantidad);

    if (isNaN(qty) || qty < 0) {
      toast.error("⚠️ Por favor ingresa una cantidad numérica válida");
      return false;
    }

    if (qty === 0) {
      const confirmRemove = await confirmDialog.show(
        "🗑️ Eliminar Consumo",
        `¿Deseas remover por completo "${consumo.nombre}" de la mesa?`,
        { confirmText: "Remover", cancelText: "Cancelar", isDestructive: true }
      );
      if (confirmRemove) {
        await mesasService.eliminarConsumo(productoId, mesaId, tipo);
      }
      return true;
    }

    const diferencia = qty - consumo.cantidad;

    if (diferencia > 0 && producto && producto.stock < diferencia) {
      toast.error(`⚠️ Stock insuficiente. Disponible en estante: ${producto.stock}`);
      return false;
    }

    if (producto) {
      producto.stock -= diferencia; // Deducts if positive, returns stock if negative
      const margen = (producto.precio || 0) - (producto.precioCosto || 0);
      
      if (diferencia > 0) {
        producto.unidadesVendidas = (producto.unidadesVendidas || 0) + diferencia;
        producto.gananciaAcumulada = (producto.gananciaAcumulada || 0) + (margen * diferencia);
        if (producto.tamanoLote && producto.tamanoLote > 0) {
          producto.conteoAcumuladoLote = (producto.conteoAcumuladoLote || 0) + diferencia;
        }
      } else if (diferencia < 0) {
        const reduccion = Math.abs(diferencia);
        producto.unidadesVendidas = Math.max(0, (producto.unidadesVendidas || 0) - reduccion);
        producto.gananciaAcumulada = Math.max(0, (producto.gananciaAcumulada || 0) - (margen * reduccion));
        if (producto.tamanoLote && producto.tamanoLote > 0) {
          producto.conteoAcumuladoLote = Math.max(0, (producto.conteoAcumuladoLote || 0) - reduccion);
        }
      }
      productosService.save().catch(console.error);
    }

    consumo.cantidad = qty;

    if (tipo === "consumo") {
      mesa.total = mesa.consumos.reduce((sum, c) => sum + c.precio * c.cantidad, 0);
    }

    if (tipo === "billar") {
      mesasService.saveMesas().catch(console.error);
    } else {
      mesasService.saveMesasConsumo().catch(console.error);
    }

    toast.success("✅ Consumos modificados correctamente");
    return true;
  }
};
