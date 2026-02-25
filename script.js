let weatherData = [];
let filteredData = [];

fetch("weatherData.json")
  .then(response => response.json())
  .then(data => {
    weatherData = data;
    filteredData = data;
    displayData(filteredData);
  })
  .catch(error => {
    console.error("Error loading data:", error);
    showMessage("Failed to load weather data.");
  });

function displayData(data) {
  const tableBody = document.getElementById("tableBody");
  const message = document.getElementById("message");

  tableBody.innerHTML = "";

  if (data.length === 0) {
    message.textContent = "No data available for the selected month.";
    return;
  }

  message.textContent = "";

  data.slice(0, 50).forEach(item => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.date || "N/A"}</td>
      <td>${item.temperature ?? "N/A"}</td>
      <td>${item.humidity ?? "N/A"}</td>
      <td>${item.pressure ?? "N/A"}</td>
    `;

    tableBody.appendChild(row);
  });
}

function filterData() {
  const month = document.getElementById("monthInput").value;

  if (!month) {
    filteredData = weatherData;
    displayData(filteredData);
    return;
  }

  filteredData = weatherData.filter(item =>
    item.date && item.date.startsWith(month)
  );

  displayData(filteredData);
}

function resetData() {
  document.getElementById("monthInput").value = "";
  filteredData = weatherData;
  displayData(filteredData);
}

function showMessage(text) {
  const message = document.getElementById("message");
  message.textContent = text;
}