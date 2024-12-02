const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={{p1: part1, p2: part2, p3: part3}} />
      <Total totalex={part1.exercises+part2.exercises+part3.exercises} />
    </div>
  )
}

const Header = ({course}) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      <Part part={parts.p1} />
      <Part part={parts.p2} />
      <Part part={parts.p3} />
    </div>
  )
}

const Part = ({part}) => {
  return (
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}

const Total = ({totalex}) => {
  return (
    <div>
      <p>Number of exercises {totalex}</p>
    </div>
  )
}

export default App