import {
  SiteDetailsCatalog,
  SiteTabs,
  rolesAccess,
  UserSettingsAccess,
  DeviceDetailTabs,
  SiteAdminAccess,
} from 'Utils/enums/roles';

export const MarketingSales = {
  name: rolesAccess.MarketingSales,
  siteDetails: {
    view: [
      SiteDetailsCatalog.Overview,
      SiteDetailsCatalog.Devices,
      SiteDetailsCatalog.AuditLog,
      SiteDetailsCatalog.Reports,
      SiteDetailsCatalog.BusBand,
      SiteDetailsCatalog.SiteAdmin,
    ],
    edit: [
      SiteDetailsCatalog.Reports,
      SiteDetailsCatalog.AuditLog,
      SiteDetailsCatalog.SiteAdmin,
    ],
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
  MarketingSales: {
    siteAdmin: {
      view: [SiteAdminAccess.CACertificate, SiteAdminAccess.NewPassword],
      edit: [
        SiteAdminAccess.Tariff,
        SiteAdminAccess.Permissions,
        UserSettingsAccess.Password,
        SiteAdminAccess.CACertificate,
        SiteAdminAccess.NewPassword,
      ],
    },
    userSettings: {
      view: [UserSettingsAccess.Notifications],
      edit: [UserSettingsAccess.Notifications],
    },
  },
};
