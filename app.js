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
      await createUserWithEmailAndPassword(auth, email, password);

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
