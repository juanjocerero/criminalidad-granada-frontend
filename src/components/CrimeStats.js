import React from 'react';

import StatsContextProvider from './Stats/StatsContextProvider';
import StatsContainer from './Stats/StatsContainer';

const CrimeStats = () => {

  return (
    <>
    <StatsContextProvider>
      <StatsContainer />
    </StatsContextProvider>
    </>
  );

};

export default CrimeStats;
