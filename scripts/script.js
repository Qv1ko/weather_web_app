let formElement;
let inputElement;
let notFoundElement;
let errorMessageElement;

document.addEventListener("DOMContentLoaded", () => {
  formElement = document.getElementsByClassName("form")[0];
  inputElement = document.getElementById("browser-input");

  notFoundElement = document.getElementById("not-found");
  errorMessageElement = document.getElementById("error-message");
  errorMessageElement.textContent = "City was not found. Please try again.";

  formElement.addEventListener("submit", getCityData);
});

async function getCityData(e) {
  e.preventDefault();
  const inputText = encodeURI(inputElement.value);

  const locationResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${inputText}&count=1&language=en&format=json`
  );
  const locationData = await locationResponse.json();

  setDisplayNotFoundElement(true);

  if (locationData.results) {
    const { latitude, longitude } = locationData.results[0];

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=wind_speed_10m_max,temperature_2m_max,temperature_2m_min,sunset,sunrise,precipitation_probability_max&hourly=temperature_2m&current=wind_direction_10m,wind_speed_10m,is_day,relative_humidity_2m,temperature_2m,precipitation,rain,showers,snowfall&past_days=3&forecast_days=4`
    );
    const data = await response.json();

    updateWeatherInterface(data);
  } else {
    setDisplayNotFoundElement(false);
  }
}

function updateWeatherInterface(data) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=wind_speed_10m_max,weather_code,temperature_2m_max,temperature_2m_min,sunset,sunrise&ourly=temperature_2m&current=wind_direction_10m,wind_speed_10m,is_day,relative_humidity_2m,temperature_2m,precipitation,rain,showers,snowfall&past_days=3&forecast_days=4`
  );
  const data = await response.json();
  console.log(data);
}

function setDisplayNotFoundElement(found) {
  notFoundElement.style.display = found ? "none" : "flex";
}
