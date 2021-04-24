import '../Assets/scss/styles.scss';

import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Templates/Home';

function App() {
  return (
    <Router>
     {/*  <NavBar /> */}
        <Switch>
          <Route path = "/" exact component = { Home }/>
          
        </Switch>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
