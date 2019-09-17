import PropTypes from 'prop-types';
import React from 'react';
import { Map, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon-2x.png';

const { BaseLayer } = LayersControl;

const UnfallMap = ({
  mapLat,
  mapLon,
  mapZoom,
  markerLat,
  markerLon,
  popupContent,
  onMarkerDragEnd,
  className,
}) => {
  return (
    <Map
      center={[mapLat, mapLon]}
      zoom={mapZoom}
      maxZoom={18}
      className={className}
    >
      <LayersControl position="topright">
        <BaseLayer checked name="OpenTopoMap">
          <TileLayer
            // eslint-disable-next-line max-len
            attribution='Kartendaten: &amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>-Mitwirkende, SRTM | Kartendarstellung: &copy; <a href="http://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            maxZoom={17}
          />
        </BaseLayer>
        <BaseLayer name="OpenStreetMap">
          <TileLayer
            // eslint-disable-next-line max-len
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>-Mitwirkende'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </BaseLayer>
      </LayersControl>
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
  className: PropTypes.string,
};

UnfallMap.defaultProps = {
  mapLat: 51.96,
  mapLon: 7.62,
  mapZoom: 10,
};

export default UnfallMap;
