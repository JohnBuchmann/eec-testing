/*
 * Device Status
 *
 * This contains device status widget
 */
import { makeStyles } from '@material-ui/core';
import { LabelEdit } from 'Components/LabelEdit/LabelEdit';
import Panel from 'Components/Panel';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { temperatureUnitsLabel } from 'Utils/unitsOfMeasurement';
import history from 'Utils/history';
import {
  getAllDevicesPoints,
  updateNewDevicesValues,
  clearDevicesUpdated,
  updateDeviceTabsDisabled,
} from 'Store/Devices/actions';
import { getValueIfExists } from 'Utils/propertyValidation';
import { injectIntl } from 'react-intl';
import { Colors } from 'Theme';
import messages from '../messages';
import ConfirmDialogModal from './ConfirmDialogModal';

const useStyles = makeStyles({
  panel: {
    minWidth: '574px',
  },
  actionControl: {
    marginRight: '9px',
    marginLeft: '9px',
  },
  statusItem: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: '14px',
    justifyContent: 'space-between',
    position: 'relative',
    height: '38px',
  },
  saveButton: {
    '&.Mui-disabled': {
      color: `${Colors.silverSand} !important
      `,
    },
  },
  editButton: {
    '&:disabled': {
      color: `${Colors.silverSand} !important
      `,
      border: `1px solid ${Colors.silverSand} !important`,
      cursor: 'not-allowed !important',
    },
  },
});
/**
 * DeviceStatus creates the container to display
 * a property device status list and allows to modify them
 * @param {Object} eventsFilters  Filters to get current device Id
 * @param {Array} deviceStatusData  Current device status data from API
 * @param {Array} oldDeviceStatusData  Old device status data info
 * @param {Function} getDeviceStatusFetch  Required function to get device status info
 */
export const DeviceStatus = (props) => {
  const {
    eventsFilters,
    deviceStatusData,
    oldDeviceStatusData,
    getDeviceStatusFetch,
    devicesUpdated,
    clearDeviceUpdatedStatus,
    updateTabsDisabled,
    temperatureSettings,
  } = props;

  const { deviceId } = getValueIfExists(() => eventsFilters, {});
  const classes = useStyles();
  const deviceStatusTitle = 'STATUS';
  const [currentDeviceStatusData, setCurrentDeviceStatusData] = React.useState(
    deviceStatusData
  );
  const { formatMessage } = props.intl;
  const [openModal, setOpenModal] = React.useState(null);
  const [editMode, setEditMode] = React.useState(false);
  const [confirmMessages, setConfirmMessages] = React.useState({
    type: '',
    title: '',
    body: '',
    discardButton: '',
    continueButton: '',
  });
  const isChangedDefault = false;
  const [setIsChanged] = React.useState(isChangedDefault);
  const extraLabelEdit = true;

  const confirmDialogModal = 'confirmDialogModal';
  // Type confirm messages
  const typeConfirmMessages = {
    cancel: 'cancel-changes',
    successful: 'changes-successfull',
    cannotSave: 'cannot-save-changes',
    unsaved: 'unsaved-changes',
  };
  const operationFail = 'fail';

  /**
   * @method onChangeValue
   * Handle change value event from field
   * @param {string} newValue New value to assign
   * @param {object} deviceStatus Device Status Array
   */
  const onChangeValue = (newValue, deviceStatus) => {
    const index = currentDeviceStatusData.findIndex(
      (item) => item.id === deviceStatus.id
    );
    const temp = [...currentDeviceStatusData];
    const modified = { modified: true };
    temp[`${index}`] = { ...temp[`${index}`], value: newValue, ...modified };
    setCurrentDeviceStatusData(temp);
    setIsChanged(true);
  };

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
   * @method discardDialog
   * Handle discard event for Dialog
   */
  const discardDialog = () => {
    setOpenModal({
      modal: confirmDialogModal,
      isOpen: false,
    });
  };

  /**
   * @method continueDialog
   * Handle applying changes necessaries for Dialog
   */
  const continueDialog = () => {
    if (confirmMessages.type === typeConfirmMessages.cancel) {
      setEditMode(!editMode);
      setCurrentDeviceStatusData(deviceStatusData);
    }
    if (confirmMessages.type === typeConfirmMessages.unsaved) {
      const location = getValueIfExists(
        () => confirmMessages.location.pathname,
        ''
      );
      history.block(true);
      history.push(location);
    }
    setOpenModal({
      modal: confirmDialogModal,
      isOpen: false,
    });
    setIsChanged(isChangedDefault);
  };

  const isTemperatureData = (deviceStatus) => {
    const unit = getValueIfExists(() => deviceStatus.units, null);

    return (
      unit === temperatureUnitsLabel.Celsius ||
      unit === temperatureUnitsLabel.Farenheit
    );
  };

  useEffect(() => {
    updateTabsDisabled(false);
    history.block(true);
  }, [editMode]);

  useEffect(() => {
    if (deviceId) {
      getDeviceStatusFetch(deviceId);
      setEditMode(false);
    }
  }, [deviceId]);

  useEffect(() => {
    if (deviceStatusData) {
      const uniqId = 'Unique_ID';

      const deviceData = deviceStatusData.filter(
        (item) => item && getValueIfExists(() => item.name, null) !== uniqId
      );

      deviceData.sort((a, b) => (a.name > b.name ? 1 : -1));

      setCurrentDeviceStatusData(deviceData);
    }
  }, [deviceStatusData, temperatureSettings]);

  useEffect(() => {
    if (devicesUpdated) {
      if (devicesUpdated === operationFail) {
        setConfirmMessages({
          type: typeConfirmMessages.cannotSave,
          title: formatMessage(messages.cannotSaveChanges.title),
          body: formatMessage(messages.cannotSaveChanges.body),
          continueButton: formatMessage(
            messages.cannotSaveChanges.continueButton
          ),
        });
      } else {
        setConfirmMessages({
          type: typeConfirmMessages.successfull,
          title: formatMessage(messages.changesSuccessful.title),
          body: formatMessage(messages.changesSuccessful.body),
          discardButton: null,
          continueButton: formatMessage(
            messages.changesSuccessful.continueButton
          ),
        });
      }
      clearDeviceUpdatedStatus();
      getDeviceStatusFetch(deviceId);
      setOpenModal({
        modal: confirmDialogModal,
        isOpen: true,
      });
    }
  }, [devicesUpdated]);

  // Validate if can edit field
  const validateEditable = (access) => access.toLowerCase().indexOf('rw') === 0;
  // Validate if old Device Status have properties and return value
  const validateExistValue = (oldDevice) =>
    getValueIfExists(() => oldDevice.value, '');
  // Creates device property status list
  const contentBody = () => (
    <>
      {!!currentDeviceStatusData &&
        currentDeviceStatusData.map((deviceStatus, index) => (
          <div className={classes.statusItem} key={`${deviceStatus.id}-div`}>
            <div>{deviceStatus.label}</div>
            <LabelEdit
              key={`${deviceStatus.id + index}`}
              editMode={editMode}
              isEditable={validateEditable(deviceStatus.access)}
              value={deviceStatus.value}
              oldValue={validateExistValue(oldDeviceStatusData[`${index}`])}
              type={deviceStatus.type}
              units={deviceStatus.units}
              isTemperature={isTemperatureData(deviceStatus)}
              temperatureSettings={temperatureSettings}
              onChange={(newValue) => onChangeValue(newValue, deviceStatus)}
              displayOldValueWhenEdit={extraLabelEdit}
            />
          </div>
        ))}
    </>
  );
  return (
    <>
      <div className={classes.panel}>
        <Panel title={deviceStatusTitle} content={contentBody()} />
      </div>
      <ConfirmDialogModal
        data-testid="content-confirmDialogModal"
        openModal={isModalOpen(confirmDialogModal)}
        discardDialog={discardDialog}
        continueDialog={continueDialog}
        title={confirmMessages.title}
        body={confirmMessages.body}
        discardButton={confirmMessages.discardButton}
        continueButton={confirmMessages.continueButton}
      />
    </>
  );
};

DeviceStatus.propTypes = {
  intl: PropTypes.any.isRequired,
  eventsFilters: PropTypes.object,
  deviceStatusData: PropTypes.array,
  oldDeviceStatusData: PropTypes.array,
  devicesUpdated: PropTypes.bool,
  getDeviceStatusFetch: PropTypes.func.isRequired,
  clearDeviceUpdatedStatus: PropTypes.func,
  updateTabsDisabled: PropTypes.func,
  temperatureSettings: PropTypes.object,
};
/**
 * mapStateToProps
 * @param {Object} permissions receives permissions from user
 * @param {Object} eventsFilters receives event filters
 * @param {Object} siteType receives site Type from site details
 * @param {Array} deviceStatusData receives array of device status fields
 * @param {Array} oldDeviceStatusData receives array of previous device status
 * @param {Boolean} devicesUpdated receives boolean value from devicesUpdated
 */
const mapStateToProps = (state) => ({
  permissions: getValueIfExists(() => state.user.permissions, {}),
  eventsFilters: getValueIfExists(() => state.sites.site.eventsFilters, {}),
  siteType: getValueIfExists(() => state.sites.site.siteType, {}),
  deviceStatusData: getValueIfExists(() => state.devices.deviceStatus, {}),
  oldDeviceStatusData: getValueIfExists(
    () => state.devices.oldDeviceStatus,
    {}
  ),
  devicesUpdated: getValueIfExists(() => state.devices.devicesUpdated, {}),
  temperatureSettings: getValueIfExists(
    () => state.settings.notifications.unitMeasurement,
    {}
  ),
  isSiteLive: getValueIfExists(() => state.sites.site.live, false),
  siteAccount: getValueIfExists(() => state.sites.site.account, ''),
});

/**
 * mapDispatchToProps
 * @param {Function} getDeviceStatusFetch call getDeviceStatus action to get device status
 * @param {Function} setNewDeviceStatusDispatch call setNewDeviceStatusInfo action to set saved device states
 * @param {Function} clearDeviceUpdatedStatus call clearDevicesUpdated action to clear device updated state
 * @param {Function} updateTabsDisabled call updateDeviceTabsDisabled action to update device tabs disabled state
 */
const mapDispatchToProps = (dispatch) => ({
  getDeviceStatusFetch: (deviceId) => dispatch(getAllDevicesPoints(deviceId)),
  setNewDeviceStatusDispatch: (deviceStatus, deviceId) =>
    dispatch(updateNewDevicesValues(deviceStatus, deviceId)),
  clearDeviceUpdatedStatus: () => dispatch(clearDevicesUpdated()),
  updateTabsDisabled: (status) => dispatch(updateDeviceTabsDisabled(status)),
});
// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(DeviceStatus));
/* eslint-enable */
