import React from 'react';
import UnfallPageComponent from './UnfallPageComponent';
import useRandomAccident from '../hooks/use-random-accident';

const RandomUnfallPage = () => {
  const randomAccident = useRandomAccident();

  return <UnfallPageComponent {...randomAccident} />;
};

export default RandomUnfallPage;
