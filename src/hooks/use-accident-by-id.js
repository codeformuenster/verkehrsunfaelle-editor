import React from 'react';
import useDataHelper from './use-data-helper';
import useAccidentPosition from './use-accident-position';
import useSaveAccident from './use-save-accident';

const reloadAccident = () => {};

const useAccident = accidentId => {
  const [{ isLoading: accidentIsLoading, response: accident }] = useDataHelper(
    `accident-by-id?id=${accidentId}`,
  );

  const [isSaved, setIsSaved] = React.useState(false);

  const [accidentPosition, setAccidentPosition] = useAccidentPosition(accident);

  const { saveAccident, setIsLoading, isLoading, saveError } = useSaveAccident({
    accident,
    accidentPosition,
    reloadAccident: () => {
      setIsLoading(false);
      setIsSaved(true);
    },
  });

  React.useEffect(() => {
    setIsLoading(accidentIsLoading);
  }, [accidentIsLoading, setIsLoading]);

  return {
    accident,
    saveAccident,
    accidentPosition,
    setAccidentPosition,
    reloadAccident,
    isLoading,
    saveError,
    isSaved,
  };
};

export default useAccident;
