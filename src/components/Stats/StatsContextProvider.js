import React, { useState } from 'react';

import { StatsContext } from './StatsContext';

const StatsContextProvider = props => {

  const [allCrimenes, setAllCrimenes] = useState([]);
  const [categorias, setCategorias] = useState([]);

  return (
    <StatsContext.Provider 
    value={{
      stateAllCrimenes: [allCrimenes, setAllCrimenes],
      stateCategorias: [categorias, setCategorias]
    }}>
      { props.children }
    </StatsContext.Provider>
  );

};

export default StatsContextProvider;
