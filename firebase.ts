// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDN-pFMZi7f_EwIHN_MI-FlTie1eosLYlQ",
  authDomain: "myblog-59abb.firebaseapp.com",
  projectId: "myblog-59abb",
  storageBucket: "myblog-59abb.appspot.com",
  messagingSenderId: "331521501650",
  appId: "1:331521501650:web:270fdbc16c13fbf1dd400b",
  measurementId: "G-VF5M7W13J0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
