import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBuN6OXJ1J9mKhQAolwzufU7lMmRJcBZTE",
    authDomain: "store-8058a.firebaseapp.com",
    projectId: "store-8058a",
    storageBucket: "store-8058a.appspot.com",
    messagingSenderId: "258156012375",
    appId: "1:258156012375:web:c78edf199bc01479fcd412",
    measurementId: "G-LHJLKJR4XD"
};

const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;