import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY

const uniURL = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const weatherURL = (lat, lon) => {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
}

const getAll = () => {
  const request = axios.get(uniURL)
  return request.then(response => response.data)
};

const getWeather = (lat, lon) => {
    const request = axios.get(weatherURL(lat, lon))
    return request.then(response => response.data)
}

export default {getAll, getWeather}