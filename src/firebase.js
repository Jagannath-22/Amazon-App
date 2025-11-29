// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; //  for image uploads

const firebaseConfig = {
  apiKey: "AIzaSyBRx1gFdUOwmoagA9U0U07eEOMaN4XHmE0",
  authDomain: "challenge-11226.firebaseapp.com",
  projectId: "challenge-11226",
  storageBucket: "challenge-11226.appspot.com",
  messagingSenderId: "783078091938",
  appId: "1:783078091938:web:9d6dbd4c98f38552317bfb",
  measurementId: "G-9Q3MYG0F9S",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); //  added

export { auth, db, storage }; // added
