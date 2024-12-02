import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  //const [total, setTotal] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)
  const total = () => good + neutral + bad
  const average = () => {
    if (total() == 0) return 0
    else return (good - bad)/(total())
  }
  const positive = () => {
    if (total() == 0) return 0
    else return (100 * (good)/(total())) + '%'
  }

  return (
    <div>
      <Header text = 'give feedback'/>
      <div>
        <Button onClick={handleGoodClick} text = 'good' />
        <Button onClick={handleNeutralClick} text = 'neutral' />
        <Button onClick={handleBadClick} text = 'bad' />
      </div>
      <Header text = 'statistics'/>
      <Stats stats = {{good: good, neutral: neutral, bad: bad,
         total: total(), average: average(), positive: positive()}}/>
    </div>
  )
}

const Header = ({text}) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Stats = ({stats}) => {
  if (stats.total == 0){
    return (
      <p>No feedback given</p>
    )
  }
  else return (
    <table>
      <tbody>
        <Statistic text = 'good' value = {stats.good}/>
        <Statistic text = 'neutral' value = {stats.neutral}/>
        <Statistic text = 'bad' value = {stats.bad}/>
        <Statistic text = 'total' value = {stats.total}/>
        <Statistic text = 'average' value = {stats.average}/>
        <Statistic text = 'positive' value = {stats.positive}/>
      </tbody>
    </table>

  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick = {onClick}>
      {text}
    </button>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}


export default App