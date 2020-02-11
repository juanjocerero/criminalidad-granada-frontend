import React, { useState, useEffect } from 'react';
import { mean, groupBy, flattenDeep, forOwn, orderBy, first } from 'lodash';
import { Typography, Divider, Row, Col } from 'antd';
import { ResponsiveBar } from '@nivo/bar';

import '../../css/Stats/Profiles.scss';
import '../../css/common.scss';

const { Text } = Typography;

const getSexDistribution = arrested => {
  const men = [], women = [], valid = [];
  
  for (let arrestee of arrested) {
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

const getPreviousFeloniesDistribution = arrested => {
  const valid = [];
  
  for (let previousFelon of arrested) {
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

const getMeanAgeOfArrested = arrested => mean(arrested.filter(arrestee => arrestee.edad).map(arrestee => arrestee.edad)).toFixed(1);

const getMostCommonOrigin = arrested => {
  const hasOrigins = arrested.filter(arrestee => arrestee.nacionalidad);
  const byCountry = groupBy(hasOrigins, 'nacionalidad');
  const countries = [];

  forOwn(byCountry, (data, country) => {
    countries.push({ country, total: data.length, percent: ((data.length/hasOrigins.length)*100).toFixed(1) });
  });

  const mostCommon = first(orderBy(countries, 'total').reverse());
  return mostCommon;
};

const ArrestedProfile = ({ crimenes }) => {
  
  const [arrested, setArrested] = useState([]);
  
  useEffect(() => {
    const arrested = flattenDeep(flattenDeep(crimenes.filter(crime => crime.detenidos)).map(crime => crime.detenidos));
    setArrested(arrested);
  }, [crimenes]);
  
  return (
    <>
    <Row gutter={0} className="profile-features-container">
    
    <Row gutter={0} className="profile-row-sex">
    <Col span={6} style={{ textAlign: 'left' }}>
    <Text className="black-text profile-item-description" style={{ lineHeight: 1.8 }}>Por sexo</Text>
    </Col>
    <Col span={6} style={{ textAlign: 'right', height: 25, width: '60%' }} className="float-right">
    
    <ResponsiveBar 
    data={getSexDistribution(arrested)} 
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
    <Text className="black-text percent-text">{` (${((value/getSexDistribution(arrested)[0].total)*100).toFixed(2)}%)`}</Text>
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
    <Col span={6} style={{ textAlign: 'left' }}>
    <Text className="black-text profile-item-description" style={{ lineHeight: 1.8 }}>Antecedentes</Text>
    </Col>
    <Col span={6} style={{ textAlign: 'right', height: 25, width: '60%' }} className="float-right">
    
    <ResponsiveBar 
    data={getPreviousFeloniesDistribution(arrested)} 
    keys={['Sí tiene', 'No tiene']} 
    layout="horizontal" 
    axisLeft={null}
    margin={{ top: 0, right: 0, bottom: 0, left: 20 }}
    padding={0.3}
    colors={['#b90021', '#4dc98b']}
    borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
    tooltip={({id, value}) => <>
    <Text className="black-text">{`${id}: `}</Text>
    <Text className="black-text percent-text">{` (${((value/getPreviousFeloniesDistribution(arrested)[0].total)*100).toFixed(2)}%)`}</Text>
    </>
    }
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
    
    <Row className="profile-row-age" gutter={0}>
    <Col span={6} style={{ textAlign: 'left' }}>
    <Text className="black-text profile-item-description" style={{ lineHeight: 1.8 }}>Edad media </Text>
    </Col>
    <Col span={6} style={{ textAlign: 'right', height: 25, width: '60%' }} className="float-right">
    <Text className="black-text" style={{ fontSize: '1.1rem', fontWeight: 500 }}>{ getMeanAgeOfArrested(arrested) }</Text> años
    </Col>
    </Row>
    
    <Divider orientation="vertical" />
    
    <Row className="profile-row-nationalities" gutter={0}>
    <Col span={6} style={{ textAlign: 'left' }}>
    <Text className="black-text profile-item-description" style={{ lineHeight: 1.8 }}>Origen </Text>
    </Col>
    <Col span={6} style={{ textAlign: 'right', height: 25, width: '60%' }} className="float-right">
    <Text className="black-text" style={{ fontSize: '0.9rem', fontWeight: 500, display: 'inline-block' }}>
      { getMostCommonOrigin(arrested) ? getMostCommonOrigin(arrested).country : null }
    </Text>
    <Text className="black-text" style={{ fontSize: '0.8rem', fontWeight: 400, display: 'inline-block', marginLeft: '.3rem' }}>
      { getMostCommonOrigin(arrested) ? `(${getMostCommonOrigin(arrested).percent}%)` : null }
    </Text>
    </Col>
    </Row>
    
    </Row>
    </>
    )
  }
  
  export default ArrestedProfile;
  