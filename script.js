function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

let temperatureElement = document.querySelector(".weatherbox h2");
let celsiusTemperature = null;

function displayTemperature(response) {
  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  let cityElement = document.querySelector(".nav-link");
  let informationElement = document.querySelector(".information");
  let dateElement = document.querySelector(".weatherbox h3");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.name;
  informationElement.innerHTML = `Weather: ${
    response.data.weather[0].description
  }, Wind: ${Math.round(response.data.wind.speed * 3.6)} km/h, Humidity: ${
    response.data.main.humidity
  }%`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconCode = response.data.weather[0].icon;
  let iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  iconElement.setAttribute("src", iconUrl);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function searchCity(city) {
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#searchInput");
  searchCity(cityInputElement.value);
}

function handleCityClick(event) {
  event.preventDefault();
  searchCity(event.target.textContent);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let cityLinks = document.querySelectorAll(".nav-link");
cityLinks.forEach((link) => {
  link.addEventListener("click", handleCityClick);
});

searchCity("Los Angeles");
