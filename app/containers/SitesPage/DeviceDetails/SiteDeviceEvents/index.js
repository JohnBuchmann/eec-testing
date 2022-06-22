/**
 * This is the container Device Details Events
 */

import { makeStyles } from '@material-ui/core/styles';
import SiteEvents from 'Containers/SitesPage/SiteDetails/Overview/Events';
import PropTypes from 'prop-types';
import React from 'react';
import { getValueIfExists } from 'Utils/propertyValidation';
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
 * Device Details Events, this wraps components to display status and events.
 */
function SiteDeviceEvents(props) {
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
        <SiteEvents
          data-testid="device-site-events"
          isDeviceGroupFilterRequired={false}
        />
      </div>
    </div>
  );
}

SiteDeviceEvents.propTypes = {
  params: PropTypes.object,
};

export default SiteDeviceEvents;
