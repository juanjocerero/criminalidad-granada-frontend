import React, { useState } from 'react';

import { StatsContext } from './StatsContext';

const StatsContextProvider = props => {

  const [allCrimenes, setAllCrimenes] = useState([]);

  return (
    <StatsContext.Provider 
    value={{
      stateAllCrimenes: [allCrimenes, setAllCrimenes]
    }}>
      { props.children }
    </StatsContext.Provider>
  );

};

export default StatsContextProvider;
