
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
function formatCepInput(e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 5) {
        value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }
    e.target.value = value;
}
async function handleBuscaPorCepOuCidade(e) {
    e.preventDefault();

    const cep = cepInput.value.replace(/\D/g, "");
    const cidade = document.getElementById("cidadeInput").value.trim();

    if (cep && isValidCep(cep)) {
        await searchLocationAndWeather(cep);
    } else if (cidade) {
        await searchWeatherByCity(cidade);
    } else {
        showError("Digite um CEP válido ou o nome de uma cidade.");
    }
}


function isValidCep(cep) {
    return cep.length === 8 && /^\d+$/.test(cep);
}

function formatCep(cep) {
    return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
}


async function handleCepSubmit(e) {
    e.preventDefault();

    const cep = cepInput.value.replace(/\D/g, "");

    if (!isValidCep(cep)) {
        showError("Por favor, digite um CEP válido (8 dígitos)");
        return;
    }

    await searchLocationAndWeather(cep);
}

async function searchLocationAndWeather(cep) {
    showLoading();
    hideError();
    hideResults();

    try {
        const locationData = await fetchLocationData(cep);

        if (locationData.erro) {
            throw new Error("CEP não encontrado");
        }

        const weatherData = await fetchWeatherData(locationData.localidade, locationData.uf);

        currentLocationData = { ...locationData, cep };
        currentWeatherData = weatherData;

        displayLocationData(currentLocationData);
        displayWeatherData(currentWeatherData);

        addToHistory(currentLocationData, currentWeatherData);
        updateFavoriteButton();
        showResults();
    } catch (error) {
        console.error("Erro:", error);
        showError(error.message || "Erro ao buscar informações. Tente novamente.");
    } finally {
        hideLoading();
    }
    toggleCepInfo(true);

}

async function fetchLocationData(cep) {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) {
        throw new Error("Erro ao consultar CEP");
    }
    return await response.json();
}

async function fetchCoordinates(city, state) {
    const query = `${city},${state},BR`;
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${WEATHER_API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Erro ao buscar coordenadas da cidade");
    }
    const data = await response.json();
    if (data.length === 0) {
        throw new Error("Cidade não encontrada para consulta do clima");
    }
    return {
        lat: data[0].lat,
        lon: data[0].lon,
    };
}

async function fetchWeatherData(city, state) {
    try {
        const coordinates = await fetchCoordinates(city, state);
        const url = `${WEATHER_API_URL}?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${WEATHER_API_KEY}&units=metric&lang=pt_br`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Erro ao consultar dados do clima");
        }
        const weatherData = await response.json();
        weatherData.coord = coordinates;
        return weatherData;
    } catch (error) {
        console.error("Erro ao buscar dados do clima:", error);
        throw new Error("Não foi possível obter dados do clima para esta localização");
    }
}


function displayLocationData(data) {
    locationCep.textContent = `CEP: ${formatCep(data.cep)}`; 
    locationStreet.textContent = `Logradouro: ${data.logradouro || "Não informado"}`; 
    locationDistrict.textContent = `Bairro: ${data.bairro || "Não informado"}`;
    locationCity.textContent = `Cidade: ${data.localidade || "Não informado"}`; 
    locationState.textContent = `Estado: ${data.uf || "Não informado"}`; 
}


function displayWeatherData(data) {
    temperature.textContent = `${Math.round(data.main.temp)}°C`; 
    weatherDescription.textContent = data.weather[0].description;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;

    const iconCode = data.weather[0].icon;
    if (weatherIcon) {
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.alt = data.weather[0].description;
    }

    if (data.coord) {
        console.log(`Coordenadas: Lat ${data.coord.lat}, Lon ${data.coord.lon}`);
    }
}


function getHistory() {
    return JSON.parse(localStorage.getItem("weatherAppHistory") || "[]");
}

function getFavorites() {
    return JSON.parse(localStorage.getItem("weatherAppFavorites") || "[]");
}

function addToHistory(locationData, weatherData) {
    const history = getHistory();

    const newEntry = {
        cep: locationData.cep,
        city: locationData.localidade,
        state: locationData.uf,
        temperature: Math.round(weatherData.main.temp),
        description: weatherData.weather[0].description,
        date: new Date().toLocaleString("pt-BR"),
    };

    const existingIndex = history.findIndex((entry) => entry.cep === newEntry.cep);
    if (existingIndex > -1) {
        history.splice(existingIndex, 1);
    }

    history.unshift(newEntry);

    if (history.length > 5) {
        history.splice(5);
    }

    localStorage.setItem("weatherAppHistory", JSON.stringify(history));
    loadHistory();
}

