import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCAWFOkpTPJUdcVCk4p3l0PMMOBMnknb4w",
    authDomain: "social-book-sharing.firebaseapp.com",
    projectId: "social-book-sharing",
    storageBucket: "social-book-sharing.appspot.com",
    messagingSenderId: "536389215256",
    appId: "1:536389215256:web:adcaf8685a0b9239da0f6d",
    measurementId: "G-5Y87WLR8PD"
};

const app = initializeApp(firebaseConfig);

// Firebase storage reference
const storage = getStorage(app);
export default storage;

export const auth = getAuth(app);

export const db = getFirestore(app);