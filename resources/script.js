"use strict";

const searchFormEl = document.querySelector("#search-form");
const searchInputEl = document.querySelector("#search-input");

function handleSearchFormSubmit(event) {
  event.preventDefault();

  let citySearched = searchInputEl.value.trim();

  if (citySearched) {
    console.log(citySearched);
    const apiKey = "f4340e47ea2c893cd45e033c791f26e0";
    const apiUrl =
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      citySearched +
      "&units=imperial&appid=" +
      apiKey;
    console.log(apiUrl);
  } else {
    window.alert("You must input a city name to get a weather report.");
  }
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit);

/* const searchFormEl = document.querySelector("#search-form");
const searchInputVal = document.querySelector("#search-input");

function handleSearchFormSubmit(event) {
  event.preventDefault();

  let searchInputValTrim = searchInputVal.value.trim();

  if (searchInputValTrim) {
    getCityWeather(searchInputValTrim);
  } else {
    window.alert("You must search for a city by the city's name.");
    return;
  }
}

function getCityWeather() {
  let apiUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    searchInputVal +
    "&limit=1&appid=f4340e47ea2c893cd45e033c791f26e0";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      console.log(response);
    } else {
      alert("Error: " + response.statusText);
    }
  });
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit);
 */
