import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwHp5glBHkE24mk2RRoxrW6bo-pcoCpb8",
  authDomain: "aravind-demo.firebaseapp.com",
  projectId: "aravind-demo",
  storageBucket: "aravind-demo.appspot.com",
  messagingSenderId: "28539537807",
  appId: "1:28539537807:web:dc635ad9085f82d2eae3fa",
  measurementId: "G-071GXNZVGM",
};

const app = firebase.initializeApp(firebaseConfig);

export default app;
