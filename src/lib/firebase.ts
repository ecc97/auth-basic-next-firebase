// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzsWWxXAMr5MtZOxyJAcvxhKdoJkFOLiI",
  authDomain: "auth-nextjs-5cdf2.firebaseapp.com",
  projectId: "auth-nextjs-5cdf2",
  storageBucket: "auth-nextjs-5cdf2.firebasestorage.app",
  messagingSenderId: "178567337754",
  appId: "1:178567337754:web:7ecace0f133cf870c17ea3",
  measurementId: "G-DTDS6439R8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);