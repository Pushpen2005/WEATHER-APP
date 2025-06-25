const cityNameElem = document.querySelector(".weather_city");
const dateTime = document.querySelector(".weather_date_time");
const w_forecast = document.querySelector(".weather_forecast");
const w_icon = document.querySelector(".weather_icon");
const w_temperature = document.querySelector(".weather_temperature");
const w_minTem = document.querySelector(".weather_min");
const w_maxTem = document.querySelector(".weather_max");

const w_feelsLike = document.querySelector(".weather_feelsLike");
const w_humidity = document.querySelector(".weather_humidity");
const w_wind = document.querySelector(".weather_wind");
const w_pressure = document.querySelector(".weather_pressure");

const citySearch = document.querySelector(".weather_search");
const cityInput = document.querySelector(".city_name");

const getCountryName = (code) => {
  return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
};

const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(curDate);
};

let city = "pune";

citySearch.addEventListener("submit", (e) => {
  e.preventDefault();
  city = cityInput.value.trim();
  if (city) {
    getWeatherData();
    cityInput.value = "";
  }
});

const getWeatherData = async () => {
  const apiKey = "0ee92491b32c757f8ed5c5c93a035599";
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;

  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();

    if (data.cod !== 200) {
      alert(data.message);
      return;
    }

    const { main, name, weather, wind, sys, dt } = data;

    cityNameElem.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);
    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" alt="${weather[0].description}" />`;

    w_temperature.innerHTML = `${main.temp.toFixed(1)}\u00B0C`;
    w_minTem.innerHTML = `Min: ${main.temp_min.toFixed(1)}\u00B0C`;
    w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed(1)}\u00B0C`;

    w_feelsLike.innerHTML = `${main.feels_like.toFixed(1)}\u00B0C`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    w_pressure.innerHTML = `${main.pressure} hPa`;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

window.addEventListener("load", getWeatherData);
