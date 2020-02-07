import React, { useState, useEffect, useContext } from 'react';
import { TreeSelect } from 'antd';

import { QueryContext } from './QueryContext';
import { fetchApiEndpoint } from './CrimeVisualization';

import '../../css/Map/CategoryTree.scss';

const { SHOW_PARENT } = TreeSelect;

const createTreeData = categories => categories.filter(v => v.is_parent).map(parentCategory => ({
  title: parentCategory.nombre,
  value: parentCategory.nombre,
  key: parentCategory.nombre,
  children: categories.filter(v => v.parent === parentCategory.nombre).map(childCategory => ({
    title: childCategory.nombre,
    value: childCategory.nombre,
    key: childCategory.nombre
  }))
}));

const CategoryTree = () => {
  
  const { stateCategories, stateSelectedCategories } = useContext(QueryContext);
  const [categories, setCategories] = stateCategories;
  const [selectedCategories, setSelectedCategories] = stateSelectedCategories;
  
  const [treeData, setTreeData] = useState([]);
  
  useEffect(() => {
    setTreeData(createTreeData(categories));
  }, [categories]);
  
  useEffect(() => {
    async function handleCategories() {
      const queryResponse = await fetchApiEndpoint(`${process.env.REACT_APP_API_ENDPOINT}/cats`);
      
      if (!queryResponse.error) {
        const categoriasData = Array.from(queryResponse.data);
        setCategories(categoriasData);
      } else {
        // FIXME: add some kind of error handling
        console.error('error handling categories from api');
      }
    };
    
    handleCategories();
    
  }, [setCategories]);
  
  return <TreeSelect {...{
    treeData,
    value: selectedCategories,
    onChange: (newValue) => setSelectedCategories(newValue),
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    searchPlaceholder: 'Tipos de delito',
    dropdownClassName: 'category-tree-dropdown',
    style: {
      width: '100%'
    },
    id: "category-select-tree"
  }} />;
};

export default CategoryTree;
