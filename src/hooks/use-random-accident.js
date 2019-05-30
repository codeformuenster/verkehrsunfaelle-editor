import React from 'react';
import ky from 'ky';

const useRandomAccident = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [accident, setAccident] = React.useState({ error: false });

  const [reloader, reload] = React.useState(0);

  React.useEffect(() => {
    setIsLoading(true);
    ky.get('http://localhost:9000/hooks/random-accident')
      .json()
      .then(accident => {
        setAccident(accident);
        setIsLoading(false);
      })
      .catch(err => {
        setAccident({ error: err });
        setIsLoading(false);
      });
  }, [reloader]);

  return { isLoading, accident, reload: () => reload(Math.random()) };
};

export default useRandomAccident;
