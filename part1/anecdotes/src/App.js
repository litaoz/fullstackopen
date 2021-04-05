import React, {useState} from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer cna understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debuggin is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const randomInt = (num) => {
    // Returns a int from [0, num) 
    return Math.floor(Math.random() * num)
  }

  const [selected, setSelected] = useState(randomInt(anecdotes.length))

  return (
    <div>
      {anecdotes[selected]}
      <p>
        <button onClick={() => {setSelected(randomInt(anecdotes.length))}}>next anecdote</button>
      </p>
    </div>
  );
}

export default App;
