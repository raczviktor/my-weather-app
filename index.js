const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const notFound = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = 'd725e36085a18191a50c8be7a4b3e8c9';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
        ).then(res=>res.json()).then(json=> {
       if (json.cod === '404') {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        notFound.style.display = 'block';
        notFound.classList.add('fadeIn');
        return;
       }

       notFound.style.display = 'none';
       notFound.classList.remove('fadeIn'); 

       const image = document.querySelector(
        '.weather-box img'
        );
       const temperature = document.querySelector(
        '.weather-box .temperature'
        );
       const description = document.querySelector(
        '.weather-box .description'
        );
       const humidity = document.querySelector(
        '.weather-details .humidity span'
        );
       const wind = document.querySelector(
        '.weather-details .wind span'
        );

       switch (json.weather[0].main){
        case 'Clear':
            image.src = ''; 
            break;
        case 'Rain':    
            image.src = ''; 
            break;
        case 'Snow':    
            image.src = ''; 
            break;
        case 'Haze':    
            image.src = ''; 
            break;
        default:
            image.src = '';
            break;    
       }

       temperature.innerHTML = `${parseInt(json.main.temp)} <span>C</span>`;
       description.innerHTML = `${json.weather[0].description}`;
       humidity.innerHTML = `${json.main.humidity}%`;
       wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

       weatherBox.style.display = '';
       weatherDetails.style.display = '';
       weatherBox.classList.add('fadeIn');
       weatherDetails.classList.add('fadeIn');
       container.style.height = '590px';
    })
})