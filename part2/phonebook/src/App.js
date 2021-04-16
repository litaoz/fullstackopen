import React, { useState, useEffect } from 'react'

import personService from './services/persons'

// Components
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  // States
  const [ persons, setPersons ] = useState([]) 
  const [ filter, setFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ message, setMessage ] = useState('')
  const [ messageType, setMessageType ] = useState('info')

  // Service functions
  useEffect(() => {
    getAllPersons()
  }, [])

  const getAllPersons = () => {
    return personService.getAll()
      .then(data => setPersons(data))
  }

  const postPerson = (person) => {
    return personService.post(person)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      const confirmation = window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)
      if (confirmation) {
        const changedPerson = {...existingPerson, number: newNumber}
        personService.put(changedPerson)
          .then((data) => {
            setPersons(persons.map(person => person.id !== data.id ? person : data))
          })
          .catch(() => {
            notify(`Information of ${existingPerson.name} has already been removed from server`, 'error')
            getAllPersons()
          })
      }
    } else {
      postPerson(newPerson)
      .then((data) => {
        setPersons(persons.concat(data))
        setNewName('')
        setNewNumber('')
        notify(`Added ${data.name}`, 'info')
      })
      .catch((error) => {
        // setMessage(`Error ${}`)
        alert('An error in the posting person has occured.')
      })
    }
  }

  const deletePerson = (person) => {
    return () => {
      const confirmation = window.confirm(`Delete ${person.name}?`)
      if (confirmation) {
        personService.del(person)
        .then(() => {
          setPersons(persons.filter(existingPerson => existingPerson.id !== person.id))
        })
        .catch(() => {
          //
        })
      }
    }
  }

  // Event handlers
  const changeFilter = (event) => {
    setFilter(event.target.value)
  }
 
  const changeName = (event) => {
    setNewName(event.target.value)
  }

  const changeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  // Notification management
  const notify = (message, type) => {
    setMessage(message)
    setMessageType(type)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  // Filter
  const personsToShow = filter !== '' 
    ? persons.filter((person) => person.name.toLowerCase().includes(filter)) 
    : persons

  // Output
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType}/>
      <Filter filter={filter} changeFilter={changeFilter}/>
      <h2>Add New</h2>
      <PersonForm addPerson={addPerson} 
                  newName={newName} 
                  changeName={changeName} 
                  newNumber={newNumber}
                  changeNumber={changeNumber}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}
               deletePerson={deletePerson}/>
    </div>
  )
}

export default App