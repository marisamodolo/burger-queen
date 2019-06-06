import React from 'react';
import './App.css';
import Login from './pages/Login';
import Kitchen from './pages/Kitchen';
import Hall from './pages/Hall';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Route path="/" exact component={Login} />
          <Route path="/hall" exact component={Hall} />
          <Route path="/kitchen" exact component={Kitchen} />
        </header>
      </div>
    </Router>
  );
}

export default App;
