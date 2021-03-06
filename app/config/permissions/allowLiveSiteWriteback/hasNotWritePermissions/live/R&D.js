import {
  SiteDetailsCatalog,
  SiteTabs,
  rolesAccess,
  DeviceDetailTabs,
  UserSettingsAccess,
  SiteAdminAccess,
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
      SiteDetailsCatalog.AuditLog,
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
  RandDEngineer: {
    siteDetails: {
      edit: [SiteDetailsCatalog.BusBand, SiteDetailsCatalog.siteAdmin],
    },
    deviceDetail: {
      edit: [DeviceDetailTabs.Status, DeviceDetailTabs.Events],
    },
    siteAdmin: {
      view: [SiteAdminAccess.NewPassword, SiteAdminAccess.CACertificate],
      edit: [
        SiteAdminAccess.Tariff,
        SiteAdminAccess.Permissions,
        SiteAdminAccess.DeleteUsers,
        SiteAdminAccess.AddUser,
      ],
    },
  },
};
