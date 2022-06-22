/*
 * Layout Component
 *
 * This contains layout
 */
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import AppBarComponent from 'Components/AppBar';
import Loader from 'Components/Loader';
import Toaster from 'Components/Toaster';
import TermsAndConditionsPage from 'Containers/Launch/Login/Legal/TermsAndConditions/Loadable';
import NoRoleModal from 'Containers/Launch/Login/NoRoleModal';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  getAllNotifications,
  patchNotificationDismiss,
} from 'Store/Notification/actions';
import {
  setSiteFiltersByAssignedUser,
  setSiteEventFilters,
} from 'Store/Sites/actions';
import { SET_INTERVAL_PULLING_DATA } from 'Utils/enums/http';
import {
  getUserPolicy,
  postUserSessionLogoutEvent,
  storeUser,
  getUserRoleConfig,
  getUserAppConfig,
  setUserPermissions,
} from 'Store/User/actions';
import { getDevicesBySiteId, getDeviceEvents } from 'Store/Devices/actions';
import {
  getTermsAndConditions,
  getUser,
  getUserAvatar,
  getUserRoles,
  isUserAuthenticated,
  oktaAuthClient,
  getFirstName,
  getLastName,
  getSessionType,
} from 'System/auth';
import { FeatTheme } from 'Theme';
import history from 'Utils/history';
import { isFaithAccount, userHasApplicationAccess } from 'Utils/roles';
import { getValueIfExists, propertyExist } from 'Utils/propertyValidation';
import { DeviceListTypeId } from 'Utils/enums/device';
import {
  getAllowLiveSiteWriteBack,
  getConfigPermissions,
} from '../../config/appSettings';
import packageJson from '../../../package.json';
import GlobalStyle from '../../globalStyle';
import NavigationDrawer from '../NavigationDrawer';
import LogoutModal from './logoutModal';
import { SiteEventType } from '../../utils/enums/siteEvent';

/**
 * Layout
 * @param {bool} main Is main layout
 * @param {bool} auth Is auth layout
 * @param {*} content Layout content
 */
const Layout = (props) => {
  const {
    main = false,
    auth = false,
    content = '',
    notifications,
    app,
    devicesList,
    setNotificationsDismiss,
    getNotifications,
    getAllDevicesBySiteId,
    user,
    policy,
    getUserPolicyTerms,
    setStoreUser,
    userSessionEventDispatch,
    cleanAssignedUser,
    setUserRoleConfig,
    setUserAppConfig,
    config,
    updateUserPermissions,
    setSiteEventFiltersDispatch,
    getDeviceEventsDispatch,
  } = props;
  const { loading, toast } = app;
  const oktaAuth = oktaAuthClient;
  const defaultFaithUser = 'SSO';
  const [effectiveDate, setEffectiveDate] = React.useState('');
  const [pdfTermsAndConditions, setPdfTermsAndConditions] = React.useState(
    null
  );
  const [displayLegalAgreementModal, setDisplayLegalAgreement] = React.useState(
    false
  );
  const [displayNoRoleModal, setDisplayNoRoleModal] = React.useState(false);
  const [redirectToDeviceDetails, setRedirectToDeviceDetails] = React.useState({
    shouldRedirect: false,
  });

  const logoutModal = 'logoutModal';
  const DEVICE_REMOVED_ID = '6';

  /**
   * @property {Object} styles Stores the styles
   */
  const styles = {
    bodyWrapper: {
      display: 'flex',
      position: 'absolute',
      left: '82px',
      top: '56px',
      bottom: '0px',
      right: '0px',
    },
  };

  /**
   * @property {Object} defaultModalState
   * Stores the default state for modals.
   */
  const defaultModalState = {
    modal: '',
    isOpen: false,
  };
  const [openModal, setOpenModal] = React.useState(defaultModalState);

  /**
   * Signs out the user
   */
  const logout = () => {
    userSessionEventDispatch();
    oktaAuth.signOut();
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
   * @method openLogoutConfirmationModal
   * Opens the logout confirmation dialog
   * @return {void}
   */
  const openLogoutConfirmationModal = () => {
    setOpenModal({
      modal: logoutModal,
      isOpen: true,
    });
  };

  /**
   * @method closeLogoutConfirmationModal
   * Closes the logout confirmation dialog
   * @return {void}
   */
  const closeLogoutConfirmationModal = () => {
    setOpenModal({
      modal: logoutModal,
      isOpen: false,
    });
  };

  /**
   * @method submitLogoutConfirmationModal
   * Closes the modal and emits the event to logout the user.
   * @return {void}
   */
  const submitLogoutConfirmationModal = async () => {
    setOpenModal({
      modal: logoutModal,
      isOpen: false,
    });

    logout();
  };

  /**
   * checkUser
   * Validate if user is authenticated then get user information from Okta and store on Redux
   */
  const checkUser = async () => {
    if (isUserAuthenticated() && Object.keys(user).length === 0) {
      const roles = getUserRoles();
      const termsAndCondition = getTermsAndConditions();
      const avatar = getUserAvatar();
      const userData = await getUser();
      const userInfo = {
        ...userData,
        firstName: getFirstName(),
        lastName: getLastName(),
        sessionType: getSessionType(),
        roles,
        avatar,
        termsAndCondition,
      };
      setStoreUser(userInfo);
      setDisplayNoRoleModal(!userHasApplicationAccess(userInfo));
    }
  };

  /**
   * Handles User click on view Notification
   * @param {string} siteId site Id on the notification to redirect
   * @param {string} deviceGroupName Device name
   * @param {string} uniqueId
   * @param {string} subtype Notification type Id
   */
  const handleViewNotificationClick = (
    siteId,
    deviceGroupName,
    uniqueId,
    subtype
  ) => {
    cleanAssignedUser();
    if (deviceGroupName) {
      // fetch devices by site ID. needed to build the URL
      if (subtype === DEVICE_REMOVED_ID) {
        history.push(`/sites/${siteId}/details/Devices`);
        return 'goToDevices';
      }
      getAllDevicesBySiteId(siteId);
      setRedirectToDeviceDetails({
        shouldRedirect: true,
        siteId,
        deviceGroupName,
        uniqueId,
      });
      return 'goToDeviceDetails';
    }
    history.push(`/sites/${siteId}/details/Overview`);
    return 'goToOverview';
  };

  React.useEffect(() => {
    if (
      redirectToDeviceDetails.shouldRedirect &&
      getValueIfExists(() => devicesList.length, 0) > 0
    ) {
      const { siteId, deviceGroupName, uniqueId } = redirectToDeviceDetails;
      let selectedDeviceId = '';
      const compatibleDevices = devicesList.filter(
        (deviceObj) =>
          deviceObj.deviceGroupName.toUpperCase() ===
          deviceGroupName.toUpperCase()
      );
      if (getValueIfExists(() => compatibleDevices[0].devices.length, 0) > 1) {
        selectedDeviceId =
          compatibleDevices[0].devices.find(
            (device) => device.uniqueIdentifier === uniqueId
          ).deviceId || '';
      } else {
        selectedDeviceId = compatibleDevices[0].devices[0].deviceId;
      }
      if (selectedDeviceId) {
        setSiteEventFiltersDispatch({
          eventTypeId: SiteEventType.AllEvents,
          groupId: DeviceListTypeId.All,
          deviceId: selectedDeviceId,
        });
        getDeviceEventsDispatch(selectedDeviceId);

        history.push(
          `/sites/${siteId}/group/${deviceGroupName.toUpperCase()}/device/${selectedDeviceId}/details`
        );
      } else {
        history.push(`/sites/${siteId}/details/Overview`);
      }
      setRedirectToDeviceDetails({
        shouldRedirect: false,
      });
    }
  }, [devicesList]);

  /**
   * Handles User click dismiss Notification
   * @param {string} notificationId Notification Id
   */
  const handleDismissNotificationClick = (notificationId) => {
    // eslint-disable-next-line
    console.log('handleDismissNotificationClick');
    setNotificationsDismiss([notificationId], notifications);
  };

  /**
   * Handles User click on dismiss all Notifications
   */
  const handleDismissAllNotificationClick = () => {
    // eslint-disable-next-line
    console.log('handleDismissAllNotificationClick');
    const notificationsId = [
      ...notifications.map((notification) => notification.id),
    ];
    setNotificationsDismiss(notificationsId, notifications);
  };

  /**
   * pull notifications after mount.
   */
  React.useEffect(() => {
    getNotifications();
    checkUser();
    setUserRoleConfig(user);
    setUserAppConfig();
    // Disabling set Intervals as Codacy does not know how to handle them.
    /* eslint-disable */
    const interval = setInterval(() => {
      getNotifications();
    }, SET_INTERVAL_PULLING_DATA);
    return () => clearInterval(interval);
    /* eslint-enable */
  }, []);

  React.useEffect(() => {
    if (
      propertyExist(() => user.role) &&
      config &&
      Object.keys(config).length > 0
    ) {
      const allowConfigValue = getAllowLiveSiteWriteBack(config);
      const permissions = getConfigPermissions(allowConfigValue, user.role);
      updateUserPermissions(permissions);
    }
    if (propertyExist(() => user.termsAndCondition)) {
      getUserPolicyTerms();
    }
  }, [user, config]);

  React.useEffect(() => {
    if (propertyExist(() => policy.consentEffectiveDate)) {
      const sessionType = getValueIfExists(() => user.sessionType, '');
      if (
        policy.consentEffectiveDate !== user.termsAndCondition &&
        sessionType !== defaultFaithUser
      ) {
        const pdf = `data:application/pdf;base64,${policy.document}`;
        setEffectiveDate(policy.consentEffectiveDate);
        setPdfTermsAndConditions(pdf);

        setDisplayLegalAgreement(true);
      } else {
        setDisplayLegalAgreement(false);
      }
    }
  }, [policy]);

  return (
    <>
      <Loader open={loading} />
      <Toaster toastOptions={toast} />
      {auth && !displayLegalAgreementModal && (
        <div data-testid="content-app-theme">
          <StylesProvider injectFirst>
            <MuiThemeProvider theme={FeatTheme}>
              {content}
              <GlobalStyle />
            </MuiThemeProvider>
          </StylesProvider>
        </div>
      )}
      {main && !displayLegalAgreementModal && (
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={FeatTheme}>
            <AppBarComponent
              user={user}
              data-testid="content-app-bar"
              notifications={notifications}
              onViewNotificationClick={handleViewNotificationClick}
              onLogoutClick={openLogoutConfirmationModal}
              onDismissClick={handleDismissNotificationClick}
              onDismissAllClick={handleDismissAllNotificationClick}
            />
            <NavigationDrawer
              version={packageJson.version}
              data-testid="content-app-navigation"
            />
            <div style={styles.bodyWrapper} data-testid="content-app-container">
              {content}
              <GlobalStyle />
            </div>
          </MuiThemeProvider>
        </StylesProvider>
      )}

      {displayLegalAgreementModal && (
        <TermsAndConditionsPage
          data-testid="content-terms-conditions"
          openModal={displayLegalAgreementModal}
          pdfFile={pdfTermsAndConditions}
          effectiveDate={effectiveDate}
        />
      )}

      {displayNoRoleModal && (
        <NoRoleModal
          openModal={displayNoRoleModal}
          isFaithAccount={isFaithAccount(user)}
          acceptActionHandler={logout}
        />
      )}
      {isModalOpen(logoutModal) && (
        <LogoutModal
          data-testid="content-logout-modal"
          openModal={isModalOpen(logoutModal)}
          closeLogoutConfirmationModal={closeLogoutConfirmationModal}
          submitLogoutConfirmationModal={submitLogoutConfirmationModal}
        />
      )}
    </>
  );
};

Layout.propTypes = {
  main: PropTypes.bool,
  app: PropTypes.object,
  user: PropTypes.object,
  policy: PropTypes.object,
  auth: PropTypes.bool,
  devicesList: PropTypes.array,
  content: PropTypes.object,
  notifications: PropTypes.array,
  getNotifications: PropTypes.func,
  cleanAssignedUser: PropTypes.func.isRequired,
  setNotificationsDismiss: PropTypes.func,
  setStoreUser: PropTypes.func,
  getUserPolicyTerms: PropTypes.func,
  getAllDevicesBySiteId: PropTypes.func,
  userSessionEventDispatch: PropTypes.func,
  setUserRoleConfig: PropTypes.func,
  setUserAppConfig: PropTypes.func,
  config: PropTypes.object,
  updateUserPermissions: PropTypes.func,
  setSiteEventFiltersDispatch: PropTypes.func,
  getDeviceEventsDispatch: PropTypes.func,
};

/**
 * mapStateToProps map redux inputs
 * @param {Object} state receives state with notifications reducer from redux
 */
const mapStateToProps = (state) => {
  const { notifications } = state.notification;
  const { user, policy, config } = state.user;
  const { devicesList } = state.devices;
  const { app } = state;
  return { app, devicesList, notifications, user, policy, config };
};

/**
 * mapDispatchToProps
 * @param {Function} setStoreUser call storeUser action and save user info
 * @param {Function} getNotifications call getAllNotifications action and get all notifications items
 * @param {Function} setNotificationsDismiss call patchNotificationDismiss to dismiss a group of notifications
 * @param {Function} getUserPolicyTerms call getUserPolicy action and get policy data
 */
const mapDispatchToProps = (dispatch) => ({
  setStoreUser: (user) => dispatch(storeUser(user)),
  getNotifications: () => dispatch(getAllNotifications()),
  getAllDevicesBySiteId: (site) => dispatch(getDevicesBySiteId(site)),
  setNotificationsDismiss: (notificationsId, notifications) =>
    dispatch(patchNotificationDismiss(notificationsId, notifications)),
  getUserPolicyTerms: () => dispatch(getUserPolicy()),
  userSessionEventDispatch: () => dispatch(postUserSessionLogoutEvent()),
  cleanAssignedUser: () => dispatch(setSiteFiltersByAssignedUser('')),
  setUserRoleConfig: (user) => dispatch(getUserRoleConfig(user)),
  setUserAppConfig: () => dispatch(getUserAppConfig()),
  setSiteEventFiltersDispatch: (deviceFilters) =>
    dispatch(setSiteEventFilters(deviceFilters)),
  getDeviceEventsDispatch: (deviceId) => dispatch(getDeviceEvents(deviceId)),
  updateUserPermissions: (permissions) =>
    dispatch(setUserPermissions(permissions)),
});

// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
/* eslint-enable */
