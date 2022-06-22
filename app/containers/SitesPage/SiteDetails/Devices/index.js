/*
 * Device general view, offering a side bar to filter and right panel to show card results
 *
 */

import { makeStyles } from '@material-ui/core';
import DeviceCard from 'Components/DeviceCard';
import IconDeviceButton from 'Components/IconDeviceButton';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDevicesBySiteId, setDevicesFilters } from 'Store/Devices/actions';
import { getDevicesListCard } from 'Store/Devices/selectors';
import { setSiteEventFilters } from 'Store/Sites/actions';
import {
  DeviceDetailTabs,
  PermissionsList,
  TypeValidation,
} from 'Utils/enums/roles';
import { Colors } from 'Theme';
import {
  allLocationsDefault,
  findDeviceListTypeById,
  getAllLocations,
} from 'Utils/devices';
import { DeviceListTypeId } from 'Utils/enums/device';
import { DeviceStatusId } from 'Utils/enums/deviceStatus';
import { SET_INTERVAL_PULLING_DATA } from 'Utils/enums/http';
import { getValueIfExists } from 'Utils/propertyValidation';
import { validatePermission } from 'Config/appSettings';

import messages from './messages';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
  },
  leftPanel: {
    width: '180px',
    float: 'left',
  },
  rightPanel: {
    height: '892px',
    width: '986px',
    backgroundColor: Colors.white,
    overflow: 'hidden',
    float: 'left',
    borderLeft: `solid 1px ${Colors.athensGray}`,
    display: 'inline-table',
  },
  headerWrapper: {
    padding: '8px 16px 12px 15px',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  contentWrapper: {
    padding: '15px 0px 20px 0px',
  },
  displayText: {
    marginLeft: '11px',
    fontSize: 14,
    marginRight: '4px',
    textTransform: 'uppercase',
    fontWeight: '600px',
  },
  statusItem: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: 9,
    justifyContent: 'space-between',
    height: '25px',
  },
  iconImage: {
    height: '24px',
    width: '24px',
  },
  deviceCardContainer: {
    width: '308px',
    height: '182px',
    display: 'inline-block',
    marginLeft: '15px',
    marginRight: '1px',
    marginBottom: '16px',
    position: 'relative',
  },
  deviceCardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    background: Colors.rgbaGray12,
    width: '100%',
    height: '186px',
    display: 'block',
    borderRadius: '2px',
    cursor: 'not-allowed',
  },
  deviceCardDisabled: {
    opacity: '0.5',
  },
  noRecords: {
    textAlign: 'center',
  },
  mTop: {
    marginTop: '5px',
  },
});

/**
 * DeviceStatus creates the container to displayDeviceListType
 * a property device status list and allows to modify them
 * @param {Object} history History to be able to push new path to redirect
 * @param {Array} devicesList List with all available devices
 * @param {Object} eventsFilters events filters to restore if needed
 * @param {Object} filtersDevices device filters to apply or set if needed
 * @param {Array} filterDevicesList List with filtered devices based on filtersDevices
 * @param {Function} getDevicesBySiteIdFetch Get all Devices from store
 * @param {Function} setDevicesFiltersDispatch Set selected filters for devices into store
 * @param {Function} setSiteEventFiltersDispatch Set filters for events into store.
 */
const DevicesList = (props) => {
  const {
    history,
    deviceGroups,
    complementaryDeviceGroups,
    eventsFilters,
    filtersDevices,
    filterDevicesList,
    getDevicesBySiteIdFetch,
    setDevicesFiltersDispatch,
    setSiteEventFiltersDispatch,
    permissions,
    isSiteLive,
    siteAccount,
  } = props;
  const { formatMessage } = props.intl;
  const { siteId } = useParams();
  const classes = useStyles();

  const paramsToPermissions = {
    permissions,
    isSiteLive,
    section: getValueIfExists(() => PermissionsList.DeviceDetail, ''),
    type: getValueIfExists(() => TypeValidation.View, ''),
    action: getValueIfExists(() => DeviceDetailTabs.Status, ''),
    siteAccount,
  };

  /**
   * @property {boolean} canAccessDevice
   * Stores the user permissios to access to device details screen.
   */
  const canAccessDevice = validatePermission(paramsToPermissions);

  const {
    deviceListType: storedDeviceListType = findDeviceListTypeById(
      DeviceListTypeId.All
    ),
  } = filtersDevices;

  const [selectedDeviceListType, setSelectedDeviceListType] = useState(
    storedDeviceListType
  );

  /**
   * mapDeviceGroups
   * It loops through the device groups to display the icon and device name
   * @param {string} deviceGroupsParam This is array of groups to be maped
   */
  const mapDeviceGroups = (deviceGroupsParam) =>
    deviceGroupsParam.map(({ statusId, deviceGroupId: itemDeviceGroupId }) => (
      <div key={`icon-device-button-${itemDeviceGroupId}`}>
        <IconDeviceButton
          deviceStatusId={statusId}
          deviceGroupId={itemDeviceGroupId}
          handleActionClick={deviceGroupIdFilterChange}
        />
      </div>
    ));

  // This stores location options for dropdown location and a state to know if this data needs to be updated base on new devices.
  const [locationDataInfo, setLocationDataInfo] = React.useState({
    locationData: [],
    updateRequired: true,
  });

  /**
   * deviceGroupIdFilterChange allows to filter DeviceCards based on selected deviceGroupId
   * @param {string} selectedDeviceGroupId This is a string Id to identify which Group Id was clicked.
   */
  const deviceGroupIdFilterChange = (selectedDeviceGroupId) => {
    const currentDeviceListType = findDeviceListTypeById(selectedDeviceGroupId);
    setDevicesFiltersDispatch({
      deviceGroupId: selectedDeviceGroupId,
      locationId: allLocationsDefault,
      deviceListType: currentDeviceListType,
    });
    setSelectedDeviceListType(currentDeviceListType);

    setLocationDataInfo((prevState) => ({
      ...prevState,
      updateRequired: true,
    }));
  };

  /**
   * sendToDeviceDetails Clear filters and send to device summary
   * @param {number} selectedDeviceId Receive selected device ID
   * @param {number} deviceGroupId Group id from the selected Device
   * @param {number} deviceId Id from selected Device
   */
  const sendToDeviceDetails = (selectedDeviceId, deviceGroupId, deviceId) => {
    // Prevent DOM manipulation and access if user has not permissions to view device details
    if (!canAccessDevice) {
      return;
    }
    setSiteEventFiltersDispatch({
      ...eventsFilters,
      deviceId: 0,
    });
    const deviceGroup =
      selectedDeviceId !== DeviceListTypeId.All
        ? selectedDeviceId
        : deviceGroupId;
    history.push(
      `/sites/${siteId}/group/${deviceGroup}/device/${deviceId}/details`
    );
  };

  useEffect(() => {
    getDevicesBySiteIdFetch(siteId);
    const isRefreshing = true;
    // Disabling set Intervals as Codacy does not know how to handle them.
    /* eslint-disable */
    const interval = setInterval(() => {
      getDevicesBySiteIdFetch(siteId, isRefreshing);
    }, SET_INTERVAL_PULLING_DATA);
    return () => clearInterval(interval);
    /* eslint-enable */
  }, []);

  // Each time devices list got updated it will try to update location data if this is required.
  useEffect(() => {
    const { updateRequired } = locationDataInfo;
    if (updateRequired && getValueIfExists(() => filterDevicesList.length, 0)) {
      const locationData = getAllLocations(
        filterDevicesList,
        formatMessage(messages.labelDropdown)
      );
      // Set new location and set update required to false because this was just updated.
      setLocationDataInfo({
        locationData,
        updateRequired: false,
      });
    }
  }, [filterDevicesList]);

  const leftPanel = !!deviceGroups.length && (
    <>
      <div key="icon-device-button-0">
        <IconDeviceButton
          deviceStatusId={DeviceStatusId.Ok}
          deviceGroupId={DeviceListTypeId.All}
          handleActionClick={deviceGroupIdFilterChange}
        />
      </div>
      {mapDeviceGroups(deviceGroups)}
    </>
  );
  const leftPanelComplementaryDeviceGroups = !!complementaryDeviceGroups.length && (
    <>{mapDeviceGroups(complementaryDeviceGroups)}</>
  );

  const selectedDeviceId = getValueIfExists(
    () => selectedDeviceListType.id,
    null
  );

  const renderDevicesCardItems = () => {
    if (filterDevicesList && filterDevicesList.length) {
      return filterDevicesList.map(
        ({
          deviceId,
          deviceName,
          lcmLocation,
          lcmRackNum,
          lcmPositionNum,
          make = '',
          model = '',
          energyRating,
          deviceStatusId,
          gridStatus,
          deviceGroupIdName,
          componentName,
          deviceType,
        }) => (
          <div
            className={classes.deviceCardContainer}
            key={`device-card-${deviceId}`}
          >
            <DeviceCard
              deviceName={deviceName}
              deviceContainer={lcmLocation}
              deviceRack={lcmRackNum}
              devicePosition={lcmPositionNum}
              deviceEnergyRating={energyRating}
              deviceMake={`${make} ${model}`}
              deviceStatusId={deviceStatusId}
              deviceGridStatus={gridStatus}
              deviceType={deviceType.name}
              componentName={componentName || ''}
              deviceGroupName={deviceGroupIdName}
              onClickHandler={() =>
                sendToDeviceDetails(
                  selectedDeviceId,
                  deviceGroupIdName,
                  deviceId
                )
              }
            />
            {
              // adding overlay to emulate the disabled status and avoid clicking the card
            }
          </div>
        )
      );
    }
    return (
      <div className={classes.noRecords}>
        {formatMessage(messages.noRecords)}
      </div>
    );
  };

  const rightPanel = (
    <>
      <div className={classes.headerWrapper}>
        <div>
          <img
            src={selectedDeviceListType.icon}
            alt={selectedDeviceListType.displayText}
            className={classes.iconImage}
          />
          <span className={classes.displayText}>
            {selectedDeviceListType.displayText}
          </span>
        </div>
      </div>
      <div className={classes.contentWrapper}>{renderDevicesCardItems()}</div>
    </>
  );

  return (
    <div className={classes.wrapper}>
      <div data-testid="left-panel" className={classes.leftPanel}>
        {leftPanel}
        <div className={classes.mTop}>{leftPanelComplementaryDeviceGroups}</div>
      </div>
      <div data-testid="right-panel" className={classes.rightPanel}>
        {rightPanel}
      </div>
    </div>
  );
};

DevicesList.propTypes = {
  history: PropTypes.object,
  deviceGroups: PropTypes.array,
  complementaryDeviceGroups: PropTypes.array,
  intl: PropTypes.any.isRequired,
  eventsFilters: PropTypes.object,
  filtersDevices: PropTypes.object,
  filterDevicesList: PropTypes.array,
  getDevicesBySiteIdFetch: PropTypes.func.isRequired,
  setDevicesFiltersDispatch: PropTypes.func.isRequired,
  setSiteEventFiltersDispatch: PropTypes.func.isRequired,
  permissions: PropTypes.object.isRequired,
  isSiteLive: PropTypes.bool.isRequired,
  siteAccount: PropTypes.string.isRequired,
};

/**
 * mapStateToProps
 * @param {Array} devicesList receives an array with all devices
 * @param {Object} eventsFilters receives an object with the event filters
 * @param {Object} filtersDevices receives an object with the devices filters
 * @param {Array} filterDevicesList receives an array with filtered devices based on current filters on store
 */
const mapStateToProps = (state) => ({
  filterDevicesList: getDevicesListCard(state),
  siteTypeName: getValueIfExists(() => state.sites.site.siteType.name, ''),
  deviceGroups: getValueIfExists(() => state.devices.deviceGroups, []),
  complementaryDeviceGroups: getValueIfExists(
    () => state.devices.complementaryDeviceGroups,
    []
  ),
  filtersDevices: getValueIfExists(() => state.devices.filtersDevices, {}),
  eventsFilters: getValueIfExists(() => state.sites.site.eventsFilters, {}),
  permissions: getValueIfExists(() => state.user.permissions, {}),
  isSiteLive: getValueIfExists(() => state.sites.site.live, false),
  siteAccount: getValueIfExists(() => state.sites.site.account, ''),
});

/**
 * mapDispatchToProps
 * @param {Function} getDevicesBySiteIdFetch call getDevicesBySiteId action and get all devices list
 * @param {Function} setDevicesFiltersDispatch call setDevicesFilters action to set devices filters on store
 * @param {Function} setSiteEventFiltersDispatch call setSiteEventFilters action to set event filters on store
 */
const mapDispatchToProps = (dispatch) => ({
  getDevicesBySiteIdFetch: (siteId, isRefreshing) =>
    dispatch(getDevicesBySiteId(siteId, isRefreshing)),
  setDevicesFiltersDispatch: (filters) => dispatch(setDevicesFilters(filters)),
  setSiteEventFiltersDispatch: (deviceFilters) =>
    dispatch(setSiteEventFilters(deviceFilters)),
});
// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DevicesList)
);
/* eslint-enable */
