import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA81mme3e9Vdx4rxnG23P6nsMRzk-I9o7Q",
  authDomain: "todoapp-9e386.firebaseapp.com",
  projectId: "todoapp-9e386",
  storageBucket: "todoapp-9e386.appspot.com",
  messagingSenderId: "164510235025",
  appId: "1:164510235025:web:94aa530b77507cfc8d4230"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);