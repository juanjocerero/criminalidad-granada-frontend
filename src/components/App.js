import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Home from './Home';
import CrimeVizContainer from './CrimeVizContainer';
import CrimeStats from './CrimeStats';
import TimelineContainer from './TimelineContainer';

require('dotenv').config();

function App() {
  return (
    <HelmetProvider>
    <div className="App">
    
    <Helmet>
      <meta charSet="utf-8" />
      <title>Criminalidad en Granada</title>
      <link rel="canonical" href="https://www.ideal.es" />
      <meta name="description" content="Aplicación para visualizar los crímenes que se cometen en la provincia de Granada, con un mapa en tiempo real y estadísticas y datos para comprenderlos mejor." />
    </Helmet>
    
    <Switch>
    <Route path="/" component={Home} exact />
    <Route path="/map" component={CrimeVizContainer} />
    <Route path="/stats" component={CrimeStats} />
    <Route path="/timeline" component={TimelineContainer} />
    </Switch>
    
    </div>
    </HelmetProvider>
    );
  };
  
  export default App;
  