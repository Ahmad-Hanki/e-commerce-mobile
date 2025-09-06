import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import {
  //   @ts-ignore
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const provider = new GoogleAuthProvider();

// first step: go to firebase console
// https://console.firebase.google.com/u/0/?_gl=1*a4sqbq*_ga*MTUwMzQ4ODUwOS4xNzQwMTY1Nzgx*_ga_CW55HF8NVT*czE3NTcxNTA0MTckbzMwJGcxJHQxNzU3MTUyNzIwJGo0MSRsMCRoMA..

// second:step: create a project
// third step: Add new web app

// fourth step: go to apps general settings and copy the config and paste it here

// fifth step:in build right nav tab, go to authentication tab and enable google sign in method and email and password method

// sixth step: copy the client id from firebase google auth method and add it to your .env file


