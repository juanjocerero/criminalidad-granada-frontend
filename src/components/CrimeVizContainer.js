import React from 'react';

import CrimeVisualization from './CrimeVisualization';

import QueryContextProvider from './QueryContextProvider';

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
