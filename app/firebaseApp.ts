// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnXeOeAOT72RFEamU8MiiiENJGX-JGsaM",
  authDomain: "nordic-instagram-3fcc9.firebaseapp.com",
  projectId: "nordic-instagram-3fcc9",
  storageBucket: "nordic-instagram-3fcc9.appspot.com",
  messagingSenderId: "1079231964534",
  appId: "1:1079231964534:web:979816a45389159c278657",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
