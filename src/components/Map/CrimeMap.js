import React, { useRef, useEffect, useState, useContext } from 'react';
import { Map, CircleMarker, Popup, LayerGroup, Tooltip, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-providers';
import { first, flattenDeep } from 'lodash';
import * as boxIntersect from 'box-intersect';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import CrimeTooltip from './CrimeTooltip';
import CrimePopup from './CrimePopup';
import CategoriesControl from './CategoriesControl';
import AboutControl from './AboutControl';

import { QueryContext } from './QueryContext';
import { categoriesColors } from '../../Resources/Colors';

import 'leaflet/dist/leaflet.css';
import 'magic.css/dist/magic.min.css';
import 'react-leaflet-markercluster/dist/styles.min.css';

import '../../css/Map/CrimeMap.scss';
import '../../css/Map/Fades.scss';
import '../../css/Map/MarkerClusters.scss';

const userAgent = window.navigator.userAgent.toLowerCase();

L.Map.addInitHook(function() {
  this.getContainer().leafletMap = this;
});

L.Tooltip.addInitHook(function() {
  this._source.leafletObject = this;

});

const closeOpenTooltipsIfAny = () => {
  const tooltip = document.querySelector('.crimen-tooltip');
  if (tooltip) {
    tooltip.classList.add('hide');
    setTimeout(() => tooltip.classList.remove('hide'), 500);
  }
};

const getDomElements = () => {
  const currentPopup = document.querySelector('.crimen-popup');
  const burgerMenuIcon = document.querySelector('.bm-burger-button');
  const categoriesControl = document.querySelector('.categories-control');
  const aboutControl = document.querySelector('.about-control');
  return { currentPopup, burgerMenuIcon, categoriesControl, aboutControl };
};

const getCollisionBounds = (popup, burger) => {
  const boundingRects = [popup.getBoundingClientRect(), burger.getBoundingClientRect()];
  return [
    [boundingRects[0].x + boundingRects[0].y, (boundingRects[0].x + boundingRects[0].width), (boundingRects[0].x + boundingRects[0].height)],
    [boundingRects[1].x + boundingRects[1].y, (boundingRects[1].x + boundingRects[1].width), (boundingRects[1].x + boundingRects[1].height)],
  ];
};

const handleBurgerCollision = () => {
  const burgerCollisionInterval = setInterval(() => {
    let { currentPopup, burgerMenuIcon } = getDomElements();
    
    if (currentPopup && burgerMenuIcon) {
      let collisions = boxIntersect(getCollisionBounds(currentPopup, burgerMenuIcon));
      if (collisions.length && !burgerMenuIcon.classList.contains('fade-out')) {
        burgerMenuIcon.classList.add('fade-out');
      }
    } else {
      burgerMenuIcon.classList.remove('fade-out');
      burgerMenuIcon.classList.add('fade-in');
      clearInterval(burgerCollisionInterval);
    }
  }, 100);
};

const handleLegendCollision = () => {
  const legendCollisionInterval = setInterval(() => {
    let { currentPopup, categoriesControl } = getDomElements();
    if (currentPopup && categoriesControl) {
      if (!categoriesControl.classList.contains('fade-out')) {
        categoriesControl.classList.add('fade-out');
      }
    } else {
      categoriesControl.classList.remove('fade-out');
      categoriesControl.classList.add('fade-in');
      clearInterval(legendCollisionInterval);
    }
  }, 100);
};

const handleAboutCollision = () => {
  const aboutCollisionInterval = setInterval(() => {
    let { currentPopup, aboutControl } = getDomElements();
    if (currentPopup && aboutControl) {
      if (!aboutControl.classList.contains('hide')) {
        aboutControl.classList.remove('show');
        aboutControl.classList.add('hide');
      }
    } else {
      aboutControl.classList.remove('hide');
      aboutControl.classList.add('show');
      clearInterval(aboutCollisionInterval);
    }
  }, 100);
}

const handleCategoryColor = categories => {
  let color = '#92a6a6';
  for (let category of categories) {
    if (categoriesColors[category]) {
      color = categoriesColors[category];
    }
  }
  return color;
}

const circleMarkerOptions = ( categorias, lugarExacto ) => {
  return {
    radius: 7,
    stroke: !lugarExacto ? true : false,
    color: !lugarExacto ? '#322e4f' : 'transparent',
    weight: !lugarExacto ? 2 : 0,
    opacity: 0.9,
    fillOpacity: 0.8,
    fillColor: handleCategoryColor(categorias),
    className: 'circle-marker magictime vanishIn'
  }
};

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

const CrimeMap = ({ startPosition, startZoom }) => {
  
  const [position] = useState(startPosition ? startPosition : [49.8419, 24.0315]);
  const [zoom] = useState(startZoom ? startZoom : 14);

  const { stateCrimenes } = useContext(QueryContext);
  const [crimenes] = stateCrimenes;
  
  const mapRef = useRef();

  // const resetMapPosition = mapRef => {
  //   mapRef.current.fitBounds(flattenDeep(crimenes.map(v => v.latLng)), { padding: [20, 20] });
  // };
  
  useEffect(() => {
    mapRef.current = document.querySelector('.map-container').leafletMap;
    // Add the tile layer provider to the map ref
    // mapRef.current will contain the L.map object after the first useEffect() call
    L.tileLayer.provider('CartoDB.VoyagerLabelsUnder').addTo(mapRef.current);
  }, []);

  useEffect(() => {
    if (crimenes.length) {
      mapRef.current.fitBounds(flattenDeep(crimenes.map(v => v.latLng)), { padding: [20, 20] });
    }
  }, [crimenes]);
  
  return (
    <Map center={position} zoom={zoom} className="map-container" zoomSnap={0.1} zoomControl={false}>
    
    <ZoomControl position="bottomright"></ZoomControl>
    <CategoriesControl categories={categoriesColors} />
    <AboutControl />
    
    <LayerGroup>
    
    <MarkerClusterGroup 
    spiderLegPolylineOptions={{ weight: 0, opacity: 0 }} 
    iconCreateFunction={createClusterCustomIcon} 
    maxClusterRadius={60}
    showCoverageOnHover={false}>
    
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
      <Popup className="crimen-popup" 
      onOpen={() => {
        closeOpenTooltipsIfAny();
        handleBurgerCollision();
        handleLegendCollision();
        handleAboutCollision();
      }} 
      onClose={() => {
        // resetMapPosition(mapRef);
      }}>
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
