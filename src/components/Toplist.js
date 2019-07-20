import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import useToplist from '../hooks/use-toplist';

const useStyles = makeStyles(() => ({
  toplistItem: {
    display: 'flex',
  },
  toplistItemHeader: {
    fontVariant: 'small-caps',
    color: '#555555',
  },
  count: {
    marginLeft: 'auto',
  },
  expandButton: {
    color: '#555555',
  },
  trophyIcon: {
    width: 20,
  },
}));

const PlaceIcon = ({ place }) => {
  const classes = useStyles();
  const icon = place <= 3 ? ['🏆', '🥈', '🥉'][place - 1] : <>&nbsp;</>;
  return (
    <span
      className={classes.trophyIcon}
      role="img"
      aria-label={`Platz ${place}`}
    >
      {icon}
    </span>
  );
};

PlaceIcon.propTypes = {
  place: PropTypes.number.isRequired,
};

const Toplist = ({ numCollapsed = 3 }) => {
  const classes = useStyles();

  const { isLoading, toplist } = useToplist();
  const [isExpanded, setIsExpanded] = React.useState(false);

  if (isLoading) {
    return <>wird geladen&hellip;</>;
  }

  const displayToplist = toplist.slice(
    0,
    isExpanded ? undefined : numCollapsed,
  );

  return (
    <>
      <Typography variant="h5" gutterBottom align="center">
        Meiste Korrekturen
      </Typography>
      <Box mx={4}>
        <Typography
          className={clsx(classes.toplistItem, classes.toplistItemHeader)}
          gutterBottom
        >
          Name
          <Typography component="span" className={classes.count}>
            Korrekturen
          </Typography>
        </Typography>
        {displayToplist.map(({ principal, count }, index) => (
          <>
            <Typography
              key={`${principal}${count}`}
              className={classes.toplistItem}
            >
              <PlaceIcon place={index + 1} />{' '}
              {principal.replace('account:', '')}
              <Typography component="span" className={classes.count}>
                {count}
              </Typography>
            </Typography>
          </>
        ))}
        {toplist.length > numCollapsed && (
          <Box align="center">
            <Button
              className={classes.expandButton}
              onClick={() => {
                setIsExpanded(!isExpanded);
              }}
            >
              {isExpanded ? 'weniger' : 'mehr'}&hellip;
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

Toplist.propTypes = {
  numCollapsed: PropTypes.number,
};

export default Toplist;
