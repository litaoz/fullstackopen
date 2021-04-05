import React, {useState} from 'react'

const Feedback = (props) => {
  const {addGood, addNeutral, addBad} = props

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={addGood}>good</button>
      <button onClick={addNeutral}>neutral</button>
      <button onClick={addBad}>bad</button>
    </div>
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const totalcount = good + neutral + bad
  const totalscore = good * 1 + neutral * 0 + bad * -1
  const average =  totalscore / totalcount
  const percentpositive = good / totalcount * 100

  return (
    <div>
      <Feedback addGood={() => setGood(good + 1)}
                addNeutral={() => setNeutral(neutral + 1)}
                addBad={() => setBad(bad + 1)}/>
      <div>
        <h2>statistics</h2>
        <p>
          good {good}<br/>
          neutral {neutral}<br/>
          bad {bad}<br/>
          all {totalcount}<br/>
          average {average}><br/>
          positive {percentpositive}
        </p>
      </div>
    </div>
  );
}

export default App;
