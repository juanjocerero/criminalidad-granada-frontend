import React, { useRef, useEffect, useState, useContext } from 'react';
import { Map, CircleMarker, Popup, LayerGroup, Tooltip, ZoomControl } from 'react-leaflet';
import L, { Marker } from 'leaflet';
import 'leaflet-providers';
import { first, flattenDeep } from 'lodash';
import * as boxIntersect from 'box-intersect';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import CrimeTooltip from './CrimeTooltip';
import CrimePopup from './CrimePopup';

import { QueryContext } from './QueryContext';

import 'leaflet/dist/leaflet.css';
import '../css/CrimeMap.scss';
import 'magic.css/dist/magic.min.css';
import '../css/Fades.scss';
import 'react-leaflet-markercluster/dist/styles.min.css';
import '../css/MarkerClusters.scss';

const userAgent = window.navigator.userAgent.toLowerCase();

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

const handleCategoryColor = categories => {
  console.log(categories);
  if (categories) {
    let color = '#926a6';

    if (categories.includes('Robo')) {
      color = '#b90021';
    }
    if (categories.includes('Asesinato')) {
      color = '#00272b';
    }
    if (categories.includes('Delito sexual')) {
      color = '#ff6663';
    }
    if (categories.includes('Estafa')) {
      color = '#e6aa68';
    }
    if (categories.includes('Seguridad vial')) {
      color = '#59656f';
    }
    if (categories.includes('Tráfico de drogas')) {
      color = '03cea4';
    }
    if (categories.includes('Violencia de Género')) {
      color = '#665607';
    }
  
    return color;
  }
  
};

// Options for the circle marker
// TODO: implement chroma.js scale to discern color by category in a single function call
const circleMarkerOptions = ({ categorias, lugarExacto }) => ({
  radius: 7,
  stroke: lugarExacto ? true : false,
  weight: 3,
  color: '#92a6a6',
  fillOpacity: 0.7,
  fillColor: handleCategoryColor(categorias),
  className: 'circle-marker magictime vanishIn'
});

const createClusterCustomIcon = (cluster) => {
  const elements = cluster.getChildCount();
  let sizeClass = 'sm';

  if (elements >= 5 && elements < 10) {
    sizeClass = 'md';
  }
  if (elements > 10) {
    sizeClass = 'lg';
  }
  
  return L.divIcon({
    html:
    `<div>
    <span class="markerClusterLabel">${elements}</span>
    </div>`,
    iconSize: L.point(64, 64, true),
    className: `cluster-${sizeClass}`
  });
};

const CrimeMap = ({ startPosition, startZoom, startCrimenes }) => {
  
  const [position, setPosition] = useState(startPosition ? startPosition : [49.8419, 24.0315]);
  const [zoom, setZoom] = useState(startZoom ? startZoom : 14);

  const { stateCrimenes } = useContext(QueryContext);
  const [crimenes, setCrimenes] = stateCrimenes;
  
  // mapRef.current will contain the L.map object after the first useEffect() call
  const mapRef = useRef();
  
  useEffect(() => {
    // This hook contains the map object
    mapRef.current = document.querySelector('.map-container').leafletMap;
    
    // Add the tile layer provider to the map ref
    L.tileLayer.provider('CartoDB.VoyagerLabelsUnder').addTo(mapRef.current);
  }, []);
  
  // TODO: CHECK THIS OUT!!

  // This hook is responsible of repositioning the map when the array of markers changes
  useEffect(() => {
    if (crimenes.length) {
      mapRef.current.fitBounds(flattenDeep(crimenes.map(v => v.latLng)), { padding: [20, 20] });
    }
  }, [crimenes]);
  
  return (
    <Map center={position} zoom={zoom} className="map-container" zoomSnap={0.1} zoomControl={false}>
    
    <ZoomControl position="bottomright"></ZoomControl>
    
    <LayerGroup>
    
    <MarkerClusterGroup 
    spiderLegPolylineOptions={{ weight: 0, opacity: 0 }} 
    iconCreateFunction={createClusterCustomIcon} 
    maxClusterRadius={60}
    showCoverageOnHover={false}>
    
    // TODO: fix colors
    {crimenes.map(crimen => { return (
      <CircleMarker 
      key={crimen._id} 
      center={first(crimen.latLng)}
      popupAnchor={[0, -30]}
      
      { ...circleMarkerOptions(crimen.categorias, crimen.lugarExacto) }
      >
      
      { /* We only render the tooltip in case of desktop browser. */ }
      {
        (!L.Browser.touch && !/iphone|ipod|ipad/.test(userAgent)) && 
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
  </MarkerClusterGroup>
  
  
  </LayerGroup>
  
  </Map>
  );
};

export default CrimeMap;
