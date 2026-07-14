import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCBgEIte0G_aRe5bVYCdUGyno_IigrXVqw",
    authDomain: "proyecto-react-6b6ee.firebaseapp.com",
    projectId: "proyecto-react-6b6ee",
    storageBucket: "proyecto-react-6b6ee.firebasestorage.app",
    messagingSenderId: "559025453929",
    appId: "1:559025453929:web:9a575e7c8002f3733edbf8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)