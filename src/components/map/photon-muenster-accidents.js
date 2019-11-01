import { latLng, latLngBounds } from 'leaflet';
import GeocoderPlugin from 'leaflet-control-geocoder';

/**
 * This file contains a modified version of the original L.Geocoder.Photon
 * geocoder modified to serve the needs of this specific project.
 *
 * Which are:
 *
 * a) Only return results from the vincinty of Münster
 */

const maxLat = 52.061,
  minLat = 51.8375,
  maxLng = 7.775,
  minLng = 7.471;

const AccidentsPhoton = GeocoderPlugin.Photon.extend({
  _decodeFeatures({ features }) {
    if (!features) {
      return [];
    }

    return (
      features
        // a) filter out results form outside of the vincinity of Münster
        .filter(
          ({
            geometry: {
              coordinates: [lng, lat],
            },
          }) => lat >= minLat && lat < maxLat && lng >= minLng && lng < maxLng,
        )
        // map features to geocoder results (refactored from original code)
        .map(feature => {
          const {
            geometry: {
              coordinates: [lng, lat],
            },
            properties,
          } = feature;

          const center = latLng(lat, lng);
          let bbox = latLngBounds(center, center);

          const { extent } = properties;

          if (extent) {
            bbox = latLngBounds([extent[1], extent[0]], [extent[3], extent[2]]);
          }

          return {
            name: this._decodeFeatureName(feature),
            html: this.options.htmlTemplate
              ? this.options.htmlTemplate(feature)
              : undefined,
            center,
            bbox,
            properties,
          };
        })
    );
  },
});

export default AccidentsPhoton;
