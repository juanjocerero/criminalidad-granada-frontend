import React, { useContext } from 'react';

import { Switch, Icon } from 'antd';

import { QueryContext } from './QueryContext';

import '../css/Switcher.scss';

const Switcher = () => {

  const { stateLugarExacto } = useContext(QueryContext);
  const [lugarExacto, setLugarExacto] = stateLugarExacto;

  return (
    <Switch 
    id="switcher"
    checkedChildren={<Icon type="check" />} 
    unCheckedChildren={<Icon type="close" />} 
    onChange={(checked, event) => setLugarExacto(checked)}
    checked={lugarExacto}
    defaultChecked
    />
  );

};

export default Switcher;
