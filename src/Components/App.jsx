import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Protected from './Routes/Protected'
import Public from './Routes/Public';
import ViewNavbar from './middleware/ViewNavbar';
import Home from './Templates/Home';
import Login from './Templates/Login';
import Products from './Templates/Products';
import Error404 from './Templates/Error404';
/* https://dribbble.com/shots/9642337-SoftwareCompany-Access-Requests */
function App() {
  return (
    <Router>
      <ViewNavbar />
      <Switch>
        <Protected path="/" exact component={Home} />
        <Protected path="/all" component={Products} />

        <Public path="/login" exact component={Login} />


        <Route component={Error404} />
      </Switch>
    </Router>
  );
}

export default App;
