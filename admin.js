import { auth, db } from "./firebase.js";

import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

let selectedUser = null;

// ==========================
// ADMIN LOGIN CHECK
// ==========================

onAuthStateChanged(auth, async(user)=>{

if(!user){

window.location.href="index.html";
return;

}

document.getElementById("totalUsers").innerHTML="Loading...";
document.getElementById("pendingPayments").innerHTML="Loading...";

const users = await getDocs(collection(db,"users"));

document.getElementById("totalUsers").innerHTML=users.size;

const payments = await getDocs(collection(db,"payments"));

document.getElementById("pendingPayments").innerHTML=payments.size;

  // ==========================
// SEARCH USER
// ==========================

document.getElementById("searchBtn").onclick = async () => {

const email = document.getElementById("searchUser").value.trim();

if(email==""){
alert("Enter user email");
return;
}

const payments = await getDocs(collection(db,"payments"));

selectedUser = null;

payments.forEach((docSnap)=>{

const data = docSnap.data();

if(data.email===email){

selectedUser = docSnap.id;

document.getElementById("userEmail").innerHTML=data.email;

document.getElementById("userUTR").innerHTML=data.utr;

document.getElementById("userStatus").innerHTML=data.status;

const img=document.getElementById("paymentImage");

img.src=data.screenshot;

img.style.display="block";

}

});

if(selectedUser==null){

alert("User not found");

}

};
  // ==========================
// APPROVE PAYMENT
// ==========================

document.getElementById("approveBtn").onclick = async () => {

  if (!selectedUser) {
    alert("Please search a user first.");
    return;
  }

  const cardType = document.getElementById("cardType").value;
  const cardAmount = parseInt(document.getElementById("cardAmount").value);

  if (isNaN(cardAmount) || cardAmount <= 0) {
    alert("Enter a valid card amount.");
    return;
  }

  // Payment Status Update
  await updateDoc(doc(db, "payments", selectedUser), {
    status: "Approved"
  });

  // User Card Update
  const userRef = doc(db, "users", selectedUser);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {

    const data = userSnap.data();

    let basic = data.basicCard || 0;
    let premium = data.premiumCard || 0;

    if (cardType === "basic") {
      basic += cardAmount;
    } else {
      premium += cardAmount;
    }

    await updateDoc(userRef, {
      basicCard: basic,
      premiumCard: premium
    });

  }

  document.getElementById("userStatus").innerHTML = "Approved";

  alert("✅ Payment Approved Successfully");

};

// ==========================
// REJECT PAYMENT
// ==========================

document.getElementById("rejectBtn").onclick = async () => {

  if (!selectedUser) {
    alert("Please search a user first.");
    return;
  }

  await updateDoc(doc(db, "payments", selectedUser), {
    status: "Rejected"
  });

  document.getElementById("userStatus").innerHTML = "Rejected";

  alert("❌ Payment Rejected");

};
});
