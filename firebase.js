// Import the functions you need from the SDKs you need
//import * as firebase from "firebase
//import * as firebase from "firebase/app";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// cada produto do firebase deve ser importad separadamente
//por exemplo auth de autenticação
import "firebase/compat/auth";

import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbHw6ebaXC8S6jS-ovWBvcNurq7FmyJMs",

  authDomain: "atividademil-e19b9.firebaseapp.com",

  projectId: "atividademil-e19b9",

  storageBucket: "atividademil-e19b9.appspot.com",

  messagingSenderId: "624646999256",

  appId: "1:624646999256:web:f28168f8bc52cfb0addbad",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();
export { auth, firestore };
