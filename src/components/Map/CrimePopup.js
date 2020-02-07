import React, { Fragment } from 'react';
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import { uuid } from 'uuidv4';
import { Card, Typography, Collapse } from 'antd';
import { FaPlus } from 'react-icons/fa';

import PersonaImplicada from './PersonaImplicada';

// https://github.com/hustcc/timeago-react/issues/27
import es from 'timeago.js/lib/lang/es';

import '../../css/Map/CrimePopup.scss';
import '../../css/Map/CrimeTooltip.scss';
import '../../css/common.scss';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const CrimePopup = ({ crimen }) => {
  timeago.register('es', es);

  return (
    <Fragment>
    <Card className="crimen-popup" bordered={false}>
    
    <TimeAgo datetime={crimen.date} locale="es" className="time-ago display-inline-block" />
    <Text className="time-ago display-inline-block">, en { crimen.municipio.length > 1 ? crimen.municipio.join(', ') : crimen.municipio }</Text>
    
    <Title level={4}>{ crimen.titular }</Title>
    
    <Paragraph className="crimen-text">
    <Text>{ crimen.texto }</Text>
    </Paragraph>
    
    {/* This segment conditionally renders more info about victims and detainees  */}
    {
      (crimen.victimas || crimen.detenidos) && 
      <Collapse>
      { crimen.detenidos && <Panel className="text-bold" header={ crimen.detenidos.length > 1 ?  `Detenidos (${crimen.detenidos.length})` : `Un detenido` } key="1">
      
      { crimen.detenidos.map(detenido => 
        <PersonaImplicada 
        key={uuid()}
        nombre={detenido.nombre} 
        iniciales={detenido.iniciales} 
        edad={detenido.edad} 
        sexo={detenido.sexo} 
        nacionalidad={detenido.nacionalidad} />) 
      }
      
      </Panel>
    }
    
    { crimen.victimas && <Panel className="text-bold" header={ crimen.victimas.length > 1 ? `Víctimas (${crimen.victimas.length})` : `Una víctima` } key="2">
    
    { crimen.victimas.map(victima => 
      <PersonaImplicada 
      key={uuid()}
      nombre={victima.nombre} 
      iniciales={victima.iniciales} 
      edad={victima.edad} 
      sexo={victima.sexo} 
      nacionalidad={victima.nacionalidad} />) 
    }
    
    </Panel>
  }
  </Collapse>
}

{ crimen.url && 
  <div className="more-info vertically-align-elements justify-center">
  <FaPlus />
  <a href={crimen.url} target="_blank" className="override-underline" rel="noopener noreferrer">
  <Text>Más información en ideal.es</Text>
  </a>
  </div> 
}

</Card>
</Fragment>
);

};

export default CrimePopup;
