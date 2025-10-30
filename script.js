import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCAoiScK646UlrIVv-95ESRcq6_XoQlzlQ",
  authDomain: "geofs-flight-portal.firebaseapp.com",
  projectId: "geofs-flight-portal",
  storageBucket: "geofs-flight-portal.appspot.com",
  messagingSenderId: "1010902883617",
  appId: "1:1010902883617:web:42ef7667c1d7f035f23260",
  measurementId: "G-5RJK55LRVD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get Discord token from URL
const hash = window.location.hash;
if (hash.includes("access_token")) {
  const token = new URLSearchParams(hash.substring(1)).get("access_token");

  fetch("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(user => {
      const username = `${user.username}#${user.discriminator}`;
      localStorage.setItem("username", username);
      document.getElementById("username").value = username;
    })
    .catch(err => {
      alert("Failed to fetch Discord user: " + err.message);
    });
} else {
  document.getElementById("username").value = localStorage.getItem("username") || "Unknown";
}

// Submit flight log
document.getElementById("flightForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    airline: document.getElementById("airline").value,
    flightNumber: document.getElementById("flightNumber").value,
    username: document.getElementById("username").value,
    aircraft: document.getElementById("aircraft").value,
    departureICAO: document.getElementById("departureICAO").value,
    scheduledDeparture: new Date(document.getElementById("scheduledDeparture").value),
    actualDeparture: new Date(document.getElementById("actualDeparture").value),
    arrivalICAO: document.getElementById("arrivalICAO").value,
    scheduledArrival: new Date(document.getElementById("scheduledArrival").value),
    actualArrival: new Date(document.getElementById("actualArrival").value),
    notes: document.getElementById("notes").value,
    timestamp: new Date()
  };

  try {
    await addDoc(collection(db, "flightLogs"), data);
    alert("Flight logged successfully!");
    e.target.reset();
  } catch (err) {
    alert("Error logging flight: " + err.message);
  }
});
