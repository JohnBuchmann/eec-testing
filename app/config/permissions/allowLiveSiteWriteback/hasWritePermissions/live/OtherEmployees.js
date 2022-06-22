import { SiteTabs, rolesAccess } from 'Utils/enums/roles';

export const OtherEmployees = {
  name: rolesAccess.OtherEmployees,
  siteDetails: {
    view: [],
    edit: [],
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
    view: [],
    edit: [],
  },
  notifications: false,
};
