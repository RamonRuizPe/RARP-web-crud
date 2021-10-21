// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUgQBeG78C2u4YJhcxM2c7zfVjp7yMATE",
  authDomain: "rarp-web-crud.firebaseapp.com",
  projectId: "rarp-web-crud",
  storageBucket: "rarp-web-crud.appspot.com",
  messagingSenderId: "1086232820276",
  appId: "1:1086232820276:web:353126ae6b581cfc9f2861"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
