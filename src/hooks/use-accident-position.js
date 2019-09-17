import React from 'react';

const useAccidentPosition = initialPosition => {
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
    if (initialPosition.lat && initialPosition.lon) {
      setMarkerPosition({
        lat: initialPosition.lat,
        lon: initialPosition.lon,
        reallyInitial: true,
      });
    }
  }, [initialPosition.lat, initialPosition.lon]);

  return [markerPosition, setMarkerPosition];
};

export default useAccidentPosition;
