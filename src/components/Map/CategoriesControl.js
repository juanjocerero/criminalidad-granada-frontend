import React from 'react';
import Control from 'react-leaflet-control';
import { Tag, Typography } from 'antd';

import '../../css/common.scss';

const { Text } = Typography;

const getCategoriesAsArray = categories => {
  const arr = [];
  Object.entries(categories).forEach(([key, value]) => {
    arr.push({ category: key, color: value });
  });
  return arr;
};

const CategoriesControl = ({ categories }) => {
  
  return (
    <Control position="bottomleft" className="categories-control">
    <Text className="black-text fix-font-family" style={{ fontWeight: 'bold' }}>Leyenda</Text>
    {
      getCategoriesAsArray(categories).map(obj => 
        <Tag 
        key={obj.color} 
        style={{ display: 'block', fontSize: '0.6rem', borderRadius: '0px', fontWeight: 400 }} 
        className="fix-font-family" 
        color={obj.color}>{obj.category}</Tag>)
      }
      </Control>
      );
    }
    
    export default CategoriesControl;
    