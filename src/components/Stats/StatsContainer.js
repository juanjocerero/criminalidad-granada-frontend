  import React, { useEffect, useContext, useState } from 'react';
  import ClipLoader from 'react-spinners/ClipLoader';
  import { Carousel, Typography } from 'antd';
  import { css } from '@emotion/core';
  
  import { StatsContext } from './StatsContext';
  
  import StatsWelcome from './StatsWelcome.js';
  import CategoriesChart from './CategoriesChart';
  import ProfileContainer from './ProfileContainer';
  import TimeEvolution from './TimeEvolution';
  import ForceDistribution from './ForceDistribution';
  
  import { fetchApiEndpoint } from './../Map/CrimeVisualization';
  
  import '../../css/Stats/CrimeStatsContainer.scss';
  import '../../css/common.scss';
  import '../../css/ErrorMessage.scss';
import DrugDistribution from './DrugDistribution';
  
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
        
        <CategoriesChart questionNumber={1} categorias={categorias} crimenes={allCrimenes} />
        
        <ProfileContainer questionNumber={2} crimenes={allCrimenes} />

        <DrugDistribution questionNumber={3} crimenes={allCrimenes.filter(crime => crime.categorias.includes('Tráfico de drogas'))} />

        <TimeEvolution questionNumber={4} crimenes={allCrimenes} />

        <ForceDistribution questionNumber={5} crimenes={allCrimenes.filter(crimen => crimen.cuerpo).map(crimen => crimen.cuerpo).flat()} />

        </Carousel>
      }
      </>
      )
    };
    
    export default StatsContainer;