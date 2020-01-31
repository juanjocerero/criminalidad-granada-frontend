import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { AutoComplete } from 'antd';

import { fetchApiEndpoint } from './CrimeVisualization';
import { QueryContext } from './QueryContext';

import '../css/AutoCompleter.scss';

const AutoCompleter = () => {
  
  const { stateMunicipios } = useContext(QueryContext);
  const [availableMunicipios, setAvailableMunicipios] = useState([]);
  const [municipios, setMunicipios] = stateMunicipios;
  
  useEffect(() => {
    async function fetchMunicipios() {
      const queryResponse = await fetchApiEndpoint(`${process.env.REACT_APP_API_ENDPOINT}/municipios`);
      setAvailableMunicipios(queryResponse.data);
    };

    fetchMunicipios();
  }, []);
  
  return (
    <>
    <AutoComplete 
    className="auto-completer"
    dataSource={availableMunicipios}
    placeholder="Nombre del municipio" 
    onChange={(value) => setMunicipios(value)}
    filterOption={(inputValue, option) => 
      option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }
    />
    </>
    );
  };
  
  export default AutoCompleter;
  