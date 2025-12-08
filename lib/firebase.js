import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDiNCO2trc8GFQouKD9B2peUM3Gg5InBhI",
  authDomain: "forester-swap.firebaseapp.com",
  databaseURL: "https://forester-swap-default-rtdb.firebaseio.com",
  projectId: "forester-swap",
  storageBucket: "forester-swap.firebasestorage.app",
  messagingSenderId: "386036888086",
  appId: "1:386036888086:web:db1e00c63ad4457c70bb37",
  measurementId: "G-XGCCTCXV21"
};
// where do i get the config values? from firebase console -> project settings -> general -> your apps -> firebase sdk snippet -> config

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
