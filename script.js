function getCurrentDateAndTime() {
  // Your existing function here
}

// Set the current date and time on page load
document.addEventListener("DOMContentLoaded", function () {
  const descElement = document.querySelector(".desc");
  descElement.textContent = getCurrentDateAndTime();
});

function searchCity(event) {
  event.preventDefault(); // Prevent form submission's default behavior (page reload)

  const searchInput = document.getElementById("searchInput");
  const cityName = searchInput.value;

  // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
  const apiKey = "bf54175800a55e59e6c4d6461deeef12";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then((response) => {
      const currentTemperature = response.data.main.temp;
      const h1Element = document.getElementById("currentTemperature");
      h1Element.textContent = `Current Temperature: ${currentTemperature} °C`;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      const h1Element = document.getElementById("currentTemperature");
      h1Element.textContent = "City not found";
    });
}
