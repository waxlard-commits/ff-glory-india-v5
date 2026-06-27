// ================================
// FF Glory India V5 - app.js Part 1
// ================================

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

// ================================
// LOGIN
// ================================

window.login = async function () {

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Please Enter Email & Password");
    return;
  }

  try {

    await signInWithEmailAndPassword(auth, email, password);

    alert("Login Successful");

    window.location.href = "dashboard.html";

  } catch (error) {

    alert(error.message);

  }

};

// ================================
// SIGNUP
// ================================

window.signup = async function () {

  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;

  if (!email || !password) {
    alert("Please Enter Email & Password");
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

    alert("Account Created Successfully");

    window.location.href = "dashboard.html";

  } catch (error) {

    alert(error.message);

  }

};
// ================================
// LOGIN CHECK
// ================================

onAuthStateChanged(auth, (user) => {

  if (window.location.pathname.includes("dashboard.html")) {

    if (!user) {
      window.location.href = "index.html";
    }

  }

});

// ================================
// LOGOUT
// ================================

window.logout = async function () {

  try {

    await signOut(auth);

    alert("Logged Out Successfully");

    window.location.href = "index.html";

  } catch (error) {

    alert(error.message);

  }

};

// ================================
// END OF APP.JS
// ================================
