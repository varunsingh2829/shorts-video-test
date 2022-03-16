// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import config from'./config.json'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


firebase.initializeApp(config);
let provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const Signwithgoogle =() =>{
    auth.signInWithPopup(provider);
};
export const firestore = firebase.firestore();

// Initialize Firebase
export default firebase;