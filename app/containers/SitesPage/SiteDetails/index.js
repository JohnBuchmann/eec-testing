/**
 *
 * Site details navigation bar
 *
 */

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from 'Theme';
import Header from 'Components/Header';
import Layout from 'Components/Layout';
import TabsNavigationBar from 'Components/TabsNavigationBar';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getSiteInformation,
  updateBusBandTabsDisabled,
  getTariffStructure,
} from 'Store/Sites/actions';
import { SiteTypesId } from 'Utils/enums/siteTypes';
import { getValueIfExists } from 'Utils/propertyValidation';
import GenericModalConfirmation from 'Components/GenericModalConfirmation';
import { getSiteDetailsTabs } from 'Utils/roles';
import { configSiteType } from 'Utils/enums/config';
import AuditLog from './AuditLog/Loadable';
import BusBand from './BusBand';
import DevicesList from './Devices';
import messages from './messages';
import * as unsavedMessages from '../messages';
import Overview from './Overview';
import Reports from './Reports';
import SiteAdmin from './SiteAdmin';

const styledContainer = makeStyles({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  clickableLink: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: Colors.mountainMeadow,
  },
});

/**
 * Site details navigation bar component
 * @param {*} props Contains i18n (internationalization) properties
 */
function SiteDetailsNavigationBar(props) {
  const {
    permissions = {},
    history = {},
    site = {},
    isBusbandTabDisabled = false,
    fetchSiteInfo,
    fetchTariffStructure,
    updateBusBandTabsState,
    isSiteLive = false,
  } = props;
  const { formatMessage } = props.intl;
  const classes = styledContainer();
  const siteIdIndexPosition = 2;
  const [siteDetailTabs, setSiteDetailTabs] = React.useState([]);
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(-1);
  const [isRendered, setRendered] = React.useState(false);

  const { siteId, tabName } = useParams();
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
      selected: true,
      link: '',
    },
  ];

  const tabs = [
    {
      key: 1,
      title: formatMessage(messages.overviewTabTitle),
      content: <Overview />,
    },
    {
      key: 2,
      title: formatMessage(messages.devicesTabTitle),
      content: <DevicesList history={history} />,
    },
    {
      key: 3,
      title: formatMessage(messages.reportsTabTitle),
      content: <Reports />,
    },
    {
      key: 4,
      title: formatMessage(messages.auditLogTabTitle),
      content: <AuditLog />,
    },
    {
      key: 6,
      title: formatMessage(messages.siteAdminTabTitle),
      content: <SiteAdmin />,
    },
  ];

  useEffect(() => {
    const siteType = getValueIfExists(() => site.siteType);

    if (siteType) {
      const { siteTypeId } = siteType;

      // Busband is displayed just for Ignition site type
      if (siteTypeId === SiteTypesId.Ignition) {
        tabs.push({
          key: 5,
          title: formatMessage(messages.busBandTabTitle),
          content: <BusBand />,
        });
        tabs.sort((leftTab, rightTab) => leftTab.key - rightTab.key);
      }
    }

    if (permissions && Object.keys(permissions).length > 0) {
      const permissionSiteType = isSiteLive
        ? configSiteType.Live
        : configSiteType.Emulated;
      const tabMenuOptions = getSiteDetailsTabs(
        permissions[`${permissionSiteType}`],
        tabs
      );
      setSiteDetailTabs(tabMenuOptions);

      // If Tab Name is available selected as default.
      const selectedTab = tabMenuOptions.find(
        (tab) => tab.title.replace(' ', '') === tabName
      );

      if (selectedTab) {
        const tabIndex = tabMenuOptions.indexOf(selectedTab) || 0;
        setSelectedTabIndex(tabIndex);
      }
    }

    if (
      getValueIfExists(() => site.name, '') !== '' &&
      getValueIfExists(() => site.externalId, 0) !== 0 &&
      !isRendered
    ) {
      /* eslint-disable */
      setTimeout(() => {
        setRendered(true);
      }, 300);
      /* eslint-enable */
    }
  }, [site, permissions]);

  useEffect(() => {
    fetchSiteInfo(siteId);
    // History listen when change location from outside (notifications-view) meanwhile
    // validate if site ID is different from the actual, if is 'true' load the new site information
    // and change the tap to first position 'Overview'
    const changeLocation = history.listen((location) => {
      const historySiteId = getValueIfExists(
        () =>
          location.pathname
            .split('/')
            .find((val, index) => index === siteIdIndexPosition),
        siteId
      );
      fetchSiteInfo(historySiteId);

      // If SiteDetails is loaded currently, set an invalid tab index
      // to be able to refresh the components inside
      setSelectedTabIndex(-1);
    });
    return () => {
      changeLocation();
      setRendered(false);
    };
  }, []);

  useEffect(() => {
    fetchTariffStructure(siteId);
  }, []);

  const {
    externalId = formatMessage(messages.siteDetailsSiteId),
    name: siteName = formatMessage(messages.siteDetailsSiteName),
    location = { customer: {} },
  } = site || {};
  /**
   * @property {Object} defaultModalState
   * Stores the default state for modals.
   */
  const defaultModalState = {
    modal: '',
    isOpen: false,
  };
  const [openModal, setOpenModal] = React.useState(defaultModalState);
  const confirmDialogModal = 'confirmDialogModal';
  const { companyName = formatMessage(messages.siteDetailsCompanyName) } =
    location.customer || {};
  const { area = formatMessage(messages.siteDetailsAreaName) } = location || {};
  const { locationName = formatMessage(messages.siteDetailsLocationName) } =
    location || {};
  //  siteheaders [] is defined to bind the subtitle data in header component
  const siteheaders = [
    {
      id: 1,
      name: `${companyName}`,
      selected: false,
      link: '',
    },
    {
      id: 2,
      name:
        `${area}` === 'null' || `${area}` === 'Not Defined' ? ' ' : `${area}`,
      selected: false,
      link: '',
    },
    {
      id: 3,
      name: `${locationName}`,
      selected: false,
      link: '',
    },
  ];
  const sitelistItems = siteheaders.map((siteitem, index) => (
    <td key={(siteitem.id, index)}>
      {(index && siteitem.name !== ' ' ? ', ' : '') + siteitem.name}
    </td>
  ));
  /**
   * @method changeTapEvent
   * Handle change tap event in tabs
   * @param {number} newValue receives index value
   */
  const changeTapEvent = (newValue) => {
    const titleHistory = getValueIfExists(
      () => siteDetailTabs[`${newValue}`].title.replace(' ', ''),
      ''
    );
    history.push(`/sites/${siteId}/details/${titleHistory}`);
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
    updateBusBandTabsState(false);
  };

  /**
   * @method handleClickTab
   * Handle click tab event to validate if isBusbandTabDisabled is true
   * and display conform dialog modal
   */
  const handleClickTab = () => {
    if (isBusbandTabDisabled) {
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
              siteheaders={sitelistItems}
              breadcrumbs={breadcrumbs}
              isSiteLive={isSiteLive}
              isRendered={isRendered}
            />
            <TabsNavigationBar
              tabs={siteDetailTabs}
              selectedTab={selectedTabIndex}
              eventChangeTab={changeTapEvent}
              disabledTabs={isBusbandTabDisabled}
              eventClickTab={handleClickTab}
            />
          </Box>
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
      }
    />
  );
}

SiteDetailsNavigationBar.propTypes = {
  permissions: PropTypes.object,
  intl: PropTypes.any.isRequired,
  history: PropTypes.object,
  fetchSiteInfo: PropTypes.func,
  site: PropTypes.object,
  isBusbandTabDisabled: PropTypes.bool,
  updateBusBandTabsState: PropTypes.func,
  isSiteLive: PropTypes.bool,
  fetchTariffStructure: PropTypes.func,
};

/**
 * mapStateToProps
 * @param {Object} permissions receives user.permissions from redux
 * @param {Object} siteType receives sites.site.siteType from redux
 * @param {Object} site receives sites.site from redux
 * @param {boolean} isBusbandTabDisabled receives sites.busBandTabsDisabled from redux
 */
const mapStateToProps = (state) => ({
  permissions: getValueIfExists(() => state.user.permissions, {}),
  site: getValueIfExists(() => state.sites.site, {}),
  isBusbandTabDisabled: getValueIfExists(
    () => state.sites.busBandTabsDisabled,
    false
  ),
  isSiteLive: getValueIfExists(() => state.sites.site.live, false),
});

/**
 * mapDispatchToProps
 * @param {Function} getAllSiteInformation call getSiteInformation action to get site information
 * @param {Function} updateTabsDisabled call updateDeviceTabsDisabled action to update device tabs disabled
 */
const mapDispatchToProps = (dispatch) => ({
  fetchSiteInfo: (siteId) => dispatch(getSiteInformation(siteId)),
  fetchTariffStructure: (siteId) => dispatch(getTariffStructure(siteId)),
  updateBusBandTabsState: (state) => dispatch(updateBusBandTabsDisabled(state)),
});

// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(SiteDetailsNavigationBar));
/* eslint-enable */
