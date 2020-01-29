import React, { useRef, useEffect, useState } from 'react';
import { Map, CircleMarker, Popup, LayerGroup, Tooltip, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-providers';
import { first, flattenDeep } from 'lodash';
import * as boxIntersect from 'box-intersect';

import CrimeTooltip from './CrimeTooltip';
import CrimePopup from './CrimePopup';

import 'leaflet/dist/leaflet.css';
import '../css/CrimeMap.scss';
import 'magic.css/dist/magic.min.css';
import '../css/Fades.scss';

const userAgent = window.navigator.userAgent.toLowerCase();

// This allows to acess the Leaflet Map Object from the react-leaflet Map component
// https://github.com/Leaflet/Leaflet/issues/6298
L.Map.addInitHook(function() {
  this.getContainer().leafletMap = this;
});

const getDomElements = () => {
  const currentPopup = document.querySelector('.crimen-popup');
  const burgerMenuIcon = document.querySelector('.bm-burger-button');
  return { currentPopup, burgerMenuIcon };
};

const getCollisionBounds = (popup, burger) => {
  const boundingRects = [popup.getBoundingClientRect(), burger.getBoundingClientRect()];
  return [
    [boundingRects[0].x + boundingRects[0].y, (boundingRects[0].x + boundingRects[0].width), (boundingRects[0].x + boundingRects[0].height)],
    [boundingRects[1].x + boundingRects[1].y, (boundingRects[1].x + boundingRects[1].width), (boundingRects[1].x + boundingRects[1].height)],
  ];
};

const handleCollision = () => {
  const collisionInterval = setInterval(() => {
    let { currentPopup, burgerMenuIcon } = getDomElements();
    
    if (currentPopup && burgerMenuIcon) {
      let collisions = boxIntersect(getCollisionBounds(currentPopup, burgerMenuIcon));
      if (collisions.length && !burgerMenuIcon.classList.contains('fade-out')) {
        burgerMenuIcon.classList.add('fade-out');
      }
    } else {
      burgerMenuIcon.classList.remove('fade-out');
      burgerMenuIcon.classList.add('fade-in');
      clearInterval(collisionInterval);
    }
  }, 100);
};

// Options for the circle marker
// TODO: implement chroma.js scale to discern color by category in a single function call
const circleMarkerOptions = ({ categorias, lugarExacto }) => ({
  radius: 7,
  stroke: lugarExacto ? true : false,
  weight: 3,
  color: '#92a6a6',
  fillOpacity: 0.6,
  fillColor: '#b90021',
  className: 'circle-marker magictime vanishIn'
});

const CrimeMap = ({ startPosition, startZoom, startCrimenes }) => {
  
  const [position, setPosition] = useState(startPosition ? startPosition : [49.8419, 24.0315]);
  const [zoom, setZoom] = useState(startZoom ? startZoom : 16);
  const [crimenes, setCrimenes] = useState(startCrimenes ? startCrimenes : []);
  
  // mapRef.current will contain the L.map object after the first useEffect() call
  const mapRef = useRef();
  
  useEffect(() => {
    // This hook contains the map object
    mapRef.current = document.querySelector('.map-container').leafletMap;
    
    // Add the tile layer provider to the map ref
    L.tileLayer.provider('CartoDB.VoyagerLabelsUnder').addTo(mapRef.current);
  }, []);
  
  // This hook is responsible of repositioning the map when the array of markers changes
  useEffect(() => {
    mapRef.current.fitBounds(flattenDeep(crimenes.map(v => v.latLng)), { padding: [20, 20] });
  }, [crimenes]);
  
  return (
    <Map center={position} zoom={zoom} className="map-container" zoomSnap={0.1} zoomControl={false}>
    
    <ZoomControl position="bottomright"></ZoomControl>
    
    <LayerGroup>
    {/*  We render each marker separately under the LayerGroup */}
    {crimenes.map(crimen => { return (
      <CircleMarker 
      key={crimen._id} 
      center={first(crimen.latLng)}
      popupAnchor={[0, -30]}
      
      { ...circleMarkerOptions(crimen.categorias, crimen.lugarExacto) }
      >
      
      { /* We only render the tooltip in case of desktop browser. */ }
      {
        (!L.Browser.touch || !/iphone|ipod|ipad/.test(userAgent)) && 
        <Tooltip className="crimen-tooltip" offset={[10, 0]}>
        <CrimeTooltip text={crimen.titular} date={crimen.date} />
        </Tooltip>
      }
      
      { /* Everyone gets the popup. */ }
      <Popup className="crimen-popup" onOpen={handleCollision}>
      <CrimePopup crimen={crimen} />
      </Popup>
      
      </CircleMarker>)
    })
  }
  </LayerGroup>
  
  </Map>
  );
};

export default CrimeMap;
