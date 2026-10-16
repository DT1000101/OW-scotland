"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { getFirebase, isFirebaseConfigured } from "@/lib/firebase";

export type Role = "rider" | "marshal" | "admin";

export type Profile = {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: Role;
  // Rider essentials, collected on the details page after first login.
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string; // ISO yyyy-mm-dd, used for age/category
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  medicalNotes?: string;
  detailsCompletedAt?: unknown;
  waiverSignedAt?: unknown;
  briefingCompletedAt?: unknown;
  qrCode?: string | null;
};

type AuthState = {
  configured: boolean;
  loading: boolean;
  user: User | null;
  profile: Profile | null;
  isAdmin: boolean;
  signInGoogle: () => Promise<void>;
  signInEmail: (email: string, password: string) => Promise<void>;
  signUpEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const configured = isFirebaseConfigured();
  const [loading, setLoading] = useState(configured);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  async function loadProfile(u: User) {
    const fb = getFirebase();
    if (!fb) return;
    const ref = doc(fb.db, "users", u.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      const fresh: Profile = {
        uid: u.uid,
        email: u.email,
        displayName: u.displayName,
        role: "rider",
        qrCode: null,
      };
      await setDoc(ref, { ...fresh, createdAt: serverTimestamp() });
      setProfile(fresh);
    } else {
      setProfile({ uid: u.uid, ...(snap.data() as Omit<Profile, "uid">) });
    }
  }

  useEffect(() => {
    const fb = getFirebase();
    if (!fb) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(fb.auth, async (u) => {
      setUser(u);
      if (u) {
        await loadProfile(u);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  async function signInGoogle() {
    const fb = getFirebase();
    if (!fb) throw new Error("Auth not configured");
    await signInWithPopup(fb.auth, new GoogleAuthProvider());
  }
  async function signInEmail(email: string, password: string) {
    const fb = getFirebase();
    if (!fb) throw new Error("Auth not configured");
    await signInWithEmailAndPassword(fb.auth, email, password);
  }
  async function signUpEmail(email: string, password: string) {
    const fb = getFirebase();
    if (!fb) throw new Error("Auth not configured");
    await createUserWithEmailAndPassword(fb.auth, email, password);
  }
  async function signOut() {
    const fb = getFirebase();
    if (!fb) return;
    await fbSignOut(fb.auth);
  }
  async function refreshProfile() {
    if (user) await loadProfile(user);
  }

  const value: AuthState = {
    configured,
    loading,
    user,
    profile,
    isAdmin: profile?.role === "admin",
    signInGoogle,
    signInEmail,
    signUpEmail,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
