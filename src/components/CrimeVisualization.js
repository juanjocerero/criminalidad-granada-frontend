import React, { useState, useEffect, Fragment, useContext } from 'react';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from 'axios';

import { QueryContext } from './QueryContext';
import { BurgerMenuContextProvider } from './BurgerMenuContextProvider';

import BurgerMenu from './BurgerMenu';
import CrimeMap from './CrimeMap';

import '../css/common.scss';

const cssOverride = css`display: block;margin: 0 auto;`;

const getDefaultApiEndpointUrl = () => `${process.env.REACT_APP_API_ENDPOINT}${process.env.REACT_APP_DEFAULT_QUERY}`;

export const fetchApiEndpoint = async (url) => {
  const response = {};
  try {
    const result = await axios.get(url);
    response.data = result.data;
  } catch (error) {
    response.error = error; 
  } finally {
    return response;
  }
};

const CrimeVisualization = () => {  

  const { stateSelectedCategories } = useContext(QueryContext);
  // eslint-disable-next-line no-unused-vars
  const [selectedCategories, setSelectedCategories] = stateSelectedCategories;

  // eslint-disable-next-line no-unused-vars
  const [queryUrl, setQueryUrl] = useState(getDefaultApiEndpointUrl());
  const [state, setState] = useState({ crimenes: [], isLoading: true });
  const [error, setError] = useState(null);
  
  // This hook refetches data whenever the queryUrl variable changes
  useEffect(() => {
    
    // TODO: refactor this as a Reducer Hook
    async function fetchData() {
      const queryResponse = await fetchApiEndpoint(queryUrl);
      
      queryResponse.error ? 
      setError(queryResponse.error) : 
      setState({ crimenes: queryResponse.data, isLoading: false });
    }
    
    fetchData();
    
  }, [queryUrl]);

  // This hook should launch every time the selectedCategories global state variable changes
  useEffect(() => {
    console.log('selectedCategories changed, rerendering...');
  }, [selectedCategories]);
  
  return (
    
    <>
    <div className="fullscreen dark-background">
    
    <ClipLoader css={cssOverride} size={60} color={'#b90021'} loading={state.isLoading} />
    
    {/* TODO: crear componente para manejar el error */}
    { error && <div>there was an error here...</div> }
    
    { !state.isLoading && 
            
      <div id="main-visualization-container">
      
      <BurgerMenuContextProvider>

      <BurgerMenu id="sidebar" />
      
      <main id="page-wrap">

      <CrimeMap 
      startPosition={[37.168179, -3.603568]} 
      startZoom={16} 
      startCrimenes={state.crimenes}
      />

      </main>
      </BurgerMenuContextProvider>
      
      </div>
      
    }
    
    </div>
    </>
    );
  };
  
  export default CrimeVisualization;
  