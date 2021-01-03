import './App.css'
import React from 'react'
import { GlobalContext } from './GlobalContext/GlobalContext'


function App(): JSX.Element {
  return (
    <GlobalContext.Provider value={{}}>
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </GlobalContext.Provider>
  )
}

export default App
