import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Typography } from 'antd';
import MobileDetect from 'mobile-detect';

import { categoriesColors } from '../../Resources/Colors';

import '../../css/Stats/CategoriesChart.scss';
import '../../css/common.scss';

const md = new MobileDetect(window.navigator.userAgent);
const { Title, Text } = Typography;

const handleCategories = (categorias, crimenes) => {
  const categoriesData = [];
  const parents = categorias.filter(category => category.is_parent);
  
  for (let parentCategory of parents) {
    const parentCategoryElements = crimenes.filter(v => v.categorias.includes(parentCategory.nombre));
    categoriesData.push({
      id: parentCategory.nombre,
      label: parentCategory.nombre,
      value: parentCategoryElements.length,
      color: categoriesColors[parentCategory.nombre]
    });
  }
  
  return categoriesData;
}

const CategoriesChart = ({ questionNumber, crimenes, categorias }) => {
  
  return (
    <>
    <div className="apply-flex-center">
    <Title level={3} className="question-title">{questionNumber}. ¿Qué delitos se cometen más a menudo?</Title>
    
    <div className="categories-chart-container">
    
    <ResponsivePie 
    data={handleCategories(categorias, crimenes)} 
    sortByValue={md.mobile() ? true : false} 
    enableRadialLabels={md.mobile() ? false : true}
    margin={md.mobile() ? { top: 20, right: 0, bottom: 0, left: 0 } : { top: 60, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.6}
    padAngle={2}
    cornerRadius={1}
    colors={category => category.color}
    borderWidth={2}
    borderColor={'rgba(255,255,255,0.9)'}
    radialLabelsSkipAngle={2}
    radialLabelsTextXOffset={6}
    radialLabelsTextColor={'rgba(255,255,255,1)'}
    radialLabelsLinkOffset={0}
    radialLabelsLinkDiagonalLength={16}
    radialLabelsLinkHorizontalLength={16}
    radialLabelsLinkStrokeWidth={3}
    radialLabelsLinkColor={{ from: 'color' }}
    slicesLabelsSkipAngle={10}
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    tooltip={({ id, value }) => 
    <>
    <Text className="black-text">{id}</Text>
    <Text className="black-text"> (<strong>{((value/crimenes.length)*100).toFixed(1)}%</strong>) </Text>
    </>}
    />
    </div>
    
    </div>
    </>
    )
    
  };
  
  export default CategoriesChart;
  