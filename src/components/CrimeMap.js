import React, { useState, useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-providers';
import { each, first, flattenDeep } from 'lodash';
import axios from 'axios';

import 'leaflet/dist/leaflet.css';
import '../css/CrimeMap.scss';

const circleMarkerOptions = {
  radius: 7,
  stroke: false,
  fillOpacity: 0.5,
  // FIXME: This should be set depending on the lugarExacto parameter?
  fillColor: '#b90021',
  className: 'circle-marker'
};

const getCrimen = async (queryString) => {
  const response = {};
  try {
    const result = await axios.get(queryString);
    response.data = result.data;
  } catch (error) {
    response.error = error;
  } finally {
    return response;
  }
};

const addMarker = crimen => {
  crimen.markers = [];
  
  for (let position of crimen.latLng) {
    // Initializes marker and adds a tooltip 
    const marker = L.circleMarker(position, { 
      crimenId: crimen._id,
      title: crimen.titular,
      alt: crimen.titular,
      // FIXME: Color handling should be done here
      ...circleMarkerOptions
    })
    .bindTooltip(crimen.titular, { className: 'marker-tooltip-window' } )
    
    // We only request the full json object when we're going to display the popup
    marker.addEventListener('click', event => {
      getCrimen(`${process.env.REACT_APP_API_ENDPOINT}/${event.target.options.crimenId}`)
      .then(response => {
        const crimen = response.data;
        console.log(crimen);
      });
    });

    crimen.markers.push(marker);
  }
  
  return crimen;
};

const CrimeMap = ({ startPosition, startZoom, startCrimenes }) => {
  
  const [position, setPosition] = useState(startPosition ? startPosition : [49.8419, 24.0315]);
  const [zoom, setZoom] = useState(startZoom ? startZoom : 16);
  const [crimenes, setCrimenes] = useState(startCrimenes ? startCrimenes : []);
  
  // Default Ref hooks to be able to access the map and markers objects arbitrarily
  const mapRef = useRef(null);
  const layerGroupRef = useRef(null);
  
  // This hook initializes the map and re-renders if position or zoom changes
  useEffect(() => {
    mapRef.current = L.map('crime-map', { 
      center: position, 
      zoom: zoom, 
      layers: [],
      zoomSnap: 0.1
    });
    
    L.tileLayer.provider('CartoDB.VoyagerLabelsUnder').addTo(mapRef.current);
    layerGroupRef.current = L.layerGroup().addTo(mapRef.current);
    
  }, [position, zoom]);
  
  // This hook updates the markers with the current selection and centers the map on it
  useEffect(() => {
    layerGroupRef.current.clearLayers();
    const crimenesWithMarkers = crimenes.map(addMarker);
    
    for (let crimen of crimenesWithMarkers) {
      crimen.markers.length > 1 ?
      each(crimen.markers, marker => marker.addTo(layerGroupRef.current)) : 
      first(crimen.markers).addTo(layerGroupRef.current);      
    }
    
    const bounds = flattenDeep(crimenesWithMarkers.map(v => v.markers.map(v => v._latlng)));
    mapRef.current.fitBounds(bounds, { padding: [20, 20] });
    
  }, [crimenes]);
  
  console.log(crimenes);
  
  return (<div id="crime-map"></div>);
};

export default CrimeMap;
