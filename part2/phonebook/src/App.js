import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ filter, setFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
      .then((response) => {
        const data = response.data
        setPersons(data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (persons.find(person => person.name === newName) === undefined) {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to the phonebook`)
    }
  }

  const changeFilter = (event) => {
    setFilter(event.target.value)
  }

  const changeName = (event) => {
    setNewName(event.target.value)
  }

  const changeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = filter !== '' 
    ? persons.filter((person) => person.name.toLowerCase().includes(filter)) 
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} changeFilter={changeFilter}/>
      <h2>Add New</h2>
      <PersonForm addPerson={addPerson} 
                  newName={newName} 
                  changeName={changeName} 
                  newNumber={newNumber}
                  changeNumber={changeNumber}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App