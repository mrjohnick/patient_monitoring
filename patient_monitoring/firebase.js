import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB8Oe5I5QFGCO9tAq116zNGAoJEFybDil8",
    authDomain: "assignment-2-dd816.firebaseapp.com",
    projectId: "assignment-2-dd816",
    storageBucket: "assignment-2-dd816.appspot.com",
    messagingSenderId: "29562992605",
    appId: "1:29562992605:web:e100505fd82d81e9ba2834"
  };

// Initialize firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth};
