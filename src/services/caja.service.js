import { state, guardarDatosGenerico } from "./state";
import { COLLECTIONS, DOC_IDS } from "@/utils/constants";
import { debugLog } from "@/utils/debug";
import { toast } from "@/components/toast";
import { confirmDialog } from "@/components/confirm-dialog";

export const cajaService = {
  saveMovimientos: async (omitSync = false) => {
    return await guardarDatosGenerico(
      COLLECTIONS.CAJA,
      DOC_IDS.HISTORIAL,
      { lista: state.movimientos },
      omitSync
    );
  },

  // Calculate current balances dynamically
  calcularBalances: () => {
    let ventasEfectivo = 0;
    let ventasYapeTotal = 0;

    for (const v of state.ventas) {
      if (v.metodoPago === "Mixto") {
        ventasEfectivo += v.montoEfectivo || 0;
        ventasYapeTotal += v.montoYape || 0;
      } else if ((v.metodoPago || "Efectivo") === "Efectivo") {
        ventasEfectivo += v.monto || 0;
      } else if (v.metodoPago === "Yape") {
        ventasYapeTotal += v.monto || 0;
      }
    }

    let ingresosLocal = 0,
      egresosLocal = 0,
      transferenciasSalientes = 0,
      ajustesLocal = 0;
    let ingresosChica = 0,
      egresosChica = 0,
      ajustesChica = 0;
    let transYapeTotal = 0,
      ajustesYape = 0,
      egresosYape = 0;

    for (const m of state.movimientos) {
      const monto = m.monto || 0;

      if (m.caja === "local") {
        if (m.tipo === "ingreso") ingresosLocal += monto;
        else if (["egreso", "retiro", "reposicion"].includes(m.tipo)) egresosLocal += monto;
        else if (m.tipo === "transferencia") transferenciasSalientes += monto;
        else if (m.tipo === "ajuste") ajustesLocal += m.ajusteTipo === "positivo" ? monto : -monto;
      } else if (m.caja === "chica") {
        if (m.tipo === "ingreso") ingresosChica += monto;
        else if (["egreso", "retiro", "reposicion"].includes(m.tipo)) egresosChica += monto;
        else if (m.tipo === "ajuste") ajustesChica += m.ajusteTipo === "positivo" ? monto : -monto;
      } else if (m.caja === "yape") {
        if (m.tipo === "ajuste") ajustesYape += m.ajusteTipo === "positivo" ? monto : -monto;
        else if (["egreso", "retiro", "reposicion"].includes(m.tipo)) egresosYape += monto;
      }

      if (m.origenYape === true) transYapeTotal += monto;
    }

    const balLocal = ventasEfectivo + ingresosLocal - egresosLocal - transferenciasSalientes + ajustesLocal;
    const balChica = ingresosChica + transferenciasSalientes - egresosChica + ajustesChica;
    const balYape = ventasYapeTotal - transYapeTotal - egresosYape + ajustesYape;

    const totalEgresosTotal = egresosLocal + egresosChica + egresosYape;

    return { balLocal, balChica, balYape, totalEgresosTotal };
  },

  // Save regular cash movement
  guardarMovimiento: async (tipo, desc, monto, caja) => {
    const valMonto = parseFloat(monto);
    if (!desc || isNaN(valMonto) || valMonto <= 0) {
      toast.error("⚠️ Por favor completa todos los campos con valores válidos");
      return false;
    }

    // Check balance availability if it's an expense
    if (tipo === "egreso" || tipo === "retiro" || tipo === "reposicion") {
      const balances = cajaService.calcularBalances();
      let balanceDisponible = 0;

      if (caja === "local") balanceDisponible = balances.balLocal;
      else if (caja === "chica") balanceDisponible = balances.balChica;
      else if (caja === "yape") balanceDisponible = balances.balYape;

      if (valMonto > balanceDisponible) {
        toast.error(`⚠️ Saldo insuficiente en la caja seleccionada (Disponible: S/ ${balanceDisponible.toFixed(2)})`);
        return false;
      }
    }

    try {
      const nuevoMovimiento = {
        id: Date.now(),
        fecha: new Date().toLocaleString("es-PE"),
        descripcion: desc,
        monto: valMonto,
        tipo: tipo,
        caja: caja,
        usuario: state.usuarioActual.nombre,
      };

      state.movimientos.unshift(nuevoMovimiento);
      await cajaService.saveMovimientos();
      
      toast.success("✅ Movimiento registrado con éxito");
      debugLog("stock", "Movement saved", nuevoMovimiento);
      return true;
    } catch (err) {
      debugLog("error", "Error saving cash movement:", err);
      toast.error("❌ Error al guardar el movimiento");
      return false;
    }
  },

  // Transfer funds from Local to Chica
  guardarTransferencia: async (monto) => {
    const valMonto = parseFloat(monto);
    if (isNaN(valMonto) || valMonto <= 0) {
      toast.error("⚠️ Ingresa un monto de transferencia válido");
      return false;
    }

    const balances = cajaService.calcularBalances();
    if (valMonto > balances.balLocal) {
      toast.error(`⚠️ No puedes transferir S/ ${valMonto.toFixed(2)} porque solo tienes S/ ${balances.balLocal.toFixed(2)} en Caja Local.`);
      return false;
    }

    try {
      const nuevaTransferencia = {
        id: Date.now(),
        fecha: new Date().toLocaleString("es-PE"),
        descripcion: "Transferencia a Caja Chica",
        monto: valMonto,
        tipo: "transferencia",
        caja: "local", // source is local, target is implicitly chica
        usuario: state.usuarioActual.nombre,
      };

      state.movimientos.unshift(nuevaTransferencia);
      await cajaService.saveMovimientos();
      
      toast.success(`✅ Transferencia de S/ ${valMonto.toFixed(2)} realizada con éxito.`);
      return true;
    } catch (err) {
      debugLog("error", "Error saving transfer:", err);
      toast.error("❌ Error al procesar la transferencia");
      return false;
    }
  },

  // Transfer Yape balance to physical boxes
  guardarTransferenciaYape: async (monto, destino) => {
    const valMonto = parseFloat(monto);
    if (isNaN(valMonto) || valMonto <= 0) {
      toast.error("⚠️ Ingresa un monto válido mayor a 0");
      return false;
    }

    const balances = cajaService.calcularBalances();
    if (valMonto > balances.balYape) {
      toast.error(`⚠️ Saldo insuficiente en Yape (Disponible: S/ ${balances.balYape.toFixed(2)})`);
      return false;
    }

    try {
      const nuevoMovimiento = {
        id: Date.now(),
        fecha: new Date().toLocaleString("es-PE"),
        descripcion: "Transferencia desde Yape",
        monto: valMonto,
        tipo: "ingreso",
        caja: destino, // goes to Local or Chica
        origenYape: true,
        usuario: state.usuarioActual.nombre,
      };

      state.movimientos.unshift(nuevoMovimiento);
      await cajaService.saveMovimientos();
      
      toast.success(`✅ Transferencia de Yape a Caja ${destino === "local" ? "Local" : "Chica"} registrada por S/ ${valMonto.toFixed(2)}`);
      return true;
    } catch (err) {
      debugLog("error", "Error saving Yape transfer:", err);
      toast.error("❌ Error al guardar la transferencia");
      return false;
    }
  },

  // Save manual balance adjustment
  guardarAjusteCaja: async (caja, nuevoMonto) => {
    const valMonto = parseFloat(nuevoMonto);
    if (isNaN(valMonto) || valMonto < 0) {
      toast.error("⚠️ Ingresa un monto de ajuste válido (puede ser 0)");
      return false;
    }

    const balances = cajaService.calcularBalances();
    let saldoActual = 0;
    if (caja === "local") saldoActual = balances.balLocal;
    else if (caja === "chica") saldoActual = balances.balChica;
    else saldoActual = balances.balYape;

    const diferencia = valMonto - saldoActual;

    if (Math.abs(diferencia) < 0.01) {
      toast.info("ℹ️ El saldo coincide. No se generó ningún ajuste.");
      return true;
    }

    try {
      const cajaNombre = caja === "local" ? "Local" : caja === "chica" ? "Chica" : "Yape";

      const nuevoMovimiento = {
        id: Date.now(),
        fecha: new Date().toLocaleString("es-PE"),
        descripcion: `Ajuste manual de Caja ${cajaNombre}`,
        monto: Math.abs(diferencia),
        tipo: "ajuste",
        ajusteTipo: diferencia > 0 ? "positivo" : "negativo",
        caja: caja,
        usuario: state.usuarioActual.nombre,
      };

      state.movimientos.unshift(nuevoMovimiento);
      await cajaService.saveMovimientos();
      
      toast.success(`✅ Ajuste de Caja ${cajaNombre} guardado correctamente`);
      return true;
    } catch (err) {
      debugLog("error", "Error saving adjustment:", err);
      toast.error("❌ Error al guardar el ajuste de caja");
      return false;
    }
  },

  // Undo (delete) a movement record and return cash to balance
  eliminarMovimiento: async (id) => {
    const confirmDel = await confirmDialog.show(
      "🗑️ Deshacer Operación",
      "¿Deseas DESHACER esta operación?\n\nLa transacción se anulará y el dinero volverá a su estado original en el saldo.",
      { confirmText: "Deshacer", cancelText: "Cancelar", isDestructive: true }
    );

    if (!confirmDel) return false;

    state.movimientos = state.movimientos.filter((m) => m.id !== id);
    await cajaService.saveMovimientos(true);
    
    toast.success("✅ Operación deshecha. El saldo ha sido corregido.");
    return true;
  },

  // Ocultar: Deletes from list, but creates balancing hidden adjustment so balance doesn't change
  borrarRegistroSinEfecto: async (id) => {
    const confirmHide = await confirmDialog.show(
      "🗣️ Ocultar Registro",
      "¿Borrar registro del historial?\n\nEl registro desaparecerá de la lista, pero se creará un ajuste neutro para que el dinero acumulado en caja NO se altere.",
      { confirmText: "Ocultar", cancelText: "Cancelar", isDestructive: false }
    );

    if (!confirmHide) return false;

    const index = state.movimientos.findIndex((m) => m.id === id);
    if (index === -1) {
      toast.error("❌ Error: No se encontró el registro.");
      return false;
    }

    const mov = state.movimientos[index];
    let esNegativo = ["egreso", "retiro", "reposicion", "transferencia"].includes(mov.tipo);
    if (mov.tipo === "ajuste") esNegativo = mov.ajusteTipo === "negativo";

    state.movimientos[index].tipo = "ajuste";
    state.movimientos[index].ajusteTipo = esNegativo ? "negativo" : "positivo";
    state.movimientos[index].oculto = true;

    await cajaService.saveMovimientos();
    toast.success("✅ Registro ocultado sin alterar saldos reales.");
    return true;
  },

  // Clear all cash history (keep sales intact)
  limpiarHistorialMovimientos: async () => {
    if ((state.usuarioActual.rol || "").toLowerCase() !== "admin") {
      toast.error("⚠️ Solo el administrador puede limpiar el historial de movimientos");
      return false;
    }

    const total = state.movimientos.length;
    if (total === 0) {
      toast.info("ℹ️ El historial de movimientos ya está vacío.");
      return true;
    }

    const confirmClear = await confirmDialog.show(
      "🧹 Limpiar Historial de Caja",
      `Estás a punto de borrar los ${total} registros de movimientos.\n\n✅ Las VENTAS no se tocarán.\n⚠️ Los saldos volverán a calcularse a partir de las ventas.\n\n¿Deseas continuar?`,
      { confirmText: "Limpiar Todo", cancelText: "Cancelar", isDestructive: true }
    );

    if (!confirmClear) return false;

    state.movimientos = [];
    await cajaService.saveMovimientos(true);
    
    toast.success("✅ Historial limpiado. Las ventas y reportes están intactos.");
    return true;
  }
};
