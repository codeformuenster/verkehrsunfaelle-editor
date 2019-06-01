import React from 'react';
import PropTypes from 'prop-types';

import KintoClient from 'kinto-http';

const SERVER_URL = 'http://localhost:8888/v1/';

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
