import React, { useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import '../css/CrimeMap.scss';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const CrimeMap = () => {
  
  const [position, setPosition] = useState([51.505, -0.9]);
  const [zoom, setZoom] = useState(12);
  
  // https://stackoverflow.com/questions/49441600/react-leaflet-marker-files-not-found
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
  });
  L.Marker.prototype.options.icon = DefaultIcon;
  
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