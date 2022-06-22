/**
 * User information mock
 */
import {
  SiteDetailsCatalog,
  SiteTabs,
  rolesAccess,
  DeviceDetailTabs,
  SiteAdminAccess,
  UserSettingsAccess,
} from 'Utils/enums/roles';
// Disabling this block from eslint because it's mock data from okta to use in unit testing.
/* eslint-disable */
export const userLogin = {
  email: 'react_okta_dev@hotmail.com',
  email_verified: true,
  family_name: 'Azure DEV',
  given_name: 'Okta',
  locale: 'en-US',
  name: 'Okta Azure DEV',
  preferred_username: 'react_okta_dev@hotmail.com',
  roles: ['DCentriQ_Energy_Engineer'],
  sub: '00u1e95l5MNOHx8UU5d6',
  updated_at: 1611348505,
  zoneinfo: 'America/Los_Angeles',
  avatar: '',
  termsAndCondition: '2022-09-15 12:00:00',
};
/* eslint-enable */

/**
 * User permissions mock
 */
export const userPermissions = {
  live: {
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
      edit: [
        SiteDetailsCatalog.Overview,
        SiteDetailsCatalog.Devices,
        SiteDetailsCatalog.Reports,
        SiteDetailsCatalog.BusBand,
        SiteDetailsCatalog.SiteAdmin,
      ],
    },
    dashboard: {
      siteTabs: [SiteTabs.All],
    },
    deviceDetail: {
      view: [DeviceDetailTabs.Status, DeviceDetailTabs.Events],
      edit: [DeviceDetailTabs.Status, DeviceDetailTabs.Events],
    },
    siteAdmin: {
      view: [SiteAdminAccess.NewPassword, SiteAdminAccess.CACertificate],
      edit: [SiteAdminAccess.Tariff],
    },
    userSettings: {
      view: [
        UserSettingsAccess.Phone,
        UserSettingsAccess.Password,
        UserSettingsAccess.UnitMeasurement,
      ],
      edit: [UserSettingsAccess.UnitMeasurement],
    },
    notifications: false,
  },
  emulated: {
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
      edit: [
        SiteDetailsCatalog.Overview,
        SiteDetailsCatalog.Devices,
        SiteDetailsCatalog.Reports,
        SiteDetailsCatalog.BusBand,
        SiteDetailsCatalog.SiteAdmin,
      ],
    },
    dashboard: {
      siteTabs: [SiteTabs.All],
    },
    deviceDetail: {
      view: [DeviceDetailTabs.Status, DeviceDetailTabs.Events],
      edit: [DeviceDetailTabs.Status, DeviceDetailTabs.Events],
    },
    siteAdmin: {
      view: [SiteAdminAccess.NewPassword, SiteAdminAccess.CACertificate],
      edit: [SiteAdminAccess.Tariff],
    },
    userSettings: {
      view: [
        UserSettingsAccess.Phone,
        UserSettingsAccess.Password,
        UserSettingsAccess.UnitMeasurement,
      ],
      edit: [UserSettingsAccess.UnitMeasurement],
    },
    notifications: false,
  },
};
/**
 * User Settings mock
 */
export const settings = {
  userSettingId: 19,
  user: {
    userId: 20,
    oktaUserId: 50,
  },
  unitMeasurement: {
    unitMeasurementId: 2,
    name: 'F°',
  },
  notificationPreferences: [
    {
      notificationPreferenceId: 1,
      notificationPreferenceType: {
        notificationPreferenceTypeId: 1,
        name: 'NEW WORK ITEM',
      },
      emailEnabled: true,
      smsEnabled: false,
    },
    {
      notificationPreferenceId: 2,
      notificationPreferenceType: {
        notificationPreferenceTypeId: 2,
        name: 'FAULTED',
      },
      emailEnabled: true,
      smsEnabled: true,
    },
  ],
};
