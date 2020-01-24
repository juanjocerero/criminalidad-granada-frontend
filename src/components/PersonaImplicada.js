import React, { Fragment } from 'react';
import { every } from 'lodash';
import { Typography, Divider } from 'antd';
import { AiOutlineMan, AiOutlineWoman } from 'react-icons/ai';
import { FaRegFlag } from 'react-icons/fa';

import '../css/common.scss';
import '../css/PersonaImplicada.scss';

const { Text } = Typography;


const PersonaImplicada = ({ nombre, iniciales, sexo, edad, nacionalidad }) => {
  
  const everythingIsNull = every([nombre, iniciales, sexo, edad, nacionalidad], element => (element === null));
  
  return (
    
    <Fragment>
    
    {
      everythingIsNull ? 
      <div className="no-more-info">
      <Text className="black-text">No hay más información sobre esta persona.</Text>
      </div> :
      <div className="vertically-align-elements victim-or-detainee">
      
      { sexo && (sexo === 'Hombre' ? 
      <Fragment>
      <AiOutlineMan className="icon icon-man" />
      </Fragment>
      : 
      <Fragment>
      <AiOutlineWoman className="icon icon-woman" />
      </Fragment>
      ) }
      
      { iniciales && 
        <Fragment>
        <Divider type="vertical" />
        <Text className="black-text text-medium">{ iniciales }</Text> 
        </Fragment>
      }
      
      { nombre && 
        <Fragment>
        <Divider type="vertical" />
        <Text className="black-text text-medium">{ nombre }</Text>
        </Fragment> 
      }
      
      { edad && 
        <Fragment>
        <Divider type="vertical" />
        <Text className="black-text text-medium">{ edad } años</Text> 
        </Fragment>
      }
      
      { nacionalidad && 
        <Fragment>
        <Divider type="vertical" />
        <FaRegFlag className="flag-icon" />
        <Text className="black-text text-medium">{ nacionalidad }</Text>
        </Fragment> 
      }
      
      </div>
    }
    
    </Fragment>
    );
  };
  
  export default PersonaImplicada;
  