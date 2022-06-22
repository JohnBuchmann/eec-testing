import _ from 'lodash';
import { getValueIfExists } from 'Utils/propertyValidation';
import { configurationVariables, configSiteType } from 'Utils/enums/config';
import { AllowLiveSiteWriteBack } from './permissions/allowLiveSiteWriteback';

/**
 * @method getAllowLiveSiteWriteBack
 * Get value from configuration variable 'allowLiveSiteWriteback'
 * @param {object} config receives configuration variables data
 * @returns {boolean}
 */
export const getAllowLiveSiteWriteBack = (config) => {
  const result = getValueIfExists(
    () => config[`${configurationVariables.AllowLiveSiteWriteback}`],
    null
  );
  return JSON.parse(result);
};
/**
 * @method getConfigPermissions
 * Get permissions from user to live and emulated sites, compare variable config allowLiveSiteWriteback
 * value and filter the role to output the permissions
 * @param {boolean} value receive value from variable config allowLiveSiteWriteback
 * @param {string} role receive role name
 * @returns {object}
 */
export const getConfigPermissions = (value, role) => {
  const permissions = value
    ? AllowLiveSiteWriteBack.hasWritePermissions
    : AllowLiveSiteWriteBack.hasNotWritePermissions;
  return {
    emulated: Object.values(permissions.Emulated).find(
      (roles) => roles.name === role
    ),
    live: Object.values(permissions.Live).find((roles) => roles.name === role),
  };
};

/**
 * @method getPermissionsBySiteAccount
 * Retrieves the permissions when the site belongs to a customer account.
 * @param {Object[]} userPermissions Has the current user permissions.
 * @param {Object[]} siteAccountPermissions Stores the exceptions on permissions when the site belongs to a special account.
 * @return {Object[]}
 */
const getPermissionsBySiteAccount = (
  userPermissions = [],
  siteAccountPermissions = []
) => {
  const newPermissions = userPermissions;
  if (
    Object.keys(siteAccountPermissions).length > 0 &&
    Object.keys(userPermissions).length > 0
  ) {
    Object.keys(siteAccountPermissions).forEach((key) => {
      newPermissions[`${key}`] = {
        ...newPermissions[`${key}`],
        ...siteAccountPermissions[`${key}`],
      };
    });
  }
  return newPermissions;
};

/**
 * @method validatePermission
 * @param {object} permissions receives permissions data
 * @param {boolean} isSiteLive receive if is a live site
 * @param {string} section receive section name to validate
 * @param {string} type receives type to validation 'view' or 'edit'
 * @param {string} action receives action name to validate
 * @param {string} extraSite receives extra site like R&D, MDS or OCS
 * @param {string} siteAccount receives site type account
 * @returns {boolean}
 */
export const validatePermission = (params = {}) => {
  const permissions = getValueIfExists(() => params.permissions, {});
  const isSiteLive = getValueIfExists(() => params.isSiteLive, false);
  const section = getValueIfExists(() => params.section, '');
  const type = getValueIfExists(() => params.type, '');
  const action = getValueIfExists(() => params.action, '');
  const siteAccount = getValueIfExists(() => params.siteAccount, '').replace(
    /_/g,
    ''
  );

  const siteType = isSiteLive ? configSiteType.Live : configSiteType.Emulated;

  // Making a deep clone to avoid overwriting the original values for permissions
  // since this method is just to validate access and not to modify value access
  let userPermissions = _.cloneDeep(permissions);

  try {
    if (Object.keys(permissions).length > 0) {
      if (siteAccount !== '') {
        const sitePermissions = userPermissions[`${siteType}`];
        const siteAccountPermissions =
          permissions[`${siteType}`][`${siteAccount}`];
        userPermissions = getPermissionsBySiteAccount(
          sitePermissions,
          siteAccountPermissions
        );
        return userPermissions[`${section}`][`${type}`].indexOf(action) > -1;
      }
    }

    return (
      userPermissions[`${siteType}`][`${section}`][`${type}`].indexOf(action) >
      -1
    );
  } catch (error) {
    // eslint-disable-next-line
    console.log('appSettings - validatePermission', error);
    return false;
  }
};
