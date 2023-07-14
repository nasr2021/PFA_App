
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import "firebase/compat/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDa9jgmBJ-njgL5-zCf2bifm6tvxN0FJlo",
  authDomain: "trainee-4461d.firebaseapp.com",
  projectId: "trainee-4461d",
  storageBucket: "trainee-4461d.appspot.com",
  messagingSenderId: "920942852602",
  appId: "1:920942852602:web:9a16f33f52eff89d890c43",
  measurementId: "G-1P9N2ZK26N"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);

// Accéder à l'instance de la base de données Firestore
const db = firebase.firestore();

export { db };
const storage = firebase.storage();
const storageRef = storage.ref();
const auth = firebase.auth();
const fieldValue = firebase.firestore.FieldValue;
export { auth ,fieldValue,  storage, storageRef };

