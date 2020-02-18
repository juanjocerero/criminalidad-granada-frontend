import React from 'react';
import MobileDetect from 'mobile-detect';
import { ResponsivePie } from '@nivo/pie';
import { Typography } from 'antd';

import '../../css/common.scss';
import '../../css/Stats/DetaineeDistribution.scss';

const { Title, Text } = Typography;
const md = new MobileDetect(window.navigator.userAgent);

const handleCrimenes = crimenes => [
  { id: 'Con detenidos', label: 'Con detenidos', color: '#d50019', value: crimenes.filter(c => c.detenidos !== null).length },
  { id: 'Sin detenidos', label: 'Sin detenidos', color: '#748d9a', value: crimenes.filter(c => c.detenidos === null).length  }
];

const DetaineeDistribution = ({ questionNumber, crimenes }) => {

  return (
    <>
    <div className="apply-flex-center">
    <Title level={3} className="question-title">{questionNumber}. ¿Cuántos acaban sin detenidos?</Title>
    
    <div className="detainee-distribution-container">
    
    <ResponsivePie 
    data={handleCrimenes(crimenes)} 
    sortByValue={md.mobile() ? true: false} 
    enableRadialLabels={md.mobile() ? false : true}
    margin={md.mobile() ? { top: 20, right: 0, bottom: 0, left: 0 } : { top: 60, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.6}
    padAngle={2}
    cornerRadius={1}
    colors={kind => kind.color} 
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
    );
  };
  
  export default DetaineeDistribution;
  