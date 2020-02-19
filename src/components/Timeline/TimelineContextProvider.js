import React, { useState } from 'react';

import { TimelineContext } from './TimelineContext';

const TimelineContextProvider = props => {
  
  const [timelineCrimenes, setTimelineCrimenes] = useState([]);

  return (
    <TimelineContext.Provider 
    value={{
      stateTimelineCrimenes: [timelineCrimenes, setTimelineCrimenes]
    }}>
      { props.children }
    </TimelineContext.Provider>
  );
  
};

export default TimelineContextProvider;
