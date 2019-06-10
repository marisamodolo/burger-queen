import React from 'react';
import Login from './pages/Login';
import Kitchen from './pages/Kitchen';
import Hall from './pages/Hall';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

function App() {
  return (
    <Router>
          <Route path="/" exact component={Login} />
          <Route path="/hall" exact component={Hall} />
          <Route path="/kitchen" exact component={Kitchen} />
    </Router>
  );
}

export default App;
