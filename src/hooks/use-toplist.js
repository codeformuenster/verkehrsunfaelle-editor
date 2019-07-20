import useDataHelper from './use-data-helper';

const useToplist = () => {
  const [
    {
      isLoading,
      response: { toplist: topListFromResponse },
    },
  ] = useDataHelper('toplist');

  return { isLoading, toplist: topListFromResponse ? topListFromResponse : [] };
};

export default useToplist;
