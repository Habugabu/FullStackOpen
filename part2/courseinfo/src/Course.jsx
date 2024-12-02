const Course = ({course}) => {
  const id = course.id
  const name = course.name
  const parts = course.parts
  
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total parts={parts}/>
    </div>
  )
}

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => {
    const nums = parts.map(part => part.exercises)
    const sum = nums.reduce((s,p) => s + p)
    return (
        <p><b>total of {sum} exercises</b></p>
    )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key = {part.id} part = {part}/>)}
  </>

export default Course