  import React, { useEffect, useContext, useState } from 'react';
  import ClipLoader from 'react-spinners/ClipLoader';
  import { Carousel } from 'antd';
  import { css } from '@emotion/core';
  
  import { StatsContext } from './StatsContext';
  
  import { fetchApiEndpoint } from './../Map/CrimeVisualization';
  
  import '../../css/Stats/CrimeStatsContainer.scss';
  import '../../css/common.scss';
  
  const cssOverride = css`display: block;margin: 0 auto;`;
  
  const StatsContainer = () => {
    
    const { stateAllCrimenes } = useContext(StatsContext);
    const [allCrimenes, setAllCrimenes] = stateAllCrimenes;
    
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      async function fetchAllCrimenes() {
        const queryResponse = await fetchApiEndpoint(`${process.env.REACT_APP_API_ENDPOINT}/all`);
        
        if (!queryResponse.error) {
          setAllCrimenes(queryResponse.data);
          setIsLoading(false);
        }
      };
      
      fetchAllCrimenes();
    }, [setAllCrimenes]);
    
    /*
    TODO: ¿Primera pantalla predefinida con explicación?
    Se puede poner un botón y usar el método goTo del Carousel
    para comenzar la navegación por las tarjetas.
    */
    return (
      <>
      { isLoading && <div className="fullscreen dark-background"><ClipLoader css={cssOverride} size={60} color={'#b90021'} loading={isLoading} /></div> }
      
      { !isLoading && 
        <Carousel effect="fade" className="text-center align-items-center justify-center fix-font-family">
        { !isLoading && 
          allCrimenes
          .slice(0, 10)
          .map(crimen => (
            <div key={crimen._id}><span style={{ color: '#fff '}}>{ crimen._id }</span></div>)) 
          }
          </Carousel>
        }
        </>
        )
      };
      
      export default StatsContainer;