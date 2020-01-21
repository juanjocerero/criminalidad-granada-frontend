import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from 'axios';

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

    async function fetchData() {
      const queryResponse = await fetchApiEndpoint(queryUrl);

      queryResponse.error ? 
      setError(queryResponse.error) : 
      setState({ crimenes: queryResponse.data, isLoading: false });
    }

    fetchData();

  }, [queryUrl]);

  console.log(state.crimenes);
  
  if (error) {
    // TODO: crear componente para manejar el error
    return (<div className="fullscreen text-center">error</div>)
  }
  
  return (
    <div className="fullscreen">
    <ClipLoader css = { cssOverride } size = { 60 } color = { '#b90021' } loading = { state.isLoading } />
    { state.crimenes.map(item => <li style={ { fontSize: '0.8rem' } } key={item._id}>{ item.titular }</li>) }
    </div>
    );
    
  };
  
  export default CrimeVisualization;
  