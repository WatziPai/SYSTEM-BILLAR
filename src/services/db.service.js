import { db } from "@/config/firebase";
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { debugLog } from "@/utils/debug";
import { USE_LOCAL_STORAGE } from "@/utils/constants";

let isReadyStatus = false;
setTimeout(() => {
  isReadyStatus = true;
}, 500);

export const dbService = {
  isReady: () => isReadyStatus,

  get: async (collectionName, documentName) => {
    if (USE_LOCAL_STORAGE) {
      debugLog("firebase", `📂 LOCAL STORAGE GET: ${collectionName}/${documentName}`);
      const data = localStorage.getItem(`db_${collectionName}_${documentName}`);
      return data ? JSON.parse(data) : null;
    }

    try {
      debugLog("firebase", `🔥 FIRESTORE GET: ${collectionName}/${documentName}`);
      const docRef = doc(db, collectionName, documentName);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        debugLog("firebase", `📭 Documento ${collectionName}/${documentName} no existe`);
        return null;
      }
    } catch (error) {
      debugLog("error", `❌ Error obteniendo ${collectionName}/${documentName}:`, error);
      throw error;
    }
  },

  listen: (collectionName, documentName, callback) => {
    if (USE_LOCAL_STORAGE) {
      debugLog("firebase", `📂 LOCAL STORAGE LISTEN: ${collectionName}/${documentName}`);
      
      // Initial trigger
      const data = localStorage.getItem(`db_${collectionName}_${documentName}`);
      callback(data ? JSON.parse(data) : null);
      
      // Mock unsubscriber
      return () => {
        debugLog("firebase", `📂 LOCAL STORAGE UNSUBSCRIBE: ${collectionName}/${documentName}`);
      };
    }

    try {
      debugLog("firebase", `🔥 FIRESTORE LISTEN: ${collectionName}/${documentName}`);
      const docRef = doc(db, collectionName, documentName);
      return onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            callback(docSnap.data());
          } else {
            callback(null);
          }
        },
        (error) => {
          debugLog("error", `❌ Error escuchando ${collectionName}/${documentName}:`, error);
        }
      );
    } catch (error) {
      debugLog("error", `❌ Error configurando listener para ${collectionName}/${documentName}:`, error);
      throw error;
    }
  },

  set: async (collectionName, documentName, data) => {
    if (USE_LOCAL_STORAGE) {
      debugLog("firebase", `📂 LOCAL STORAGE SET: ${collectionName}/${documentName}`, data);
      localStorage.setItem(`db_${collectionName}_${documentName}`, JSON.stringify(data));
      return true;
    }

    try {
      debugLog("firebase", `🔥 FIRESTORE SET: ${collectionName}/${documentName}`, data);
      const docRef = doc(db, collectionName, documentName);
      
      // Inject update timestamp
      const payload = {
        ...data,
        ultimaActualizacion: serverTimestamp(),
      };
      
      await setDoc(docRef, payload);
      return true;
    } catch (error) {
      debugLog("error", `❌ Error guardando ${collectionName}/${documentName}:`, error);
      throw error;
    }
  },
};
