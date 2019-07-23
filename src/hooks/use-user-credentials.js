import React from 'react';

const usernameValidationRegex = /^[a-zA-Z0-9][+.@a-zA-Z0-9_-]*$/;

const useUserCredentials = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const usernameValid = React.useMemo(() => {
    return usernameValidationRegex.test(username);
  }, [username]);

  const credentialsValid = React.useMemo(() => {
    return usernameValid && password.length !== 0;
  }, [usernameValid, password]);

  const resetCredentials = React.useCallback(() => {
    setUsername('');
    setPassword('');
  }, []);

  return {
    username,
    password,
    setUsername,
    setPassword,
    usernameValid,
    credentialsValid,
    resetCredentials,
  };
};

export default useUserCredentials;
