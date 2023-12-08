// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChTeyiHvh6vUlzOrn5oL_Fdmtz6rhneKo",
  authDomain: "react-flashcards-88e9e.firebaseapp.com",
  projectId: "react-flashcards-88e9e",
  storageBucket: "react-flashcards-88e9e.appspot.com",
  messagingSenderId: "632298409107",
  appId: "1:632298409107:web:9f6ea7acef1135a9109166",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentification = getAuth(app);
export const db = getFirestore(app);
