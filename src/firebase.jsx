import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    // databaseURL: "https://bloody-trail-default-rtdb.firebaseio.com",
    apiKey: "AIzaSyDX6UiV5onuw4X5vQ7GfOaUmNE96HaCAdE",
    authDomain: "bloody-trail-dd6b8.firebaseapp.com",
    projectId: "bloody-trail-dd6b8",
    storageBucket: "bloody-trail-dd6b8.appspot.com",
    messagingSenderId: "630199282841",
    appId: "1:630199282841:web:14a6adadbdd20f4b2f1c08",
    measurementId: "G-85S70C1JCR"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

// firebase on shwetaxgupta222222@gmail.com