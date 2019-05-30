import PropTypes from 'prop-types';
import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon-2x.png';
// import { useKinto } from '../contexts/kinto-context';

Leaflet.Icon.Default.imagePath = '/static/media/';

const UnfallMap = ({
  mapLat,
  mapLon,
  mapZoom,
  markerLat,
  markerLon,
  popupContent,
  onMarkerDragEnd,
}) => {
  return (
    <Map center={[mapLat, mapLon]} zoom={mapZoom} maxZoom={18}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' // eslint-disable-line max-len
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markerLat && markerLon && (
        <Marker
          position={[markerLat, markerLon]}
          draggable={true}
          autoPan={true}
          onDragEnd={onMarkerDragEnd}
        >
          <Popup>{popupContent}</Popup>
        </Marker>
      )}
    </Map>
  );
};

UnfallMap.propTypes = {
  mapLat: PropTypes.number,
  mapLon: PropTypes.number,
  mapZoom: PropTypes.number,
  markerLat: PropTypes.number,
  markerLon: PropTypes.number,
  popupContent: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
  onMarkerDragEnd: PropTypes.func,
};

UnfallMap.defaultProps = {
  mapLat: 51.96,
  mapLon: 7.62,
  mapZoom: 10,
};

export default UnfallMap;
