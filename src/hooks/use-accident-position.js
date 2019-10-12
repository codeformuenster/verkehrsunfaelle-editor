import React from 'react';

const useAccidentPosition = initialPosition => {
  const [markerPosition, setMarkerPosition] = React.useReducer(
    (currentPosition, newPosition) => {
      if (!newPosition) {
        return currentPosition;
      }

      const { target, lat, lng, reallyInitial } = newPosition;

      let newLat,
        newLng,
        newInitial = Boolean(reallyInitial);

      if (lat === null && lng === null) {
        return {
          lat: null,
          lng: null,
          initial: newInitial,
        };
      }

      if (target) {
        const newMarkerPosition = target.getLatLng();
        newLat = newMarkerPosition.lat;
        newLng = newMarkerPosition.lng;
      } else {
        newLat = lat;
        newLng = lng;
      }

      if (newLat === currentPosition.lat && newLng === currentPosition.lng) {
        return currentPosition;
      }

      newLat = Number(newLat.toFixed(5));
      newLng = Number(newLng.toFixed(5));

      return {
        lat: newLat,
        lng: newLng,
        initial: newInitial,
      };
    },
    { lat: undefined, lng: undefined, initial: true },
  );

  React.useEffect(() => {
    setMarkerPosition({
      lat: initialPosition.lat,
      lng: initialPosition.lon,
      reallyInitial: true,
    });
  }, [initialPosition]);

  return [markerPosition, setMarkerPosition];
};

export default useAccidentPosition;
