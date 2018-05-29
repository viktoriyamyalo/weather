const WEATHER_API_KEY = 'f3d9c016d38221308495414957e22e8c';
const API_STEM = "api.openweathermap.org/data/2.5/weather?";

function zipUrl(zip) {
    return `${API_STEM}q=${zip}&units=imperial&APPID=${WEATHER_API_KEY}`;
}

function fetchForecast(zip) {
    return fetch(zipUrl(zip))
        .then(response => response.json())
        .then(responseJSON => {
            const { main, description, temp } = responseJSON.weather[0];
            return {
                main: main,
                description: description,
                temp: temp
            };
        })
        .catch(error => console.log(error));
}

export default { fetchForecast };