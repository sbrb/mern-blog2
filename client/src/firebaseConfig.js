import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDeUpWmJ6RYn-t4ihNpfxajKTMuQhNBBQ4",
  authDomain: "mblog-21826.firebaseapp.com",
  projectId: "mblog-21826",
  storageBucket: "mblog-21826.appspot.com",
  messagingSenderId: "529751036419",
  appId: "1:529751036419:web:d59e0a8b5a54ea5084f436"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth};
