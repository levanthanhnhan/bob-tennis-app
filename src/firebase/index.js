import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDFuuGYA891OXuOij4kopZBdvEuHqWATdQ",
    authDomain: "bobtennisclub.firebaseapp.com",
    projectId: "bobtennisclub",
    storageBucket: "bobtennisclub.appspot.com",
    messagingSenderId: "696198273440",
    appId: "1:696198273440:web:311c7068fccb5cb26cecc5",
    measurementId: "G-KHC4L0W84K"
};  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize firebase auth
const auth = getAuth()
auth.settings.appVerificationDisabledForTesting = true;
auth.useDeviceLanguage();

const storage = getStorage(app);

export { app, auth, storage }