import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import CrimeVisualization from './CrimeVisualization';
import CrimeStats from './CrimeStats';

function App() {
  return (
    <div className="App">

      <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/map" component={CrimeVisualization} />
      <Route path="/stats" component={CrimeStats} />
      </Switch>
      
    </div>
  );
};


export default App;