import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKDRoZYIOP8z_VZGKYBTWRj-ZpwY4u5j4",
  authDomain: "dimarte-dashboard.firebaseapp.com",
  projectId: "dimarte-dashboard",
  storageBucket: "dimarte-dashboard.firebasestorage.app",
  messagingSenderId: "309673216827",
  appId: "1:309673216827:web:ec3f013038daaf7f64c51e",
  measurementId: "G-EWEP675HL9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };