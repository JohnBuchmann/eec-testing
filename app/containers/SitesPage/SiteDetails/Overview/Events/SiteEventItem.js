/*
 * Site Events Item
 *
 * This contains and Event Item
 */
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import moment from 'moment';

import React from 'react';
import { Colors } from 'Theme';

const useStyles = makeStyles({
  wrapper: {
    borderBottom: `solid 2px ${Colors.mercury}`,
    paddingTop: '16px',
    paddingBottom: '16px',
  },
  date: {
    color: Colors.lunarGreen,
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '7px',
  },
  eventTitle: {
    color: Colors.lunarGreen,
    fontSize: '16px',
    fontWeight: 'normal',
    lineHeight: '24px',
    marginBottom: '5px',
  },
  description: {
    color: Colors.lunarGreen,
    fontSize: '14px',
    fontWeight: 'normal',
    marginBottom: '7px',
  },
  deviceName: {
    color: Colors.mountainMeadow,
    fontSize: '12px',
    fontWeight: 'normal',
    marginBottom: '7px',
  },
});

/**
 *
 * @param {Object} eventItemRibbon contains data to display on This Event Item Ribbon
 */
export const SiteEventItem = ({ eventItemRibbon = {} }) => {
  const {
    deviceId,
    deviceName,
    title,
    description,
    eventDateTime,
  } = eventItemRibbon;

  const classes = useStyles();
  const maxLengthDescription = 100;
  const trimDescription = description
    ? description.substring(0, maxLengthDescription)
    : '';

  const format = 'MMM DD, YYYY hh:mm:ss a';
  const formattedDate = moment(eventDateTime).format(format);

  return (
    <div
      className={classes.wrapper}
      key={deviceId}
      data-testid="site-event-wrapper"
    >
      <div className={classes.date}>{formattedDate}</div>
      <div className={classes.deviceName}>{deviceName}</div>
      <div className={classes.eventTitle}>{title}</div>
      <div className={classes.description}>{trimDescription}</div>
    </div>
  );
};

SiteEventItem.propTypes = {
  eventItemRibbon: PropTypes.object,
};

export default SiteEventItem;
