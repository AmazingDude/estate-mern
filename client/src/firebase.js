// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "ai-trip-planner-f9b72.firebaseapp.com",
    projectId: "ai-trip-planner-f9b72",
    storageBucket: "ai-trip-planner-f9b72.firebasestorage.app",
    messagingSenderId: "775612952896",
    appId: "1:775612952896:web:0bf5757746384f35260aa5",
    measurementId: "G-P8BKGFE07X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);