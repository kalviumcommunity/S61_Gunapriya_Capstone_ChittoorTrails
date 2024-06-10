// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFZtSh6wvntHxRQKyBe4Xp1QfHstfByBU",
  authDomain: "chittoor-trails.firebaseapp.com",
  projectId: "chittoor-trails",
  storageBucket: "chittoor-trails.appspot.com",
  messagingSenderId: "861942143102",
  appId: "1:861942143102:web:b51b26c94069759a89e02f",
  measurementId: "G-XPW5CNLQK5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { app, auth }