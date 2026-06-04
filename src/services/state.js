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
  tabActual: "mesas",
  ordenInventarioActual: "default",
  timers: {} // timer references
};

// Loader function
export async function cargarDatos() {
  debugLog("firebase", "📂 Cargando datos desde almacenamiento...");
  const tiempoInicio = Date.now();

  try {
    const [
      usuariosData,
      configData,
      ventasData,
      productosData,
      erroresData,
      cierresData,
      consumosDuenoData,
      lotesData,
      mesasData,
      mesasConsumoData,
      movimientosData,
    ] = await Promise.all([
      dbService.get(COLLECTIONS.USUARIOS, DOC_IDS.TODOS),
      dbService.get(COLLECTIONS.CONFIGURACION, DOC_IDS.GENERAL),
      dbService.get(COLLECTIONS.VENTAS, DOC_IDS.TODAS),
      dbService.get(COLLECTIONS.PRODUCTOS, DOC_IDS.TODOS),
      dbService.get(COLLECTIONS.ERRORES, DOC_IDS.TODOS),
      dbService.get(COLLECTIONS.CIERRES, DOC_IDS.HISTORIAL),
      dbService.get(COLLECTIONS.CONSUMOS, DOC_IDS.DUENO),
      dbService.get(COLLECTIONS.LOTES, DOC_IDS.TODOS),
      dbService.get(COLLECTIONS.MESAS, DOC_IDS.BILLAR),
      dbService.get(COLLECTIONS.MESAS, DOC_IDS.CONSUMO),
      dbService.get(COLLECTIONS.CAJA, DOC_IDS.HISTORIAL),
    ]);

    // Parse and bind to state
    state.usuarios = usuariosData?.lista || [];
    
    if (configData) {
      state.config = {
        tarifaHora: parseFloat(configData.tarifaHora) || 5.00,
        tarifaExtra5Min: parseFloat(configData.tarifaExtra5Min) || 1.00
      };
      
      // Update UI input values if they exist
      const inputTarifa = document.getElementById("tarifaHora");
      const inputExtra = document.getElementById("tarifaExtra5Min");
      if (inputTarifa) inputTarifa.value = state.config.tarifaHora.toFixed(2);
      if (inputExtra) inputExtra.value = state.config.tarifaExtra5Min.toFixed(2);
    }

    state.ventas = ventasData?.lista || [];
    state.productos = productosData?.lista || [];
    state.erroresReportados = erroresData?.lista || [];
    state.cierres = cierresData?.lista || [];
    state.lotesAgotados = lotesData?.lista || [];
    state.movimientos = movimientosData?.lista || [];

    if (state.cierres.length > 0) {
      state.ultimoCierre = state.cierres[state.cierres.length - 1].timestamp;
    }

    state.consumosDueno = (consumosDuenoData?.lista || []).map((c) => ({
      ...c,
      total: c.total !== undefined ? c.total : c.totalVenta || 0,
    }));

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
      await guardarDatosGenerico(COLLECTIONS.MESAS, DOC_IDS.BILLAR, {
        lista: state.mesas,
      }, true);
    }

    if (mesasConsumoData && mesasConsumoData.lista) {
      state.mesasConsumo = mesasConsumoData.lista;
    } else {
      state.mesasConsumo = Array.from({ length: 2 }, (_, i) => ({
        id: i + 1,
        ocupada: false,
        consumos: [],
        total: 0
      }));
      await guardarDatosGenerico(COLLECTIONS.MESAS, DOC_IDS.CONSUMO, {
        lista: state.mesasConsumo,
      }, true);
    }

    const tiempoTotal = Date.now() - tiempoInicio;
    debugLog("firebase", `✅ Todos los datos cargados en paralelo en ${tiempoTotal}ms`);
  } catch (error) {
    debugLog("error", "❌ Error cargando datos:", error);
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
