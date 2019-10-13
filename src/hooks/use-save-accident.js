import React from 'react';
import { useKinto } from '../contexts/kinto-context';

const useSaveAccident = ({ reloadAccident, accident, accidentPosition }) => {
  const kinto = useKinto();

  const [saveError, setSaveError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

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
          geometry_id: accident.geometry_id ? accident.geometry_id : 'missing',
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
    saveAccident,
    setIsLoading,
    isLoading,
    saveError,
  };
}

export default useSaveAccident;
