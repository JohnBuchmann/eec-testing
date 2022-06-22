import {
  SiteDetailsCatalog,
  SiteTabs,
  rolesAccess,
  DeviceDetailTabs,
  SiteAdminAccess,
  UserSettingsAccess,
} from 'Utils/enums/roles';

export const ICIAN = {
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
      SiteDetailsCatalog.Devices,
      SiteDetailsCatalog.AuditLog,
      SiteDetailsCatalog.Reports,
      SiteDetailsCatalog.SiteAdmin,
    ],
  },
  dashboard: {
    siteTabs: [SiteTabs.MySites, SiteTabs.All],
  },
  deviceDetail: {
    view: [DeviceDetailTabs.Status, DeviceDetailTabs.Events],
    edit: [],
  },
  siteAdmin: {
    view: [SiteAdminAccess.NewPassword, SiteAdminAccess.CACertificate],
    edit: [
      SiteAdminAccess.Tariff,
      SiteAdminAccess.DeleteUsers,
      SiteAdminAccess.AddUser,
    ],
  },
  userSettings: {
    view: [
      UserSettingsAccess.Phone,
      UserSettingsAccess.Password,
      UserSettingsAccess.UnitMeasurement,
      UserSettingsAccess.Notifications,
    ],
    edit: [
      UserSettingsAccess.UnitMeasurement,
      UserSettingsAccess.Notifications,
    ],
  },
  notifications: true,
};
