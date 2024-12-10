import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your firebaseConfig from Firebase Console here
const firebaseConfig = {
    apiKey: "AIzaSyCLKQdyU-yprtObsU9rn5sk7shMNH-xX-Y",
    authDomain: "summative-28d73.firebaseapp.com",
    projectId: "summative-28d73",
    storageBucket: "summative-28d73.firebasestorage.app",
    messagingSenderId: "215705894364",
    appId: "1:215705894364:web:16d5363cb55eba9187e319"
  };

const config = initializeApp(firebaseConfig)
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore };