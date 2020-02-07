import React, { useState } from 'react';

import { QueryContext } from './QueryContext';

const QueryContextProvider = props => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [crimenes, setCrimenes] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [municipios, setMunicipios] = useState([]);
  const [lugarExacto, setLugarExacto] = useState(true);

  const [isLoading, setIsLoading] = useState(true);

  const [shouldUpdate, setShouldUpdate] = useState(false);

  return (
    <QueryContext.Provider value={{
      stateCategories: [categories, setCategories],
      stateSelectedCategories: [selectedCategories, setSelectedCategories],
      stateCrimenes: [crimenes, setCrimenes],
      stateStartDate: [startDate, setStartDate],
      stateEndDate: [endDate, setEndDate],
      stateMunicipios: [municipios, setMunicipios],
      stateLugarExacto: [lugarExacto, setLugarExacto],
      stateShouldUpdate: [shouldUpdate, setShouldUpdate],
      stateIsLoading: [isLoading, setIsLoading]
    }}>
      { props.children }
    </QueryContext.Provider>
  );
};

export default QueryContextProvider;
