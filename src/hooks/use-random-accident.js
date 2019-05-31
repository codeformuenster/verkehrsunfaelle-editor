import React from 'react';
import ky from 'ky';

const useRandomAccident = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [accident, setAccident] = React.useState({ error: false });

  const [reloader, reload] = React.useState(0);

  React.useEffect(() => {
    setIsLoading(true);
    const abortController = new AbortController();
    ky.get('http://localhost:9000/hooks/random-accident', {
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
