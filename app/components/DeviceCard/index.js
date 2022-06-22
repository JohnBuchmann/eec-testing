/*
 * DeviceCard Component
 *
 */
import { makeStyles } from '@material-ui/core/styles';
import IconStatusLabel from 'Components/IconStatusLabel/Index';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import { Colors } from 'Theme';
import { propertyExist } from 'Utils/propertyValidation';
import { findDeviceListTypeById } from 'Utils/devices';
import messages from './messages';

const useStyles = makeStyles({
  contentWrapper: {
    '& h3': {
      margin: '0px',
    },
    '& div': {
      fontSize: 14,
    },
    padding: '17px 15px 42px 15px',
  },
  deviceType: {
    minHeight: '16px',
  },
  deviceCardStyle: {
    backgroundColor: Colors.athensGray,
    border: `solid 1px ${Colors.mercury}`,
    borderRadius: '2px',
    cursor: 'pointer',
  },
  displayText: {
    marginLeft: '11px',
    fontSize: 14,
    marginRight: '4px',
    textTransform: 'uppercase',
    fontWeight: '600px',
    position: 'relative',
    top: '2px',
  },
  iconImage: {
    height: '24px',
    width: '24px',
  },
  deviceName: {
    float: 'left',
  },
  deviceGroup: {
    float: 'right',
  },
  deviceDescription: {
    color: Colors.mountainMeadow,
    margin: '11px 0px 0px 0px',
    minHeight: '16px',
  },
  iconStatusLabel: {
    marginTop: '14px',
    minHeight: '16px',
  },
  gridStatus: {
    marginTop: '9px',
    float: 'left',
    width: '100%',
  },
  clear: {
    clear: 'both',
  },
});

/**
 * DeviceCard Creates a Card with custom div wrapper styles with the info provided + Custom Status
 * @param {string} deviceName Device name to display as the first element on the card
 * @param {string} deviceLocation Device location to display as the second element on the card
 * @param {string} deviceType Device Type to display as the second element on the card
 * @param {string} deviceEnergyRating Device Energy Rating to display as the third element on the card
 * @param {string} deviceMake Device make to display as the fourth element on the card
 * @param {number} deviceStatusId Device Status id to send to IconStatusLabel and get the right label
 * @param {bool} deviceGridStatus Device Grid Status to set label between Off-Grid or On-Grid
 * @param {bool} isDeviceDetails Indicate whether the content page is "Device Details", if false, content page is "Device List".
 * @param {function} onClickHandler Use this to handle click action on DeviceCard
 * @param {bool} isLocationNeeded Set true if location needs to be displayed, default true
 * @param {string} componentName Device component tag
 */
export const DeviceCard = (props) => {
  const {
    deviceName,
    deviceEnergyRating,
    deviceMake,
    deviceStatusId,
    deviceGridStatus,
    deviceType,
    onClickHandler,
    isDeviceDetails = false,
    deviceGroupName,
    componentName,
  } = props;

  const classes = useStyles();
  const { formatMessage } = props.intl;
  const selectedDeviceListType = findDeviceListTypeById(deviceGroupName);
  const deviceDetailsClass = isDeviceDetails ? '' : classes.deviceCardStyle;

  let gridStatusMessage = '';
  if (messages && propertyExist(() => deviceGridStatus)) {
    const gridStatusText = deviceGridStatus
      ? messages.onGrid
      : messages.offGrid;
    gridStatusMessage = `${formatMessage(messages.gridStatus)} ${formatMessage(
      gridStatusText
    )}`;
  }

  const zeroTabIndex = 0;

  const renderDeviceGroup = isDeviceDetails && (
    <div className={classes.deviceGroup}>
      <img
        src={selectedDeviceListType.icon}
        alt={selectedDeviceListType.displayText}
        className={classes.iconImage}
      />
      <span className={classes.displayText}>
        {selectedDeviceListType.displayText}
      </span>
    </div>
  );

  return (
    <div
      data-testid="device-card"
      className={deviceDetailsClass}
      onClick={onClickHandler}
      onKeyDown={onClickHandler}
      role="button"
      tabIndex={zeroTabIndex}
    >
      <div className={classes.contentWrapper}>
        <h3 className={classes.deviceName}>
          {deviceName} - {componentName}
        </h3>
        {renderDeviceGroup}
        <div className={classes.clear} />
        <div className={classes.deviceType}>{deviceType} </div>
        <div className={classes.deviceDescription}>{deviceEnergyRating}</div>
        <div className={classes.deviceDescription}>{deviceMake}</div>
        <IconStatusLabel
          className={classes.iconStatusLabel}
          statusId={deviceStatusId}
        />
        <div className={classes.gridStatus}>{gridStatusMessage}</div>
      </div>
    </div>
  );
};

DeviceCard.propTypes = {
  deviceName: PropTypes.string,
  deviceEnergyRating: PropTypes.string,
  deviceMake: PropTypes.string,
  deviceGridStatus: PropTypes.bool,
  isDeviceDetails: PropTypes.bool,
  deviceType: PropTypes.string,
  onClickHandler: PropTypes.func,
  deviceStatusId: PropTypes.number,
  intl: PropTypes.any.isRequired,
  componentName: PropTypes.string,
  deviceGroupName: PropTypes.string,
};

export default injectIntl(DeviceCard);
