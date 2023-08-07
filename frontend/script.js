document.addEventListener("DOMContentLoaded", function () {
  const table = document.querySelector("table");
  const timerDisplay = document.getElementById("timer");
  const darkModeToggle = document.getElementById("darkModeToggle");

  let timeLeft = 60; // 1 minutes in seconds

  // Function to display data in the table
  function displayData(data) {
    while (table.rows.length > 1) {
      table.deleteRow(1);
    } // Clear the table before updating

    let count = 1;
    data.forEach((crypto) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${count++}</td>
          <td>${crypto.name}</td>
          <td>${`₹${crypto.last}`}</td>
          <td>${`₹${crypto.buy} / ₹${crypto.sell}`}</td>
          <td>${crypto.volume}</td>
          <td>${crypto.base_unit}</td>
        `;
      table.appendChild(row);
    });
  }

  // Function to fetch data from the server
  function fetchDataFromServer() {
    const api = "http://localhost:4000/api/topCoins";

    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          displayData(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  // Function to update the countdown timer
  function updateTimer() {
    if (timeLeft >= 0) {
      timerDisplay.textContent = `${timeLeft}`;

      timeLeft--;
    } else {
      fetchDataFromServer(); // Fetch updated data from the server
      timeLeft = 60; // Reset the timer to 1 minutes
    }
  }

  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode", darkModeToggle.checked);
  }

  // Add event listener to the dark mode toggle slider
  darkModeToggle.addEventListener("change", toggleDarkMode);

  // Main function to initialize the page
  function init() {
    fetchDataFromServer(); // Initial display
    setInterval(updateTimer, 1000); // 1-second interval to update the countdown timer
    setInterval(fetchDataFromServer, 60000); // 1-minute interval to update the data
  }

  // Call the main function to initialize the page
  init();
});
