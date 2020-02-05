import React, { useRef, useEffect, useContext } from 'react';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from 'axios';
import { Typography } from 'antd';
import Button from '@bit/ans.base-ui.button';

import { QueryContext } from './QueryContext';
import { BurgerMenuContextProvider } from './BurgerMenuContextProvider';

import BurgerMenu from './BurgerMenu';
import CrimeMap from './CrimeMap';

import '../css/Home.scss';
import '../css/common.scss';
import '../css/ErrorMessage.scss';

const { Text } = Typography;

const cssOverride = css`display: block;margin: 0 auto;`;

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
    stateMunicipios,
    stateLugarExacto,
    stateShouldUpdate,
    stateIsLoading
  } = useContext(QueryContext);
  
  const [selectedCategories] = stateSelectedCategories;
  const [crimenes, setCrimenes] = stateCrimenes;
  const [startDate] = stateStartDate;
  const [endDate] = stateEndDate;
  const [municipios] = stateMunicipios;
  // eslint-disable-next-line no-unused-vars
  const [lugarExacto, setLugarExacto] = stateLugarExacto;
  const [shouldUpdate, setShouldUpdate] = stateShouldUpdate;
  const [isLoading, setIsLoading] = stateIsLoading;
  
  // https://stackoverflow.com/questions/55823296/reactjs-prevstate-in-the-new-usestate-react-hook
  useEffect(() => {
    
    async function fetchData() {
      setIsLoading(true);
      const params = {
        categorias: selectedCategories ? JSON.stringify(selectedCategories) : null,
        startDate,
        endDate,
        municipios,
        lugarExacto
      };
      
      const queryResponse = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/filter`, { params });
      
      if (!queryResponse.error) {
        setCrimenes(queryResponse.data.crimenes);
        setIsLoading(false);
      }
      
      console.log(queryResponse.data);
    }
    
    fetchData();
    setShouldUpdate(false);
  }, [shouldUpdate]);
  
  return (
    <>
    <div className="fullscreen dark-background">
    
    <ClipLoader css={cssOverride} size={60} color={'#b90021'} loading={isLoading} />
    
    {/* TODO: crear componente para manejar el error */}
    {/* { error && <div>there was an error here...</div> } */}
    
    { !isLoading && crimenes.length && 
      
      <div id="main-visualization-container">
      
      <BurgerMenuContextProvider>
      
      <BurgerMenu id="sidebar" />
      
      <main id="page-wrap">
      
      <CrimeMap 
      startPosition={[37.168179, -3.603568]} 
      startZoom={16} 
      startCrimenes={crimenes}
      />
      
      </main>
      </BurgerMenuContextProvider>
      
      </div>
      
    }
    
    {
      !isLoading && !crimenes.length && 
      <>
      <div className="error-message-container text-center justify-center">
      <Text className="error-message fix-font-family">No se encontraron resultados para tu búsqueda o se produjo un error. Prueba con criterios menos restrictivos.</Text>
      <Button 
      onClick={(event) => {
        event.preventDefault();
        window.location.reload(false);
      }}
      loading={false} 
      icon="RefreshCcw" 
      size="default" 
      secondary={false} 
      className="intro-screen-button justify-center fix-font-family"
      style={{ margin: '1.5rem auto', fontSize: '1.2rem' }}>
      Probar otra vez
      </Button>
      </div>
      </>
    }
    
    </div>
    </>
    );
  };
  
  export default CrimeVisualization;
  