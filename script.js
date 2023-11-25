function formatDate(timestamp) {
  const date = new Date(timestamp);
  let hours = date.getHours().toString().padStart(2, '0');
  let minutes = date.getMinutes().toString().padStart(2, '0');

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

const temperatureElement = document.querySelector(".weatherbox h1");
let celsiusTemperature = null;

function displayTemperature(response) {
  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  const cityElement = document.querySelector(".nav-link");
  const informationElement = document.querySelector(".information");
  const dateElement = document.querySelector(".weatherbox h2");
  const iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.name;
  informationElement.innerHTML = `Weather: ${
    response.data.weather[0].description
  }, Wind: ${Math.round(response.data.wind.speed * 3.6)} km/h, Humidity: ${
    response.data.main.humidity
  }%`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  const iconCode = response.data.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  iconElement.setAttribute("src", iconUrl);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function convertCelsiusToFahrenheit(celsiusTemperature) {
  return (celsiusTemperature * 9) / 5 + 32;
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  const fahrenheitTemperature = convertCelsiusToFahrenheit(celsiusTemperature);
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function searchCity(city) {
  const apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  const cityInputElement = document.querySelector("#searchInput");
  searchCity(cityInputElement.value);
}

function handleCityClick(event) {
  event.preventDefault();
  searchCity(event.target.textContent);
}

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

const cityLinks = document.querySelectorAll(".nav-link");
cityLinks.forEach((link) => {
  link.addEventListener("click", handleCityClick);
});

searchCity("Los Angeles");
