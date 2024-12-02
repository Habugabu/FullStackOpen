const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content props={{p1: part1, p2: part2, p3: part3, e1: exercises1, e2: exercises2, e3: exercises3 }} />
      <Total totalex={exercises1+exercises2+exercises3} />
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

const Content = ({props}) => {
  return (
    <div>
      <Part props={{part: props.p1, exercises: props.e1}} />
      <Part props={{part: props.p2, exercises: props.e2}} />
      <Part props={{part: props.p3, exercises: props.e3}} />
    </div>
  )
}

const Part = ({props}) => {
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
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