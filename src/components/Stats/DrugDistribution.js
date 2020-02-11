import React from 'react';
import MobileDetect from 'mobile-detect';
import { remove } from 'lodash';
import { ResponsivePie } from '@nivo/pie';
import { Typography } from 'antd';

const { Title, Text } = Typography;
const md = new MobileDetect(window.navigator.userAgent);

const handleCrimes = crimes => {
  const byDrug = [
    { id: 'Marihuana', label: 'Marihuana', value: 0, color: '#47cca9' },
    { id: 'Hachís', label: 'Hachís', value: 0, color: '#cc7e47' },
    { id: 'Cocaína', label: 'Cocaína', value: 0, color: '#f0f0f0' },
    { id: 'Resto', label: 'Resto', value: 0, color: '#f5b3b3' }
  ];
  
  for (let crime of crimes) {
    if (crime.categorias.includes('Marihuana')) {
      byDrug[0].value++;
    }
    else if (crime.categorias.includes('Hachís')) {
      byDrug[1].value++;
    }
    else if (crime.categorias.includes('Cocaína')) {
      byDrug[2].value++;
    } else {
      byDrug[3].value++;
    }
  };

  return remove(byDrug, drug => drug.value !== 0);
};

const DrugDistribution = ({ crimenes }) => {
  
  return (
    <>
    <div className="apply-flex-center">
    <Title level={3} className="question-title">¿Qué drogas están implicadas?</Title>
    
    <div className="categories-chart-container">
    
    <ResponsivePie 
    data={handleCrimes(crimenes)} 
    sortByValue={md.mobile() ? true : false} 
    enableRadialLabels={md.mobile() ? false : true}
    margin={md.mobile() ? { top: 20, right: 0, bottom: 0, left: 0 } : { top: 60, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.6}
    padAngle={2}
    cornerRadius={1}
    colors={drug => drug.color}
    borderWidth={2}
    borderColor={'rgba(255,255,255,0.9)'}
    radialLabelsSkipAngle={2}
    radialLabelsTextXOffset={6}
    radialLabelsTextColor={'rgba(255,255,255,1)'}
    radialLabelsLinkOffset={0}
    radialLabelsLinkDiagonalLength={16}
    radialLabelsLinkHorizontalLength={16}
    radialLabelsLinkStrokeWidth={3}
    radialLabelsLinkColor={{ from: 'color' }}
    slicesLabelsSkipAngle={10}
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    tooltip={({ id, value }) => 
    <>
    <Text className="black-text">{id}</Text>
    <Text className="black-text"> (<strong>{((value/crimenes.length)*100).toFixed(1)}%</strong>) </Text>
    </>}
    />
    </div>
    
    </div>
    </>
    )
    
  };
  
  export default DrugDistribution;