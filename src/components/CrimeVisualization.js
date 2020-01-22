import React, { useState, useEffect, Fragment } from 'react';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from 'axios';

import CrimeMap from './CrimeMap';

import '../css/common.scss';

const DEFAULT_API_CALL_URL = 'https://ideal-red-lab.dynu.net/api/crimenes';
const DEFAULT_API_CALL_ELEMENT_LIMIT = 50;
const cssOverride = css`display: block;margin: 0 auto;`;

const getDefaultApiEndpointUrl = () => `${DEFAULT_API_CALL_URL}/limit/${DEFAULT_API_CALL_ELEMENT_LIMIT}`;

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
  
  console.log(state);
  

  // https://react-leaflet.js.org/docs/en/components
  // https://cherniavskii.com/using-leaflet-in-react-apps-with-react-hooks/

  return (

    <Fragment>
    <div className="fullscreen align-items-center dark-background">
    
    <ClipLoader css = { cssOverride } size = { 60 } color = { '#b90021' } loading = { state.isLoading } />
    
    {/* TODO: crear componente para manejar el error */}
    { error && <div>there was an error here...</div> }
        
    { !state.isLoading && <CrimeMap /> }

    </div>
    </Fragment>
    
    );
    
  };
  
  export default CrimeVisualization;
  