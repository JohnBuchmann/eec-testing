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
    edit: [SiteDetailsCatalog.Devices, SiteDetailsCatalog.Reports],
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
      UserSettingsAccess.Phone,
      UserSettingsAccess.Password,
      UserSettingsAccess.UnitMeasurement,
    ],
    edit: [UserSettingsAccess.UnitMeasurement],
  },
  notifications: false,
};
