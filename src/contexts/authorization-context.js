import React from 'react';
import PropTypes from 'prop-types';
import ky from 'ky';
import { useKinto } from './kinto-context';

import AuthorizationModal from '../components/AuthorizationModal';

const initialState = { authorized: false };

const AuthorizationContext = React.createContext();

const AuthorizationProvider = ({ children }) => {
  const kinto = useKinto();

  const [isLoading, setIsLoading] = React.useState(false);
  const [state, setAuthState] = React.useState(initialState);
  const [error, setErrorState] = React.useState('');

  const [modalIsOpen, setModalOpen] = React.useState(false);

  // helpers
  const setError = error => {
    setAuthState({ authorized: false });
    setErrorState(error);
    setIsLoading(false);
  };

  const setAuthSuccess = username => {
    setAuthState({ authorized: true, username });
    setErrorState('');
    setIsLoading(false);
    setModalOpen(false);
  };

  const engageAuthModal = () => {
    setModalOpen(true);
  };

  // communication with server
  const registerAccount = (username, password) => {
    setIsLoading(true);
    ky.put(`${kinto.remote}/accounts/${username}`, {
      retry: 0,
      json: { data: { password } },
    })
      .then(() => {
        kinto.setHeaders({
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        });

        setAuthSuccess(username);
      })
      .catch(err => {
        if (err.name === 'HTTPError' && err.message === 'Unauthorized') {
          setError(
            'Registrierung fehlgeschlagen. ' +
              'Bitte anderen Benutzernamen versuchen',
          );
        } else {
          setError('Kommunikation mit dem Server war nicht erfolgreich. 💥');
        }
      });
  };

  const checkCredentials = (username, password) => {
    setIsLoading(true);
    const authString = `Basic ${btoa(`${username}:${password}`)}`;
    ky.get(`${kinto.remote}/accounts/${username}`, {
      headers: new Headers({
        Authorization: authString,
      }),
    })
      .then(() => {
        kinto.setHeaders({
          Authorization: authString,
        });

        setAuthSuccess(username);
      })
      .catch(err => {
        if (err.name === 'HTTPError' && err.message === 'Unauthorized') {
          setError('Benutzername unbekannt oder Passwort falsch.');
        } else {
          setError('Kommunikation mit dem Server war nicht erfolgreich. 💥');
        }
      });
  };

  const signout = () => {
    kinto.setHeaders({
      Authorization: undefined,
    });
    setAuthState({ authorized: false });
  };

  const handleModalClose = onCloseResult => {
    if (typeof onCloseResult === 'undefined') {
      setModalOpen(false);
      return;
    }

    const { username, password, action } = onCloseResult;
    switch (action) {
      case 'register':
        registerAccount(username, password);
        break;
      case 'signin':
        checkCredentials(username, password);
        break;
      default:
        setError(`Internal error?! Invalid auth action ${action}`);
    }
  };

  React.useEffect(() => {
    if (state.authorized === false) {
      checkCredentials('Anonym', 'anon');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthorizationContext.Provider
      value={{ ...state, engageAuthModal, signout }}
    >
      {children}
      <AuthorizationModal
        isOpen={modalIsOpen}
        onClose={handleModalClose}
        showLoading={isLoading}
        error={error}
      />
    </AuthorizationContext.Provider>
  );
};

AuthorizationProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const useAuthorization = () => React.useContext(AuthorizationContext);

export { AuthorizationProvider, useAuthorization };
