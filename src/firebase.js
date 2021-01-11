// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCTxJJ4EzE-kV7lV7lhJPgcalBD5yY1NfU",
  authDomain: "challenge-7df2f.firebaseapp.com",
  projectId: "challenge-7df2f",
  storageBucket: "challenge-7df2f.appspot.com",
  messagingSenderId: "3353409509",
  appId: "1:3353409509:web:2c112f7eac380635dfe10c",
  measurementId: "G-RPD8SKT07F",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
