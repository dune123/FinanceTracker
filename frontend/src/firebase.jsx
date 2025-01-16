// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider} from "firebase/auth"
import { getFirestore,doc,setDoc} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtjbLCi0nfmOmvw60hCclMHHwv3JEL5BU",
  authDomain: "personalfinancetracker-369f2.firebaseapp.com",
  projectId: "personalfinancetracker-369f2",
  storageBucket: "personalfinancetracker-369f2.firebasestorage.app",
  messagingSenderId: "385592819559",
  appId: "1:385592819559:web:a3693eab8ba5147a15f9c2",
  measurementId: "G-HT0XSXQL83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
export { db,auth,provider,doc,setDoc}