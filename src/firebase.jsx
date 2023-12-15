import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBn8d47PzOG8tbLggjZ0xxZlFawZ8V3U04",
  authDomain: "bloody-trail-f261d.firebaseapp.com",
  projectId: "bloody-trail-f261d",
  storageBucket: "bloody-trail-f261d.appspot.com",
  messagingSenderId: "147799660061",
  appId: "1:147799660061:web:1bf0bb7e1b0628a7fbd8f4",
  measurementId: "G-M43J4ERX2V"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

// firebase on shwetaxgupta222222@gmail.com