import './App.css';
import React, { useReducer } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';

import { GlobalContext } from './GlobalContext';
import { reducer, initialState, DRAG_END } from './reducer';
import Nav from './components/Nav';
import Viewer from './components/Viewer';
import Planner from './components/Planner';
import Dashboard from './components/Dashboard';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <DragDropContext onDragEnd={res => dispatch(DRAG_END(res))}>
        <Router>
          <div className="App">
            {/* <Nav>
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/users">Users</Link>
            </Nav> */}
            <Viewer>
              <Planner />
            </Viewer>
          </div>
        </Router>
      </DragDropContext>
    </GlobalContext.Provider>
  );
}

export default App;
