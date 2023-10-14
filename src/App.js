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
  const [num2, setGroupSize] = useState(1);
  const [allowLess, setAllowLess] = useState(false);
  const [groups, setGroups] = useState([]);

  const handleGenerateGroups = () => {
    const num1Value = parseInt(num1, 10);
    const num2Value = parseInt(num2, 10);

    if (isNaN(num1Value) || isNaN(num2Value)) {
      alert('Please enter valid numbers for Number of students and Size of each group.');
      return;
    }

    const data = createRandomGroups(num1, num2, allowLess);
    setGroups(data);
  };
  
  return (

    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App-main">
        <h1>Random Groups Generator</h1>
        <label htmlFor="num1">Number of students:</label>
        <input
          type="number"
          id="num1"
          value={num1}
          onChange={(e) => setNumOfStudents(e.target.value)}
        /><br />

        <label htmlFor="num2">Size of each groups:</label>
        <input
          type="number"
          id="num2"
          value={num2}
          onChange={(e) => setGroupSize(e.target.value)}
        /><br />

        <label htmlFor="allowLess">Allow Less?</label>
        <input
          type="checkbox"
          id="allowLess"
          checked={allowLess}
          onChange={(e) => setAllowLess(e.target.checked)}
        /><br />

        <button onClick={handleGenerateGroups}>Generate Groups</button>
        <br />
      </div>
      <div>
        {groups.map((group, index) => (
          <p key={index}>
            <strong>Group {index + 1}:</strong> {group.join(', ')}
          </p>
          ))}
      </div>
    </div>
  );
}

export default App;
