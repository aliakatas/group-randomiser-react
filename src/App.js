import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import random from 'random';

function createRandomGroups(n, groupSize, allowLess = false) {
  const names = Array.from({ length: n }, (_, i) => (i + 1).toString());
  const groups = [];

  if (groupSize > n) {
    return groups;
  }

  while (n >= groupSize) {
    const group = [];
    for (let i = 0; i < groupSize; i++) {
      const nameIndex = random.int(0, names.length - 1);
      const name = names.splice(nameIndex, 1)[0];
      group.push(name);
    }

    groups.push(group);
    n = names.length;
  }

  if (allowLess) {
    groups.push(...names);
  } else {
    const numGroups = groups.length;
    for (let i = 0; i < names.length; i++) {
      const groupIndex = i % numGroups;
      groups[groupIndex].push(names[i]);
    }
  }

  return groups;
}

function App() {
  const [num1, setNumOfStudents] = useState(1);
  const [num2, setNumOfGroups] = useState(1);
  const [allowLess, setAllowLess] = useState(false);
  const [groups, setGroups] = useState([]);
  
  return (

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <h1>Random Groups Generator</h1>
      <label htmlFor="num1">Number of students:</label>
      <input
        type="number"
        id="num1"
        value={num1}
        onChange={(e) => setNumOfStudents(e.target.value)}
      /><br />

      <label htmlFor="num2">Number of groups:</label>
      <input
        type="number"
        id="num2"
        value={num2}
        onChange={(e) => setNumOfGroups(e.target.value)}
      /><br />

      <label htmlFor="allowLess">Allow Less?</label>
      <input
        type="checkbox"
        id="allowLess"
        checked={allowLess}
        onChange={(e) => setAllowLess(e.target.checked)}
      /><br />
    </div>





    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    // 
    
    // <button onClick={handleGenerateGroups}>Generate Groups</button>
    // 
    // <div>
    //  {groups.map((group, index) => (
    //    <p key={index}>
    //      <strong>Group {index + 1}:</strong> {group.join(', ')}
    //    </p>
    //  ))}
    // </div>
  );
}

export default App;
