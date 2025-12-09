import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "lfcboomer.firebaseapp.com",
  projectId: "lfcboomer",
  storageBucket: "lfcboomer.firebasestorage.app",
  messagingSenderId: "579328875040",
  appId: "1:579328875040:web:de58e2a358891dba5bfa45",
  measurementId: "G-51G7NE56NH"
};
// where do i get the config values? from firebase console -> project settings -> general -> your apps -> firebase sdk snippet -> config

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
