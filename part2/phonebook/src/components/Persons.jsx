const Persons = ({persons}) => {
    return (
      <div>
        {persons.map(person => <Person key = {person.id} person = {person}/>)}
      </div>
    )
  }
  
  const Person = ({person}) => {
    return <>{person.name} {person.number}<br/></>
  }
  
export default Persons