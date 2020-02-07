import React from 'react';

import CrimeVisualization from './Map/CrimeVisualization';

import QueryContextProvider from './Map/QueryContextProvider';

const CrimeVizContainer = () => {

  return (
    <>
    <QueryContextProvider>
    <CrimeVisualization />
    </QueryContextProvider>
    </>
  );

};

export default CrimeVizContainer;
