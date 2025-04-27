// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-EUQJ3fvDFP8RGBk8cjYjMaqpxCrJP1A",
  authDomain: "ecommerces-ce0ff.firebaseapp.com",
  projectId: "ecommerces-ce0ff",
  storageBucket: "ecommerces-ce0ff.firebasestorage.app",
  messagingSenderId: "447017972148",
  appId: "1:447017972148:web:f6f340ee8cf3be226142e1",
  measurementId: "G-8SW3QLE5JS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
