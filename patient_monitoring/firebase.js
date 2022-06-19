import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
// Add your web app's Firebase configuration
  };

// Initialize firebase
export const app = initializeApp(firebaseConfig);
// MARK: Firestore Reference
export const db = getFirestore(app);
const auth = getAuth(app);
export {auth};
