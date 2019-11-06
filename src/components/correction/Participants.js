import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PedestrianIcon from '@material-ui/icons/DirectionsWalk';
import BikeIcon from '@material-ui/icons/DirectionsBike';
import CarIcon from '@material-ui/icons/DirectionsCar';
import LorryIcon from '@material-ui/icons/LocalShipping';
import BusIcon from '@material-ui/icons/DirectionsBus';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';

const ParticipantsIcon = ({ children, amount }) => {
  const cleanAmount = Number(amount);

  if (Number.isNaN(cleanAmount) || cleanAmount === 0) {
    return null;
  }
  return (
    <>
      {Array.from({ length: cleanAmount }, (_, i) => (
        <React.Fragment key={i}>{children}</React.Fragment>
      ))}
    </>
  );
};

ParticipantsIcon.propTypes = {
  amount: PropTypes.number,
  children: PropTypes.node.isRequired,
};

const Participants = ({ participants = {} }) => {
  const {
    car,
    pedestrian,
    bicycle,
    small_moped,
    moped,
    motorcycle,
    lorry,
    omnibus,
    other_road_user,
  } = participants;

  const numOther = Number(other_road_user);

  return (
    <Box>
      <ParticipantsIcon amount={car}>
        <CarIcon />
      </ParticipantsIcon>
      <ParticipantsIcon amount={pedestrian}>
        <PedestrianIcon />
      </ParticipantsIcon>
      <ParticipantsIcon amount={bicycle}>
        <BikeIcon />
      </ParticipantsIcon>
      <ParticipantsIcon amount={lorry}>
        <LorryIcon />
      </ParticipantsIcon>
      <ParticipantsIcon amount={omnibus}>
        <BusIcon />
      </ParticipantsIcon>
      <ParticipantsIcon
        amount={Number(small_moped) + Number(moped) + Number(motorcycle)}
      >
        <MotorcycleIcon />
      </ParticipantsIcon>
      {!Number.isNaN(numOther) && numOther !== 0 ? (
        <>{numOther} andere</>
      ) : null}
      <Typography
        variant="caption"
        component="h6"
        color="textSecondary"
        align="center"
      >
        Beteiligte
      </Typography>
    </Box>
  );
};

Participants.propTypes = {
  participants: PropTypes.shape({
    car: PropTypes.number,
    pedestrian: PropTypes.number,
    bicycle: PropTypes.number,
    small_moped: PropTypes.number,
    moped: PropTypes.number,
    motorcycle: PropTypes.number,
    lorry: PropTypes.number,
    omnibus: PropTypes.number,
    other_road_user: PropTypes.number,
  }),
};

export default Participants;
