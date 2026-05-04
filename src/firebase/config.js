import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const fallbackFirebaseConfig = {
  apiKey: "AIzaSyCUbAGgFUKKWfRbMrP_SYQ41RO8D-CXajE",
  authDomain: "my-movie-app-b4609.firebaseapp.com",
  projectId: "my-movie-app-b4609",
  storageBucket: "my-movie-app-b4609.firebasestorage.app",
  messagingSenderId: "224909798382",
  appId: "1:224909798382:web:8e0a66b4f6c002d6613cff",
  measurementId: "G-C0ND35GCSC",
};

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || fallbackFirebaseConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || fallbackFirebaseConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || fallbackFirebaseConfig.projectId,
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || fallbackFirebaseConfig.storageBucket,
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || fallbackFirebaseConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || fallbackFirebaseConfig.appId,
  measurementId:
    import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || fallbackFirebaseConfig.measurementId,
};

const missingFirebaseEnvKeys = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
].filter((envKey) => !import.meta.env[envKey]);

if (missingFirebaseEnvKeys.length > 0) {
  console.warn(
    `[firebase] Missing env vars: ${missingFirebaseEnvKeys.join(
      ", ",
    )}. Using fallback project "${firebaseConfig.projectId}". If Google sign-in fails with auth/unauthorized-domain, add your current host in Firebase Console or set your own Firebase env vars.`,
  );
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
