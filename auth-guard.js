// auth-guard.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBv-xD01wnfE1j6h3uUwVHEyVFFLiJwqsM",
  authDomain: "unique-23397.firebaseapp.com",
  projectId: "unique-23397",
  storageBucket: "unique-23397.firebasestorage.app",
  messagingSenderId: "241434072059",
  appId: "1:241434072059:web:52faf6daba2fb9d3dcb15e",
  measurementId: "G-87TW06ZTZY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    // Not logged in → redirect to login
    const redirectUrl = encodeURIComponent(window.location.pathname);
    window.location.href = `login.html?redirect=${redirectUrl}`;
    return;
  }

  try {
    // Get role from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      console.warn("⚠️ User role not found, logging out.");
      await signOut(auth);
      window.location.href = "login.html";
      return;
    }

    const role = userDoc.data().role;
    const path = window.location.pathname;

    // === Role-based protection ===
    if (role === "staff") {
      // Staff can only access staff pages
      if (path.includes("admin-") || path.includes("analytics") || path.includes("expense") || path.includes("staff-managment")) {
        console.warn("🚫 Staff cannot access admin pages. Redirecting...");
        window.location.href = "index.html";
      }
    }
    // Admin → full access, no restriction

  } catch (err) {
    console.error("Error fetching user role:", err);
    window.location.href = "login.html";
  }
});
