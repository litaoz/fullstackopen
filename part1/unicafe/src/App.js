import React, {useState} from 'react'

const Feedback = (props) => {
  // Properties
  const {addGood, addNeutral, addBad} = props

  // Display
  return (
    <div>
      <h2>give feedback</h2>
      <FeedbackButton handler={addGood} text='good'/>
      <FeedbackButton handler={addNeutral} text='neutral'/>
      <FeedbackButton handler={addBad} text='bad'/>
    </div>
  )
}

const FeedbackButton = (props) => {
  // Properties
  const {handler, text} = props

  // Display
  return (
    <button onClick={handler}>{text}</button>
  )
}

const Statistics = (props) => {
  // Properties
  const {good, neutral, bad} = props

  // Calculations
  const totalcount = good + neutral + bad
  const totalscore = good * 1 + neutral * 0 + bad * -1
  const average =  totalscore / totalcount
  const percentpositive = good / totalcount * 100

  // Display
  if (totalcount === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <Statistic label='good' value={good}/>
          <Statistic label='neutral' value={neutral}/>
          <Statistic label='bad' value={bad}/>
          <Statistic label='all' value={totalcount}/>
          <Statistic label='average' value={average}/>
          <Statistic label='positive' value={percentpositive + ' %'}/>
        </tbody>
      </table>
    </div>
  )
}

const Statistic = (props) => {
  const {label, value} = props
  return (
  <tr>
    <td>{label}</td>
    <td>{value}</td>
  </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback addGood={() => setGood(good + 1)}
                addNeutral={() => setNeutral(neutral + 1)}
                addBad={() => setBad(bad + 1)}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
}

export default App;
