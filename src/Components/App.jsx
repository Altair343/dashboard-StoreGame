import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Protected from './Routes/Protected'
import Public from './Routes/Public';

import Home from './Templates/Home';
import Login from './Templates/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Protected path="/" exact component={Home} />

        <Public path="/login" exact component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
