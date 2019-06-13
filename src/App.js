import React from 'react';
import Login from './pages/Login';
import Kitchen from './pages/Kitchen';
import HallTeste from './pages/HallTeste';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/hall" exact component={HallTeste} />
      <Route path="/kitchen" exact component={Kitchen} />
    </Router>
  );
}

export default App;
