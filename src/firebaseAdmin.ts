import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

let initialized = false;

export async function initializeFirebaseOnce() {
  if (initialized || admin.apps.length > 0) {
    return;
  }
  const adminCredentials = Buffer.from(process.env.FIREBASE_ADMIN_CREDENTIALS!, 'base64').toString('utf-8');
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(adminCredentials)),
  });
  initialized = true;
}
