import React from 'react';
import { Typography } from 'antd';

import '../../css/Stats/StatsWelcome.scss';
import '../../css/common.scss';

const { Title, Paragraph, Text } = Typography;

const StatsWelcome = () => {
  
  return (
    <div className="stats-welcome-container carousel-element">
    <Title 
    level={2} 
    underline={false} 
    style={{ color: '#f22e52', paddingBottom: '0.8rem', borderBottom: '2px solid white' }}>
    La criminalidad de Granada, en datos
    </Title>
    <div className="stats-welcome-text" style={{ textAlign: 'left', marginTop: '0.8rem' }}>
    <Paragraph>
    <Text>Te presentamos una decena de gráficos y grandes cifras que ayudan a conocer mejor el panorama de la criminalidad en la provincia de Granada.</Text>
    </Paragraph>
    <Paragraph>
    <Text>Cada uno de ellos tratará de <strong>responder a una pregunta concreta</strong>. Puedes desplazarte por ellos haciendo <em>swipe</em> en tu teléfono móvil, pinchando sobre los iconos bajo estas líneas o usando las flechas de tu teclado.</Text>
    </Paragraph>
    <Paragraph>
    <Text>Los datos que alimentan estos gráficos <strong>se actualizan en tiempo real</strong>, por lo que pueden ser diferentes cada día.</Text>
    </Paragraph>
    </div>
    </div>
    )
  };
  
  export default StatsWelcome;