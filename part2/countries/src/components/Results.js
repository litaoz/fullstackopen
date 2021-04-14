import React from 'react'
import Result from './Result'


const Results = (props) => {
    const {countries, setFilter} = props
    const numOfcountries = countries.length

    if (numOfcountries > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }

    if (numOfcountries === 1) {
        const country = countries[0]
        return (<Result country={country}/>)
    }

  return(
    <div>
      {countries.map(country => 
        <div key={country.alpha3Code}>{country.name}
          <button type='button' onClick={() => setFilter(country.name)}>show</button>
        </div>)}
    </div>
  )
}

export default Results