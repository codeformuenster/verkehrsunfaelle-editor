import React from 'react';
import PropTypes from 'prop-types';

import KintoClient from 'kinto-http';

const KintoContext = React.createContext();

const KintoProvider = ({ children }) => {
  const client = React.useMemo(
    () => new KintoClient('http://localhost:8888/v1/'),
    [],
  );
  // React.useEffect(() => {
  //   client.listBuckets().then(data => {
  //     console.log('kinto!!', data);
  //   });
  // }, [client]);
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

const useKinto = () => {
  const kinto = React.useContext(KintoContext);

  return kinto;
};

export { useKinto, KintoProvider };
