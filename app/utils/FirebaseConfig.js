// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD59itTxLqhMjZ4wuTD_11uqmZHz7jEGpw",
  authDomain: "ev-charging-application-fb.firebaseapp.com",
  projectId: "ev-charging-application-fb",
  storageBucket: "ev-charging-application-fb.appspot.com",
  messagingSenderId: "727906850076",
  appId: "1:727906850076:web:5a9b4773fc93998ef5d6d9",
  measurementId: "G-ST844R1S2M",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

