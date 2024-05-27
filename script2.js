const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const inputBox = document.querySelector('.search-box input');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', async () => {
    const APIKey = '646edf7ac86dcef3210a8310bbd2c8d2';  // Mock API Key
    const city = inputBox.value.trim();  // Use trim() to remove any accidental spaces

    if (city === '') return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        if (weather_data.cod === '404') {
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        const weatherMain = weather_data.weather[0].main;
        const weatherDescription = weather_data.weather[0].description;
        const tempKelvin = weather_data.main.temp;
        const tempCelsius = tempKelvin - 273.15;  // Convert from Kelvin to Celsius
        const humidityValue = weather_data.main.humidity;
        const windSpeed = weather_data.wind.speed;

        switch (weatherMain) {
            case 'Clear':
                image.src = 'image3/clear.png';
                break;
            case 'Rain':
                image.src = 'image3/rain.png';
                break;
            case 'Snow':
                image.src = 'image3/snow.png';
                break;
            case 'Clouds':
                image.src = 'image3/cloud.png';
                break;
            case 'Mist':
                image.src = 'image3/mist.png';
                break;
            case 'Haze':
                image.src = 'image3/cloud.png';
                break;
            default:
                image.src = 'image3/cloud.png';
                break;
        }

        // Apply transition
        image.classList.remove('active');
        setTimeout(() => {
            image.classList.add('active');
        }, 100);

        temperature.innerHTML = `${Math.round(tempCelsius)}<span>°C</span>`;
        description.innerHTML = weatherDescription;
        humidity.innerHTML = `${humidityValue}%`;
        wind.innerHTML = `${Math.round(windSpeed)}km/h`;

    } catch (error) {
        console.error('Error fetching the weather data:', error);
        container.style.height = '400px';
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error404.classList.add('active');
    }
});
