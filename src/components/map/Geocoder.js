import PropTypes from 'prop-types';
import { MapControl, withLeaflet } from 'react-leaflet';
import GeocoderPlugin from 'leaflet-control-geocoder';
import AccidentsPhoton from './photon-muenster-accidents';

import 'leaflet-control-geocoder/Control.Geocoder.css';

const searchInputId = 'geocoder-input';

class Geocoder extends MapControl {
  createLeafletElement(props) {
    const geocoder = new GeocoderPlugin({
      ...props,
      geocoder: new AccidentsPhoton({
        nameProperties: ['name', 'street', 'housenumber', 'town', 'city'],
        geocodingQueryParams: {
          lat: 51.96,
          lon: 7.62,
          location_bias_scale: 6,
          lang: 'de',
          /* bbox parameter not supported on public photon instance at the
           * moment. See https://github.com/komoot/photon/issues/431
           */
          // bbox: '7.471,51.8375,7.775,52.061',
        },
      }),
      defaultMarkGeocode: false,
      showUniqueResult: false,
      searchInputId: searchInputId,
    });

    geocoder.on('markgeocode', ({ geocode: { center } }) => {
      this.props.onSearchResultSelect(center);
    });

    return geocoder;
  }

  updateLeafletElement(fromProps, toProps) {
    document.getElementById(searchInputId).value = toProps.searchString;
    if (this.props.expandOnce === true) {
      this.leafletElement._expand();
      this.leafletElement._geocode(true);
    }
  }
}

Geocoder.propTypes = {
  searchString: PropTypes.string,
  onSearchResultSelect: PropTypes.func,
};

export default withLeaflet(Geocoder);
