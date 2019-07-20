import React from 'react';
import ky from 'ky';

const SERVER_URL = process.env.REACT_APP_DATA_HELPERS_URL; //eslint-disable-line no-undef, max-len

if (!window.AbortController) {
  window.AbortController = function() {
    this.signal = {
      addEventListener: () => {},
    };
    this.abort = () => {};
  };
}

const useStats = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [stats, setStats] = React.useState({
    numAccidents: '–',
    numGeometries: '–',
    numCorrections: '–',
    numAccounts: '–',
  });

  React.useEffect(() => {
    setIsLoading(true);
    const abortController = new window.AbortController();
    ky.get(`${SERVER_URL}/stats`, {
      signal: abortController.signal,
    })
      .json()
      .then(
        ({
          num_accidents: numAccidents,
          num_geometries: numGeometries,
          num_corrections: numCorrections,
          num_accounts: numAccounts,
        }) => {
          setStats({
            numAccidents,
            numGeometries,
            numCorrections,
            numAccounts,
          });
          setIsLoading(false);
        },
      )
      .catch(err => {
        setStats({ ...stats, error: err });
        setIsLoading(false);
      });
    return () => {
      abortController.abort();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { isLoading, ...stats };
};

export default useStats;
