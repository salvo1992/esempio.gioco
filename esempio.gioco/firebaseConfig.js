// firebaseConfig.js
// Configurazione Firebase usando variabili ambiente (.env)
import 'react-native-get-random-values';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} from '@env';

// Configurazione ottenuta da variabili ambiente
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);

// Inizializza Auth per React Native con persistenza AsyncStorage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Esporta Firestore
export const db = getFirestore(app);

// Funzioni utili per autenticazione (import dinamico per evitare hoisting)
export function register(email, password) {
  const { createUserWithEmailAndPassword } = require('firebase/auth');
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  const { signInWithEmailAndPassword } = require('firebase/auth');
  return signInWithEmailAndPassword(auth, email, password);
}
