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

function displayTemperature(response) {
  let temperatureElement = document.querySelector(".weatherbox h2");
  let cityElement = document.querySelector(".nav-link");
  let informationElement = document.querySelector(".information");
  let dateElement = document.querySelector(".weatherbox h3");
  let iconElement = document.querySelector("#icon");

  let celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  informationElement.innerHTML = `Weather: ${
    response.data.weather[0].description
  }, Wind: ${Math.round(response.data.wind.speed * 3.6)} km/h, Humidity: ${
    response.data.main.humidity
  }%`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

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

searchCity("New York");
