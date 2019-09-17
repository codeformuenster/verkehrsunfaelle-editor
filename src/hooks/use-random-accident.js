import React from 'react';
import useDataHelper from './use-data-helper';
import useAccidentPosition from './use-accident-position';
import useSaveAccident from './use-save-accident';

const useRandomAccident = () => {
  const [
    { isLoading: randomAccidentIsLoading, response: accident },
    reloadAccident,
  ] = useDataHelper('random-accident');

  const [accidentPosition, setAccidentPosition] = useAccidentPosition(accident);

  const { saveAccident, setIsLoading, isLoading, saveError } = useSaveAccident({
    accident,
    accidentPosition,
    reloadAccident,
  });

  React.useEffect(() => {
    setIsLoading(randomAccidentIsLoading);
  }, [randomAccidentIsLoading, setIsLoading]);

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

export default useRandomAccident;
