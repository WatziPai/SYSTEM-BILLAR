import { dbService } from "./db.service";
import { COLLECTIONS, DOC_IDS } from "@/utils/constants";
import { debugLog } from "@/utils/debug";
import { toast } from "@/components/toast";

// Core application state
export const state = {
  usuarioActual: null,
  usuarios: [],
  mesas: [],
  mesasConsumo: [],
  ventas: [],
  productos: [],
  erroresReportados: [],
  cierres: [],
  lotesAgotados: [],
  consumosDueno: [],
  movimientos: [],
  ultimoCierre: null,
  config: {
    tarifaHora: 5.00,
    tarifaExtra5Min: 1.00
  },
  limiteVentas: 20,
  limiteMovimientos: 20,
  limiteCierres: 10,
  tabActual: null,
  ordenInventarioActual: "default",
  timers: {}, // timer references
  // Tracks which lazy modules have already been fetched from Firebase
  modulosCargados: {
    ventas: false,
    caja: false,
    inventario: false,
    reportes: false,
    errores: false,
    consumoDueno: false,
  },
};

// ======================================================
// ========= FASE 1: Datos críticos al iniciar sesión ===
// ======================================================
// Solo carga lo indispensable para mostrar las mesas rápidamente:
// Usuarios, Configuración, Productos y las dos colecciones de Mesas.
// También carga ventas y cierres para calcular el "Total del Día" en el header
export async function cargarDatosCriticos() {
  debugLog("firebase", "⚡ [Lazy] Cargando datos críticos (Mesas + Config + Ventas)...");
  const tiempoInicio = Date.now();

  try {
    const [
      usuariosData,
      configData,
      productosData,
      mesasData,
      mesasConsumoData,
      ventasData,
      cierresData,
    ] = await Promise.all([
      dbService.get(COLLECTIONS.USUARIOS, DOC_IDS.TODOS),
      dbService.get(COLLECTIONS.CONFIGURACION, DOC_IDS.GENERAL),
      dbService.get(COLLECTIONS.PRODUCTOS, DOC_IDS.TODOS),
      dbService.get(COLLECTIONS.MESAS, DOC_IDS.BILLAR),
      dbService.get(COLLECTIONS.MESAS, DOC_IDS.CONSUMO),
      dbService.get(COLLECTIONS.VENTAS, DOC_IDS.TODAS),
      dbService.get(COLLECTIONS.CIERRES, DOC_IDS.HISTORIAL),
    ]);

    // Usuarios y configuración
    state.usuarios = usuariosData?.lista || [];

    if (configData) {
      state.config = {
        tarifaHora: parseFloat(configData.tarifaHora) || 5.00,
        tarifaExtra5Min: parseFloat(configData.tarifaExtra5Min) || 1.00,
      };
      const inputTarifa = document.getElementById("tarifaHora");
      const inputExtra = document.getElementById("tarifaExtra5Min");
      if (inputTarifa) inputTarifa.value = state.config.tarifaHora.toFixed(2);
      if (inputExtra) inputExtra.value = state.config.tarifaExtra5Min.toFixed(2);
    }

    // Productos (necesarios para el modal de consumos en mesas)
    state.productos = productosData?.lista || [];

    // Mesas de billar
    if (mesasData && mesasData.lista) {
      state.mesas = mesasData.lista;
    } else {
      state.mesas = Array.from({ length: 4 }, (_, i) => ({
        id: i + 1,
        ocupada: false,
        inicio: null,
        tiempoTranscurrido: 0,
        consumos: [],
      }));
      await guardarDatosGenerico(COLLECTIONS.MESAS, DOC_IDS.BILLAR, { lista: state.mesas }, true);
    }

    // Mesas de consumo
    if (mesasConsumoData && mesasConsumoData.lista) {
      state.mesasConsumo = mesasConsumoData.lista;
    } else {
      state.mesasConsumo = Array.from({ length: 2 }, (_, i) => ({
        id: i + 1,
        ocupada: false,
        consumos: [],
        total: 0,
      }));
      await guardarDatosGenerico(COLLECTIONS.MESAS, DOC_IDS.CONSUMO, { lista: state.mesasConsumo }, true);
    }

    // Ventas (necesarias para mostrar "Total del Día" en el header)
    state.ventas = ventasData?.lista || [];
    state.modulosCargados.ventas = true;

    // Cierres (necesarios para calcular el último cierre y filtrar ventas del día)
    state.cierres = cierresData?.lista || [];
    if (state.cierres.length > 0) {
      state.ultimoCierre = state.cierres[state.cierres.length - 1].timestamp;
    }

    const tiempoTotal = Date.now() - tiempoInicio;
    debugLog("firebase", `✅ [Lazy] Datos críticos cargados en ${tiempoTotal}ms`);
  } catch (error) {
    debugLog("error", "❌ Error cargando datos críticos:", error);
    throw error;
  }
}

// ======================================================
// ========= FASE 2: Datos diferidos por módulo =========
// ======================================================
// Descarga solo los datos que necesita la pestaña que el usuario acaba
// de activar. Si el módulo ya fue cargado antes, no hace nada.
export async function cargarDatosModulo(modulo) {
  const ya = state.modulosCargados;

  try {
    switch (modulo) {

      // ── Caja ──────────────────────────────────────────
      case "caja": {
        if (ya.caja) return;
        debugLog("firebase", "⏳ [Lazy] Cargando módulo: Caja...");
        const movimientosData = await dbService.get(COLLECTIONS.CAJA, DOC_IDS.HISTORIAL);
        state.movimientos = movimientosData?.lista || [];
        ya.caja = true;
        debugLog("firebase", "✅ [Lazy] Módulo Caja listo");
        break;
      }

      // ── Inventario ────────────────────────────────────
      case "inventario": {
        if (ya.inventario) return;
        debugLog("firebase", "⏳ [Lazy] Cargando módulo: Inventario...");
        const [productosData, lotesData] = await Promise.all([
          dbService.get(COLLECTIONS.PRODUCTOS, DOC_IDS.TODOS),
          dbService.get(COLLECTIONS.LOTES, DOC_IDS.TODOS),
        ]);
        state.productos = productosData?.lista || [];
        state.lotesAgotados = lotesData?.lista || [];
        ya.inventario = true;
        debugLog("firebase", "✅ [Lazy] Módulo Inventario listo");
        break;
      }

      // ── Ventas ────────────────────────────────────────
      case "ventas": {
        if (ya.ventas) return;
        // Los datos de ventas ya se cargan en cargarDatosCriticos
        // Solo marcamos el módulo como cargado
        ya.ventas = true;
        debugLog("firebase", "✅ [Lazy] Módulo Ventas listo (datos ya cargados)");
        break;
      }

      // ── Reportes / Dashboard / Mensual ────────────────
      case "reportes":
      case "dashboard":
      case "mensual": {
        if (ya.reportes) return;
        debugLog("firebase", "⏳ [Lazy] Cargando módulo: Reportes...");
        const [consumosDuenoData] = await Promise.all([
          dbService.get(COLLECTIONS.CONSUMOS, DOC_IDS.DUENO),
        ]);
        // Los cierres y ventas ya se cargaron en cargarDatosCriticos
        state.consumosDueno = (consumosDuenoData?.lista || []).map((c) => ({
          ...c,
          total: c.total !== undefined ? c.total : c.totalVenta || 0,
        }));
        ya.reportes = true;
        ya.consumoDueno = true;
        ya.ventas = true;
        debugLog("firebase", "✅ [Lazy] Módulo Reportes listo");
        break;
      }

      // ── Errores ───────────────────────────────────────
      case "errores": {
        if (ya.errores) return;
        debugLog("firebase", "⏳ [Lazy] Cargando módulo: Errores...");
        const erroresData = await dbService.get(COLLECTIONS.ERRORES, DOC_IDS.TODOS);
        state.erroresReportados = erroresData?.lista || [];
        ya.errores = true;
        debugLog("firebase", "✅ [Lazy] Módulo Errores listo");
        break;
      }

      // ── Consumo Dueño ─────────────────────────────────
      case "consumoDueno": {
        if (ya.consumoDueno) return;
        debugLog("firebase", "⏳ [Lazy] Cargando módulo: Consumo Dueño...");
        const consumosData = await dbService.get(COLLECTIONS.CONSUMOS, DOC_IDS.DUENO);
        state.consumosDueno = (consumosData?.lista || []).map((c) => ({
          ...c,
          total: c.total !== undefined ? c.total : c.totalVenta || 0,
        }));
        ya.consumoDueno = true;
        debugLog("firebase", "✅ [Lazy] Módulo Consumo Dueño listo");
        break;
      }

      default:
        // Módulo sin datos diferidos (e.g. "mesas"), no hace nada
        break;
    }
  } catch (error) {
    debugLog("error", `❌ Error cargando módulo diferido "${modulo}":`, error);
    throw error;
  }
}

// Unified safe data saving with smart merge
export async function guardarDatosGenerico(coleccion, docId, data, omitSync = false) {
  try {
    // Smart merge to prevent overwrite in multi-device scenarios
    if (!omitSync && data && Array.isArray(data.lista)) {
      try {
        const remoto = await dbService.get(coleccion, docId);
        if (remoto && Array.isArray(remoto.lista)) {
          const localMap = new Map();
          data.lista.forEach((item) => {
            if (item && item.id) localMap.set(item.id, item);
          });

          let itemsAgregados = false;
          remoto.lista.forEach((item) => {
            if (item && item.id && !localMap.has(item.id)) {
              data.lista.push(item);
              itemsAgregados = true;
            }
          });

          if (itemsAgregados) {
            // Sort appropriately
            if (coleccion === COLLECTIONS.CAJA || coleccion === COLLECTIONS.CONSUMOS) {
              data.lista.sort((a, b) => b.id - a.id); // Descending
            } else if (coleccion === COLLECTIONS.VENTAS || coleccion === COLLECTIONS.CIERRES) {
              data.lista.sort((a, b) => a.id - b.id); // Ascending
            }

            // Sync local state references
            if (coleccion === COLLECTIONS.VENTAS) state.ventas = data.lista;
            if (coleccion === COLLECTIONS.CAJA) state.movimientos = data.lista;
            if (coleccion === COLLECTIONS.PRODUCTOS) state.productos = data.lista;
            if (coleccion === COLLECTIONS.CONSUMOS) state.consumosDueno = data.lista;

            debugLog("firebase", `🔄 Datos sincronizados antes de guardar en ${coleccion}/${docId}`);
          }
        }
      } catch (syncError) {
        console.warn("⚠️ No se pudo sincronizar antes de guardar:", syncError);
      }
    }

    await dbService.set(coleccion, docId, data);
    debugLog("firebase", `💾 Datos guardados en ${coleccion}/${docId}`);
    return true;
  } catch (error) {
    debugLog("error", `❌ Error guardando en ${coleccion}/${docId}:`, error);
    toast.error(`Error al guardar datos en ${coleccion}`);
    return false;
  }
}
