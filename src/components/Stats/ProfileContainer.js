import React from 'react';
import { Typography, Collapse } from 'antd';

import VictimProfile from './VictimProfile';
import ArrestedProfile from './ArrestedProfile';

import '../../css/common.scss';
import '../../css/Stats/ProfileContainer.scss';

const { Title } = Typography;
const { Panel } = Collapse;

const ProfileContainer = ({ crimenes }) => {
  
  return (
    <>
    <div className="apply-flex-center">
    <Title level={3} className="question-title">¿Cuáles son los perfiles más comunes?</Title>
    <Title className="profile-subtitle" level={4}>
    (Pulse o pase el ratón por las barras de los gráficos para ver más información)
    </Title>
    
    <Collapse accordion className="profiles-container">
    
    <Panel header="De los detenidos" key="detenido">
    <ArrestedProfile crimenes={crimenes} />
    </Panel>
    
    <Panel header="De las víctimas" key="victima">
    <VictimProfile crimenes={crimenes} />
    </Panel>
    
    </Collapse>
    
    </div>
    </>
    )
    
  }
  
  export default ProfileContainer;
  