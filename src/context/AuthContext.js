import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useNotification } from "./NotificationContext";

const AuthContext = createContext();
const PROFILE_STORAGE_KEY = "movie_user_profiles";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

const getCurrentHostname = () => {
  if (typeof window === "undefined") {
    return "current host";
  }

  return window.location.hostname || "current host";
};

const readStoredProfiles = () => {
  try {
    const savedProfiles = localStorage.getItem(PROFILE_STORAGE_KEY);
    return savedProfiles ? JSON.parse(savedProfiles) : {};
  } catch {
    return {};
  }
};

const persistStoredProfiles = (profiles) => {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profiles));
};

const normalizeUser = (firebaseUser) => {
  if (!firebaseUser) {
    return null;
  }

  const fallbackName = firebaseUser.email?.split("@")[0] || "Movie Fan";

  return {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName || fallbackName,
    email: firebaseUser.email || "",
    avatar: firebaseUser.photoURL || "",
    photoURL: firebaseUser.photoURL || "",
    memberSince: firebaseUser.metadata?.creationTime
      ? new Date(firebaseUser.metadata.creationTime).toISOString()
      : new Date().toISOString(),
  };
};

const mergeUserProfile = (authUser, savedProfile) => {
  if (!authUser) {
    return null;
  }

  return {
    ...authUser,
    name: savedProfile?.name?.trim() || authUser.name,
    bio: savedProfile?.bio || "",
    location: savedProfile?.location || "",
    favoriteGenre: savedProfile?.favoriteGenre || "",
    memberSince: savedProfile?.memberSince || authUser.memberSince,
    updatedAt: savedProfile?.updatedAt || null,
  };
};

const getFirebaseErrorMessage = (error) => {
  switch (error?.code) {
    case "auth/popup-closed-by-user":
      return "Google sign-in was closed before it finished.";
    case "auth/cancelled-popup-request":
      return "A sign-in popup is already open.";
    case "auth/popup-blocked":
      return "Your browser blocked the Google popup. Please allow popups and try again.";
    case "auth/operation-not-allowed":
      return "Google sign-in is not enabled in your Firebase Authentication settings yet.";
    case "auth/configuration-not-found":
      return "Firebase Authentication can't find a Google sign-in configuration for this project.";
    case "auth/unauthorized-domain":
      return `This domain (${getCurrentHostname()}) is not authorized in Firebase Authentication. Add it in Firebase Console -> Authentication -> Settings -> Authorized domains.`;
    case "auth/app-not-authorized":
      return `This Firebase app or API key is not authorized for Authentication on ${getCurrentHostname()}.`;
    case "auth/invalid-api-key":
      return "Your Firebase API key is invalid for this project.";
    case "auth/network-request-failed":
      return "A network error interrupted Google sign-in. Please try again.";
    case "auth/web-storage-unsupported":
      return "This browser blocks the storage Firebase Auth needs for popup sign-in.";
    case "auth/operation-not-supported-in-this-environment":
      return "Google popup sign-in requires the app to run on http:// or https://.";
    default:
      return error?.message || "We couldn't sign you in with Google right now.";
  }
};

export const AuthProvider = ({ children }) => {
  const { showNotification } = useNotification();
  const [authUser, setAuthUser] = useState(null);
  const [user, setUser] = useState(null);
  const [profileOverrides, setProfileOverrides] = useState(() => readStoredProfiles());
  const [loading, setLoading] = useState(true);
  const [authenticating, setAuthenticating] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setAuthUser(normalizeUser(firebaseUser));
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    persistStoredProfiles(profileOverrides);
  }, [profileOverrides]);

  useEffect(() => {
    if (!authUser) {
      setUser(null);
      return;
    }

    setUser(mergeUserProfile(authUser, profileOverrides[authUser.uid]));
  }, [authUser, profileOverrides]);

  const signInWithGoogle = useCallback(async () => {
    setAuthenticating(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const nextAuthUser = normalizeUser(result.user);
      const nextUser = mergeUserProfile(
        nextAuthUser,
        profileOverrides[nextAuthUser.uid],
      );

      setAuthUser(nextAuthUser);
      setUser(nextUser);
      showNotification(`Welcome back, ${nextUser.name}!`, "success");

      return nextUser;
    } catch (error) {
      console.error("[firebase-auth] Google sign-in failed", {
        code: error?.code,
        message: error?.message,
        customData: error?.customData,
      });
      const details = error?.code ? ` (${error.code})` : "";
      showNotification(`${getFirebaseErrorMessage(error)}${details}`, "error");
      return null;
    } finally {
      setAuthenticating(false);
    }
  }, [profileOverrides, showNotification]);

  const updateProfile = useCallback((updates) => {
    if (!authUser?.uid) {
      return null;
    }

    const nextSavedProfile = {
      ...profileOverrides[authUser.uid],
      ...updates,
      memberSince: profileOverrides[authUser.uid]?.memberSince || authUser.memberSince,
      updatedAt: new Date().toISOString(),
    };

    setProfileOverrides((prev) => ({
      ...prev,
      [authUser.uid]: nextSavedProfile,
    }));

    return mergeUserProfile(authUser, nextSavedProfile);
  }, [authUser, profileOverrides]);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setAuthUser(null);
      setUser(null);
      showNotification("You've been signed out safely.", "info");
      return true;
    } catch {
      showNotification("We couldn't sign you out right now.", "error");
      return false;
    }
  }, [showNotification]);

  const value = useMemo(
    () => ({
      user,
      loading,
      authenticating,
      signInWithGoogle,
      logout,
      updateProfile,
      isAuthenticated: Boolean(user),
    }),
    [authenticating, loading, logout, signInWithGoogle, updateProfile, user],
  );

  return createElement(AuthContext.Provider, { value }, children);
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
