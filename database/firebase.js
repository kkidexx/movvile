import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDtlXKJsd6PQnMbQ_1P0XIrBn6KcEr-IR0",
  authDomain: "base-1-eb269.firebaseapp.com",
  projectId: "base-1-eb269",
  storageBucket: "base-1-eb269.appspot.com",
  messagingSenderId: "207101497422",
  appId: "1:207101497422:web:8921707a2206d63401f31f"
};

// Verifica si ya hay una app inicializada
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Inicializa Firestore
const db = getFirestore(app);

// Exporta la instancia de Firestore
export { db };
