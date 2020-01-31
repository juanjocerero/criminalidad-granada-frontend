import React, { useContext } from 'react';

import { Switch, Icon } from 'antd';

import { QueryContext } from './QueryContext';

const Switcher = () => {

  const { stateLugarExacto } = useContext(QueryContext);
  const [lugarExacto, setLugarExacto] = stateLugarExacto;

  return (
    <Switch 
    checkedChildren={<Icon type="check" />} 
    unCheckedChildren={<Icon type="close" />} 
    onChange={(checked, event) => setLugarExacto(checked)}
    />
  );

};

export default Switcher;
