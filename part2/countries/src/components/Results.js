import React from 'react'

const Results = (props) => {
    const {countries} = props
    const numOfcountries = countries.length

    if (numOfcountries > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }

    if (numOfcountries === 1) {
        const country = countries[0]
        return (
            <div>
                <h2>{country.name}</h2>
                <div>capital</div>
                <div>population</div>
                <div>
                    <h3>languages</h3>
                    <ul>
                        {country.languages.map(language => 
                            <li key={language.iso639_2}>{language.name}</li>
                        )}
                    </ul>
                </div>
                <img src={country.flag} alt={`${country.name} flag`} width="10%" height="10%"/>
            </div>)
    }

    return(
        <div>
            {countries.map(country => <div key={country.alpha3Code}>{country.name}</div>)}
        </div>
    )
}

export default Results