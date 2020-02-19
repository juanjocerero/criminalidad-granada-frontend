import React, { useEffect, useContext, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import { Timeline, Events, TextEvent } from '@merc/react-timeline';

import { TimelineContext } from './TimelineContext';
import { fetchApiEndpoint } from '../Map/CrimeVisualization';

import '../../css/common.scss';

const cssOverride = css`display: block;margin: 0 auto;`;

const TimelineContainer = () => {

  const { stateTimelineCrimenes } = useContext(TimelineContext);
  const [timelineCrimenes, setTimelineCrimenes] = stateTimelineCrimenes;
  
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchTimelineCrimenes() {
      setIsLoading(true);
      const queryResponse = await fetchApiEndpoint(`${process.env.REACT_APP_API_ENDPOINT}/all`);
      
      if (!queryResponse.error) {
        setTimelineCrimenes(queryResponse.data);
        setIsLoading(false);
      }
    };

    fetchTimelineCrimenes();
  }, [setTimelineCrimenes]);
  
  return (
    <>

    { isLoading && !timelineCrimenes.length && 
      <div className="fullscreen dark-background">
      <ClipLoader css={cssOverride} size={60} color={'#d50019'} loading={isLoading} />
      </div> 
    }

    {
      !isLoading && 
      <Timeline>
        <Events>
        </Events>
      </Timeline>
    }

    </>
    );
    
  };
  
  export default TimelineContainer;
  