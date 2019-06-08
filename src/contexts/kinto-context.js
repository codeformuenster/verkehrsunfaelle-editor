import React from 'react';
import PropTypes from 'prop-types';

import KintoClient from 'kinto-http';

const SERVER_URL = process.env.REACT_APP_KINTO_URL; //eslint-disable-line no-undef, max-len

const KintoContext = React.createContext();

const KintoProvider = ({ children }) => {
  const client = React.useMemo(() => {
    return new KintoClient(SERVER_URL);
  }, []);

  return (
    <KintoContext.Provider value={client}>{children}</KintoContext.Provider>
  );
};

KintoProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const useKinto = () => React.useContext(KintoContext);

export { useKinto, KintoProvider };
