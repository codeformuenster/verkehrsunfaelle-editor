import React from 'react';
import { useKinto } from '../contexts/kinto-context';
import useDataHelper from './use-data-helper';

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

const useAccident = () => {
  const kinto = useKinto();

  const [saveError, setSaveError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const [
    { isLoading: randomAccidentIsLoading, response: accident },
    reloadAccident,
  ] = useDataHelper('random-accident');

  React.useEffect(() => {
    setIsLoading(randomAccidentIsLoading);
  }, [randomAccidentIsLoading]);

  const [accidentPosition, setAccidentPosition] = useAccidentPosition(accident);

  const saveAccident = isBogus => {
    setIsLoading(true);

    // wrap with Promise.. maybe I'm doing something wrong, or kinto http js
    // excutes .then even if there was some error?!
    return new window.Promise((resolve, reject) => {
      kinto
        .bucket('accidents')
        .collection('geometries_corrections')
        .createRecord({
          accident_id: accident.accident_id,
          geometry_id: accident.geometry_id,
          lat: accidentPosition.lat,
          lon: accidentPosition.lon,
          timestamp: new Date(),
          bogus: isBogus,
        })
        .then(() => {
          // reset error
          if (saveError !== null) {
            setSaveError(null);
          }
          reloadAccident();
          return resolve();
        })
        .catch(err => {
          setSaveError(err);
          setIsLoading(false);
          return reject(err);
        });
    });
  };

  return {
    accident,
    saveAccident,
    accidentPosition,
    setAccidentPosition,
    isLoading,
    reloadAccident,
    saveError,
  };
};

export default useAccident;
