/*
 * Panel Component
 *
 * This creates a generic panel with header and content view
 *
 */
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Colors } from 'Theme';
import { DeviceStatus, DeviceStatusId } from 'Utils/enums/deviceStatus';
import { propertyExist } from 'Utils/propertyValidation';

const useStyles = makeStyles({
  deviceStatus: {
    marginTop: '11px',
    fontSize: '12px',
    padding: '4px 7px 4px 7px !important',
    color: Colors.white,
    display: 'inline-block',
    textTransform: 'uppercase',
    minHeight: '17px',
  },
});

/**
 * IconStatus Creates an Icon based on the given statusId
 * @param {number} statusId status to get the right values for the Icon
 */
export const IconStatusLabel = ({ statusId }) => {
  const classes = useStyles();
  if (propertyExist(() => statusId)) {
    const statusSelected = DeviceStatus.find(
      (statusItem) => statusItem.id === statusId
    );

    if (statusSelected) {
      const { name } = statusSelected;
      let { backgroundColor } = statusSelected;

      // Avoid white background color on disconnected status
      if (DeviceStatusId.Disconnected === statusId) {
        backgroundColor = Colors.black;
      }

      return (
        <div className={classes.deviceStatus} style={{ backgroundColor }}>
          {name}
        </div>
      );
    }
  }

  return <div className={classes.deviceStatus} />;
};

IconStatusLabel.propTypes = {
  statusId: PropTypes.number,
};

export default IconStatusLabel;
