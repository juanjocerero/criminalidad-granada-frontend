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
        En el menú que se abre pinchando en el icono que hay arriba a la izquierda puedes refinar los criterios de los crímenes que se muestran. El color de cada punto indica de qué tipo de delito se trata. Si se acumulan muchos puntos, el número que aparece expresa cuántos hay; pinchando sobre él puedes acceder a una vista más detallada.
      </Text>
    </Paragraph>
    <Paragraph>
      <Text className="black-text">
        Los puntos que aparecen con un borde oscuro indican aquellos del que sólo se sabe en qué municipio ocurrieron, pero no su localización exacta.
      </Text>
    </Paragraph>
    <Paragraph>
      <Text className="black-text">
        Puedes pinchar sobre cualquier punto para ver información detallada sobre el delito cometido.
      </Text>
    </Paragraph>
    </Modal>
    
    </Control>
    </>
    );
  };
  
  export default AboutControl;
