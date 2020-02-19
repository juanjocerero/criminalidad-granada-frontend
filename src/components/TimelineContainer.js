import React from 'react';

import TimelineContextProvider from './Timeline/TimelineContextProvider';
import TimelineComponent from './Timeline/TimelineComponent';

const TimelineContainer = () => {

  return (
    <>
    <TimelineContextProvider>
      <TimelineComponent />
    </TimelineContextProvider>
    </>
  );

};

export default TimelineContainer;