import { useState, useEffect } from 'react'

import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  useEffect(()=>{
    personService
      .getAll('http://localhost:3001/persons')
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    if (names.includes(newName)){
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const personObject = {
          name: newName,
          number: newNumber,
          id: persons.find(person => person.name === newName).id
        }
        personService
          .update(personObject.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.filter(person => person.id !== returnedPerson.id).concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      }
    }
    else if (newName == ''){
      alert('Please input a name')
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: `${persons.map(person => person.id).reduce((p, c) => Math.max(p, c)) + 1}`
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleDelete = (event) => {
    if(confirm(`Delete ${event.target.name}?`)){
      personService
        .remove(event.target.id)
        .then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== returnedPerson.id))
        })
    }
    
  }

  const personsToShow = persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()) === true)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={handleFilterChange}/>
      <h2>Add new entry</h2>
      <PersonForm 
        onSubmit={addPerson} 
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDelete={handleDelete}/>
    </div>
  )
}

export default App