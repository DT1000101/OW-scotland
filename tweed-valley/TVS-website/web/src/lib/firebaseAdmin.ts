// Server-side Firebase Admin SDK. Used in API routes for privileged operations
// (verifying ID tokens, reading/writing as admin). Returns null if the service
// account env vars are not set yet.

import {
  getApps,
  initializeApp,
  cert,
  getApp,
  type App,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function getServiceAccount() {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!projectId || !clientEmail || !privateKey) return null;
  return { projectId, clientEmail, privateKey };
}

let adminApp: App | null = null;

export function getAdmin() {
  const sa = getServiceAccount();
  if (!sa) return null;
  if (!adminApp) {
    adminApp = getApps().length
      ? getApp()
      : initializeApp({ credential: cert(sa) });
  }
  return {
    app: adminApp,
    auth: getAuth(adminApp),
    db: getFirestore(adminApp),
  };
}
