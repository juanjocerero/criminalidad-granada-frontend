import React, { useState } from 'react';

import { QueryContext } from './QueryContext';

const QueryContextProvider = props => {
  const [categorias, setCategorias] = useState([]);
  const [cuerpos, setCuerpos] = useState([]);

  const [municipios, setMunicipios] = useState([]); 

  return (
    <QueryContext.Provider value={{
      stateCategorias: [categorias, setCategorias],
      stateCuerpos: [cuerpos, setCuerpos],
      stateMunicipios: [municipios, setMunicipios]
    }}>
      { props.children }
    </QueryContext.Provider>
  );
};

export default QueryContextProvider;
