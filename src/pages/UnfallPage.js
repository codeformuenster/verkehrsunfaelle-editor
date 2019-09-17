import React from 'react';
import PropTypes from 'prop-types';
import UnfallPageComponent from './UnfallPageComponent';
import useAccident from '../hooks/use-accident-by-id';

const UnfallPage = ({ accidentId }) => {
  const accident = useAccident(accidentId);

  return <UnfallPageComponent {...accident} hideNext={true} />;
};

UnfallPage.propTypes = {
  accidentId: PropTypes.string
}

export default UnfallPage;
