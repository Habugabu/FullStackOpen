const Countries = ({countries, onFilter}) => {
    if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }
    else if (countries.length === 0) {
        return <div>No matches, specify another filter</div>
    }
    else if (countries.length === 1) {
        return <div><CountryInfo country={countries[0]}/></div>
    }
    else {
        return <div>{countries.map(country => <CountryListEntry key={country.name.common} country={country} onFilter={onFilter}/>)}</div>
    }
}

const CountryListEntry = ({country, onFilter}) => {
    return <>{country.name.common} <FilterButton country={country} onFilter={onFilter}/><br/></>
}
const FilterButton = ({country, onFilter}) => {
    return <button onClick={onFilter} value={country.name.common}>show</button>
}

const CountryInfo = ({country}) => {
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital[0]}<br/>area {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
            </ul>
            <img src={country.flags.png}></img>
            <Weather country={country}/>
        </div>
    )
}

const Weather = ({country}) => {
    if (country.hasOwnProperty('weather') && country.weather.temp){
        return (
            <div>
                <h3>Weather in {country.capital[0]}</h3>
                temperature {Math.round((country.weather.temp - 273.15) * 100) / 100} Celsius<br/>
                <img src= {`https://openweathermap.org/img/wn/${country.weather.icon}@2x.png`}></img><br/>
                wind {country.weather.wind} m/s<br/>
            </div>
        )
    }
    else {
        console.log(country.weather)
        return (
            <div>Weather data for {country.capital[0]} not available</div>
        )
    }
    
}

export default Countries