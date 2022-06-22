import {
  SiteDetailsCatalog,
  SiteTabs,
  rolesAccess,
  DeviceDetailTabs,
  SiteAdminAccess,
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
      SiteDetailsCatalog.Overview,
      SiteDetailsCatalog.Devices,
      SiteDetailsCatalog.Reports,
    ],
  },
  dashboard: {
    siteTabs: [SiteTabs.All],
  },
  deviceDetail: {
    view: [],
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
  notifications: true,
  RandDEngineer: {
    siteDetails: {
      edit: [SiteDetailsCatalog.BusBand, SiteDetailsCatalog.SiteAdmin],
    },
    deviceDetail: {
      view: [DeviceDetailTabs.Status, DeviceDetailTabs.Events],
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
