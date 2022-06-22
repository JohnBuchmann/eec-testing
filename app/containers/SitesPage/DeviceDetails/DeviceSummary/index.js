/*
 * Device general view, offering a side bar to filter and right panel to show card results
 *
 */

import { makeStyles } from '@material-ui/core';
import DeviceCard from 'Components/DeviceCard';
import Paginator from 'Components/Paginator';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import {
  getDevicesBySiteId,
  updateDeviceTabsDisabled,
} from 'Store/Devices/actions';
import { setSiteEventFilters } from 'Store/Sites/actions';
import { Colors } from 'Theme';
import { SiteTypes } from 'Utils/enums/siteTypes';
import { DeviceListTypeName } from 'Utils/enums/device';
import { getValueIfExists, propertyExist } from 'Utils/propertyValidation';
import GenericModalConfirmation from 'Components/GenericModalConfirmation';
import messages from './messages';
import * as unsavedMessages from '../../messages';

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: Colors.white,
    width: '574px',
  },
  separator: {
    borderTop: `solid 2px ${Colors.mercury}`,
    margin: '0px 16px',
  },

  content: {
    padding: '24px 16px',
  },
  informationWrapper: {
    fontSize: '14px',
    marginBottom: '31px',
    '& > div': {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '22px',
    },
  },
});

/**
 * DeviceSummary It will provide a summary based on the input info
 * @param {array} devicesList This will contains an array with all devices list
 * @param {object} eventsFilters filters to apply if needed on the devices list
 * @param {number} selectedGroupId Group Id to display get from the source
 * @param {number} selectedDeviceId Selected device id to work on
 * @param {function} setSiteEventFiltersDispatch To set event filters if they change
 * @param {any} intl To get formatMessage for i18n
 */
const DeviceSummary = (props) => {
  const { formatMessage } = props.intl;
  const {
    devicesList,
    siteTypeName,
    eventsFilters,
    selectedGroupId,
    selectedDeviceId,
    setSiteEventFiltersDispatch,
    devicesTabs,
    updateTabsDisabled,
  } = props;

  const classes = useStyles();
  const { deviceId: storedDeviceId } = eventsFilters || {};
  const currentDeviceId = storedDeviceId || selectedDeviceId;
  const confirmDialogModal = 'confirmDialogModal';

  const [currentIndex, setCurrentIndex] = React.useState(-1);
  const [openModal, setOpenModal] = React.useState(null);
  const [currentDevices, setCurrentDevices] = React.useState([]);
  const maxIndexPosition = currentDevices.length - 1;
  const groupsDeviceType = [
    DeviceListTypeName.Meters,
    DeviceListTypeName.Ats,
    DeviceListTypeName.Gid,
    DeviceListTypeName.LocalIO,
  ].map((group) => group.toUpperCase());

  /**
   * isLocationNeeded
   * It returns if location is needed based on site type (Ignition,XCAPE)
   * @returns boolean
   */
  const isLocationNeeded = () => siteTypeName !== SiteTypes.Xcape;

  /**
   * isCurrentElementAvailable It will say if this element exist.
   * @param {number} position to validate if element data is available
   * @returns {boolean}
   */
  const isCurrentElementAvailable = (position) =>
    position >= 0 && propertyExist(() => currentDevices[`${position}`]);

  /**
   * dispatchEventFilters it will set dispatch Event Filters
   * @param {number} position it has the position to get device Id
   * @return {void}
   */
  const dispatchEventFilters = (position) => {
    if (isCurrentElementAvailable(position)) {
      const { deviceId } = currentDevices[`${position}`];
      const { eventTypeId, groupId } = eventsFilters;
      setSiteEventFiltersDispatch({
        eventTypeId,
        groupId,
        deviceId,
      });
    }
  };

  /**
   * getElementFromDevices get element from Current Devices based on the selected position
   * @param {number} position get the current index on paginator to get the element on the array
   */
  const getElementFromDevices = (position) => {
    if (devicesTabs) {
      setOpenModal({
        modal: confirmDialogModal,
        isOpen: true,
      });
    } else if (propertyExist(() => position)) {
      setCurrentIndex(position);
      dispatchEventFilters(position);
    }
  };

  /**
   * initComponent Initialize the component with the first device to be displayed
   * and setup the init values for internal states
   */
  const initComponent = () => {
    let devices;
    // Validate if the selected group is from device types
    if (groupsDeviceType.indexOf(selectedGroupId) >= 0) {
      devices = [];
      devicesList.forEach((group) => {
        if (group.devices && group.devices.length > 0) {
          group.devices.forEach((device) => {
            if (
              device.deviceType &&
              device.deviceType.name === selectedGroupId
            ) {
              devices.push(device);
            }
          });
        }
      });
      // Sort alphanumeric all devices
      devices.sort((a, b) =>
        a.deviceName.localeCompare(b.deviceName, 'en', { numeric: true })
      );
    } else {
      devices = getValueIfExists(
        () =>
          devicesList.find(
            (deviceList) => deviceList.deviceGroupName === selectedGroupId
          ).devices,
        []
      );
    }
    setCurrentDevices(devices);

    let selectedDevice;
    if (currentDeviceId && !Number.isNaN(currentDeviceId)) {
      selectedDevice = devices.find(
        (device) => device.deviceId === currentDeviceId
      );
    }

    // Get current Index if found
    if (selectedDevice) {
      setCurrentIndex(devices.indexOf(selectedDevice));
    }
  };

  useEffect(() => {
    initComponent();
    dispatchEventFilters(currentIndex);
  }, []);

  useEffect(() => {
    initComponent();
    dispatchEventFilters(currentIndex);
  }, [devicesList]);

  const {
    deviceId,
    deviceName,
    lcmLocation,
    lcmRackNum,
    lcmPositionNum,
    make = '',
    model = '',
    deviceStatusId,
    gridStatus,
    firmwareVersion,
    serialNo,
    energyRating,
    uniqueIdentifier,
    componentName,
    deviceType = {},
    deviceGroupIdName,
  } = isCurrentElementAvailable(currentIndex)
    ? currentDevices[`${currentIndex}`]
    : {};

  /**
   * @method isModalOpen
   * Validates if a specific modal is open
   * or not to display or hide it.
   * @param {String} modal The name of the modal to validate
   * @return {void}
   */
  const isModalOpen = (modal) =>
    openModal && openModal.modal === modal && openModal.isOpen;

  /**
   * @method closeModal
   * Handle close modal event
   */
  const closeModal = () => {
    setOpenModal({
      modal: confirmDialogModal,
      isOpen: false,
    });
  };

  /**
   * @method submitSave
   * Handle submit save event from modal
   */
  const submitSave = () => {
    closeModal();
    updateTabsDisabled(false);
  };

  return (
    <>
      <div className={classes.wrapper} data-testid={`main-div-${deviceId}`}>
        <DeviceCard
          key={`device-card-${deviceId}`}
          deviceGroupId={selectedGroupId}
          deviceName={deviceName}
          deviceContainer={lcmLocation}
          deviceRack={lcmRackNum}
          devicePosition={lcmPositionNum}
          deviceEnergyRating={energyRating}
          deviceMake={`${make} ${model}`}
          deviceStatusId={deviceStatusId || 0}
          deviceGridStatus={gridStatus}
          deviceType={deviceType.name}
          componentName={componentName || ''}
          deviceGroupName={deviceGroupIdName || ''}
          isDeviceDetails
          isLocationNeeded={isLocationNeeded()}
        />
        <div className={classes.separator} />
        <div className={classes.content}>
          <div className={classes.informationWrapper}>
            {firmwareVersion && (
              <div>
                <div>{formatMessage(messages.firmVersion)}</div>
                <div>{firmwareVersion}</div>
              </div>
            )}
            {serialNo && (
              <div>
                <div>{formatMessage(messages.serialNumber)}</div>
                <div>{serialNo}</div>
              </div>
            )}
            {uniqueIdentifier && (
              <div>
                <div>{formatMessage(messages.uniqueIdentifier)}</div>
                <div>{uniqueIdentifier}</div>
              </div>
            )}
          </div>
          <Paginator
            startPosition={currentIndex}
            minPosition={0}
            maxPosition={maxIndexPosition}
            onPositionClick={getElementFromDevices}
          />
        </div>
      </div>
      <GenericModalConfirmation
        data-testid="content-devicesDetailsModal"
        titleMessage={formatMessage(
          unsavedMessages.default.busBand.unSavedChanges.title
        )}
        bodyMessage={formatMessage(
          unsavedMessages.default.busBand.unSavedChanges.body
        )}
        openModal={isModalOpen(confirmDialogModal)}
        saveLabelText={formatMessage(
          unsavedMessages.default.busBand.unSavedChanges.continueButton
        )}
        cancelLabelText={formatMessage(
          unsavedMessages.default.busBand.unSavedChanges.discardButton
        )}
        submitSave={submitSave}
        submitCancel={closeModal}
      />
    </>
  );
};

DeviceSummary.propTypes = {
  devicesList: PropTypes.array,
  siteTypeName: PropTypes.string,
  intl: PropTypes.any.isRequired,
  eventsFilters: PropTypes.object,
  selectedDeviceId: PropTypes.number,
  setSiteEventFiltersDispatch: PropTypes.func,
  selectedGroupId: PropTypes.string.isRequired,
  devicesTabs: PropTypes.bool,
  updateTabsDisabled: PropTypes.func,
};

/**
 * mapDispatchToProps
 * @param {Function} setSiteEventFiltersDispatch call setSiteEventFilters to set filters
 * @param {Function} getDevicesBySiteIdFetch call getDevicesBySiteId to get devices
 * @param {Function} updateTabsDisabled call updateDeviceTabsDisabled action to update device tabs disabled
 */
const mapDispatchToProps = (dispatch) => ({
  setSiteEventFiltersDispatch: (deviceFilters) =>
    dispatch(setSiteEventFilters(deviceFilters)),
  getDevicesBySiteIdFetch: (siteId) => dispatch(getDevicesBySiteId(siteId)),
  updateTabsDisabled: (status) => dispatch(updateDeviceTabsDisabled(status)),
});

/**
 * mapStateToProps
 * @param {Array} devicesList receives devices list from redux
 * @param {Object} eventsFilters receives filters from redux
 * @param {Boolean} devicesTabs receives devices.deviceTabsDisabled from redux
 */
const mapStateToProps = (state) => ({
  devicesList: state.devices.devicesList,
  eventsFilters: state.sites.site.eventsFilters,
  devicesTabs: state.devices.deviceTabsDisabled,
  siteTypeName: state.sites.site.siteType.name,
});
// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DeviceSummary)
);
/* eslint-enable */
