import PropTypes from 'prop-types';
import React from 'react';
import {
  Map,
  TileLayer,
  WMSTileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
} from 'react-leaflet';
import { CRS } from 'leaflet';
import { makeStyles } from '@material-ui/core/styles';
import LoadingBox from '../LoadingBox';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Geocoder from './Geocoder';

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

const DOPOverlay = () => (
  <WMSTileLayer
    url="https://www.wms.nrw.de/geobasis/wms_nw_dop_overlay"
    version="1.3.0"
    // eslint-disable-next-line max-len
    layers="nw_dop_overlay_bab_anschlussstellen,nw_dop_overlay_unbefahrbare_wege,nw_dop_overlay_ortsstrassen_beschriftung,nw_dop_overlay_kreisstrassen_beschriftung,nw_dop_overlay_ortsstrassen,nw_dop_overlay_kreisstrassen,nw_dop_overlay_landstrassen,nw_dop_overlay_landstrassen_beschriftung,nw_dop_overlay_bundesstrassen_beschriftung_2,nw_dop_overlay_bundesstrassen_beschriftung_1,nw_dop_overlay_bundesstrassen,nw_dop_overlay_autobahn_beschriftung_2,nw_dop_overlay_autobahn_beschriftung_1,nw_dop_overlay_autobahn"
    transparent="true"
    format="png"
    styles="default"
    crs={CRS.EPSG4326}
  />
);

const UnfallMap = ({
  mapLat,
  mapLon,
  mapZoom,
  markerLat,
  markerLon,
  popupContent,
  searchString,
  onMarkerDragEnd,
  className,
  loading,
}) => {
  const classes = useStyles();
  const [maxZoom, setMaxZoom] = React.useState(19);
  const [viewportState, setViewportState] = React.useState({
    center: [mapLat, mapLon],
    zoom: mapZoom,
  });

  React.useEffect(() => {
    setViewportState({
      center: [mapLat, mapLon],
      zoom: mapZoom,
    });
  }, [mapLat, mapLon, mapZoom]);

  return (
    <Map
      viewport={viewportState}
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
      onViewportChanged={viewport => {
        setViewportState(viewport);
      }}
    >
      <LayersControl position="topright">
        <BaseLayer name="topografisch">
          <TileLayer
            // eslint-disable-next-line max-len
            attribution='Kartendaten: &amp;copy <a href="http://osm.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>-Mitwirkende, SRTM | Kartendarstellung: &copy; <a href="http://opentopomap.org" target="_blank" rel="noopener">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener">CC-BY-SA</a>)'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            maxZoom={17}
          />
        </BaseLayer>
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer
            // eslint-disable-next-line max-len
            attribution='&amp;copy <a href="http://osm.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>-Mitwirkende'
            url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
          />
        </BaseLayer>
        <BaseLayer name="Luftbild 2018">
          <LayerGroup>
            <WMSTileLayer
              // eslint-disable-next-line max-len
              attribution='&amp;copy <a href="https://www.bkg.bund.de/DE/Home/home.html" target="_blank" rel="noopener">Bundesamt für Kartographie und Geodäsie</a>, <a href="https://sg.geodatenzentrum.de/web_public/Datenquellen_TopPlus_Open.pdf" target="_blank" rel="noopener">Datenquellen</a>'
              url="https://www.wms.nrw.de/geobasis/wms_nw_dop"
              version="1.3.0"
              layers="nw_dop_rgb"
              crs={CRS.EPSG4326}
            />
            <DOPOverlay />
          </LayerGroup>
        </BaseLayer>
        {['2014', '2011', '2008'].map(year => (
          <BaseLayer name={`Luftbild ${year}`} key={year}>
            <LayerGroup>
              <WMSTileLayer
                // eslint-disable-next-line max-len
                attribution='&amp;copy <a href="https://www.bkg.bund.de/DE/Home/home.html" target="_blank" rel="noopener noreferrer">Bundesamt für Kartographie und Geodäsie</a>, <a href="https://sg.geodatenzentrum.de/web_public/Datenquellen_TopPlus_Open.pdf" target="_blank" rel="noopener noreferrer">Datenquellen</a>'
                url="https://www.wms.nrw.de/geobasis/wms_nw_hist_dop"
                version="1.3.0"
                layers={`nw_hist_dop_${year}`}
                crs={CRS.EPSG4326}
              />
              <DOPOverlay />
            </LayerGroup>
          </BaseLayer>
        ))}
      </LayersControl>
      <Geocoder
        position="topleft"
        placeholder="Suche ..."
        errorMessage="Nichts gefunden."
        searchString={searchString}
        onSearchResultSelect={clickedSearchResultCenter => {
          onMarkerDragEnd(clickedSearchResultCenter);
          setViewportState({ center: clickedSearchResultCenter, zoom: 17 });
        }}
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
              const [lat, lng] = viewportState.center;
              onMarkerDragEnd({
                lat,
                lng,
                reallyInitial: true,
              });
              setViewportState({ ...viewportState, zoom: 17 });
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
  searchString: PropTypes.string,
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
