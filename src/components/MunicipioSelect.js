import React, { useState, useContext, useEffect } from 'react';
import { Select } from 'antd';

import { fetchApiEndpoint } from './CrimeVisualization';

import { QueryContext } from './QueryContext';

import '../css/MunicipioSelect.scss';

const { Option } = Select;

const MunicipioSelect = () => {
  
  const { stateMunicipios } = useContext(QueryContext);
  const [municipios, setMunicipios] = stateMunicipios;
  
  const [availableMunicipios, setAvailableMunicipios] = useState([]); 
  
  const handleChange = value => {
    setMunicipios(value);
  }

  useEffect(() => {
    async function fetchMunicipios() {
      const queryResponse = await fetchApiEndpoint(`${process.env.REACT_APP_API_ENDPOINT}/municipios`);
      if (!queryResponse.error) {
        setAvailableMunicipios(queryResponse.data.map(v => <Option key={v}>{v}</Option>));
      }
    }
    fetchMunicipios();
  }, []);
  
  return (
    <>
    <Select 
    mode="multiple" 
    className="municipio-select" 
    placeholder="Escoge municipio(s)" 
    defaultValue={[]} 
    onChange={handleChange}>
      { availableMunicipios }
    </Select>
    </>
    );
  }
  
  export default MunicipioSelect;