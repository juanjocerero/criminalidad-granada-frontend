import React, { useEffect } from 'react';
import L from 'leaflet';

import '../css/common.scss';

// https://cherniavskii.com/using-leaflet-in-react-apps-with-react-hooks/
const Map = () => {
  
  useEffect(() => {
    
    L.map('map', {
      center: [49.8419, 24.0315],
      zoom: 16,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', 
        {
          attribution: '@juanjocerero'
        }),
      ]
    });
  }, []);
  
  return (<div id="map" className="map-container"></div>);
  
};

export default Map;