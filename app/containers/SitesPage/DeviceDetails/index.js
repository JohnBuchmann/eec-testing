/**
 * This is the container Device Details
 */

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Header from 'Components/Header';
import Layout from 'Components/Layout';
import TabsNavigationBar from 'Components/TabsNavigationBar';
import tabNames from 'Containers/SitesPage/SiteDetails/messages';
import { getValueIfExists } from 'Utils/propertyValidation';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  updateDeviceTabsDisabled,
  getDevicesBySiteId,
} from 'Store/Devices/actions';
import { getSiteInformation } from 'Store/Sites/actions';
import { getAllNotificationsSettings } from 'Store/Settings/actions';
import GenericModalConfirmation from 'Components/GenericModalConfirmation';
import { DeviceDetailsTabs } from 'Utils/enums/device';
import { SET_INTERVAL_PULLING_DATA } from 'Utils/enums/http';
import messages from './messages';
import SiteDeviceEvents from './SiteDeviceEvents';
import SiteDeviceStatus from './SiteDeviceStatus';

const styledContainer = makeStyles({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
});

/**
 * Device details navigation bar component
 * @param {*} props Contains i18n (internationalization) properties
 */
function DeviceDetailsNavigationBar(props) {
  const classes = styledContainer();
  const { formatMessage } = props.intl;
  const {
    site,
    devicesTabs,
    updateTabsDisabled,
    getAllSiteInformation,
    getNotificationsSettings,
    getAllDevicesBySiteId,
  } = props;
  const params = useParams();
  const { siteId } = params;
  const [openModal, setOpenModal] = React.useState(null);
  const [isRendered, setRendered] = React.useState(false);
  const eventTabName = formatMessage(tabNames.devicesTabTitle).replace(' ', '');
  const overviewTabName = formatMessage(tabNames.overviewTabTitle).replace(
    ' ',
    ''
  );
  const isSiteLive = getValueIfExists(() => site.live, false);
  const confirmDialogModal = 'confirmDialogModal';
  const breadcrumbs = [
    {
      id: 1,
      name: 'Sites',
      selected: false,
      link: '',
    },
    {
      id: 2,
      name: 'Site Details',
      selected: false,
      link: `sites/${siteId}/details/${overviewTabName}`,
    },
    {
      id: 2,
      name: 'Devices',
      selected: false,
      link: `sites/${siteId}/details/${eventTabName}`,
    },
    {
      id: 3,
      name: 'Device Details',
      selected: true,
      link: '',
    },
  ];

  const tabs = [
    {
      key: 1,
      title: formatMessage(messages.overviewTabTitle),
      content: <SiteDeviceStatus params={params} />,
    },
    {
      key: 2,
      title: formatMessage(messages.devicesTabTitle),
      content: <SiteDeviceEvents params={params} />,
    },
  ];

  useEffect(() => {
    getAllSiteInformation(siteId);
    getAllDevicesBySiteId(siteId);
    getNotificationsSettings();
    const isRefreshing = true;
    // Disabling set Intervals as Codacy does not know how to handle them.
    /* eslint-disable */
    const interval = setInterval(() => {
      getAllSiteInformation(siteId, isRefreshing);
    }, SET_INTERVAL_PULLING_DATA);
    const timeout = 300;
    setTimeout(() => {
      setRendered(true);
    }, timeout);
    return () => {
      updateTabsDisabled(false);
      clearInterval(interval);
      setRendered(false);
    };
    /* eslint-enable */
  }, []);

  const {
    externalId = formatMessage(messages.siteDetailsSiteId),
    name: siteName = formatMessage(messages.siteDetailsSiteName),
    location = { customer: {} },
  } = site || {};
  const { companyName = formatMessage(messages.siteDetailsCompanyName) } =
    location.customer || {};

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

  /**
   * @method handleClickTab
   * Handle click event to tab and validate if have devicesTabs to display
   * modal with unsaved changes alert
   */
  const handleClickTab = () => {
    if (devicesTabs) {
      setOpenModal({
        modal: confirmDialogModal,
        isOpen: true,
      });
    }
  };

  return (
    <Layout
      main
      content={
        <>
          <Box className={classes.container}>
            <Header
              siteDetails
              title={`${externalId} - ${siteName}`}
              subtitle1={`${companyName}`}
              breadcrumbs={breadcrumbs}
              isSiteLive={isSiteLive}
              isRendered={isRendered}
            />
            <TabsNavigationBar
              tabs={tabs}
              disabledTabs={devicesTabs}
              eventClickTab={handleClickTab}
              selectedTab={DeviceDetailsTabs.Status}
            />
          </Box>
          <GenericModalConfirmation
            data-testid="content-devicesDetailsModal"
            titleMessage={formatMessage(messages.unSavedChanges.title)}
            bodyMessage={formatMessage(messages.unSavedChanges.body)}
            openModal={isModalOpen(confirmDialogModal)}
            saveLabelText={formatMessage(
              messages.unSavedChanges.continueButton
            )}
            cancelLabelText={formatMessage(
              messages.unSavedChanges.discardButton
            )}
            submitSave={submitSave}
            submitCancel={closeModal}
          />
        </>
      }
    />
  );
}

DeviceDetailsNavigationBar.propTypes = {
  intl: PropTypes.any.isRequired,
  site: PropTypes.object,
  devicesTabs: PropTypes.bool,
  updateTabsDisabled: PropTypes.func,
  getAllSiteInformation: PropTypes.func,
  getNotificationsSettings: PropTypes.func,
  getAllDevicesBySiteId: PropTypes.func,
};

/**
 * mapStateToProps
 * @param {Object} permissions receives user.permissions from redux
 * @param {Object} siteType receives sites.site.siteType from redux
 * @param {Object} site receives sites.site from redux
 * @param {Boolean} devicesTabs receives devices.deviceTabsDisabled from redux
 */
const mapStateToProps = (state) => ({
  permissions: getValueIfExists(() => state.user.permissions, {}),
  siteType: state.sites.site.siteType,
  site: state.sites.site,
  devicesTabs: state.devices.deviceTabsDisabled,
});

/**
 * mapDispatchToProps
 * @param {Function} getAllSiteInformation call getSiteInformation action to get site information
 * @param {Function} updateTabsDisabled call updateDeviceTabsDisabled action to update device tabs disabled
 */
const mapDispatchToProps = (dispatch) => ({
  getAllSiteInformation: (site, isRefreshing) =>
    dispatch(getSiteInformation(site, isRefreshing)),
  getAllDevicesBySiteId: (site) => dispatch(getDevicesBySiteId(site)),
  updateTabsDisabled: (status) => dispatch(updateDeviceTabsDisabled(status)),
  getNotificationsSettings: () => dispatch(getAllNotificationsSettings()),
});

/* eslint-disable */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(DeviceDetailsNavigationBar));
/* eslint-enable */
