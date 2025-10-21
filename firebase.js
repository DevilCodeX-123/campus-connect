// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuf_YF2GbKtXLsXXv4pPUQig47Q3etDPY",
  authDomain: "clg-crush.firebaseapp.com",
  projectId: "clg-crush",
  storageBucket: "clg-crush.firebasestorage.app",
  messagingSenderId: "981031420249",
  appId: "1:981031420249:web:18c45a4c31e038a3cb0c48",
  measurementId: "G-99CXC07KT5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
