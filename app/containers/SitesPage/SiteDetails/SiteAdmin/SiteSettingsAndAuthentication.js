/*
 * SiteSettingsAndAuthentication
 *
 * This is the component for site settings and authentication management panel
 *
 */
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import Button from 'Components/Button';
import GenericModalConfirmation from 'Components/GenericModalConfirmation';
import InputComponent from 'Components/Input';
import Panel from 'Components/Panel';
import Select from 'Components/Select';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import {
  getCACertificate,
  getTimeZones,
  updateCradlePoint,
  updateEdgeDataTimeout,
  updateSiteType,
  updateTimeZone,
  fetchUsernamePassword,
} from 'Store/Sites/actions';
import { Colors } from 'Theme';
import { regex } from 'Utils/enums/regularExpressions';
import { SiteTypes, SiteTypesId } from 'Utils/enums/siteTypes';
import {
  getValueIfExists,
  propertyExist,
  stringIsNullOrEmpty,
} from 'Utils/propertyValidation';
import {
  SiteDetailsCatalog,
  PermissionsList,
  TypeValidation,
  SiteAdminAccess,
} from 'Utils/enums/roles';
import ToolTipText from 'Components/ToolTipText';
import * as general from 'Utils/messages';
import { validatePermission } from 'Config/appSettings';
import messages from './messages';
import GenerateUsernamePasswordModal from './modals/GenerateUsernamePasswordModal';

/**
 * Declare UI styles
 */
const DEFAULT_EDGE_TIMEOUT = 5;
const useStyles = makeStyles({
  headerWrapper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 16px',
  },
  siteSettingsAndAuthenticationTitleContainer: {
    position: 'relative',
    display: 'inline-block',
    margin: '24px 16px 25px 16px',
  },
  siteSettingsAndAuthenticationTitle: {
    fontWeight: '600',
    fontSize: '14px',
    textTransform: 'uppercase',
  },
  selectTimeZoneAndSelectSiteTypeContainer: {
    marginBottom: '32px',
  },
  dropdownLabel: {
    marginTop: '12px',
    marginBottom: '12px',
  },
  subtitle: {
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  subtitleContainer: {
    marginBottom: '16px',
  },
  instructionsContainer: {
    marginBottom: '16px',
  },
  generateNewUsernamePasswordContainer: {
    marginBottom: '29px',
  },
  userPasswordContainer: {
    marginBottom: '16px',
  },
  showPasswordContainer: {
    marginBottom: '16px',
  },
  saveSettingsButton: {
    width: '160px',
    height: '40px',
    objectFit: 'contain',
    border: `1px solid ${Colors.mountainMeadow}`,
    textDecoration: 'none',
    marginLeft: '24px',
    '&:disabled': {
      color: `${Colors.silverSand} !important
      `,
      border: `1px solid ${Colors.silverSand} !important`,
    },
  },
  editSettingsButton: {
    width: '160px',
    height: '40px',
    objectFit: 'contain',
    border: `1px solid ${Colors.mountainMeadow}`,
    textDecoration: 'none',
    '&:disabled': {
      color: `${Colors.silverSand} !important
      `,
      border: `1px solid ${Colors.silverSand} !important`,
      cursor: 'not-allowed',
    },
  },
  capitalize: {
    textTransform: 'uppercase',
  },
  siteSettingsTitles: {
    float: 'right',
    marginTop: '15px',
  },
  downloadCA: {
    '&:disabled': {
      color: `${Colors.silverSand} !important
      `,
      cursor: 'not-allowed',
    },
  },
  generateNewPassword: {
    '&:disabled': {
      color: `${Colors.silverSand} !important
      `,
      cursor: 'not-allowed',
    },
  },
});

/**
 * Site settings and authentication component creates a panel
 */
const SiteSettingsAndAuthentication = (props) => {
  const classes = useStyles();
  const { formatMessage } = props.intl;
  // TODO: Query current change with site settings web service
  const {
    plcId = '',
    password = '',
    caCertificate = { url: '' },
    siteType = { name: '', siteTypeId: '' },
    getCACertificateFetch,
    siteId,
    fetchTimeZones,
    setTimeZone,
    timeZones,
    timeZone,
    setSiteType,
    routerId,
    setCradlePoint,
    setEdgeTimeout,
    savedEdgeTimeout,
    getUsernamePassword,
    isSiteLive,
    permissions,
    siteAccount,
  } = props;
  const defaultState = {
    cradlepoint: null,
    timeZoneSelected: {},
    siteTypeSelected: {},
    edgeTimeout: savedEdgeTimeout,
  };
  const defaultIsEdit = false;
  const { url: caCertificateUrl } = caCertificate;
  const [isEditFields, setIsEditFields] = React.useState(defaultIsEdit);
  const [editState, setEditState] = React.useState(false);
  const [currentUsername, setCurrentUsername] = React.useState(plcId);
  const [currentPassword, setCurrentPassword] = React.useState(password);
  const [siteSettingsStates, setSiteSettingsStates] = React.useState(
    defaultState
  );
  const [oldSettingsStates, setOldSettingsStates] = React.useState(
    defaultState
  );
  const usernamePasswordModal = 'generateUsernamePasswordModal';
  const siteSettingsModal = 'siteSettingsModal';
  const countryId = 'US';
  const [openModal, setOpenModal] = React.useState(null);
  const [isOutOfRangeModalOpen, setIsOutOfRangeModalOpen] = React.useState(
    false
  );
  const maxLengthInput = { maxLength: 8 };
  const maxLengthEdgeTimeout = { maxLength: 2 };
  const gridSizeEdgeData = editState ? 4 : 6;
  const { SiteSettingsModal: siteSettings } = messages;
  const selectSiteTypeData = [
    {
      value: SiteTypesId.Ignition,
      text: SiteTypes.Ignition,
    },
    {
      value: SiteTypesId.Xcape,
      text: SiteTypes.Xcape,
    },
  ];
  /**
   * Params to Permissions to Site Admin Edit
   */
  const paramsPermissionsSiteAdminEdit = {
    permissions,
    isSiteLive,
    section: getValueIfExists(() => PermissionsList.SiteDetails, ''),
    type: getValueIfExists(() => TypeValidation.Edit, ''),
    action: getValueIfExists(() => SiteDetailsCatalog.SiteAdmin, ''),
    siteAccount,
  };
  /**
   * Position for Tooltip
   */
  const tooltipPosition = 'right';
  /**
   * Validate Site Admin Edit Permission
   */
  const validationSiteAdminEdit = validatePermission(
    paramsPermissionsSiteAdminEdit
  );
  /**
   * Params to Permissions to Generate New Password
   */
  const paramsPermissionsGenerateNewPassword = {
    permissions,
    isSiteLive,
    section: getValueIfExists(() => PermissionsList.SiteAdmin, ''),
    type: getValueIfExists(() => TypeValidation.View, ''),
    action: getValueIfExists(() => SiteAdminAccess.NewPassword, ''),
    siteAccount,
  };
  /**
   * Handle which user can to generate a new password
   */
  const canUserGenerateNewPassword = validatePermission(
    paramsPermissionsGenerateNewPassword
  );
  /**
   * Params to Permissions to Download CA Certificate
   */
  const paramsPermissionsDownloadCertificate = {
    permissions,
    isSiteLive,
    section: getValueIfExists(() => PermissionsList.SiteAdmin, ''),
    type: getValueIfExists(() => TypeValidation.View, ''),
    action: getValueIfExists(() => SiteAdminAccess.CACertificate, ''),
    siteAccount,
  };
  /**
   * Validate to Download CA Certificate
   */
  const canUserDownloadCA = validatePermission(
    paramsPermissionsDownloadCertificate
  );
  /**
   * @method openDownloadCACertificate
   * Open new window to download CA certificate
   * @param {string} url CA Certificate URL
   */
  const openDownloadCACertificate = (url) => {
    if (!stringIsNullOrEmpty(url)) {
      // eslint-disable-next-line
      window.open(url, '_blank');
    }
  };

  /**
   * @method generateNewUsernameAndPassword
   * Gets a new username and password
   */
  const generateNewUsernameAndPassword = () => {
    setOpenModal({
      modal: usernamePasswordModal,
      isOpen: true,
    });
  };

  /**
   * @method downloadCACertificate
   * Download CA Certificate
   */
  const downloadCACertificate = () => {
    getCACertificateFetch(siteId);
  };

  /**
   * @method onSiteTypeChange
   * On site type id change
   * @param {integer} value selected value
   */
  const onSiteTypeChange = (value) => {
    const selectedElement = selectSiteTypeData.find(
      (item) => item.value === value
    );
    setSiteSettingsStates({
      ...siteSettingsStates,
      siteTypeSelected: { value: selectedElement.text, id: value },
    });
    setIsEditFields(true);
  };

  /**
   * @method timeZonesOptionsChange
   * Change event from dropdown time zones and update time zone states
   * @param {number} timeZoneId receives time zone ID from event change
   */
  const timeZonesOptionsChange = (timeZoneId) => {
    const timeZoneData = timeZones.find(
      (time) => time.timeZoneId === timeZoneId
    );
    setSiteSettingsStates({
      ...siteSettingsStates,
      timeZoneSelected: {
        ...timeZoneData,
        value: timeZoneData.timeZoneId,
        text: timeZoneData.name,
      },
    });
    setIsEditFields(true);
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
   * @method submitUsernamePasswordDialog
   * Call action setSiteType to generate new username and password
   */
  const submitUsernamePasswordDialog = () => {
    const { siteTypeSelected } = siteSettingsStates;
    getUsernamePassword(siteId, siteTypeSelected.id, siteTypeSelected.value);
  };

  /**
   * @method closetUsernamePasswordDialog
   * Closes the generate username password dialog
   */
  const closetUsernamePasswordDialog = () => {
    setOpenModal({
      modal: usernamePasswordModal,
      isOpen: false,
    });
  };

  /**
   * Updates user and password once values are received
   */
  useEffect(() => {
    setCurrentUsername(plcId);
    setCurrentPassword(password);
  }, [plcId, password]);

  /**
   * Open new window to download the CA certificate once a new value is received
   */
  useEffect(() => {
    openDownloadCACertificate(caCertificateUrl);
  }, [caCertificateUrl]);

  useEffect(() => {
    fetchTimeZones(countryId);
  }, []);

  useEffect(() => {
    if (timeZone) {
      const newTimeZone = {
        ...timeZone,
        value: timeZone.timeZoneId,
        text: timeZone.name,
      };
      setOldSettingsStates((prevState) => ({
        ...prevState,
        timeZoneSelected: newTimeZone,
      }));
      setSiteSettingsStates((prevState) => ({
        ...prevState,
        timeZoneSelected: newTimeZone,
      }));
    }
  }, [timeZone]);

  useEffect(() => {
    if (siteType) {
      const newSiteType = {
        value: siteType.name,
        id: siteType.siteTypeId,
      };
      setOldSettingsStates((prevState) => ({
        ...prevState,
        siteTypeSelected: newSiteType,
      }));
      setSiteSettingsStates((prevState) => ({
        ...prevState,
        siteTypeSelected: newSiteType,
      }));
    }
  }, [siteType]);

  useEffect(() => {
    if (routerId) {
      setOldSettingsStates((prevState) => ({
        ...prevState,
        cradlepoint: routerId,
      }));
      setSiteSettingsStates((prevState) => ({
        ...prevState,
        cradlepoint: routerId,
      }));
    }
  }, [routerId]);

  /**
   * @method onChangeCradlepoint
   * @param {object} e receives event from select change
   * Handle change event to input cradlepoint route ID
   */
  const onChangeCradlepoint = (e) => {
    const value = getValueIfExists(() => e.target.value, null);

    if (propertyExist(() => value)) {
      const { alphanumeric } = regex;
      const valuePoint = value.replace(alphanumeric, '');
      setSiteSettingsStates({
        ...siteSettingsStates,
        cradlepoint: valuePoint,
      });
      setIsEditFields(true);
    }
  };

  /**
   * @method onChangeEdgeTimeout
   * @param {object} e receives event from the input field
   * and updates the service using setIsEditFields() fn, if
   * the value is valid.
   */
  const onChangeEdgeTimeout = (e) => {
    const value = getValueIfExists(() => e.target.value, null);

    if (propertyExist(() => value)) {
      const { onlyNumbers } = regex;
      let valuePoint = value.replace(onlyNumbers, '');
      if (valuePoint > 60) {
        valuePoint = oldSettingsStates.edgeTimeout;
        setIsOutOfRangeModalOpen(true);
      }
      setSiteSettingsStates({
        ...siteSettingsStates,
        edgeTimeout: valuePoint,
      });
      setIsEditFields(true);
    }
  };

  /**
   * @method closeEditing
   * This will close edition, editState, isEditFields and close modal
   */
  const closeEditing = () => {
    setEditState(false);
    setIsEditFields(defaultIsEdit);
    setOpenModal({
      modal: siteSettingsModal,
      isOpen: false,
    });
  };

  /**
   * @method clearSiteSettingsEdit
   * Handle clear to restore states default to siteSettingsStates,
   */
  const clearSiteSettingsEdit = () => {
    setSiteSettingsStates(oldSettingsStates);
    closeEditing();
  };

  /**
   * @method saveClickEvent
   * Handle save event click to open modal siteSettingsModal
   */
  const saveClickEvent = () => {
    setOpenModal({
      modal: siteSettingsModal,
      isOpen: true,
    });
  };

  /**
   * @method editClickEvent
   * Handle edit event to change status from editState to "TRUE" and
   * validate if have permissions to edit with variable validationSiteAdminEdit
   */
  const editClickEvent = () =>
    validationSiteAdminEdit ? setEditState(true) : false;

  /**
   * @method getSiteTypeSelected
   * Get display if exist siteType Selected from siteSettingsStates state properties
   */
  const getSiteTypeSelected = () =>
    getValueIfExists(() => siteSettingsStates.siteTypeSelected.value, '');

  /**
   * @method getTimeZoneSelected
   * Get display if exist timeZone selected from siteSettingsStates state properties
   */
  const getTimeZoneSelected = () =>
    getValueIfExists(() => siteSettingsStates.timeZoneSelected.text, '');

  /**
   * @method isGenerateNewUsernameDisabled
   * Handle if have siteType ID from siteSettingsStates state properties and variable
   * validateNewPassword status to manage to enable or disable button to generate new
   * username and password
   */
  const isGenerateNewUsernameDisabled = !(
    propertyExist(() => siteSettingsStates.siteTypeSelected.id) &&
    canUserGenerateNewPassword
  );

  /**
   * @method getCradlepoint
   * Get display if exist cradlepoint from siteSettingsStates state properties,
   * and else only display 'Null'
   */
  const getCradlepoint = () =>
    getValueIfExists(() => siteSettingsStates.cradlepoint, 'Null');

  /**
   * @method getEdgeTimeout
   * Get display if exist edge timeout from siteSettingsStates state properties,
   * and otherwise display default value of '5'.
   */
  const getEdgeTimeout = () =>
    getValueIfExists(
      () => siteSettingsStates.edgeTimeout,
      DEFAULT_EDGE_TIMEOUT
    );

  /**
   * @method submitSiteSettingsDialog
   * Handle submit event to save timeZone, siteType and cradlepoint to endpoint
   */
  const submitSiteSettingsDialog = () => {
    const {
      timeZoneSelected,
      siteTypeSelected,
      cradlepoint,
      edgeTimeout,
    } = siteSettingsStates;
    const {
      timeZoneSelected: oldTimeZone,
      siteTypeSelected: oldSiteType,
      cradlepoint: oldCradlepoint,
      edgeTimeout: oldEdgeTimeout,
    } = oldSettingsStates;
    // TimeZone Selected
    if (oldTimeZone.timeZoneId !== timeZoneSelected.timeZoneId) {
      const timeZoneParams = {
        timeZoneId: timeZoneSelected.timeZoneId,
        name: timeZoneSelected.name,
        country: timeZoneSelected.country,
      };
      setTimeZone(siteId, timeZoneParams);
    }
    // Site Type Selected
    if (oldSiteType.id !== siteTypeSelected.id) {
      setSiteType(siteId, siteTypeSelected.id, siteTypeSelected.value);
    }
    // Cradlepoint Router ID
    if (oldCradlepoint !== cradlepoint) {
      setCradlePoint(siteId, cradlepoint);
    }

    // Edge Timeout Interval
    if (edgeTimeout !== oldEdgeTimeout) {
      if (!edgeTimeout || edgeTimeout < 1) {
        // prevent blank or numbers < 1 to be saved as timeout intervals.
        setIsOutOfRangeModalOpen(true);
        setSiteSettingsStates({
          ...siteSettingsStates,
          edgeTimeout: DEFAULT_EDGE_TIMEOUT,
        });
      } else {
        setEdgeTimeout(siteId, edgeTimeout);
      }
    }

    // Make new value old
    setOldSettingsStates(siteSettingsStates);

    // Close Modal
    closeEditing();
  };

  const editButton = (
    <Box
      className={classes.actionsBar}
      data-testid="content-editSettingsButtonDataContainer"
    >
      <Button
        onClick={editClickEvent}
        data-testid="content-editSettingsDataButton"
        className={`${classes.editSettingsButton} ${classes.capitalize}`}
        disabled={!validationSiteAdminEdit}
      >
        <Typography>
          {formatMessage(
            messages.SiteSettingsAndAuthentication.editSettingsDataButton
          )}
        </Typography>
      </Button>
      {!validationSiteAdminEdit && (
        <ToolTipText
          title={formatMessage(general.default.disabledEditTitle)}
          placement={tooltipPosition}
        />
      )}
    </Box>
  );

  /**
   * Creates site settings and authentication content body
   */
  const contentBody = (
    <Box data-testid="content-bodyContent">
      <Box className={classes.selectTimeZoneAndSelectSiteTypeContainer}>
        <Grid container spacing={3}>
          <Grid item xs={6} className={classes.dropdownLabel}>
            <Typography component="span" variant="body1">
              {formatMessage(
                messages.SiteSettingsAndAuthentication.selectTimeZoneLabel
              )}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {!editState && getTimeZoneSelected() && (
              <div className={classes.siteSettingsTitles}>
                {getTimeZoneSelected()}
              </div>
            )}
            {editState && (
              <Select
                data-testid="select-timeZone"
                selectData={timeZones}
                onChange={timeZonesOptionsChange}
                selectedObject={{
                  value: getTimeZoneSelected(),
                }}
              />
            )}
          </Grid>
          <Grid item xs={6} className={classes.dropdownLabel}>
            <Typography component="span" variant="body1">
              {formatMessage(
                messages.SiteSettingsAndAuthentication.selectSiteTypeLabel
              )}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {!editState && getSiteTypeSelected() && (
              <div className={classes.siteSettingsTitles}>
                {getSiteTypeSelected()}
              </div>
            )}
            {editState && (
              <Select
                data-testid="select-siteType"
                selectData={selectSiteTypeData}
                selectedObject={{
                  value: getSiteTypeSelected(),
                }}
                onChange={onSiteTypeChange}
              />
            )}
          </Grid>
          <Grid item xs={6} className={classes.dropdownLabel}>
            <Typography component="span" variant="body1">
              {formatMessage(
                messages.SiteSettingsAndAuthentication.edgeDataTimeout
              )}
            </Typography>
          </Grid>
          <Grid item xs={gridSizeEdgeData}>
            {!editState && (
              <div className={classes.siteSettingsTitles}>
                {`${getEdgeTimeout()} ${formatMessage(
                  messages.SiteSettingsAndAuthentication.edgeDataMin
                )}`}
              </div>
            )}
            {editState && (
              <InputComponent
                name="edgeDataTimeout"
                value={getEdgeTimeout()}
                onChange={onChangeEdgeTimeout}
                data-testid="content-input-edgeTimeout"
                inputProps={maxLengthEdgeTimeout}
              />
            )}
          </Grid>
          {editState && (
            <Grid item xs={2}>
              <Typography component="span" variant="body1" color="primary">
                {formatMessage(
                  messages.SiteSettingsAndAuthentication.edgeDataMin
                )}
              </Typography>
            </Grid>
          )}
          <Grid item xs={6} className={classes.dropdownLabel}>
            <Typography component="span" variant="body1">
              {formatMessage(
                messages.SiteSettingsAndAuthentication.cradlePointLabel
              )}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {!editState && (
              <div className={classes.siteSettingsTitles}>
                {getCradlepoint()}
              </div>
            )}
            {editState && (
              <InputComponent
                name="cradlepoint"
                value={getCradlepoint()}
                onChange={onChangeCradlepoint}
                data-testid="content-input-cradlepoint"
                inputProps={maxLengthInput}
              />
            )}
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.subtitleContainer}>
        <Typography variant="subtitle2" className={classes.subtitle}>
          {formatMessage(
            messages.SiteSettingsAndAuthentication.siteUsernameAndPasswordLabel
          )}
        </Typography>
      </Box>
      <Box className={classes.instructionsContainer}>
        <Typography variant="body1">
          {formatMessage(
            messages.SiteSettingsAndAuthentication
              .siteUsernameAndPasswordInstructionsLabel
          )}
        </Typography>
      </Box>
      <Box className={classes.generateNewUsernamePasswordContainer}>
        <Button
          onClick={generateNewUsernameAndPassword}
          data-testid="content-generateNewUsernameAndPasswordButton"
          className={classes.generateNewPassword}
          disabled={isGenerateNewUsernameDisabled}
        >
          {formatMessage(
            messages.SiteSettingsAndAuthentication.generateNewUsernamePassword
          )}
        </Button>
      </Box>
      <Box textAlign="left">
        <Button
          onClick={downloadCACertificate}
          data-testid="content-downloadCACertificateButton"
          className={classes.downloadCA}
          disabled={!canUserDownloadCA}
        >
          <span>
            {formatMessage(
              messages.SiteSettingsAndAuthentication.downloadCACertificate
            )}
          </span>
        </Button>
      </Box>
      <Box />
    </Box>
  );

  const saveAndCancelButtons = (
    <Box
      className={classes.actionsBar}
      data-testid="content-cancelSaveSiteSettingsDataContainer"
    >
      <div>
        <Button
          onClick={clearSiteSettingsEdit}
          data-testid="content-cancelSiteSettingsButton"
          className={classes.cancelSiteSettingsButton}
        >
          <Typography>
            {formatMessage(
              messages.SiteSettingsAndAuthentication.cancelSettingsDataButton
            )}
          </Typography>
        </Button>
        <Button
          disabled={!isEditFields}
          onClick={saveClickEvent}
          data-testid="content-saveSiteSettingsButton"
          className={`${classes.saveSettingsButton} ${classes.capitalize}`}
        >
          <Typography>
            {formatMessage(
              messages.SiteSettingsAndAuthentication.saveSettingsDataButton
            )}
          </Typography>
        </Button>
      </div>
    </Box>
  );

  const title = (
    <div className={classes.headerWrapper} data-testid="content-headerContent">
      <Box className={classes.siteSettingsAndAuthenticationTitleContainer}>
        <Typography
          variant="caption"
          data-testid="content-siteSettingsAndAuthentication"
          className={classes.siteSettingsAndAuthenticationTitle}
        >
          {formatMessage(messages.SiteSettingsAndAuthentication.title)}
        </Typography>
      </Box>
      {!editState ? editButton : saveAndCancelButtons}
    </div>
  );

  return (
    <div data-testid="siteSettingsAndAuthPage">
      <Panel headerContent={title} content={contentBody} />
      <GenerateUsernamePasswordModal
        data-testid="content-generateUsernamePasswordModal"
        openModal={isModalOpen(usernamePasswordModal)}
        closetUsernamePasswordDialog={closetUsernamePasswordDialog}
        submitUsernamePasswordDialog={submitUsernamePasswordDialog}
        currentUsername={currentUsername}
        currentPassword={currentPassword}
      />
      <GenericModalConfirmation
        data-testid="content-siteSettingsModal"
        titleMessage={formatMessage(siteSettings.title)}
        bodyMessage={formatMessage(siteSettings.body)}
        openModal={isModalOpen(siteSettingsModal)}
        submitSave={submitSiteSettingsDialog}
        submitCancel={clearSiteSettingsEdit}
      />
      <GenericModalConfirmation
        data-testid="outOfRange-alert"
        openModal={isOutOfRangeModalOpen}
        showSubmit={false}
        showCancel
        submitCancel={() => setIsOutOfRangeModalOpen(false)}
        titleMessage={formatMessage(
          messages.SiteSettingsAndAuthentication.invalidTimeoutValueTitle
        )}
        bodyMessage={formatMessage(
          messages.SiteSettingsAndAuthentication.invalidTimeoutValueBody
        )}
        cancelLabelText={formatMessage(
          messages.SiteSettingsAndAuthentication.invalidTimeoutValueCancelButton
        )}
      />
    </div>
  );
};

SiteSettingsAndAuthentication.propTypes = {
  intl: PropTypes.any.isRequired,
  siteType: PropTypes.object,
  setSiteType: PropTypes.func.isRequired,
  getCACertificateFetch: PropTypes.func.isRequired,
  plcId: PropTypes.string,
  password: PropTypes.string,
  caCertificate: PropTypes.object,
  siteId: PropTypes.number,
  fetchTimeZones: PropTypes.func,
  setTimeZone: PropTypes.func,
  timeZones: PropTypes.array,
  timeZone: PropTypes.object,
  routerId: PropTypes.string,
  setCradlePoint: PropTypes.func,
  setEdgeTimeout: PropTypes.func,
  savedEdgeTimeout: PropTypes.number,
  getUsernamePassword: PropTypes.func,
  isSiteLive: PropTypes.bool,
  permissions: PropTypes.object,
  siteAccount: PropTypes.string,
};

/**
 * mapStateToProps
 * @param {Object} authentication receives sites.site.authentication reducer from redux
 * @param {Object} caCertificate receives sites.site.caCertificate reducer from redux
 * @param {Object} timeZones receives sites.timeZones reducer from redux
 * @param {Object} timeZone receives sites.site.timeZone reducer from redux
 * @param {Object} siteType receives sites.site.siteType reducer from redux
 * @param {Object} routerId receives sites.site.routerId reducer from redux
 */
const mapStateToProps = (state) => ({
  plcId: getValueIfExists(() => state.sites.site.plcId, ''),
  password: getValueIfExists(() => state.sites.site.password, ''),
  caCertificate: getValueIfExists(() => state.sites.site.caCertificate, {}),
  siteId: getValueIfExists(() => state.sites.site.siteId, 0),
  timeZones: getValueIfExists(() => state.sites.timeZones, []),
  timeZone: getValueIfExists(() => state.sites.site.timeZone, {}),
  siteType: getValueIfExists(() => state.sites.site.siteType, {}),
  routerId: getValueIfExists(() => state.sites.site.routerId, ''),
  permissions: getValueIfExists(() => state.user.permissions, {}),
  isSiteLive: getValueIfExists(() => state.sites.site.live, false),
  siteAccount: getValueIfExists(() => state.sites.site.account, ''),
  savedEdgeTimeout: getValueIfExists(
    () => state.sites.site.edgeDataTimeout,
    DEFAULT_EDGE_TIMEOUT
  ),
});

/**
 * mapDispatchToProps
 * @param {function} getCACertificateFetch call getNewUsernamePassword action and set authentication from redux
 * @param {Function} setTimeZone call updateTimeZone action and update time-zone data
 * @param {Function} fetchTimeZones call getTimeZones action and get all time zones by country ID
 * @param {function} setSiteType call updateSiteType action and set site type from redux
 * @param {function} setCradlePoint call updateCradlePoint action and set cradle point router ID from redux
 */
const mapDispatchToProps = (dispatch) => ({
  getCACertificateFetch: (siteId) => dispatch(getCACertificate(siteId)),
  setTimeZone: (siteId, data) => dispatch(updateTimeZone(siteId, data)),
  fetchTimeZones: (countryId) => dispatch(getTimeZones(countryId)),
  setSiteType: (originSiteId, originSiteTypeId, originSiteTypeName) =>
    dispatch(
      updateSiteType(originSiteId, originSiteTypeId, originSiteTypeName)
    ),
  getUsernamePassword: (originSiteId, originSiteTypeId, originSiteTypeName) =>
    dispatch(
      fetchUsernamePassword(originSiteId, originSiteTypeId, originSiteTypeName)
    ),
  setCradlePoint: (siteId, point) => dispatch(updateCradlePoint(siteId, point)),
  setEdgeTimeout: (siteId, edgeTimeoutInterval) =>
    dispatch(updateEdgeDataTimeout(siteId, edgeTimeoutInterval)),
});

// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(SiteSettingsAndAuthentication));
/* eslint-enable */
