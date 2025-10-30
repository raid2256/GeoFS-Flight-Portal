import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCAoiScK646UlrIVv-95ESRcq6_XoQlzlQ",
  authDomain: "geofs-flight-portal.firebaseapp.com",
  projectId: "geofs-flight-portal",
  storageBucket: "geofs-flight-portal.firebasestorage.app",
  messagingSenderId: "1010902883617",
  appId: "1:1010902883617:web:42ef7667c1d7f035f23260",
  measurementId: "G-5RJK55LRVD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("flightForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const aircraft = document.getElementById("aircraft").value;
  const airlineId = document.getElementById("airlineId").value;
  const pilotUid = document.getElementById("pilotUid").value;
  const departure = document.getElementById("departure").value;
  const arrival = document.getElementById("arrival").value;

  try {
    await addDoc(collection(db, "flightLogs"), {
      aircraft,
      airlineId,
      pilotUid,
      departure,
      arrival,
      timestamp: new Date()
    });
    alert("Flight logged successfully!");
    e.target.reset();
  } catch (err) {
    alert("Error logging flight: " + err.message);
  }
});
