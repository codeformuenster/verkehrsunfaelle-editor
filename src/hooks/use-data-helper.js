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

const useDataHelper = (helperName, urlParams = {}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [response, setResponse] = React.useState({ error: false });

  const [reloader, reload] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    const abortController = new window.AbortController();
    ky.get(`${SERVER_URL}/${helperName}`, {
      searchParams: new URLSearchParams(urlParams),
      signal: abortController.signal,
    })
      .json()
      .then(responseFromServer => {
        setResponse(responseFromServer);
        setIsLoading(false);
      })
      .catch(err => {
        setResponse({ error: err });
        setIsLoading(false);
      });
    return () => {
      abortController.abort();
    };
  }, [helperName, reloader, urlParams]);

  return [{ isLoading, response }, () => reload(!reloader)];
};

export default useDataHelper;
