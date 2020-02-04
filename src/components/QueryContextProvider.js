import React, { useState, useRef } from 'react';

import { QueryContext } from './QueryContext';

const QueryContextProvider = props => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [crimenes, setCrimenes] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [cuerpos, setCuerpos] = useState(['Policía Nacional', 'Policía Local', 'Guardia Civil']);
  const [municipios, setMunicipios] = useState([]);
  const [lugarExacto, setLugarExacto] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  /*
  This variable exists so as to not be always queryind the database.
  This should only be set to true either by the closing event button
  (and how do we then set it back to false?)
  or pushing the apply changes button.
  If we change the value on the fly it is probably going to query
  the database twice with the same data
  */
  const [shouldUpdate, setShouldUpdate] = useState(false);

  return (
    <QueryContext.Provider value={{
      stateCategories: [categories, setCategories],
      stateSelectedCategories: [selectedCategories, setSelectedCategories],
      stateCrimenes: [crimenes, setCrimenes],
      stateStartDate: [startDate, setStartDate],
      stateEndDate: [endDate, setEndDate],
      stateCuerpos: [cuerpos, setCuerpos],
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
