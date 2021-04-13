import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ filter, setFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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
      <div>filter shown with <input value={filter} onChange={event => setFilter(event.target.value)}/></div>
      <h2>Add New</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={changeName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={changeNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person) => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App