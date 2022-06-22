import {
  SiteDetailsCatalog,
  SiteTabs,
  rolesAccess,
  rolesNames,
} from 'Utils/enums/roles';
import { getValueIfExists } from 'Utils/propertyValidation';
/**
 * User Type Faith
 */
export const userTypeFaith = 'SSO';
/**
 * Notification Roles Catalog
 */
export const notificationRoles = [rolesAccess.ICIAN];
/**
 * Role Permissions Array
 */
const rolePermissions = [
  {
    name: rolesAccess.EnergyEngineer,
    siteDetails: {
      view: [
        SiteDetailsCatalog.Overview,
        SiteDetailsCatalog.Devices,
        SiteDetailsCatalog.Reports,
        SiteDetailsCatalog.AuditLog,
        SiteDetailsCatalog.BusBand,
        SiteDetailsCatalog.SiteAdmin,
      ],
      edit: [
        SiteDetailsCatalog.Overview,
        SiteDetailsCatalog.Devices,
        SiteDetailsCatalog.Reports,
        SiteDetailsCatalog.AuditLog,
        SiteDetailsCatalog.BusBand,
        SiteDetailsCatalog.SiteAdmin,
      ],
    },
    dashboard: {
      siteTabs: [SiteTabs.All],
    },
  },
  {
    name: rolesAccess.ICIAN,
    siteDetails: {
      view: [
        SiteDetailsCatalog.Overview,
        SiteDetailsCatalog.Devices,
        SiteDetailsCatalog.Reports,
        SiteDetailsCatalog.AuditLog,
        SiteDetailsCatalog.BusBand,
        SiteDetailsCatalog.SiteAdmin,
      ],
      edit: [SiteDetailsCatalog.Devices, SiteDetailsCatalog.SiteAdmin],
    },
    dashboard: {
      siteTabs: [SiteTabs.MySites, SiteTabs.All],
    },
  },
  {
    name: rolesAccess.RDengineer,
    siteDetails: {
      view: [
        SiteDetailsCatalog.Overview,
        SiteDetailsCatalog.Devices,
        SiteDetailsCatalog.Reports,
        SiteDetailsCatalog.AuditLog,
        SiteDetailsCatalog.BusBand,
      ],
      edit: [],
    },
    dashboard: {
      siteTabs: [SiteTabs.All],
    },
  },
  {
    name: rolesAccess.ExecutiveManagement,
    siteDetails: {
      view: [
        SiteDetailsCatalog.Overview,
        SiteDetailsCatalog.Devices,
        SiteDetailsCatalog.Reports,
      ],
      edit: [],
    },
    dashboard: {
      siteTabs: [SiteTabs.All],
    },
  },
  {
    name: rolesAccess.MarketingSales,
    siteDetails: {
      view: [
        SiteDetailsCatalog.Overview,
        SiteDetailsCatalog.Devices,
        SiteDetailsCatalog.Reports,
      ],
      edit: [],
    },
    dashboard: {
      siteTabs: [SiteTabs.All],
    },
  },
  {
    name: rolesAccess.DevelopmentTestingAndSupportL1L2L3,
    siteDetails: {
      view: [
        SiteDetailsCatalog.Overview,
        SiteDetailsCatalog.Devices,
        SiteDetailsCatalog.Reports,
      ],
      edit: [],
    },
    dashboard: {
      siteTabs: [SiteTabs.All],
    },
  },
  {
    name: rolesAccess.OtherEmployees,
    siteDetails: {
      view: [],
      edit: [],
    },
    dashboard: {
      siteTabs: [],
    },
  },
  {
    name: rolesAccess.CustomerTechnician,
    siteDetails: {
      view: [
        SiteDetailsCatalog.Overview,
        SiteDetailsCatalog.Devices,
        SiteDetailsCatalog.Reports,
      ],
      edit: [],
    },
    dashboard: {
      siteTabs: [SiteTabs.All],
    },
  },
  {
    name: rolesAccess.OtherEmployees,
    siteDetails: {
      view: [
        SiteDetailsCatalog.Overview,
        SiteDetailsCatalog.Devices,
        SiteDetailsCatalog.Reports,
      ],
      edit: [],
    },
    dashboard: {
      siteTabs: [SiteTabs.All],
    },
  },
  {
    name: rolesAccess.DcentriqSso,
    siteDetails: {
      view: [],
      edit: [],
    },
    dashboard: {
      siteTabs: [SiteTabs.All],
    },
  },
];

/**
 * filterTabs
 * Return tabs from validation from titles
 * @param {Array} tabs receives array tabs
 * @param {Array} validationTiltes receives title array for validate
 * @return {Array}
 */
const filterTabs = (tabs = [], validationTiltes = []) =>
  tabs
    .map((tab) => {
      const title = tab.title.toLowerCase().replace(' ', '');
      if (validationTiltes.indexOf(title) > -1) {
        return tab;
      }
      return null;
    })
    .filter((tab) => tab !== null);

/**
 * getSiteDetailsTabs
 * Filter site details tabs from list and return only tabs which have access the role
 * @param {Object} permissions receives role permissions from Redux
 * @param {Array} tabs receives array list from site details tabs
 * @return {Array}
 */
export const getSiteDetailsTabs = (permissions = {}, tabs = []) => {
  if (Object.keys(permissions).length === 0 || tabs.length === 0) {
    return [];
  }
  const siteDetails = getValueIfExists(() => permissions.siteDetails, {});
  const { view } = siteDetails;
  return filterTabs(tabs, view);
};
/**
 * getSiteDashboardTabs
 * Filter site dashboard tabs from list and return only tabs which have access the role
 * @param {Object} permissions receives role permissions from Redux
 * @param {Array} tabs receives array list from site details tabs
 * @return {Array}
 */
export const getSiteDashboardTabs = (permissions = {}, tabs = []) => {
  if (Object.keys(permissions).length === 0 || tabs.length === 0) {
    return [];
  }
  const dashboard = getValueIfExists(() => permissions.live.dashboard, {});
  const { siteTabs } = dashboard;
  return filterTabs(tabs, siteTabs);
};
/**
 * getPermissions
 * Filter access permissions from user role
 * @param {Object} user receives user information from Okta
 * @return {Object}
 */
export const getPermissions = (user = {}) => {
  const roles = getValueIfExists(() => user.roles, []);
  // Filter if exist roles from Roles Access Catalog
  const permissions = roles
    .map((value) => rolePermissions.find((role) => role.name === value) || null)
    .filter((value) => value);
  // Validate if is empty permissions array
  if (permissions.length > 0) {
    // Return role permissions from last position
    const lastInstead = permissions.length - 1;
    return permissions[`${lastInstead}`];
  }
  return {};
};
/**
 * validateEditPermissions
 * Return if have permissions to edit something
 * @param {Array} permissions receives edit permissions to validate
 * @param {String} edit receives edit value
 * @return {Boolean}
 */
export const validateEditPermissions = (permissions, edit) =>
  !!permissions && permissions.edit.indexOf(edit) > -1;

/**
 * @method validateIcianPrincipal
 * Handle validation if user email is an ICIAN Primary or ICIAN Secondary from the site
 * to get permissions
 * @param {object} user receives user data
 * @param {object} site receives site data
 * @returns boolean
 */
export const validateIcianPrincipal = (user, site) => {
  const email = getValueIfExists(() => user.email.toLowerCase(), '');
  const icianEmail = getValueIfExists(
    () => site.externalIcianId.toLowerCase(),
    ''
  );
  const seconddaryIcianEmail = getValueIfExists(
    () => site.secondaryIcianId.toLowerCase(),
    ''
  );
  return !!(
    email.length > 0 &&
    (icianEmail.length > 0 || seconddaryIcianEmail.length > 0) &&
    (email === icianEmail || email === seconddaryIcianEmail)
  );
};

/**
 * @method isCustomerRole
 * Validates if the user permissions belong to customer roles
 * @param {object} permission receives permission data
 * @returns boolean
 */
export const isCustomerRole = (permission) => {
  const customerRoles = [
    rolesAccess.OtherEmployees,
    rolesAccess.CustomerTechnician,
    rolesAccess.OtherCustomers,
  ];
  const currentRole = getValueIfExists(() => permission.name, '');
  return customerRoles.findIndex((role) => currentRole === role) > -1;
};

/**
 * isFaithAccount
 * It will return wether the user session type is 'SSO'
 * @param {object} info Object with user's permissions.
 * @returns {boolean}
 * TODO: if multi role is activated, this need to change to validate it contains this role access.
 */
export const isFaithAccount = (info) =>
  getValueIfExists(() => info.sessionType, '') === userTypeFaith;

/**
 * userHasApplicationAccess
 * It will return true if the user has access to the application otherwise false
 * @param {object} info Object with user information
 * @returns {boolean}
 */
export const userHasApplicationAccess = (userInfo) =>
  getValueIfExists(() => userInfo.roles.length, 0) !== 0;

/**
 * @method showNotifications
 * Handle to display notifications to user if have permissions
 * @param {object} roleName receive user role name
 * @returns {boolean}
 */
export const showNotifications = (roleName) =>
  notificationRoles.findIndex((role) => role === roleName) > -1;

/**
 * @method getRoleNamesByRolesAccess
 * Handle to display role names from roles access received, return list roles in
 * alphabetical order, separate roles by comma  and highlight the "active" role in BOLD text
 * @param {string} roles receives roles access
 * @param {string} roleAssigned receives role access assigned
 * @returns {string}
 */
export const getRoleNamesByRolesAccess = (roles = [], roleAssigned = '') => {
  if (getValueIfExists(() => roles.length, 0)) {
    roles.sort();
    const result = roles
      .map((role) =>
        roleAssigned === role
          ? `<b>${rolesNames[`${role}`]}</b>`
          : rolesNames[`${role}`]
      )
      .filter((role) => role);
    return result.join(', ');
  }
  return '';
};
