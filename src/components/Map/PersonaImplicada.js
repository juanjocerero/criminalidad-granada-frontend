import React from 'react';
import { every } from 'lodash';
import { Typography, Divider } from 'antd';
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai';
import { FaRegFlag } from 'react-icons/fa';

import '../../css/common.scss';
import '../../css/Map/PersonaImplicada.scss';

const { Text } = Typography;

const PersonaImplicada = ({ nombre, iniciales, sexo, edad, nacionalidad }) => {
  
  const everythingIsNull = every([nombre, iniciales, sexo, edad, nacionalidad], element => (element === null));
  
  return (
    <>
    
    {
      everythingIsNull 
      
      ? // If no information on this person is available, we render a simple message
      <div className="no-more-info">
      <Text className="black-text">No hay más información sobre esta persona.</Text>
      </div> : 
      // If there is available informoation, we render it conditionally and in order
      <div className="vertically-align-elements victim-or-detainee">
      
      { sexo && (sexo === 'Hombre' ? 
      <>
      <AiOutlineMan className="icon icon-man" />
      </>
      : 
      <>
      <AiOutlineWoman className="icon icon-woman" />
      </>
      ) }
      
      { iniciales && 
        <>
        <Divider type="vertical" style={{ marginLeft: '0.3rem' }} />
        <Text className="black-text text-medium" style={{ marginLeft: '0.3rem' }}>{ iniciales }</Text> 
        </>
      }
      
      { nombre && 
        <>
        <Divider type="vertical" style={{ marginLeft: '0.3rem' }} />
        <Text className="black-text text-medium" style={{ marginLeft: '0.3rem' }}>{ nombre }</Text>
        </> 
      }
      
      { edad && 
        <>
        <Divider type="vertical" style={{ marginLeft: '0.3rem' }} />
        <Text className="black-text text-medium" style={{ marginLeft: '0.3rem' }}>{ edad } años</Text> 
        </>
      }
      
      { nacionalidad && 
        <>
        <Divider type="vertical" style={{ marginLeft: '0.3rem' }} />
        <FaRegFlag className="flag-icon" style={{ marginLeft: '0.3rem' }} />
        <Text className="black-text text-medium" style={{ marginLeft: '0.1rem' }}>{ nacionalidad }</Text>
        </> 
      }
      
      </div>
    }
    
    </>
    );
  };
  
  export default PersonaImplicada;
  