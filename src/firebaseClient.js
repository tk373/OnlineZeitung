import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0EMpvxnDYm5DeDwCeK7JpyFdwdwfxZus",
  authDomain: "d-poscht.firebaseapp.com",
  projectId: "d-poscht",
  storageBucket: "d-poscht.appspot.com",
  messagingSenderId: "1059315923984",
  appId: "1:1059315923984:web:f4ef397bd167036e9a1e95",
  measurementId: "G-PTW451HZ5S"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };