"use strict";

const searchFormEl = document.querySelector("#search-form");
const searchInputEl = document.querySelector("#search-input");

const cityContainerEl = document.querySelector(".city");
const cityNameEl = document.querySelector("#city-name");
const cityDateEl = document.querySelector("#city-date");
const cityEmojiEl = document.querySelector("#city-emoji");

const currentTemp = document.querySelector("#temp-current");
const currentWind = document.querySelector("#wind-current");
const currentHumidity = document.querySelector("#humidity-current");

const forecastContainerEl = document.querySelector("#forecast");

function handleSearchFormSubmit(event) {
  event.preventDefault();

  const citySearched = searchInputEl.value.trim();

  if (citySearched) {
    const apiKey = "f4340e47ea2c893cd45e033c791f26e0";
    const apiUrl =
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      citySearched +
      "&units=imperial&appid=" +
      apiKey;
    // console.log(apiUrl);

    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data);
        });
      }
    });

    searchInputEl.value = "";
  } else {
    window.alert("You must input a city name to get a weather report.");
  }
}

function displayWeather(data) {
  // When I view current weather conditions for that city, then I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed.

  // Display city weather container
  cityContainerEl.classList.remove("hidden");

  // Display city name
  cityNameEl.textContent = data.city.name;

  // Display the date
  const date = data.list[0].dt_txt;
  cityDateEl.textContent = dayjs(date).format("M/D/YYYY");

  // Display an icon representation of weather conditions
  const emoji = data.list[0].weather[0].main;

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
  currentTemp.textContent = data.list[0].main.temp + " °F";

  // Display the the wind speed
  currentWind.textContent = data.list[0].wind.speed + " MPH";

  // Display the humidity
  currentHumidity.textContent = data.list[0].main.humidity + " %";

  // When I view future weather conditions for that city, then I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit);
