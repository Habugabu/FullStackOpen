const Persons = ({persons, onDelete}) => {
    return (
      <div>
        {persons.map(person => <Person key={person.id} person={person} onDelete={onDelete}/>)}
      </div>
    )
  }
  
  const Person = ({person, onDelete}) => {
    return <>{person.name} {person.number} <DeleteButton person={person} onDelete={onDelete}/><br/></>
  }

  const DeleteButton = ({person, onDelete}) => {
    return (
      <button onClick={onDelete} id={person.id} name={person.name}>delete</button>
    )
  }
  
export default Persons