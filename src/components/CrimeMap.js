import React, { useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import '../css/CrimeMap.scss';

const CrimeMap = () => {
  
  const [position, setPosition] = useState([51.505, -0.9]);
  const [zoom, setZoom] = useState(12);

  return (

    <Map center={position} zoom={zoom}>
    <TileLayer
    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
    <Popup>
    A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
    </Marker>
    </Map>
    
    );  
  };
  
  export default CrimeMap;