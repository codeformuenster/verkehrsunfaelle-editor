import useDataHelper from './use-data-helper';

const useStats = () => {
  const [
    {
      isLoading,
      response: {
        error,
        num_accidents: numAccidents,
        num_geometries: numGeometries,
        num_corrections: numCorrections,
        num_accounts: numAccounts,
      },
    },
  ] = useDataHelper('stats');

  return {
    isLoading,
    error,
    numAccidents,
    numAccounts,
    numCorrections,
    numGeometries,
  };
};

export default useStats;
