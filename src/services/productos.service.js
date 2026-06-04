import { state, guardarDatosGenerico } from "./state";
import { COLLECTIONS, DOC_IDS } from "@/utils/constants";
import { debugLog } from "@/utils/debug";
import { toast } from "@/components/toast";
import { confirmDialog } from "@/components/confirm-dialog";

export const getCategoryEmoji = (categoria) => {
  const emojis = {
    Golosinas: "🍬",
    Gaseosas: "🥤",
    Licores: "🍺",
    Otros: "📦",
  };
  return emojis[categoria] || "📦";
};

export const productosService = {
  // Save products list to DB
  save: async (omitSync = false) => {
    return await guardarDatosGenerico(
      COLLECTIONS.PRODUCTOS,
      DOC_IDS.TODOS,
      { lista: state.productos },
      omitSync
    );
  },

  // Save batch reports list to DB
  saveLotes: async () => {
    return await guardarDatosGenerico(
      COLLECTIONS.LOTES,
      DOC_IDS.TODOS,
      { lista: state.lotesAgotados }
    );
  },

  // Create or edit a product
  saveProduct: async (productData, isEditing = false, originalId = null) => {
    try {
      if (isEditing) {
        const index = state.productos.findIndex(p => p.id === originalId);
        if (index !== -1) {
          // Preserve statistics
          state.productos[index] = {
            ...state.productos[index],
            ...productData
          };
          toast.success("✅ Producto actualizado con éxito");
        }
      } else {
        const newProduct = {
          id: Date.now(),
          unidadesVendidas: 0,
          gananciaAcumulada: 0,
          unidadesConsumidasDueno: 0,
          conteoAcumuladoLote: 0,
          fechaUltimaReposicion: Date.now(),
          ...productData,
          stock: productData.stockInicial || 0, // initially, stock equals stockInicial
        };
        state.productos.push(newProduct);
        toast.success("✅ Producto agregado con éxito");
      }

      await productosService.save();
      return true;
    } catch (err) {
      debugLog("error", "Error saving product:", err);
      toast.error("❌ Error al guardar el producto");
      return false;
    }
  },

  // Delete a product (Admin only)
  deleteProduct: async (id) => {
    if ((state.usuarioActual.rol || "").toLowerCase() !== "admin") {
      toast.error("⚠️ Solo los administradores pueden eliminar productos");
      return false;
    }

    const confirmDel = await confirmDialog.show(
      "🗑️ Eliminar Producto",
      "¿Estás seguro de eliminar este producto del inventario?",
      { confirmText: "Eliminar", cancelText: "Cancelar", isDestructive: true }
    );

    if (!confirmDel) return false;

    state.productos = state.productos.filter((p) => p.id !== id);
    await productosService.save(true);
    toast.success("✅ Producto eliminado del inventario");
    return true;
  },

  // Adjust product stock
  adjustStock: async (product, adjustment) => {
    const isDecimal = !Number.isInteger(adjustment);
    if (isNaN(adjustment) || adjustment === 0) {
      toast.error("⚠️ Por favor ingresa un valor de ajuste válido");
      return false;
    }

    if ((state.usuarioActual.rol || "").toLowerCase() !== "admin" && adjustment < 0) {
      toast.error("⚠️ Los empleados solo pueden agregar stock (números positivos)");
      return false;
    }

    const nuevoStock = product.stock + adjustment;
    if (nuevoStock < 0) {
      toast.error("⚠️ El stock no puede ser menor a 0");
      return false;
    }

    // Reposition logic (Admin)
    if (
      (state.usuarioActual.rol || "").toLowerCase() === "admin" &&
      adjustment > 0 &&
      (product.unidadesVendidas || 0) > 0
    ) {
      const confirmReposicion = await confirmDialog.show(
        "📦 Reposición de Stock",
        `¿Deseas tratar este ingreso como una REPOSICIÓN DE STOCK?\n\nEsto archivará las estadísticas actuales (unidades vendidas: ${product.unidadesVendidas}) y reiniciará el contador de ganancia para este nuevo lote.`,
        { confirmText: "Sí, es reposición", cancelText: "Solo agregar stock", isDestructive: false }
      );

      if (confirmReposicion) {
        await productosService.generarReporteAgotamiento(product, false); // generate report before resetting
        product.stockInicial = nuevoStock;
        product.unidadesVendidas = 0;
        product.unidadesConsumidasDueno = 0;
        product.gananciaAcumulada = 0;
        product.conteoAcumuladoLote = 0;
        product.fechaUltimaReposicion = Date.now();
      }
    } else if (
      (state.usuarioActual.rol || "").toLowerCase() === "admin" &&
      adjustment > 0 &&
      (product.unidadesVendidas || 0) === 0
    ) {
      // Quietly set stockInicial if no history
      product.stockInicial = nuevoStock;
      product.fechaUltimaReposicion = product.fechaUltimaReposicion || Date.now();
    }

    product.stock = nuevoStock;
    await productosService.save();
    toast.success("✅ Stock ajustado correctamente");
    return true;
  },

  // Archive exhausted batch report
  generarReporteAgotamiento: async (producto, esParcial = false) => {
    let unidadesReporte = 0;
    let gananciaReporte = 0;

    if (esParcial) {
      unidadesReporte = producto.tamanoLote;
      const margen = (producto.precio || 0) - (producto.precioCosto || 0);
      gananciaReporte = margen * unidadesReporte;
    } else {
      unidadesReporte = producto.unidadesVendidas || 0;
      gananciaReporte = producto.gananciaAcumulada || 0;
    }

    if (unidadesReporte === 0 && !esParcial) return;

    const reporte = {
      id: Date.now(),
      productoId: producto.id,
      nombre: producto.nombre,
      categoria: producto.categoria || "Otros",
      stockInicial: esParcial ? producto.tamanoLote : producto.stockInicial || 0,
      unidadesVendidas: unidadesReporte,
      unidadesConsumidasDueno: esParcial ? 0 : producto.unidadesConsumidasDueno || 0,
      precioCosto: producto.precioCosto || 0,
      precioVendido: producto.precio || 0,
      gananciaGenerada: gananciaReporte,
      fechaInicio: producto.fechaUltimaReposicion || Date.now(),
      fechaFin: Date.now(),
      tipo: esParcial ? "Lote Acumulado" : "Stock Agotado",
    };

    state.lotesAgotados.unshift(reporte);

    if (esParcial) {
      producto.unidadesVendidas = Math.max(0, (producto.unidadesVendidas || 0) - unidadesReporte);
      producto.gananciaAcumulada = Math.max(0, (producto.gananciaAcumulada || 0) - gananciaReporte);
    } else {
      producto.unidadesVendidas = 0;
      producto.unidadesConsumidasDueno = 0;
      producto.gananciaAcumulada = 0;
      producto.fechaUltimaReposicion = Date.now();
      producto.conteoAcumuladoLote = 0;
    }

    await productosService.saveLotes();
    
    // Trigger callback to refresh batch history tables if available
    const event = new CustomEvent("lotesUpdated");
    window.dispatchEvent(event);

    debugLog("stock", esParcial ? "📦 Reporte parcial generado" : "📊 Reporte agotado generado", reporte);
  },

  // Notify when product runs out of stock
  notificarAgotamiento: async (producto) => {
    const stockInicial = producto.stockInicial || 0;
    const gananciaTotal = producto.gananciaAcumulada || 0;
    const fechaReposicion = producto.fechaUltimaReposicion || Date.now();
    const diasVenta = Math.ceil((Date.now() - fechaReposicion) / (1000 * 60 * 60 * 24));
    
    let msg = `🎉 ¡PRODUCTO AGOTADO!\n\n`;
    msg += `${getCategoryEmoji(producto.categoria)} ${producto.nombre}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📦 Unidades vendidas: ${producto.unidadesVendidas || stockInicial}\n`;
    if (gananciaTotal > 0) {
      msg += `💰 Ganancia del Lote: S/ ${gananciaTotal.toFixed(2)}\n`;
    }
    if (diasVenta > 0) {
      msg += `📅 Tiempo de venta: ${diasVenta} día${diasVenta !== 1 ? "s" : ""}\n`;
    }
    msg += `━━━━━━━━━━━━━━━━━━━━\n\n¿Deseas reponer el stock de este lote ahora?`;

    const rep = await confirmDialog.show("🚨 Producto Agotado", msg, {
      confirmText: "Reponer ahora",
      cancelText: "Cerrar"
    });

    if (rep) {
      const event = new CustomEvent("triggerAdjustStock", { detail: { id: producto.id } });
      window.dispatchEvent(event);
    }
  },

  // Logic to process product usage (sold or owner consumptions)
  procesarConsumoProducto: async (productoId, cantidadVendida, esGratis = false) => {
    const producto = state.productos.find((p) => p.id === productoId);
    if (!producto) return 0;

    const stockActual = producto.stock || 0;
    if (stockActual < cantidadVendida) {
      toast.error(`⚠️ No hay suficiente stock de ${producto.nombre} (Stock: ${stockActual})`);
      throw new Error("Sin stock");
    }

    producto.stock = stockActual - cantidadVendida;
    
    const margen = (producto.precio || 0) - (producto.precioCosto || 0);
    const gananciaDeEstaVenta = esGratis ? 0 : margen * cantidadVendida;

    if (!esGratis) {
      producto.unidadesVendidas = (producto.unidadesVendidas || 0) + cantidadVendida;
      producto.gananciaAcumulada = (producto.gananciaAcumulada || 0) + gananciaDeEstaVenta;
    } else {
      producto.unidadesConsumidasDueno = (producto.unidadesConsumidasDueno || 0) + cantidadVendida;
    }

    debugLog("stock", "💰 Stock y Ganancias de Producto actualizados", {
      producto: producto.nombre,
      cantidadVendida,
      stockRestante: producto.stock
    });

    // Check size of batch (Lote Acumulado logic)
    if (producto.tamanoLote && producto.tamanoLote > 0) {
      if (!producto.conteoAcumuladoLote) producto.conteoAcumuladoLote = 0;
      producto.conteoAcumuladoLote += cantidadVendida;

      if (producto.conteoAcumuladoLote >= producto.tamanoLote) {
        const lotesHechos = Math.floor(producto.conteoAcumuladoLote / producto.tamanoLote);
        const remanente = producto.conteoAcumuladoLote % producto.tamanoLote;

        for (let i = 0; i < lotesHechos; i++) {
          await productosService.generarReporteAgotamiento(producto, true);
        }

        producto.conteoAcumuladoLote = remanente;
        debugLog("stock", "📦 Lote acumulado completado", { lotes: lotesHechos, producto: producto.nombre });
      }
    }

    // Exhausted logic (Stock 0)
    if (producto.stock === 0) {
      await productosService.generarReporteAgotamiento(producto, false);
      // Run async notification so it doesn't block completion of sales
      setTimeout(() => productosService.notificarAgotamiento(producto), 100);
    }

    await productosService.save();
    return gananciaDeEstaVenta;
  }
};
