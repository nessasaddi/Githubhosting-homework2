// Function to get the current date and time
function getCurrentDateAndTime() {
  // Your existing function here
}

// Function to search the weather of a city
function searchCity(event) {
  // Prevent form submission's default behavior (page reload)
  event.preventDefault();

  // Get city name from the search input
  const searchInput = document.getElementById("searchInput");
  const cityName = searchInput.value;

  // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
  const apiKey = "bf54175800a55e59e6c4d6461deeef12";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  // Fetch weather data from the OpenWeatherMap API
  axios
    .get(apiUrl)
    .then((response) => {
      // Set the current temperature on the page
      const currentTemperature = response.data.main.temp;
      const h1Element = document.getElementById("currentTemperature");
      h1Element.textContent = `Current Temperature: ${currentTemperature} °C`;
    })
    .catch((error) => {
      // Log error and set the error message on the page
      console.error("Error fetching weather data:", error);
      const h1Element = document.getElementById("currentTemperature");
      h1Element.textContent = "City not found";
    });
}

// Set the current date and time on page load
document.addEventListener("DOMContentLoaded", function () {
  const descElement = document.querySelector(".desc");
  descElement.textContent = getCurrentDateAndTime();
});
