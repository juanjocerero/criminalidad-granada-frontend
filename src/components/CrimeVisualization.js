// TODO: El menú burger y sus eventos deberían ser implementados aquí para pasar props hacia abajo
import React, { useState, useEffect, Fragment, useRef, useContext } from 'react';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from 'axios';

import BurgerMenu from './BurgerMenu';
import CrimeMap from './CrimeMap';

import { FilterContext } from './FilterContext';
import { FilterContextProvider } from './FilterContextProvider';

import '../css/common.scss';

const cssOverride = css`display: block;margin: 0 auto;`;

const getDefaultApiEndpointUrl = () => `${process.env.REACT_APP_API_ENDPOINT}${process.env.REACT_APP_DEFAULT_QUERY}`;

const fetchApiEndpoint = async (url) => {
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
  
  // eslint-disable-next-line no-unused-vars
  const [queryUrl, setQueryUrl] = useState(getDefaultApiEndpointUrl());
  const [state, setState] = useState({ crimenes: [], isLoading: true });
  const [error, setError] = useState(null);
 
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
  
  return (
    
    <Fragment>
    <div className="fullscreen dark-background">
    
    <ClipLoader css = { cssOverride } size = { 60 } color = { '#b90021' } loading = { state.isLoading } />
    
    {/* TODO: crear componente para manejar el error */}
    { error && <div>there was an error here...</div> }
    
    { !state.isLoading && 

      <Fragment>
      
      <BurgerMenu id="sidebar" />
      <CrimeMap 
      startPosition={[37.168179, -3.603568]} 
      startZoom={16} 
      startCrimenes={state.crimenes}
      />
      
      </Fragment>
      
    }
    
    </div>
    </Fragment>
    
    );
    
  };
  
  export default CrimeVisualization;
  