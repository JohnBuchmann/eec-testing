/**
 * This is the container Site Device Status
 */

import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { getValueIfExists } from 'Utils/propertyValidation';
import DeviceStatus from '../DeviceStatus';
import DeviceSummary from '../DeviceSummary';

const styledContainer = makeStyles({
  container: {
    marginRight: '10px',
    display: 'flex',
    '& > div': {
      marginRight: '16px',
    },
  },
});

/**
 * Site Device Status, this wraps components to display status.
 */
function SiteDeviceStatus(props) {
  const classes = styledContainer();
  const { deviceGroupId, deviceId } = getValueIfExists(() => props.params, {});
  const radix = 10;
  const deviceIdNumber = parseInt(deviceId, radix);

  return (
    <div className={classes.container}>
      <div>
        <DeviceSummary
          data-testid="device-summary"
          selectedGroupId={deviceGroupId}
          selectedDeviceId={deviceIdNumber}
        />
      </div>
      <div>
        <DeviceStatus data-testid="device-site-status" />
      </div>
    </div>
  );
}

SiteDeviceStatus.propTypes = {
  params: PropTypes.object,
};

export default SiteDeviceStatus;
