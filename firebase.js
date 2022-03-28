// Import the functions you need from the SDKs you need
import {initializeApp}  from 'firebase/app';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc8NBflmkkjaM066yTsgk4f4HSSblzj38",
  authDomain: "universo-nextjs.firebaseapp.com",
  projectId: "universo-nextjs",
  storageBucket: "universo-nextjs.appspot.com",
  messagingSenderId: "1090277916262",
  appId: "1:1090277916262:web:03833e74483c7797f3f7a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export {auth};

