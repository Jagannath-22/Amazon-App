import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import products from "../data/products.js";


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
const db = getFirestore(app);

const uploadProducts = async () => {
  const productRef = collection(db, "products");

  for (const product of products) {
    try {
      await addDoc(productRef, product);
      console.log(`✅ Uploaded: ${product.title}`);
    } catch (error) {
      console.error(`❌ Error uploading ${product.title}`, error);
    }
  }

  console.log("✅ All products uploaded!");
};

uploadProducts();
