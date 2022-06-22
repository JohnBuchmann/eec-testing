import {
  SiteTabs,
  rolesAccess,
  SiteDetailsCatalog,
  DeviceDetailTabs,
} from 'Utils/enums/roles';

export const CustomerTechnician = {
  name: rolesAccess.CustomerTechnician,
  siteDetails: {
    view: [
      SiteDetailsCatalog.Overview,
      SiteDetailsCatalog.Devices,
      SiteDetailsCatalog.Reports,
    ],
    edit: [SiteDetailsCatalog.Reports, SiteDetailsCatalog.Devices],
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
    view: [],
    edit: [],
  },
  notifications: false,
};
