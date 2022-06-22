import {
  SiteTabs,
  rolesAccess,
  SiteDetailsCatalog,
  DeviceDetailTabs,
  UserSettingsAccess,
} from 'Utils/enums/roles';

export const DevelopmentTestingAndSupport = {
  name: rolesAccess.DevelopmentTestingAndSupportL1L2L3,
  siteDetails: {
    view: [
      SiteDetailsCatalog.Overview,
      SiteDetailsCatalog.Devices,
      SiteDetailsCatalog.Reports,
      SiteDetailsCatalog.AuditLog,
      SiteDetailsCatalog.BusBand,
      SiteDetailsCatalog.SiteAdmin,
    ],
    edit: [SiteDetailsCatalog.Reports],
  },
  dashboard: {
    siteTabs: [SiteTabs.All],
  },
  deviceDetail: {
    view: [DeviceDetailTabs.Status, DeviceDetailTabs.Events],
    edit: [],
  },
  siteAdmin: {
    view: [],
    edit: [],
  },
  userSettings: {
    view: [
      UserSettingsAccess.UnitMeasurement,
      UserSettingsAccess.Notifications,
    ],
    edit: [
      UserSettingsAccess.UnitMeasurement,
      UserSettingsAccess.Notifications,
    ],
  },
  notifications: false,
};
