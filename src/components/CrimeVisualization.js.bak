import React, { Component } from 'react';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';

import '../css/common.scss';

const DEFAULT_API_CALL_URL = 'https://ideal-red-lab.dynu.net/api/crimenes';
const DEFAULT_API_CALL_ELEMENT_LIMIT = 25;

const cssOverride = css`
  display: block;
  margin: 0 auto;
`;

class CrimeVisualization extends Component {

  constructor(props) {

    super(props);

    this.state = {
      loading: true,
      crimenes: null
    };

  }

  componentDidMount() {

    fetch(`${DEFAULT_API_CALL_URL}/limit/${DEFAULT_API_CALL_ELEMENT_LIMIT}`)
    .then(result => result.json())
    .then(data => {

      this.setState({
        loading: false,
        crimenes: data
      });

      console.log(data);
    })
    // TODO: Añadir mensaje de error con un nuevo componente
    .catch(console.error);

  }

  render() {
    return (

      <div className="full-screen">
        <ClipLoader 
          css = { cssOverride }
          size = { 60 }
          color = { '#b90021' }
          loading = { this.state.loading }
        />
      </div>
      
    );
  }
}

export default CrimeVisualization;
