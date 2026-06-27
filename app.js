// ================================
// FF Glory India V5 - app.js Part 1
// ================================

import {
  auth
} from "./firebase.js";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

window.login = async function () {

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Please enter Email & Password");
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
// Signup
// ================================

window.signup = async function () {

  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;

  if (!email || !password) {
    alert("Please enter Email & Password");
    return;
  }

  try {

    await createUserWithEmailAndPassword(auth, email, password);

    alert("Account Created Successfully");

    window.location.href = "dashboard.html";

  } catch (error) {

    alert(error.message);

  }

};
// ================================
// Login Check + Logout
// ================================

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

window.logout = async function () {
  try {
    await signOut(auth);
    alert("Logged Out Successfully");
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
  }
};

// Agar user login hai to dashboard allow karo
onAuthStateChanged(auth, (user) => {

  if (window.location.pathname.includes("dashboard.html")) {

    if (!user) {
      window.location.href = "index.html";
    }

  }

});
