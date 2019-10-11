import React from 'react';

const useAccidentPosition = initialPosition => {
  const [markerPosition, setMarkerPosition] = React.useReducer(
    (currentPosition, newPosition) => {
      if (!newPosition) {
        return currentPosition;
      }

      const { target, lat, lon, reallyInitial } = newPosition;

      let newLat,
        newLon,
        newInitial = Boolean(reallyInitial);

      if (lat === null && lon === null) {
        return {
          lat: null,
          lon: null,
          initial: newInitial,
        };
      }

      if (target) {
        const newMarkerPosition = target.getLatLng();
        newLat = newMarkerPosition.lat;
        newLon = newMarkerPosition.lng;
      } else {
        newLat = lat;
        newLon = lon;
      }

      if (newLat === currentPosition.lat && newLon === currentPosition.lon) {
        return currentPosition;
      }

      newLat = Number(newLat.toFixed(5));
      newLon = Number(newLon.toFixed(5));

      return {
        lat: newLat,
        lon: newLon,
        initial: newInitial,
      };
    },
    { lat: undefined, lon: undefined, initial: true },
  );

  React.useEffect(() => {
    setMarkerPosition({
      lat: initialPosition.lat,
      lon: initialPosition.lon,
      reallyInitial: true,
    });
  }, [initialPosition.lat, initialPosition.lon]);

  return [markerPosition, setMarkerPosition];
};

export default useAccidentPosition;
