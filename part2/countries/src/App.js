import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Results from './components/Results'

const App = () => {
  // useState
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  // Calculated variables
  const countriesToShow = filter === '' 
    ? countries 
    : countries.filter(
      (country) => {
        return country.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
      }
    )

  // Effects
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        const data = response.data
        setCountries(data)
      })
  }, [])

  // Handlers
  const changeFilter = (event) => {
    setFilter(event.target.value)
  } 

  // Return
  return(
    <div>
      <Filter filter={filter} changeFilter={changeFilter} />
      <Results countries={countriesToShow} setFilter={setFilter}/>
    </div>
  )
}

export default App