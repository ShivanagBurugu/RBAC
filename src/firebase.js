// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP2cnLTt28kQI3hZr8ANnFTN4mEgAAa6o",
  authDomain: "rbac-9b193.firebaseapp.com",
  projectId: "rbac-9b193",
  storageBucket: "rbac-9b193.firebasestorage.app",
  messagingSenderId: "483216871734",
  appId: "1:483216871734:web:e704d6344563c70cb62397",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
