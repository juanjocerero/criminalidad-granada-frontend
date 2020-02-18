import React, { useState } from 'react';
import Control from 'react-leaflet-control';
import { Button, Icon, Modal, Typography } from 'antd';

import '../../css/Map/AboutControl.scss';
import '../../css/common.scss'

const { Paragraph, Text } = Typography;

const AboutControl = () => {
  
  const [visible, setVisible] = useState(false);
  
  const showModal = () => {
    setVisible(true);
  };
  
  const handleOk = event => {
    setVisible(false);
  };
  
  const handleCancel = event => {
    setVisible(false);
  };
  
  return (
    <>
    <Control position="topright" className="about-control">
    
    <Button onClick={showModal}>
    <Icon type="question" />
    </Button>
    
    <Modal 
    className="fix-font-family"
    title="¿Cómo se usa esta herramienta?"
    visible={visible}
    onOk={handleOk}
    onCancel={handleCancel}
    footer={[<Button key="submit" type="primary" onClick={handleOk} className="modal-close-button">Vale</Button>]}
    >
    <Paragraph>
      <Text className="black-text">
        En el menú que se abre arriba a la izquierda (la 'hamburgesa') puedes cambiar los criterios de los crímenes que se muestran. El color de cada punto en el mapa indica de qué tipo de delito se trata. Cuando se acumulan muchos puntos, el número que aparece expresa cuántos hay; pinchando sobre él puedes acceder a una vista más detallada.
      </Text>
    </Paragraph>
    <Paragraph>
      <Text className="black-text">
        La vista por defecto, que se abre al cargar por primera vez, muestra los delitos cuya localización exacta se conoce cometidos en el año en curso.
      </Text>
    </Paragraph>
    <Paragraph>
      <Text className="black-text">
        Si un punto aparece con un borde negro alrededor quiere decir que se sabe en qué municipio ocurrió, pero no su localización exacta.
      </Text>
    </Paragraph>
    <Paragraph>
      <Text className="black-text">
        Puedes pinchar sobre cualquier punto para ver información detallada sobre un hecho.
      </Text>
    </Paragraph>
    </Modal>
    
    </Control>
    </>
    );
  };
  
  export default AboutControl;
