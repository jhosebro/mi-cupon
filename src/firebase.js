import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDaYrwk9t-NQ6DEJdZRrC_clCirRcsJ7lc",
  authDomain: "micupon-29032.firebaseapp.com",
  projectId: "micupon-29032",
  storageBucket: "micupon-29032.appspot.com",
  messagingSenderId: "43823340935",
  appId: "1:43823340935:web:d1cd842fb03ef0c46e8722",
  measurementId: "G-X4T65C2CFG"
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const database = getDatabase(app);

export { database, ref, set };
