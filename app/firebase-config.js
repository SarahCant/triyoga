// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYrVDfV2oI4nyh9eRWx_eaIPvgoeNpuag",
  authDomain: "triyoga-bbaf1.firebaseapp.com",
  databaseURL: "https://triyoga-bbaf1-default-rtdb.firebaseio.com",
  projectId: "triyoga-bbaf1",
  storageBucket: "triyoga-bbaf1.firebasestorage.app",
  messagingSenderId: "596940906434",
  appId: "1:596940906434:web:d976596c8f763d1cfe005b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
