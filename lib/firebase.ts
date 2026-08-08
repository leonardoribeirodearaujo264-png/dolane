/**
 * Firebase client initialization.
 *
 * Only the public web-app config lives here — these values are designed to be
 * shipped to the browser and are protected by Firebase Security Rules, not by
 * secrecy. Never put an Admin SDK service account, private key or any server
 * credential in this file or anywhere under /lib that the client can import.
 *
 * The app runs perfectly well with Firebase unconfigured: every helper below
 * returns null, and callers fall back to their other paths.
 */
import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId && config.appId);

export function getFirebaseApp(): FirebaseApp | null {
  if (!isFirebaseConfigured) return null;
  return getApps().length ? getApp() : initializeApp(config as Required<typeof config>);
}

export function getDb(): Firestore | null {
  const app = getFirebaseApp();
  return app ? getFirestore(app) : null;
}

export function getBucket(): FirebaseStorage | null {
  const app = getFirebaseApp();
  return app ? getStorage(app) : null;
}

/** Firestore collection that quote requests are written to. */
export const QUOTES_COLLECTION = 'quoteRequests';
