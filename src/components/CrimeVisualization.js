import React, { useState, useEffect, useContext } from 'react';
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

  const { 
    stateSelectedCategories,
    stateCrimenes,
    stateStartDate,
    stateEndDate,
    stateCuerpos,
    stateMunicipios,
    stateLugarExacto,
    stateShouldUpdate
  } = useContext(QueryContext);

  const [selectedCategories, setSelectedCategories] = stateSelectedCategories;
  const [crimenes, setCrimenes] = stateCrimenes;
  const [startDate, setStartDate] = stateStartDate;
  const [endDate, setEndDate] = stateEndDate;
  const [municipios, setMunicipios] = stateMunicipios;
  const [lugarExacto, setLugarExacto] = stateLugarExacto;
  const [shouldUpdate, setShouldUpdate] = stateShouldUpdate;

  // eslint-disable-next-line no-unused-vars
  const [queryUrl, setQueryUrl] = useState(getDefaultApiEndpointUrl());
  const [state, setState] = useState({ crimenes: [], isLoading: true });
  const [error, setError] = useState(null);
  
  // This hook should only be used in the first map draw,
  // resorting later to another hook based on the global State
  useEffect(() => {
    
    // TODO: refactor this as a Reducer Hook
    async function fetchData() {
      const queryResponse = await fetchApiEndpoint(queryUrl);
      queryResponse.error ? 
      setError(queryResponse.error) : 
      setState({ crimenes: queryResponse.data, isLoading: false });
      setCrimenes(queryResponse.data);
    }

    fetchData();
    
  }, [queryUrl, setCrimenes]);

  // https://stackoverflow.com/questions/55823296/reactjs-prevstate-in-the-new-usestate-react-hook
  useEffect(() => {
    /*
    To avoid querying the database too often, we will check
    if this has changed since the last time we used this.
    If it doesn't, we just set it to false.
    */
    console.log('stateShouldUpdate is now true, rerendering...');
    async function fetchData() {
      const queryResponse = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/filter`, {
        params: {
          categorias: JSON.stringify(selectedCategories),
          startDate,
          endDate,
          municipios,
          lugarExacto
        }
      });

      console.log(queryResponse);
    }

    fetchData();
    setShouldUpdate(false);
  }, [shouldUpdate]);
  
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
  