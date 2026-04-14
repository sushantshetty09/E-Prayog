import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.replace(/"/g, ''),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.replace(/"/g, ''),
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.replace(/"/g, ''),
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET?.replace(/"/g, ''),
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID?.replace(/"/g, ''),
  appId: import.meta.env.VITE_FIREBASE_APP_ID?.replace(/"/g, ''),
};

if (!firebaseConfig.apiKey || firebaseConfig.apiKey === '""' || firebaseConfig.apiKey.includes('VITE_')) {
  console.warn('Firebase keys missing. Using dummy config to prevent React crash.');
  firebaseConfig.apiKey = 'dummy-api-key-to-prevent-crash';
  firebaseConfig.authDomain = 'dummy.firebaseapp.com';
  firebaseConfig.projectId = 'dummy-project';
  firebaseConfig.storageBucket = 'dummy.appspot.com';
  firebaseConfig.messagingSenderId = '123456789';
  firebaseConfig.appId = '1:123456789:web:abcdef123456';
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
