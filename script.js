document.getElementById("username").value = localStorage.getItem("username") || "Unknown";

document.getElementById("flightForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    airline: document.getElementById("airline").value,
    flightNumber: document.getElementById("flightNumber").value,
    username: document.getElementById("username").value,
    displayName: localStorage.getItem("displayName") || "",
    aircraft: document.getElementById("aircraft").value,
    departureICAO: document.getElementById("departureICAO").value,
    scheduledDeparture: new Date(document.getElementById("scheduledDeparture").value),
    actualDeparture: new Date(document.getElementById("actualDeparture").value),
    arrivalICAO: document.getElementById("arrivalICAO").value,
    scheduledArrival: new Date(document.getElementById("scheduledArrival").value),
    actualArrival: new Date(document.getElementById("actualArrival").value),
    notes: document.getElementById("notes").value.trim(),
    timestamp: new Date()
  };

  try {
    await addDoc(collection(db, "flightLogs"), data);
    alert("Flight logged successfully!");
    document.getElementById("flightForm").reset();
  } catch (err) {
    alert("Error logging flight: " + err.message);
  }
});
