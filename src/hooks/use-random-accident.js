import useDataHelper from './use-data-helper';

const useRandomAccident = () => {
  const [{ isLoading, response: accident }, reload] = useDataHelper(
    'random-accident',
  );
  return { isLoading, accident, reload };
};

export default useRandomAccident;
