// // src/firebase/firebase.ts
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDuf_YF2GbKtXLsXXv4pPUQig47Q3etDPY",
//   authDomain: "clg-crush.firebaseapp.com",
//   projectId: "clg-crush",
//   storageBucket: "clg-crush.firebasestorage.app",
//   messagingSenderId: "981031420249",
//   appId: "1:981031420249:web:18c45a4c31e038a3cb0c48"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuf_YF2GbKtXLsXXv4pPUQig47Q3etDPY",
  authDomain: "clg-crush.firebaseapp.com",
  projectId: "clg-crush",
  storageBucket: "clg-crush.firebasestorage.app",
  messagingSenderId: "981031420249",
  appId: "1:981031420249:web:18c45a4c31e038a3cb0c48"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Recaptcha के लिए
export const appVerifier = (containerId: string) => {
  return new (window as any).RecaptchaVerifier(containerId, {
    size: "invisible",
  }, auth);
};
