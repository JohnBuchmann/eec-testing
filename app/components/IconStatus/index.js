/*
 * IconStatus Component
 *
 * This returns an Icon base on the given StatusId
 *
 */
import PropTypes from 'prop-types';
import React from 'react';
import { DeviceStatus } from 'Utils/enums/deviceStatus';

/**
 * IconStatus Creates an Icon based on the statusId
 * @param {number} statusId status to get the right values for the Icon
 * @param {number} height provide height for the icon, default 20
 * @param {number} width provide width for the icon, default 20
 */
export const IconStatus = ({ statusId, height = 20, width = 20 }) => {
  const statusSelected = DeviceStatus.find(
    (statusItem) => statusItem.id === statusId
  );

  if (statusSelected) {
    const {
      icon: iconImage,
      backgroundColor: iconBackgroundColor,
      name: iconName,
    } = statusSelected;

    return (
      <img
        style={{
          backgroundColor: iconBackgroundColor,
          height,
          width,
        }}
        alt={iconName}
        src={iconImage}
      />
    );
  }

  return <></>;
};

IconStatus.propTypes = {
  statusId: PropTypes.number.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
};

export default IconStatus;
