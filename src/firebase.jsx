import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBMWHGB_Befy54gpkkeaED_vItzKDkUHNA",
    authDomain: "bloody-trail.firebaseapp.com",
    projectId: "bloody-trail",
    storageBucket: "bloody-trail.appspot.com",
    messagingSenderId: "413245749310",
    appId: "1:413245749310:web:43085d21cc35ffcafe396f",
    measurementId: "G-X084EWL7B3"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();