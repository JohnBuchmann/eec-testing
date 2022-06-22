/*
 * IconButton Component
 *
 * This creates a Device Button with Icon + Text + Status
 *
 */
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Colors } from 'Theme';
import { findDeviceListTypeById } from 'Utils/devices';
import { IconStatus } from '../IconStatus';

const useStyles = makeStyles({
  buttonWrapper: {
    border: 'none',
    outline: 'none',
    backgroundColor: Colors.white,
    borderTop: `solid 1px ${Colors.athensGray}`,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 8px 12px 12px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '14px',
  },

  displayText: {
    marginLeft: '12px',
    marginRight: '0.4px',
  },
  iconImage: {
    height: '24px',
    width: '24px',
  },
  iconStatus: {
    marginBottom: '3px',
  },
});

/**
 * IconDeviceButton Creates a clickable Device Button with Icon + Text + Status
 * @param {number} deviceStatusId Device Status to get Status
 * @param {number} deviceGroupId value to return when this ribbon is clicked
 * @param {function} handleActionClick Use this to handle click action on the ribbon, sending GroupId and DeviceType
 */
export const IconDeviceButton = ({
  deviceGroupId,
  deviceStatusId,
  handleActionClick,
}) => {
  const classes = useStyles();
  const deviceTypeSelected = findDeviceListTypeById(deviceGroupId);

  /**
   * handleClick Sent event when to parent when button is clicked.
   * Send deviceGroupId and DeviceType name.
   */
  const handleClick = () => {
    handleActionClick(deviceGroupId);
  };

  if (deviceTypeSelected) {
    return (
      <button
        type="button"
        className={classes.buttonWrapper}
        onClick={handleClick}
      >
        <div>
          <img
            src={deviceTypeSelected.icon}
            alt={deviceTypeSelected.displayText}
            className={classes.iconImage}
          />
          <span className={classes.displayText}>
            {deviceTypeSelected.displayText}
          </span>
        </div>
        <IconStatus className={classes.iconStatus} statusId={deviceStatusId} />
      </button>
    );
  }
  return <></>;
};

IconDeviceButton.propTypes = {
  deviceStatusId: PropTypes.number,
  handleActionClick: PropTypes.func,
  deviceGroupId: PropTypes.string.isRequired,
};

export default IconDeviceButton;
