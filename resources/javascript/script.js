"use strict";

const searchFormEl = document.querySelector("#search-form");
const searchInputEl = document.querySelector("#search-input");

const cityListContainerEl = document.querySelector(".city-list");

const cityContainerEl = document.querySelector(".city");
const cityNameEl = document.querySelector("#city-name");
const cityDateEl = document.querySelector("#city-date");
const cityEmojiEl = document.querySelector("#city-emoji");

const currentTemp = document.querySelector("#temp-current");
const currentWind = document.querySelector("#wind-current");
const currentHumidity = document.querySelector("#humidity-current");

const forecastContainerEl = document.querySelector(".forecast");
const cardsContainerEl = document.querySelector(".cards");

let cities = [];

function handleSearchFormSubmit(event) {
  event.preventDefault();

  // Clear previous search result
  cardsContainerEl.innerHTML = "";

  const citySearched = searchInputEl.value.trim();
  const apiKey = "f4340e47ea2c893cd45e033c791f26e0";

  if (citySearched) {
    const apiWeatherUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      citySearched +
      "&units=imperial&appid=" +
      apiKey;
    fetch(apiWeatherUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data);
        });
      }
    });

    const apiForecastUrl =
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      citySearched +
      "&units=imperial&appid=" +
      apiKey;
    fetch(apiForecastUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayForecast(data);
        });
      }
    });

    cities.push(citySearched);
    searchInputEl.value = "";

    storeCities();
    renderCities();
  } else {
    window.alert("You must input a city name to get a weather report.");
    return;
  }
}

function displayWeather(data) {
  // When I view current weather conditions for that city, then I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed.

  // Display city weather container
  cityContainerEl.classList.remove("hidden");

  // Display city name
  cityNameEl.textContent = data.name;

  // Display the date
  function displayDate() {
    const currentDate = dayjs().format("M/D/YYYY");
    cityDateEl.textContent = currentDate;
  }
  displayDate();

  // Display an icon representation of weather conditions
  const emoji = data.weather[0].main;

  if (emoji === "Atmosphere") {
    cityEmojiEl.textContent === "🌫️";
  } else if (emoji === "Clear") {
    cityEmojiEl.textContent === "☀️";
  } else if (emoji === "Clouds") {
    cityEmojiEl.textContent = "☁️";
  } else if (emoji === "Drizzle") {
    cityEmojiEl.textContent = "🌧️";
  } else if (emoji === "Rain") {
    cityEmojiEl.textContent = "🌧️";
  } else if (emoji === "Snow") {
    cityEmojiEl.textContent = "🌨️";
  } else if (emoji === "Thunderstorm") {
    cityEmojiEl.textContent = "⛈️";
  } else {
    cityEmojiEl.textContent = "";
  }

  // Display the temperature
  currentTemp.textContent = data.main.temp + " °F";

  // Display the the wind speed
  currentWind.textContent = data.wind.speed + " MPH";

  // Display the humidity
  currentHumidity.textContent = data.main.humidity + " %";
}

function displayForecast(data) {
  // When I view future weather conditions for that city, then I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

  // Display forecast container
  forecastContainerEl.classList.remove("hidden");

  // Display 5-day forecast with the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
  const forecastArray = data.list;
  for (let i = 0; i < forecastArray.length; i += 8) {
    const forecastCard = document.createElement("div");
    forecastCard.classList = "card";

    // Display date variable
    const date = dayjs(forecastArray[i].dt_txt).format("M/D/YYYY");

    //Display icon variable
    const icon = forecastArray[i].weather[0].icon;

    forecastCard.innerHTML = `<h4>${date}</h4>
      <p><span><img src="resources/icons/${icon}.png" style="background-color:white;"></span></p>
      <p>Temp: <span>${forecastArray[i].main.temp} °F</span></p>
      <p>Wind: <span>${forecastArray[i].wind.speed} MPH</span></p>
      <p>Humidity: <span>${forecastArray[i].main.humidity} %</span></p>`;

    cardsContainerEl.appendChild(forecastCard);
  }
}

function storeCities() {
  // Stringify and set key in localStorage to cities array
  localStorage.setItem("Cities Searched", JSON.stringify(cities));
}

function renderCities() {
  // Render a new button for each city
  cityListContainerEl.innerHTML = "";
  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    const button = document.createElement("button");
    button.textContent = city;
    cityListContainerEl.appendChild(button);
  }
}

function displayCityData(event) {
  cardsContainerEl.innerHTML = "";

  const citySearched = event.target.innerHTML;
  const apiKey = "f4340e47ea2c893cd45e033c791f26e0";

  if (citySearched) {
    const apiWeatherUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      citySearched +
      "&units=imperial&appid=" +
      apiKey;
    fetch(apiWeatherUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data);
        });
      }
    });

    const apiForecastUrl =
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      citySearched +
      "&units=imperial&appid=" +
      apiKey;
    fetch(apiForecastUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayForecast(data);
        });
      }
    });
  }
}

function init() {
  const storedCities = JSON.parse(localStorage.getItem("Cities Searched"));
  if (storedCities !== null) {
    cities = storedCities;
  }
  renderCities();
}

// Event listener to form search button
searchFormEl.addEventListener("submit", handleSearchFormSubmit);

// Event listener to past searches
cityListContainerEl.addEventListener("click", displayCityData);

// Renders cities on page load
init();
