let search = document.getElementById('search');
let searchBtn = document.getElementById('searchBtn');
let cityName = document.getElementById('cityName');
let dateTime = document.getElementById('dateTime');
let main = document.getElementById('main');
let description = document.getElementById('description');
let icon = document.getElementById('icon');
let temp = document.getElementById('temp');
let min = document.getElementById('min');
let max = document.getElementById('max');
let sunrise = document.getElementById('sunrise');
let sunset = document.getElementById('sunset');
let longitude = document.getElementById('longitude');
let latitude = document.getElementById('latitude');
let feelLike = document.getElementById('feelLike');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
let pressure = document.getElementById('pressure');
let seaLevel = document.getElementById('seaLevel');
let groundLevel = document.getElementById('groundLevel');

// * Dark and light mode part start

let theme = document.getElementById('theme');
let root = document.querySelector(':root');

const clickedTheme = () => {
    theme.classList.toggle('fa-moon');
    theme.classList.toggle('fa-sun');
    if (theme.classList.contains('fa-moon')) {
        root.style.setProperty('--c-white', '#ffffff');
        root.style.setProperty('--c-black', '#000000');
        root.style.setProperty('--c-secondary', '#FBFCF8');
        root.style.setProperty('--s-dark', '0px 0px 3px rgba(0,0,0,0.3)');
        root.style.setProperty('--d-dark', 'drop-shadow(3px 3px 2px rgba(0,0,0,0.5))');
        root.style.setProperty('--c-filter', 'invert(0%) sepia(10%) saturate(39%) hue-rotate(192deg) brightness(93%) contrast(101%)');
    } else if (theme.classList.contains('fa-sun')) {
        root.style.setProperty('--c-white', '#000000');
        root.style.setProperty('--c-black', '#ffffff');
        root.style.setProperty('--c-secondary', '#28292A');
        root.style.setProperty('--s-dark', '0px 0px 3px rgba(255,255,255,0.7)');
        root.style.setProperty('--d-dark', 'drop-shadow(3px 3px 2px rgba(255,255,255,0.5))');
        root.style.setProperty('--c-filter', 'invert(100%) sepia(0%) saturate(0%) hue-rotate(335deg) brightness(108%) contrast(101%)');
    }

}

theme.addEventListener('click', clickedTheme);

// * Dark and light mode part end



const apiKey = '6a096af7118e7dc3ca67194c5d3c882b';
let searchCity;

const fetchData = async () => {
    try {
        // get city from input
        searchCity = search.value;

        if (searchCity.length != 0) {
            const apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`;
            // fetch api and get all data
            const res = await fetch(apiLink);
            const data = await res.json();
            // get city and country name
            const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
            cityName.innerHTML = `${data.name}, ${regionNamesInEnglish.of(data.sys.country)}`;
            // get current date and time
            let currentDate = new Date(data.dt * 1000);
            dateTime.innerHTML = currentDate;
            // get weather name
            main.innerHTML = data.weather[0].main;
            description.innerHTML = data.weather[0].description;
            // get icon from data
            icon.src = `image/${data.weather[0].icon}.png`;
            // get degree from data
            temp.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
            min.innerHTML = `Min: ${Math.round(data.main.temp_min)}&deg;C`;
            max.innerHTML = `Max: ${Math.round(data.main.temp_max)}&deg;C`;
            // get sunrise and sunset
            let sunriseDate = new Date(data.sys.sunrise * 1000);
            sunrise.innerHTML = `Sunrise: ${sunriseDate.toLocaleTimeString('en-US')}`;
            let sunsetDate = new Date(data.sys.sunset * 1000);
            sunset.innerHTML = `Sunset: ${sunsetDate.toLocaleTimeString('en-US')}`;
            // get other data
            longitude.innerHTML = data.coord.lon;
            latitude.innerHTML = data.coord.lat;
            feelLike.innerHTML = `${Math.round(data.main.feels_like)}&deg;C`;
            humidity.innerHTML = data.main.humidity;
            wind.innerHTML = `${data.wind.speed} m/s`;
            pressure.innerHTML = data.main.pressure;
            seaLevel.innerHTML = data.main.sea_level;
            groundLevel.innerHTML = data.main.grnd_level;
        }
        else {
            return false
        }
    }
    catch (err) {
        main.innerHTML = `Something wrong`;
        icon.src = `image/wrong.png`;
        cityName.innerHTML = '';
        dateTime.innerHTML = '';
        description.innerHTML = '';
        temp.innerHTML = '';
        min.innerHTML = '';
        max.innerHTML = '';
        sunrise.innerHTML = '';
        sunset.innerHTML = '';
        longitude.innerHTML = '';
        latitude.innerHTML = '';
        feelLike.innerHTML = '';
        humidity.innerHTML = '';
        wind.innerHTML = '';
        pressure.innerHTML = '';
        seaLevel.innerHTML = '';
        groundLevel.innerHTML = '';
    }
}

searchBtn.addEventListener('click', fetchData);