  import React, { useEffect, useContext, useState, Suspense } from 'react';
  import ClipLoader from 'react-spinners/ClipLoader';
  import { Carousel, Typography } from 'antd';
  import { css } from '@emotion/core';
  
  import { StatsContext } from './StatsContext';
  
  import StatsWelcome from './StatsWelcome.js';
  
  import { fetchApiEndpoint } from './../Map/CrimeVisualization';
  
  import '../../css/Stats/CrimeStatsContainer.scss';
  import '../../css/common.scss';
  import '../../css/ErrorMessage.scss';
  
  const LazyCategoriesChart = React.lazy(() => import('./CategoriesChart'));
  
  const { Text } = Typography;
  const cssOverride = css`display: block;margin: 0 auto;`;
  
  const StatsContainer = () => {
    
    const { stateAllCrimenes, stateCategorias } = useContext(StatsContext);
    const [allCrimenes, setAllCrimenes] = stateAllCrimenes;
    const [categorias, setCategorias] = stateCategorias;
    
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      async function fetchAllCrimenes() {
        setIsLoading(true);
        const queryResponse = await fetchApiEndpoint(`${process.env.REACT_APP_API_ENDPOINT}/all`);
        
        if (!queryResponse.error) {
          setAllCrimenes(queryResponse.data);
          setIsLoading(false);
        }
      };
      fetchAllCrimenes();
    }, [setAllCrimenes]);
    
    useEffect(() => {
      async function fetchCategorias() {
        setIsLoading(true);
        const queryResponse = await fetchApiEndpoint(`${process.env.REACT_APP_API_ENDPOINT}/cats`);
        if (!queryResponse.error) {
          setCategorias(queryResponse.data);
          setIsLoading(false);
        }
      };
      
      fetchCategorias();
    }, [setCategorias]);
    
    /*
    TODO: ¿Primera pantalla predefinida con explicación?
    Se puede poner un botón y usar el método goTo del Carousel
    para comenzar la navegación por las tarjetas.
    */
    return (
      <>
      { isLoading && !categorias.length && 
        <div className="fullscreen dark-background">
        <ClipLoader css={cssOverride} size={60} color={'#b90021'} loading={isLoading} />
        </div> 
      }

      { !isLoading && !allCrimenes.length && 
        <div className="error-message-container text-center justify-center">
        <Text className="error-message fix-font-family">No se encontraron resultados para tu búsqueda o se produjo un error. Prueba con criterios menos restrictivos.</Text>
        </div>
      }
      
      { !isLoading && allCrimenes.length && categorias.length && 
        <Carousel effect="fade" className="text-center align-items-center justify-center fix-font-family">
        
        <StatsWelcome />

        <Suspense fallback={<div className="fullscreen dark-background"><ClipLoader css={cssOverride} size={60} color={'#b90021'} loading={isLoading} /></div> }>
          
          <LazyCategoriesChart categorias={categorias} crimenes={allCrimenes} />
          

        </Suspense>
        
        </Carousel>
      }
      </>
      )
    };
    
    export default StatsContainer;