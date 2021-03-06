import React, {useState} from 'react'

const randomInt = (num) => {
  // Returns a int from [0, num) 
  return Math.floor(Math.random() * num)
}

const maxIndex = (arr) => {
  // Returns the first index of the max value
  const maxValue = Math.max(...arr)
  return arr.indexOf(maxValue)
}

const Anecdote = (props) => {
  const {anecdotes, points, selected} = props
  return (
    <div>
      <div>
        {anecdotes[selected]}
      </div>
      <div>
        has {points[selected]} votes
      </div>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debuggin is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(randomInt(anecdotes.length))
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const copy = [...points]
  const maxVotesIndex = maxIndex(points)

  const vote = (selected) => {
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div className='app'>
      <div className='anecdote-of-day'>
        <h1>Anecdote of the day</h1>
        <Anecdote anecdotes={anecdotes} points={points} selected={selected}/>
        <p>
          <button onClick={() => {vote(selected)}}>vote</button>
          <button onClick={() => {setSelected(randomInt(anecdotes.length))}}>next anecdote</button>
        </p>
      </div>

      <div className='highest-vote'>
        <h1>Anecdote with the most votes</h1>
        <Anecdote anecdotes={anecdotes} points={points} selected={maxVotesIndex}/>
      </div>
    </div>
  );
}

export default App;
