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

const useRandomAccident = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [accident, setAccident] = React.useState({
    error: false,
    place: '―',
    place_near: '―',
  });

  const [reloader, reload] = React.useState(0);

  React.useEffect(() => {
    setIsLoading(true);
    const abortController = new window.AbortController();
    ky.get(`${SERVER_URL}/random-accident`, {
      signal: abortController.signal,
    })
      .json()
      .then(accident => {
        setAccident(accident);
        setIsLoading(false);
      })
      .catch(err => {
        setAccident({ error: err });
        setIsLoading(false);
      });
    return () => {
      abortController.abort();
    };
  }, [reloader]);

  return { isLoading, accident, reload: () => reload(Math.random()) };
};

export default useRandomAccident;
