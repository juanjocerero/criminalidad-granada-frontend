import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';

import '../css/common.scss';

const DEFAULT_API_CALL_URL = 'https://ideal-red-lab.dynu.net/api/crimenes';
const DEFAULT_API_CALL_ELEMENT_LIMIT = 25;

const cssOverride = css`
display: block;
margin: 0 auto;
`;

const getDefaultApiEndpoint = () => `${DEFAULT_API_CALL_URL}/limit/${DEFAULT_API_CALL_ELEMENT_LIMIT}`;

const CrimeVisualization = () => {
  
  const [crimenes, setCrimenes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    
    fetch(getDefaultApiEndpoint()).then(response => response.json())
    .then(data => {
      if (data.length !== crimenes.length) {
        setCrimenes(data);
        setLoading(false);
      }
      
      console.log(crimenes);
    })
    .catch(error => console.error(error));
    
  }, [crimenes]);
  
  return (
    <div className="full-screen">
    <ClipLoader 
    css = { cssOverride }
    size = { 60 }
    color = { '#b90021' }
    loading = { loading } />
    </div>
    );
    
  };
  
  export default CrimeVisualization;
