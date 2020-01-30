import React, { useState } from 'react';

import { QueryContext } from './QueryContext';

const QueryContextProvider = props => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [crimenes, setCrimenes] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [cuerpos, setCuerpos] = useState(['Policía Nacional', 'Policía Local', 'Guardia Civil']);
  const [municipios, setMunicipios] = useState([]);
  const [lugarExacto, setLugarExacto] = useState(false);

  return (
    <QueryContext.Provider value={{
      stateCategories: [categories, setCategories],
      stateSelectedCategories: [selectedCategories, setSelectedCategories],
      stateCrimenes: [crimenes, setCrimenes],
      stateStartDate: [startDate, setStartDate],
      stateEndDate: [endDate, setEndDate],
      stateCuerpos: [cuerpos, setCuerpos],
      stateMunicipios: [municipios, setMunicipios],
      stateLugarExacto: [lugarExacto, setLugarExacto]
    }}>
      { props.children }
    </QueryContext.Provider>
  );
};

export default QueryContextProvider;
