import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Protected from './Routes/Protected'
import Public from './Routes/Public';
import ViewNavbar from './middleware/ViewNavbar';
import Home from './Templates/Home';
import Login from './Templates/Login';
import Register from './Templates/Register';
import Products from './Templates/Products';
import Error404 from './Templates/Error404';
import Orders from './Templates/Orders';

function App() {
  return (
    <Router>
      <ViewNavbar />
      <Switch>
        <Protected path="/" exact component={Home} />
        <Protected path="/all" component={Products} />
        <Protected path="/orders" component={Orders} />

        <Public path="/login" exact component={Login} />
        <Public path="/register" exact component={Register} />



        <Route component={Error404} />
      </Switch>
    </Router>
  );
}

export default App;
