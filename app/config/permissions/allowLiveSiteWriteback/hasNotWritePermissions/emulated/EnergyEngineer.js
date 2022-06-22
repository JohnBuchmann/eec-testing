import {
  SiteDetailsCatalog,
  SiteTabs,
  rolesAccess,
  DeviceDetailTabs,
  SiteAdminAccess,
  UserSettingsAccess,
} from 'Utils/enums/roles';

export const EnergyEngineer = {
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
  deviceDetail: {
    view: [DeviceDetailTabs.Status, DeviceDetailTabs.Events],
    edit: [DeviceDetailTabs.Status, DeviceDetailTabs.Events],
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
    ],
    edit: [UserSettingsAccess.UnitMeasurement],
  },
  notifications: true,
};
