import {
  SiteTabs,
  rolesAccess,
  SiteDetailsCatalog,
  DeviceDetailTabs,
  UserSettingsAccess,
} from 'Utils/enums/roles';

export const OtherCustomers = {
  name: rolesAccess.OtherCustomers,
  siteDetails: {
    view: [
      SiteDetailsCatalog.Overview,
      SiteDetailsCatalog.Devices,
      SiteDetailsCatalog.Reports,
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
      UserSettingsAccess.Phone,
      UserSettingsAccess.Password,
      UserSettingsAccess.UnitMeasurement,
    ],
    edit: [
      UserSettingsAccess.Phone,
      UserSettingsAccess.Password,
      UserSettingsAccess.UnitMeasurement,
    ],
  },
  notifications: false,
};
