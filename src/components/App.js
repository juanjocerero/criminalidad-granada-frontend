import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import CrimeVizContainer from './CrimeVizContainer';
import CrimeStats from './CrimeStats';

require('dotenv').config();

function App() {
  return (
    <div className="App">

      <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/map" component={CrimeVizContainer} />
      <Route path="/stats" component={CrimeStats} />
      </Switch>
      
    </div>
  );
};

export default App;
