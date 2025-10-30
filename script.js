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

document.getElementById("flightForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const airline = document.getElementById("airline").value;
  const flightNumber = document.getElementById("flightNumber").value;
  const username = document.getElementById("username").value;
  const aircraft = document.getElementById("aircraft").value;
  const departureICAO = document.getElementById("departureICAO").value;
  const scheduledDeparture = document.getElementById("scheduledDeparture").value;
  const actualDeparture = document.getElementById("actualDeparture").value;
  const arrivalICAO = document.getElementById("arrivalICAO").value;
  const scheduledArrival = document.getElementById("scheduledArrival").value;
  const actualArrival = document.getElementById("actualArrival").value;
  const notes = document.getElementById("notes").value;

  try {
    await addDoc(collection(db, "flightLogs"), {
      airline,
      flightNumber,
      username,
      aircraft,
      departureICAO,
      scheduledDeparture: new Date(scheduledDeparture),
      actualDeparture: new Date(actualDeparture),
      arrivalICAO,
      scheduledArrival: new Date(scheduledArrival),
      actualArrival: new Date(actualArrival),
      notes,
      timestamp: new Date()
    });
    alert("Flight logged successfully!");
    e.target.reset();
  } catch (err) {
    alert("Error logging flight: " + err.message);
  }
});
