import { auth } from "@/config/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";
import { debugLog } from "@/utils/debug";
import { USE_LOCAL_STORAGE } from "@/utils/constants";

// Mock user for local storage development mode
let mockCurrentUser = null;
const mockAuthCallbacks = new Set();

if (USE_LOCAL_STORAGE) {
  const savedUser = localStorage.getItem("mock_user");
  if (savedUser) {
    mockCurrentUser = JSON.parse(savedUser);
  }
}

export const authService = {
  signIn: async (email, password) => {
    if (USE_LOCAL_STORAGE) {
      debugLog("firebase", `🔐 LOCAL AUTH SIGN IN: ${email}`);
      if (email && password) {
        mockCurrentUser = {
          email,
          uid: "mock-uid-1234",
          nombre: email.split("@")[0],
          rol: email.includes("admin") ? "admin" : email.includes("encargado") ? "encargado" : "empleado",
        };
        localStorage.setItem("mock_user", JSON.stringify(mockCurrentUser));
        mockAuthCallbacks.forEach((cb) => cb(mockCurrentUser));
        return { user: mockCurrentUser };
      }
      throw new Error("Credenciales inválidas en modo local");
    }

    debugLog("firebase", `🔥 FIREBASE SIGN IN: ${email}`);
    return signInWithEmailAndPassword(auth, email, password);
  },

  signOut: async () => {
    if (USE_LOCAL_STORAGE) {
      debugLog("firebase", "🔐 LOCAL AUTH SIGN OUT");
      mockCurrentUser = null;
      localStorage.removeItem("mock_user");
      mockAuthCallbacks.forEach((cb) => cb(null));
      return true;
    }

    debugLog("firebase", "🔥 FIREBASE SIGN OUT");
    return signOut(auth);
  },

  onAuthChange: (callback) => {
    if (USE_LOCAL_STORAGE) {
      debugLog("firebase", "🔐 LOCAL AUTH ON CHANGE REGISTERED");
      mockAuthCallbacks.add(callback);
      // Trigger callback with current status
      callback(mockCurrentUser);
      return () => {
        mockAuthCallbacks.delete(callback);
      };
    }

    return onAuthStateChanged(auth, callback);
  },

  getCurrentUser: () => {
    if (USE_LOCAL_STORAGE) {
      return mockCurrentUser;
    }
    return auth.currentUser;
  },

  createUser: async (email, password) => {
    if (USE_LOCAL_STORAGE) {
      debugLog("firebase", `🔐 LOCAL AUTH CREATE USER: ${email}`);
      return {
        user: {
          email,
          uid: "mock-uid-" + Math.random().toString(36).substr(2, 9),
        },
      };
    }

    debugLog("firebase", `🔥 FIREBASE CREATE USER: ${email}`);
    // Create new authentication record
    return createUserWithEmailAndPassword(auth, email, password);
  },

  updatePassword: async (user, newPassword) => {
    if (USE_LOCAL_STORAGE) {
      debugLog("firebase", "🔐 LOCAL AUTH UPDATE PASSWORD");
      return true;
    }

    debugLog("firebase", "🔥 FIREBASE UPDATE PASSWORD");
    return updatePassword(user, newPassword);
  },
};
