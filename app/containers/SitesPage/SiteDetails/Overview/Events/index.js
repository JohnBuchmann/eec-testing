/*
 * Site Events
 *
 * This contains Site Events
 */
import { makeStyles } from '@material-ui/core';
import Panel from 'Components/Panel';
import Select from 'Components/Select';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSiteEvents, setSiteEventFilters } from 'Store/Sites/actions';
import {
  getFilteredSiteEvents,
  getFilteredDeviceEvents,
} from 'Store/Sites/selectors';
import {
  fetchEventsExcelDownload,
  clearEventsExcelDownload,
  getDeviceEvents,
} from 'Store/Devices/actions';
import GenericModalConfirmation from 'Components/GenericModalConfirmation';
import { Colors } from 'Theme';
import { DeviceListTypeId } from 'Utils/enums/device';
import { SET_INTERVAL_PULLING_DATA } from 'Utils/enums/http';
import images from 'Assets/images';
import {
  SiteDeviceType,
  SiteEventOptions,
  SiteEventType,
} from 'Utils/enums/siteEvent';
import { getDefaultValueDropDown } from 'Utils/propertyHelpers';
import { getValueIfExists, propertyExist } from 'Utils/propertyValidation';
import ExportExcelModal from './exportExcelModal';
import messages from './messages';
import SiteEventItem from './SiteEventItem';

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: Colors.white,
    width: '574px',
  },
  actionBar: {
    display: 'flex',
    '& > div': {
      marginLeft: '8px',
    },
  },
  noRecords: {
    textAlign: 'center',
  },
  headerStyle: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '13px 16px',
  },
  contentStyle: {
    padding: '24px 16px',
    overflow: 'auto',
    height: '602px',
  },
  icon: {
    margin: '10px',
    cursor: 'pointer',
  },
});
/**
 * Variable to Group Id selected value and will use in "dispatchEventFilters"
 */
let groupIdSelected = DeviceListTypeId.All;
/**
 * Variable to Event type Id selected value and will use in "dispatchEventFilters"
 */
let eventTypeIdSelected = SiteEventType.AllEvents;

let deviceIdSelected = 0;

/**
 * SiteEvents creates the container to display all events with the ability to filter them
 * @param {number} deviceTypeId to specify different device default value rather than All
 * @param {number} eventTypeId to specify different event default value rather than All
 * @param {number} deviceGroupId to specify device group scope, device filter will be hidden if this is available
 * @param {any} props Contains i18n (internationalization) properties
 */
const SiteEvents = (props = {}) => {
  const { formatMessage } = props.intl;
  const {
    eventTypeId = SiteEventType.AllEvents,
    groupId = DeviceListTypeId.All,
    isDeviceGroupFilterRequired = true,
    getSiteEventsDispatch,
    setSiteEventFiltersDispatch,
    deviceEvents,
    siteEvents,
    eventsFilters,
    getDeviceEventsExcelDownload,
    getDeviceEventsDispatch,
    downloadExcel,
    clearExcelDownload,
  } = props;
  const classes = useStyles();
  const downloadMessages = getValueIfExists(() => messages.downloadExcel, {});
  const deviceStatusTitle = formatMessage(messages.title);
  const excelAlt = formatMessage(messages.excelAlt);
  const [selectedEventTypeId, setSelectedEventTypeId] = React.useState(
    eventTypeId
  );
  const [selectedDeviceTypeId, setSelectedDeviceTypeId] = React.useState(
    groupId
  );
  const [filteredSiteEvents, setFilteredSiteEvents] = React.useState([]);
  const { siteId, deviceId: deviceIdParam } = useParams();
  const [openModal, setOpenModal] = React.useState(false);
  const exportExcelModal = 'exportExcelModal';
  const confirmDialogModal = 'confirmDialogModal';
  const { deviceId } = eventsFilters;
  deviceIdSelected = deviceId;

  /**
   * eventDropdownChange set EventTypeId coming from dropdown selection
   * @param {number} newEventTypeId
   */
  const eventDropdownChange = (newEventTypeId) => {
    if (propertyExist(() => newEventTypeId)) {
      setSelectedEventTypeId(newEventTypeId);
      eventTypeIdSelected = newEventTypeId;
    }
  };

  /**
   * deviceDropdownChange set DeviceTypeId coming from dropdown selection
   * @param {number} newDeviceTypeId
   */
  const deviceDropdownChange = (newDeviceTypeId) => {
    if (propertyExist(() => newDeviceTypeId)) {
      setSelectedDeviceTypeId(newDeviceTypeId);
      groupIdSelected = newDeviceTypeId;
    }
  };

  /**
   * dispatchEventFilters It will set event filters including deviceId from the current filters
   * @return {void}
   */
  const dispatchEventFilters = () => {
    setSiteEventFiltersDispatch({
      eventTypeId: eventTypeIdSelected,
      deviceId: isDeviceGroupFilterRequired ? 0 : deviceIdSelected,
      groupId: groupIdSelected,
    });
  };

  /**
   * @method isModalOpen
   * Validates if a specific modal is open
   * or not to display or hide it.
   * @param {String} modal The name of the modal to validate
   * @return {void}
   */
  const isModalOpen = (modal) =>
    openModal && openModal.isOpen && openModal.modal === modal;

  /**
   * @method closeExportModal
   * Close modal export excel
   */
  const closeExportModal = () =>
    setOpenModal({
      modal: exportExcelModal,
      isOpen: false,
    });

  /**
   * @method cancelModal
   * Handle cancel modal event and close modal
   */
  const cancelModal = () => closeExportModal();

  /**
   * @method submitModal
   * Handle submit modal event, call function getDeviceEventsExcelDownload and close modal
   * @param {date} rangeFrom receives range from date
   * @param {date} rangeTo receives rage to date
   */
  const submitModal = (rangeFrom, rangeTo) => {
    getDeviceEventsExcelDownload(rangeFrom, rangeTo, deviceIdParam);
    closeExportModal();
  };

  /**
   * @method downloadClickEvent
   * Handle click event on download excel button and open modal export excel
   */
  const downloadClickEvent = () =>
    setOpenModal({
      modal: exportExcelModal,
      isOpen: true,
    });

  /**
   * @method submitCompleteClickEvent
   * Handle click event on submit button to complete download modal and close open modal
   */
  const submitCompleteClickEvent = () =>
    setOpenModal({
      modal: confirmDialogModal,
      isOpen: false,
    });

  /**
   * @method openCompleteDialog
   * Handle to open download complete modal
   */
  const openCompleteDialog = () =>
    setOpenModal({
      modal: confirmDialogModal,
      isOpen: true,
    });

  /**
   * @method getEventsDispatch
   * Handle get events to dispatch, if have device ID param should call getDeviceEventsDispatch,
   * else should call getSiteEventsDispatch and dispatch event filters with function dispatchEventFilters
   */
  const getEventsDispatch = () => {
    if (deviceIdParam) {
      getDeviceEventsDispatch(deviceIdParam);
    } else {
      const isRefreshing = true;
      getSiteEventsDispatch(siteId, isRefreshing);
    }
    dispatchEventFilters();
  };

  // Apply filter after updating selectedDeviceTypeId or selectedEventTypeId
  React.useEffect(() => {
    dispatchEventFilters();
  }, [selectedDeviceTypeId, selectedEventTypeId]);

  React.useEffect(() => {
    if (!deviceIdParam) {
      setFilteredSiteEvents(siteEvents);
    }
  }, [siteEvents]);

  React.useEffect(() => {
    if (deviceIdParam) {
      setFilteredSiteEvents(deviceEvents);
    }
  }, [deviceEvents]);

  React.useEffect(() => {
    if (downloadExcel) {
      openCompleteDialog();
      clearExcelDownload();
    }
  }, [downloadExcel]);

  React.useEffect(() => {
    getEventsDispatch();
    // Disabling set Intervals as Codacy does not know how to handle them.
    /* eslint-disable */
    const interval = setInterval(() => {
      getEventsDispatch();
    }, SET_INTERVAL_PULLING_DATA);
    return () => {
      groupIdSelected = DeviceListTypeId.All;
      eventTypeIdSelected = SiteEventType.AllEvents;
      clearInterval(interval);
    };
    /* eslint-enable */
  }, []);

  // Getting Site Event Options
  const selectDataEvent = SiteEventOptions;
  let defaultValue = getDefaultValueDropDown(
    selectDataEvent,
    selectedEventTypeId
  );
  const selectedObjectEvent = { value: defaultValue };

  // Getting Site Event Options
  const selectDataDevice = SiteDeviceType;
  defaultValue = getDefaultValueDropDown(
    selectDataDevice,
    selectedDeviceTypeId
  );
  const selectedObjectDevice = { value: defaultValue };

  // Creates actions bar
  const actionsBar = (
    <div className={classes.actionBar}>
      <Select
        data-testid="event-dropdown"
        selectData={selectDataEvent}
        selectedObject={selectedObjectEvent}
        onChange={eventDropdownChange}
      />
      {isDeviceGroupFilterRequired && (
        <Select
          data-testid="device-dropdown"
          selectData={selectDataDevice}
          selectedObject={selectedObjectDevice}
          onChange={deviceDropdownChange}
        />
      )}
      {deviceIdParam && (
        <div
          data-testid="downloadExcel"
          onClick={downloadClickEvent}
          onKeyDown={downloadClickEvent}
          role="button"
          tabIndex="0"
          alt={excelAlt}
        >
          <img
            src={images.downloadExcel}
            alt={excelAlt}
            className={classes.icon}
          />
        </div>
      )}
    </div>
  );

  // Creates list of event to display using SiteEventItem component
  const displayData = getValueIfExists(() => filteredSiteEvents.length) > 0;
  const contentBody = (
    <>
      {displayData &&
        filteredSiteEvents.map((siteEvent) => (
          <SiteEventItem
            key={`${siteEvent.deviceId}${Math.random(0, 30)}`}
            eventItemRibbon={siteEvent}
          />
        ))}
      {!displayData && (
        <div className={classes.noRecords}>
          {formatMessage(messages.siteEventsNotAvailable)}
        </div>
      )}
    </>
  );
  return (
    <>
      <div className={classes.wrapper}>
        <Panel
          title={deviceStatusTitle}
          headerStyle={classes.headerStyle}
          actions={actionsBar}
          content={contentBody}
          contentStyle={classes.contentStyle}
        />
      </div>
      <ExportExcelModal
        data-testid="downloadExcelModal"
        openModal={isModalOpen(exportExcelModal)}
        discardDialog={cancelModal}
        continueDialog={submitModal}
      />
      {isModalOpen(confirmDialogModal) && (
        <GenericModalConfirmation
          data-testid="content-completeDownloadModal"
          titleMessage={formatMessage(downloadMessages.title)}
          bodyMessage={formatMessage(downloadMessages.downloadCompleteBody)}
          openModal={isModalOpen(confirmDialogModal)}
          saveLabelText={formatMessage(
            downloadMessages.downloadCompleteContinueButton
          )}
          submitSave={submitCompleteClickEvent}
          showCancel={false}
        />
      )}
    </>
  );
};

SiteEvents.propTypes = {
  eventTypeId: PropTypes.number,
  groupId: PropTypes.number,
  isDeviceGroupFilterRequired: PropTypes.bool,
  intl: PropTypes.any.isRequired,
  eventsFilters: PropTypes.object,
  siteEvents: PropTypes.array,
  getSiteEventsDispatch: PropTypes.func,
  setSiteEventFiltersDispatch: PropTypes.func,
  getDeviceEventsExcelDownload: PropTypes.func,
  clearExcelDownload: PropTypes.func,
  getDeviceEventsDispatch: PropTypes.func,
  downloadExcel: PropTypes.bool,
  deviceEvents: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => ({
  getSiteEventsDispatch: (siteId, isRefreshing) =>
    dispatch(getSiteEvents(siteId, isRefreshing)),
  setSiteEventFiltersDispatch: (eventFilters) =>
    dispatch(setSiteEventFilters(eventFilters)),
  getDeviceEventsExcelDownload: (rangeFrom, rangeTo, deviceId) =>
    dispatch(fetchEventsExcelDownload(rangeFrom, rangeTo, deviceId)),
  clearExcelDownload: () => dispatch(clearEventsExcelDownload()),
  getDeviceEventsDispatch: (deviceId) => dispatch(getDeviceEvents(deviceId)),
});

const mapStateToProps = (state) => ({
  eventsFilters: state.sites.site.eventsFilters,
  siteEvents: getFilteredSiteEvents(state),
  deviceEvents: getFilteredDeviceEvents(state),
  downloadExcel: state.devices.eventsDownloadExcel,
});
// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default injectIntl(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SiteEvents)
);
/* eslint-enable */
