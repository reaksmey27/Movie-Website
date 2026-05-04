import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCUbAGgFUKKWfRbMrP_SYQ41RO8D-CXajE",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "my-movie-app-b4609.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "my-movie-app-b4609",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "my-movie-app-b4609.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "224909798382",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:224909798382:web:8e0a66b4f6c002d6613cff",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-C0ND35GCSC",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
