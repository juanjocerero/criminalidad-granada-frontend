import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@bit/ans.base-ui.button';

import { Typography } from 'antd';

import logoSvg from '../img/icono.svg';
import '../css/Home.scss';

const { Title } = Typography;

function Home() {
  
  return (
    <div className="Home">
    
    <img 
    className="logo" 
    src={logoSvg} 
    alt="Unas esposas que representan el logo de la aplicación de Criminalidad en Granada" 
    />
    
    <header>
    <Title>Criminalidad en Granada</Title>
    </header>
    
    <section className="intro-text">
    <Title level={4}>Explora los datos</Title>
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
  