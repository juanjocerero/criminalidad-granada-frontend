import React from 'react';
import MobileDetect from 'mobile-detect';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { Typography } from 'antd';

import '../../css/Stats/ForceDistribution.scss';

const md = new MobileDetect(window.navigator.userAgent);
const { Title } = Typography;

const getRootObject = crimenes => {
  
  return {
    name: 'Total',
    color: '#e6e4d7',
    children: [
      {
        name: 'Guardia Civil',
        color: '#5caf72',
        count: crimenes.filter(c => c === 'Guardia Civil').length
      },
      {
        name: 'Policía Nacional',
        color: '#009dd1',
        count: crimenes.filter(c => c === 'Policía Nacional').length
      },
      {
        name: 'Policía Local',
        color: '#748d9a',
        count: crimenes.filter(c => c === 'Policía Local').length
      },
      {
        name: 'Otros',
        color: '#d50019',
        count: crimenes.filter(c => c !== 'Guardia Civil' && c !== 'Policía Nacional' && c !== 'Policía Local').length
      }
    ]
  }
  
};

const ForceDistribution = ({ questionNumber, crimenes }) => {
  
  return (
    <>
    <div className="apply-flex-center">
    <div className="forces-chart-container">
    <Title level={3} className="question-title">{questionNumber}. ¿Qué cuerpos comunican más?</Title>
    
    <ResponsiveTreeMap 
    root={getRootObject(crimenes)} 
    identity="name" 
    value="count" 
    innerPadding={3} 
    outerPadding={3} 
    margin={ md.mobile() ? { top: 10, right: 20, bottom: 10, left: 20 } : { top: 10, right: 50, bottom: 10, left: 50 }} 
    label="name" 
    colors={(e) => e.color}
    borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.3 ] ] }} 
    animate={false}
    />
    
    </div>
    </div>
    </>
    );
  };
  
  export default ForceDistribution;