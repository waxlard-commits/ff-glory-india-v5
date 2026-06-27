// =====================================
// FF Glory India V5 - app.js
// Part 1
// =====================================

import { auth, db } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ======================
// LOGIN
// ======================

window.login = async () => {

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  try {

    await signInWithEmailAndPassword(auth, email, password);

    window.location.href = "dashboard.html";

  } catch (error) {

    alert(error.message);

  }

};

// ======================
// SIGNUP
// ======================

window.signup = async () => {

  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  try {

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    await setDoc(
      doc(db, "users", userCredential.user.uid),
      {
        email: email,
        basicCard: 0,
        premiumCard: 0,
        role: "user"
      }
    );

    window.location.href = "dashboard.html";

  } catch (error) {

    alert(error.message);

  }

};
// ======================
// SESSION CHECK
// ======================

onAuthStateChanged(auth, (user) => {

  const page = window.location.pathname;

  // Agar dashboard par ho aur login nahi hai
  if (page.includes("dashboard.html") && !user) {
    window.location.href = "index.html";
  }

});

// ======================
// LOGOUT
// ======================

window.logout = async () => {

  try {

    await signOut(auth);

    window.location.href = "index.html";

  } catch (error) {

    alert(error.message);

  }

};

// ======================
// END
// ======================
