// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRkIrvdGkaALpqqVF84PkV6AMmO6B_I0Q",
  authDomain: "private-naukri-37d23.firebaseapp.com",
  projectId: "private-naukri-37d23",
  storageBucket: "private-naukri-37d23.appspot.com",
  messagingSenderId: "628309949486",
  appId: "1:628309949486:web:f9634993964d9258d7f3bf",
  measurementId: "G-65DJGTPQPB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
