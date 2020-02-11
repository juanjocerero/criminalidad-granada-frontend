import React from 'react';
import { mean, groupBy, flattenDeep } from 'lodash';
import { Typography, Divider, Row, Col } from 'antd';
import { ResponsiveBar } from '@nivo/bar';

import '../../css/Stats/Profiles.scss';
import '../../css/common.scss';

/*
Componentes del perfil:
Edad media
Con o sin antecedentes
Nacionalidad más común
*/

const { Text } = Typography;

const getSexDistribution = crimes => {
  const arrested = flattenDeep(crimes.filter(crime => crime.detenidos)).map(crime => crime.detenidos);
  const men = [], women = [], valid = [];
  
  for (let arrestee of flattenDeep(arrested)) {
    if (arrestee.sexo) {
      valid.push(arrestee);
      if (arrestee.sexo === 'Hombre') {
        men.push(arrestee)
      } else {
        women.push(arrestee);
      }
    }
  }
  
  return [{
    id: "1",
    Hombres: men.length,
    Mujeres: women.length,
    total: men.length + women.length
  }];
};

const getPreviousFeloniesDistribution = crimes => {
  const previousFelons = flattenDeep(crimes.filter(crime => crime.detenidos).map(crime => crime.detenidos));
  const valid = [];
  
  for (let previousFelon of previousFelons) {
    if (previousFelon.antecedentes !== undefined && previousFelon.antecedentes !== null) {
      valid.push(previousFelon);
    }
  }

  return [{
    "id": "1",
    "Sí tiene": valid.filter(v => v.antecedentes).length,
    "No tiene": valid.filter(v => !v.antecedentes).length,
    "total": valid.length
  }];
};

const ArrestedProfile = ({ crimenes }) => {
  return (
    <>
    <Row gutter={0} className="profile-features-container">
    
    <Row gutter={0} className="profile-row-sex">
    <Col span={6}><Text className="black-text" style={{ lineHeight: 1.8 }}>Por sexo</Text></Col>
    <Col span={6} style={{ textAlign: 'right', height: 25, width: '60%' }} className="float-right">
    
    <ResponsiveBar 
    data={getSexDistribution(crimenes)} 
    keys={['Hombres', 'Mujeres']} 
    layout="horizontal" 
    axisLeft={null}
    margin={{ top: 0, right: 0, bottom: 0, left: 20 }}
    padding={0.3}
    colors={['#73adf0', '#ea73ff']}
    borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
    tooltip={({id, value}) => 
    <>
    <Text className="black-text">{`${id}: `}</Text>
    <Text className="black-text text-bold fix-line-height">{`${value}`}</Text>
    <Text className="black-text percent-text">{` (${((value/getSexDistribution(crimenes)[0].total)*100).toFixed(2)}%)`}</Text>
    </>}
    enableLabel={false}
    legends={[
      {
        dataFrom: 'keys',
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: 'right-to-left',
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: 'hover',
            style: {
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
    animate={false}
    />
    </Col>
    </Row>

    <Divider orientation="vertical" />

    <Row gutter={0} className="profile-row-previous">
    <Col span={6}><Text className="black-text" style={{ lineHeight: 1.8 }}>Antecedentes</Text></Col>
    <Col span={6} style={{ textAlign: 'right', height: 25, width: '60%' }} className="float-right">
    
    <ResponsiveBar 
    data={getPreviousFeloniesDistribution(crimenes)} 
    keys={['Sí tiene', 'No tiene']} 
    layout="horizontal" 
    axisLeft={null}
    margin={{ top: 0, right: 0, bottom: 0, left: 20 }}
    padding={0.3}
    colors={['#b90021', '#4dc98b']}
    borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
    tooltip={({id, value}) => 
    <>
    <Text className="black-text">{`${id}: `}</Text>
    <Text className="black-text percent-text">{` (${((value/getPreviousFeloniesDistribution(crimenes)[0].total)*100).toFixed(2)}%)`}</Text>
    </>}
    enableLabel={false}
    legends={[
      {
        dataFrom: 'keys',
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: 'right-to-left',
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: 'hover',
            style: {
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
    animate={false}
    />
    </Col>
    </Row>
    
    </Row>
    
    <Divider orientation="vertical" />

    </>
    )
  }
  
  export default ArrestedProfile;
  