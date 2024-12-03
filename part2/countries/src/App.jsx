import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import countryService from './services/country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(()=>{
    console.log('test')
    countryService
      .getAll()
      .then(countryList => {
        setCountries(countryList)
      })
  }, [])

  const changeWeather = (country) => {
    if (!country.hasOwnProperty('weather') && country.capitalInfo.hasOwnProperty('latlng')) {
      const updatedCountry = {...country}
      countryService
        .getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
        .then(weather => {
          updatedCountry.weather = {
            temp: weather.main.temp, 
            wind: weather.wind.speed, 
            icon: weather.weather[0].icon
          }
          console.log(weather)
          console.log(updatedCountry.weather)
        })
        .catch(error => {
          updatedCountry.weather = {temp: null, wind: null, icon: null}
          console.log('weather data not found')
          console.log(updatedCountry.weather)
        })
        const countriesCopy = [...countries]
        setCountries(countriesCopy.filter(country => country.name !== updatedCountry.name).concat(updatedCountry))
    }
  }


  const countriesToShow = countries.filter(country => country.name.common.toUpperCase().includes(filter.toUpperCase()) === true)
  
  useEffect(()=>{
    if(countriesToShow.length < 10){
      const copy = [...countriesToShow]
      copy.forEach(country => changeWeather(country))
    }
  },[filter])

  return (
    <div>
      <Filter filter={filter} onChange={handleFilterChange}/>
      <Countries countries={countriesToShow} onFilter={handleFilterChange}/>
    </div>
  )
}

export default App