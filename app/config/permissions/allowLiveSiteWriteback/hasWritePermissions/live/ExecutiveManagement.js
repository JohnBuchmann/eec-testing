import {
  SiteDetailsCatalog,
  SiteTabs,
  rolesAccess,
  DeviceDetailTabs,
  UserSettingsAccess,
} from 'Utils/enums/roles';

export const ExecutiveManagement = {
  name: rolesAccess.ExecutiveManagement,
  siteDetails: {
    view: [
      SiteDetailsCatalog.Overview,
      SiteDetailsCatalog.Devices,
      SiteDetailsCatalog.Reports,
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
    view: [UserSettingsAccess.UnitMeasurement],
    edit: [UserSettingsAccess.UnitMeasurement],
  },
  notifications: false,
};
