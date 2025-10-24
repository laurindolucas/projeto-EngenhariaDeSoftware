const WEATHER_API_KEY = "88fb1367ca32cd633aaaa9802008440e";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

const cepForm = document.getElementById("formCep");
const cepInput = document.getElementById("cepInput"); 
const searchBtn = document.getElementById("searchBtn");


const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");
const errorText = document.getElementById("error-text");
const results = document.getElementById("results");
const favoriteBtn = document.getElementById("favoriteBtn"); 


const locationCep = document.getElementById("cepLocalizacao");
const locationStreet = document.getElementById("logradouroLocalizacao");
const locationDistrict = document.getElementById("bairroLocalizacao");
const locationCity = document.getElementById("cidadeLocalizacao");
const locationState = document.getElementById("estadoLocalizacao");


const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature"); 
const weatherDescription = document.getElementById("weatherDescription"); 
const feelsLike = document.getElementById("feelsLike"); 
const humidity = document.getElementById("humidity"); 
const windSpeed = document.getElementById("windSpeed"); 

const historyList = document.getElementById("history-list");
const favoritesList = document.getElementById("favorites-list");
const clearHistoryBtn = document.getElementById("clearHistoryBtn"); 
const clearFavoritesBtn = document.getElementById("clearFavoritesBtn");


let currentLocationData = null;
let currentWeatherData = null;


cepForm.addEventListener("submit", handleBuscaPorCepOuCidade);
favoriteBtn.addEventListener("click", toggleFavorite);
clearHistoryBtn.addEventListener("click", clearHistory);
clearFavoritesBtn.addEventListener("click", clearFavorites);
cepInput.addEventListener("input", formatCepInput);

document.addEventListener("DOMContentLoaded", () => {
    loadHistory();
    loadFavorites();
});

