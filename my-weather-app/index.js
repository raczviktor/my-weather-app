import { APIKey } from "./secret.js";

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const notFound = document.querySelector('.not-found');
const image = document.querySelector('.weather-box img');
const temperature = document.querySelector('.weather-box .temperature');
const description = document.querySelector('.weather-box .description');
const humidity = document.querySelector('.weather-details .humidity span');
const wind = document.querySelector('.weather-details .wind span');

const showRes = (resJson) => {
  if (resJson.cod === '404') {
    handle404();
    return;
  }

  hideNotFound();
  setImg(resJson.weather[0].main);
  fillHtml(resJson);
};

const handle404 = () => {
  container.style.height = '420px';
  weatherBox.style.display = 'none';
  weatherDetails.style.display = 'none';
  notFound.style.display = 'block';
  notFound.classList.add('fadeIn');
};

const hideNotFound = () => {
  notFound.style.display = 'none';
  notFound.classList.remove('fadeIn');
};

const setImg = (weatherString) => {
  switch (weatherString) {
    case 'Clear':
      image.src = 'images/sunny.png';
      break;
    case 'Rain':
      image.src = 'images/rain.png';
      break;
    case 'Snow':
      image.src = 'images/snow.png';
      break;
    case 'Clouds':
      image.src = 'images/clouds.png';
      break;
    case 'Extreme':
      image.src = 'images/storm.png';
      break;
    default:
      image.src = '';
      break;
  }
};
const fillHtml = (resJson) => {
    const temperatureValue = Math.round(resJson.main.temp);
    const humidityValue = resJson.main.humidity;
    const windValue = Math.round(resJson.wind.speed);
  
    temperature.innerHTML = `${temperatureValue} <span>°C</span>`;
    description.innerHTML = `${resJson.weather[0].description}`;
    humidity.innerHTML = `${humidityValue}%`;
    wind.innerHTML = `${windValue}km/h`;
  
    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '590px';
}

search.addEventListener('click', async () => {

    const location = document.querySelector('.search-box input').value;

    if (location === '') return;

    let res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIKey}`
    );
    let resJson = await res.json();

    showRes(resJson);
})
