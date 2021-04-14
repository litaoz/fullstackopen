import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Result = (props) => {
  const {country} = props 
  const [weather, setWeather] = useState({'temperature': ''})
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then((response) => {
        const data = response.data.current
        setWeather(data)
      })
  }, [country, api_key, setWeather])

  return(
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <div>
          <h3>languages</h3>
          <ul>
              {country.languages.map(language => 
                  <li key={language.iso639_2}>{language.name}</li>
              )}
          </ul>
      </div>
      <img src={country.flag} alt={`${country.name} flag`} width="10%" height="10%"/>
      <div>
        <h3>Weather in {country.capital}</h3>
        <p><b>temperature:</b> {weather.temperature} Celcius</p>
        <img src={weather.weather_icons} alt={weather.weather_descriptions} />
        <p><b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}</p>
      </div>
    </div>
  )
}

export default Result