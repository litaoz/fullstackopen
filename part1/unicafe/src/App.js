import React, {useState} from 'react'



const App = () => {
  return (
    <div>
      <div>
        <h2>give feedback</h2>
        <button>good</button>
        <button>neutral</button>
        <button>bad</button>
      </div>
      <div>
        <h2>statistics</h2>
        <p>good 6</p>
        <p>neutral 2</p>
        <p>bad 1</p>
      </div>
    </div>
  );
}

export default App;
