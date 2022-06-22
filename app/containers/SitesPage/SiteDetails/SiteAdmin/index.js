/*
 * Site Admin Page
 *
 * This is the site admin page where we can manage all settings for site admin
 *
 */
import { Box, makeStyles } from '@material-ui/core';
import sitePermissionMock from 'Internals/mocks/sitePermissionMock';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { validateIcianPrincipal } from 'Utils/roles';
import { validatePermission } from 'Config/appSettings';
import { getValueIfExists } from 'Utils/propertyValidation';
import {
  SiteAdminAccess,
  PermissionsList,
  TypeValidation,
} from 'Utils/enums/roles';
import SitePermissions from './SitePermissions';
import SiteSettingsAndAuthentication from './SiteSettingsAndAuthentication';
import TariffStructure from './TariffStructure';

const useStyles = makeStyles({
  panelsWrapper: {
    display: 'flex',
  },
  columnWrapper: {
    width: '50%',
  },
  userInfoPanel: {
    height: '269px',
    minWidth: '574px',
  },
  tariffStructurePanel: {
    height: '269px',
    minWidth: '574px',
    marginTop: '50px',
  },
  localizationSettingsPanel: {
    marginBottom: '16px',
    minWidth: '574px',
  },
  notificationPreferencePanel: {
    minWidth: '574px',
  },
  sitePermissions: {
    width: '574px',
  },
  firstColumnWrapper: {
    marginRight: '18px',
    marginBottom: '18px',
    width: '50%',
  },
});

/**
 * SiteAdmin creates the container to
 * display all the content related to the site admin.
 * User will be able to access
 * this container at the '/sites/details' route to modify own data.
 */
const SiteAdmin = (props) => {
  const { user, site, permissions, isSiteLive, siteAccount } = props;
  const classes = useStyles();
  const tariffData = {
    utility: '',
    tariffStructure: '',
    gasUtilityId: '',
    gasUtilityTariff: '',
    electricUtilityId: '',
    electricUtilityTariff: '',
  };
  const [editState, setEditState] = React.useState(false);
  /**
   * Params to Permissions in Permissions Toggle
   */
  const paramsToPermissions = {
    permissions,
    isSiteLive,
    section: getValueIfExists(() => PermissionsList.SiteAdmin, ''),
    type: getValueIfExists(() => TypeValidation.Edit, ''),
    action: getValueIfExists(() => SiteAdminAccess.Permissions, ''),
    siteAccount,
  };
  /**
   * Handle which can user to edit permissions toggle
   */
  const canUserEditPermissionsToggle = validatePermission(paramsToPermissions);
  /**
   * @method enableEdition
   * Enables the edition in tariff structure section.
   * @return {void}
   */
  const enableEdition = () => {
    setEditState(true);
  };

  /**
   * @method cancelEdition
   * Cancels the edition in tariff structure section.
   * @return {void}
   */
  const cancelEdition = () => {
    setEditState(false);
  };

  /**
   * @method icianPrincipal
   * Return validation if user is an ician principal or user have permissions
   * @return {boolean}
   */
  const icianPrincipal =
    validateIcianPrincipal(user, site) || canUserEditPermissionsToggle;

  return (
    <>
      <Box className={classes.panelsWrapper}>
        <Box className={classes.firstColumnWrapper}>
          <Box>
            <SiteSettingsAndAuthentication data-testid="content-siteSettingsAndAuthentication" />
          </Box>
          <Box className={classes.tariffStructurePanel}>
            <TariffStructure
              data-testid="content-tariffStructure"
              data={tariffData}
              enableEdition={enableEdition}
              cancelEdition={cancelEdition}
              isEditing={editState}
            />
          </Box>
        </Box>

        <Box className={classes.columnWrapper}>
          <Box className={classes.sitePermissions}>
            <SitePermissions
              sitePermission={sitePermissionMock}
              data-testid="sitePermissionPanel"
              icianPrincipal={icianPrincipal}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

SiteAdmin.propTypes = {
  user: PropTypes.object,
  site: PropTypes.object,
  permissions: PropTypes.object.isRequired,
  isSiteLive: PropTypes.bool.isRequired,
  siteAccount: PropTypes.string.isRequired,
};

/**
 * mapStateToProps
 * @param {Object} user receives state.user.user reducer from redux
 * @param {Object} site receives state.sites.site reducer from redux
 */
const mapStateToProps = (state) => ({
  user: getValueIfExists(() => state.user.user, {}),
  site: getValueIfExists(() => state.sites.site, {}),
  permissions: getValueIfExists(() => state.user.permissions, {}),
  isSiteLive: getValueIfExists(() => state.sites.site.live, false),
  siteAccount: getValueIfExists(() => state.sites.site.account, ''),
});
// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default connect(mapStateToProps)(SiteAdmin);
/* eslint-enable */
