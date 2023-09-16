// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABWLKk8GAkoNkmEs0I7T1Q3WnBX6E6F_k",
  authDomain: "veride-d5cf8.firebaseapp.com",
  databaseURL: "https://veride-d5cf8-default-rtdb.firebaseio.com",
  projectId: "veride-d5cf8",
  storageBucket: "veride-d5cf8.appspot.com",
  messagingSenderId: "145441014616",
  appId: "1:145441014616:web:e7a212704526225e1d5b2d",
  measurementId: "G-T8S7Y3J4GE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);