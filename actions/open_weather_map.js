import { API_STEM, WEATHER_API_KEY, STORAGE_KEY } from "../constants";
import { AsyncStorage } from "react-native";

function zipUrl(zip) {
    return `${API_STEM}q=${zip}&units=imperial&APPID=${WEATHER_API_KEY}`;
}

function coordsUrl(lat, lon) {
    return `${API_STEM}lat=${lat}&lon=${lon}&units=imperial&APPID=${WEATHER_API_KEY}`
}

function fetchForecastForZip(zip) {
    AsyncStorage.setItem(STORAGE_KEY, zip)
        .then(() => {
            console.log("Saved selection to disk: ", zip);
        })
        .catch(error => {
            console.error("Async storage error: ", error.message)
        })
        .done();
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

function fetchForecastForCoords(lat, lon) {
    return fetch(coordsUrl(lat, lon))
        .then(response => response.json())
        .then(responseJSON => {
            const {main, description, temp } = responseJSON.weather[0];
            return { main, description, temp };
        })
        .catch(error => console.warn(error))
}
export default { fetchForecastForZip, fetchForecastForCoords };