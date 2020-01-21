import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@bit/ans.base-ui.button';
// eslint-disable-next-line
import * as icons from 'react-icons/fi';

import '../css/Home.scss';
import '../css/common.scss';

function Home() {
  return (
    <div className="Home text-center">
    
    <header>
    <h2 className="app-title">Criminalidad en Granada</h2>
    </header>
    
    <section className="intro-text">
    <p>Explore los datos</p>
    </section>
    
    <section className="home-links">
    
    <Link to="/map">
    <Button loading={false} icon="MapPin" size="default" className="intro-screen-button">
    Mapa del crimen
    </Button>
    </Link>
    
    <Link to="/stats">
    <Button loading={false} icon="BarChart2" size="default" secondary={true} className="intro-screen-button">
    Estadísticas
    </Button>
    </Link>
    
    </section>
    
    </div>
    );
  }
  
  export default Home;