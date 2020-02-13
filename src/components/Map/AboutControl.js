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
    console.log(event);
    setVisible(false);
  };
  
  const handleCancel = event => {
    console.log(event);
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
      <Text>
        {/* TODO: rellenar este apartado */}
      </Text>
    </Paragraph>
    </Modal>
    
    </Control>
    </>
    );
  };
  
  export default AboutControl;