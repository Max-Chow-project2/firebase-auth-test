// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from 'firebase/database';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyDnyhIK3w-ZCgr5Mypm7oty_jbRo8Yg-VE",
  authDomain: "apestats-97f99.firebaseapp.com",
  databaseURL: "https://apestats-97f99-default-rtdb.firebaseio.com",
  projectId: "apestats-97f99",
  storageBucket: "apestats-97f99.appspot.com",
  messagingSenderId: "425459824225",
  appId: "1:425459824225:web:b99a2cc26d380fbbc6dc20"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseDB = getDatabase(firebaseApp);

// Firebase auth
export const auth = getAuth(firebaseApp);
export const provider = new GoogleAuthProvider();
export default firebaseApp;