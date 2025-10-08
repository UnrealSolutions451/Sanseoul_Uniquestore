// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBv-xD01wnfE1j6h3uUwVHEyVFFLiJwqsM",
  authDomain: "unique-23397.firebaseapp.com",
  projectId: "unique-23397",
  storageBucket: "unique-23397.firebasestorage.app",
  messagingSenderId: "241434072059",
  appId: "1:241434072059:web:52faf6daba2fb9d3dcb15e",
  measurementId: "G-87TW06ZTZY"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Firestore
export const db = getFirestore(app);

// Auth
const auth = getAuth(app);

// Auto sign in anonymously
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("✅ Signed in anonymously with UID:", user.uid);
  } else {
    signInAnonymously(auth)
      .then(() => console.log("🔑 Signed in anonymously"))
      .catch(err => console.error("Auth error:", err));
  }
});

export { auth };
