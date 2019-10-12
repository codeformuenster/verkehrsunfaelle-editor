import PropTypes from 'prop-types';
import React from 'react';
import {
  Map,
  TileLayer,
  WMSTileLayer,
  Marker,
  Popup,
  LayersControl,
} from 'react-leaflet';
import { CRS } from 'leaflet';
import { makeStyles } from '@material-ui/core/styles';
import LoadingBox from './LoadingBox';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon-2x.png';

import './layers-toggle.css';

const { BaseLayer } = LayersControl;

const useStyles = makeStyles(theme => ({
  loadingOverlay: {
    position: 'relative',
    zIndex: 1000,
    minHeight: 'unset',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  missingPositionOverlay: {
    '@media (max-width:629px)': {
      position: 'relative',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    '@media (min-width:630px)': {
      position: 'absolute',
      right: 5,
      top: 40,
    },
    zIndex: 1000,
    maxWidth: 300,
    padding: theme.spacing(2),
  },
}));

const UnfallMap = ({
  mapLat,
  mapLon,
  mapZoom,
  markerLat,
  markerLon,
  popupContent,
  onMarkerDragEnd,
  className,
  loading,
}) => {
  const classes = useStyles();
  const [maxZoom, setMaxZoom] = React.useState(17);
  const [mapCenter, setMapCenter] = React.useState({
    lat: mapLat,
    lng: mapLon,
  });

  return (
    <Map
      center={[mapLat, mapLon]}
      zoom={mapZoom}
      maxZoom={19}
      className={className}
      onBaselayerchange={({ name }) => {
        setMaxZoom(name === 'OpenTopoMap' ? 17 : 19);
      }}
      onZoomend={({ target: map }) => {
        if (map.getZoom() > maxZoom) {
          map.setZoom(maxZoom);
        }
      }}
      onMoveend={({ target: map }) => {
        setMapCenter(map.getCenter());
      }}
    >
      <LayersControl position="topright">
        <BaseLayer checked name="OpenTopoMap">
          <TileLayer
            // eslint-disable-next-line max-len
            attribution='Kartendaten: &amp;copy <a href="http://osm.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>-Mitwirkende, SRTM | Kartendarstellung: &copy; <a href="http://opentopomap.org" target="_blank" rel="noopener">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC-BY-SA</a>)'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            maxZoom={17}
          />
        </BaseLayer>
        <BaseLayer name="OpenStreetMap">
          <TileLayer
            // eslint-disable-next-line max-len
            attribution='&amp;copy <a href="http://osm.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>-Mitwirkende'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </BaseLayer>
        <BaseLayer name="DOP 2018">
          <WMSTileLayer
            // eslint-disable-next-line max-len
            attribution='&amp;copy <a href="https://www.bkg.bund.de/DE/Home/home.html" target="_blank" rel="noopener">Bundesamt für Kartographie und Geodäsie</a>, <a href="https://sg.geodatenzentrum.de/web_public/Datenquellen_TopPlus_Open.pdf" target="_blank" rel="noopener">Datenquellen</a>'
            url="https://www.wms.nrw.de/geobasis/wms_nw_dop"
            version="1.3.0"
            layers="nw_dop_rgb"
            crs={CRS.EPSG4326}
          />
        </BaseLayer>
        {['2014', '2011', '2008'].map(year => (
          <BaseLayer name={`DOP ${year}`} key={year}>
            <WMSTileLayer
              // eslint-disable-next-line max-len
              attribution='&amp;copy <a href="https://www.bkg.bund.de/DE/Home/home.html" target="_blank" rel="noopener noreferrer">Bundesamt für Kartographie und Geodäsie</a>, <a href="https://sg.geodatenzentrum.de/web_public/Datenquellen_TopPlus_Open.pdf" target="_blank" rel="noopener noreferrer">Datenquellen</a>'
              url="https://www.wms.nrw.de/geobasis/wms_nw_hist_dop"
              version="1.3.0"
              layers={`nw_hist_dop_${year}`}
              crs={CRS.EPSG4326}
            />
          </BaseLayer>
        ))}
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
      {loading && <LoadingBox className={classes.loadingOverlay} />}
      {!loading && markerLat === null && (
        <Paper className={classes.missingPositionOverlay}>
          <Typography variant="h6">Fehlender Ort</Typography>
          <Typography variant="body1" gutterBottom>
            Dieser Unfall hat noch keinen maschinenlesbaren Ort.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onMarkerDragEnd({ ...mapCenter, reallyInitial: true });
            }}
          >
            Marker hinzufügen
          </Button>
        </Paper>
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
  loading: PropTypes.bool,
};

UnfallMap.defaultProps = {
  mapLat: 51.96,
  mapLon: 7.62,
  mapZoom: 10,
  loading: false,
};

export default UnfallMap;
