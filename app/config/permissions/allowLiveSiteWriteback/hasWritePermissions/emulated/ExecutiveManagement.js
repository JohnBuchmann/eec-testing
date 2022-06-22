import {
  SiteDetailsCatalog,
  SiteTabs,
  rolesAccess,
  DeviceDetailTabs,
  UserSettingsAccess,
  SiteAdminAccess,
} from 'Utils/enums/roles';

export const ExecutiveManagement = {
  name: rolesAccess.ExecutiveManagement,
  siteDetails: {
    view: [
      SiteDetailsCatalog.Overview,
      SiteDetailsCatalog.Devices,
      SiteDetailsCatalog.Reports,
      SiteDetailsCatalog.AuditLog,
      SiteDetailsCatalog.BusBand,
    ],
    edit: [
      SiteDetailsCatalog.Devices,
      SiteDetailsCatalog.BusBand,
      SiteDetailsCatalog.AuditLog,
      SiteDetailsCatalog.Reports,
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
  MarketingSales: {
    deviceDetail: {
      view: [DeviceDetailTabs.Status],
    },
    siteDetails: {
      edit: [
        SiteDetailsCatalog.BusBand,
        SiteDetailsCatalog.SiteAdmin,
        SiteDetailsCatalog.AuditLog,
      ],
    },
    siteAdmin: {
      edit: [SiteAdminAccess.Tariff, SiteAdminAccess.Permissions],
    },
  },
};
