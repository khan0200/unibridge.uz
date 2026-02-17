// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCB-LoQW9wthVIf-5oUDt6VWWCvZsnNpKk",
    authDomain: "universities-74e90.firebaseapp.com",
    projectId: "universities-74e90",
    storageBucket: "universities-74e90.firebasestorage.app",
    messagingSenderId: "662966777687",
    appId: "1:662966777687:web:3f57bb5c5e888fa9c8f012"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth (for admin access)
export const auth = getAuth(app);

export default app;
