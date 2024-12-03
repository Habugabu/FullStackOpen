import { useState, useEffect } from 'react'

import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [notification, setNotification] = useState({text: '', type: ''})

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
            setNotification({text: `Updated the number of ${returnedPerson.name} to ${returnedPerson.number}`, type: 'success'})
            setTimeout(() => {
              setNotification({text: '', type: ''})
            }, 5000)
          })
          .catch(error => {
            setNotification({text: `Information of ${personObject.name} has already been removed from server`, type: 'error'})
            setTimeout(() => {
              setNotification({text: '', type: ''})
            }, 5000)
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
        //assign (currently highest id + 1) as the new id
        id: `${persons.map(person => person.id).reduce((p, c) => Math.max(p, c)) + 1}`
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotification({text: `Added ${returnedPerson.name}`, type: 'success'})
          setTimeout(() => {
            setNotification({text: '', type: ''})
          }, 5000)
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
          setNotification({text: `Removed ${returnedPerson.name}`, type: 'success'})
          setTimeout(() => {
            setNotification({text: '', type: ''})
          }, 5000)
        })
        .catch(error => {
          setNotification({text: `Information of ${event.target.name} has already been removed from server`, type: 'error'})
          setTimeout(() => {
            setNotification({text: '', type: ''})
          }, 5000)
        })
    }
    
  }

  const personsToShow = persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()) === true)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification text={notification.text} type={notification.type}/>
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