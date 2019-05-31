import React from 'react';
import { useKinto } from '../contexts/kinto-context';

const useAccident = accident => {
  const { client } = useKinto();

  const [markerPosition, setMarkerPosition] = React.useReducer(
    (currentPosition, newPosition) => {
      if (!newPosition) {
        return currentPosition;
      }

      let newLat, newLon;

      if (newPosition.target) {
        const newMarkerPosition = newPosition.target.getLatLng();
        newLat = newMarkerPosition.lat;
        newLon = newMarkerPosition.lng;
      } else {
        newLat = newPosition.lat;
        newLon = newPosition.lon;
      }

      if (newLat === currentPosition.lat && newLon === currentPosition.lon) {
        return currentPosition;
      }

      newLat = Number(newLat.toFixed(5));
      newLon = Number(newLon.toFixed(5));

      return {
        lat: newLat,
        lon: newLon,
        initial: Boolean(newPosition.reallyInitial),
      };
    },
    { lat: undefined, lon: undefined, initial: true },
  );

  React.useEffect(() => {
    if (accident.lat && accident.lon) {
      setMarkerPosition({
        lat: accident.lat,
        lon: accident.lon,
        reallyInitial: true,
      });
    }
  }, [accident.lat, accident.lon]);

  const saveAccident = React.useCallback(() => {
    return client
      .bucket('accidents')
      .collection('geometries')
      .createRecord({
        accident_id: accident.accident_id,
        lat: markerPosition.lat,
        lon: markerPosition.lon,
        used_geocoder: 'website',
        geocoded_timestamp: new Date(),
      });
  }, [accident.accident_id, client, markerPosition.lat, markerPosition.lon]);

  return { saveAccident, markerPosition, setMarkerPosition };
};

export default useAccident;

// const useSaveAccident = () => {
//   const { client } = useKinto();
// };

// export { useSaveAccident };
