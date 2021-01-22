import firebase from "firebase/app";
import "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCcZGKDOiNpwoEkfLxdsKWNLtZmEYipvZE",
  authDomain: "ad-rebate2020.firebaseapp.com",
  projectId: "ad-rebate2020",
  storageBucket: "ad-rebate2020.appspot.com",
  messagingSenderId: "232463419755",
  appId: "1:232463419755:web:58512a957beefe3fc5e42e",
  measurementId: "G-37C30FHGQS",
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { db, app };
