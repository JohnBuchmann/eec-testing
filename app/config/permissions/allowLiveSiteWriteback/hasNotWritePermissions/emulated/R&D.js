import {
  SiteDetailsCatalog,
  SiteTabs,
  rolesAccess,
  DeviceDetailTabs,
  UserSettingsAccess,
} from 'Utils/enums/roles';

export const RD = {
  name: rolesAccess.RDengineer,
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
      SiteDetailsCatalog.Devices,
      SiteDetailsCatalog.Reports,
      SiteDetailsCatalog.BusBand,
      SiteDetailsCatalog.AuditLog,
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
