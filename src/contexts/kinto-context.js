import React from 'react';
import PropTypes from 'prop-types';

import KintoClient from 'kinto-http';

const KintoContext = React.createContext();

const KintoProvider = ({ children }) => {
  const [authorization, setAuthorization] = React.useState({
    unauthorized: true,
  });

  const client = React.useMemo(() => {
    let opts = undefined;
    return new KintoClient('http://localhost:8888/v1/', opts);
  }, []);

  React.useLayoutEffect(() => {
    if (!authorization.unauthorized) {
      client.setHeaders({
        Authorization: `Basic ${btoa(
          `${authorization.username}:${authorization.password}`,
        )}`,
      });
    }
  }, [authorization, client]);

  return (
    <KintoContext.Provider
      value={{
        client,
        setAuthorization,
        authorizationName: authorization.username,
      }}
    >
      {children}
    </KintoContext.Provider>
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
