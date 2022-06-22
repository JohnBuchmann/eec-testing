const { routes } = window.env;
const endpoints = {
  fetchSites: `${routes.sitesService}/sites/`,
  fetchSitesFilters: `${routes.sitesService}/sites/filters`,
  fetchSiteBusBand: `${routes.sitesService}/sites/{siteId}/busband`,
  patchSiteBusBandPoints: `${routes.sitesService}/sites/{siteId}/config`,
  postBusBandStatus: `${routes.sitesService}/sites/{siteId}/busband/status`,
  fetchSiteDetail: `${routes.sitesService}/sites/{siteId}`,
  fetchSiteEvent: `${routes.sitesService}/sites/{siteId}/events`,
  fetchSitesIcianUsers: `${routes.sitesService}/sites/assigned-user`,
  fetchNewUsernamePassword: `${routes.sitesService}/sites/{siteId}/token`,
  fetchCACertificate: `${routes.sitesService}/sites/{siteId}/ca-certificate`,
  fetchSiteTelemetry: `${routes.sitesService}/sites/{siteId}/overview`,
  fetchSiteAuditLog: `${routes.sitesService}/sites/{siteId}/audit-log`,
  fetchSitesPermissions: `${routes.sitesService}/sites/{siteId}/permissions`,
  deleteSitesPermissions: `${
    routes.sitesService
  }/sites/{siteId}/permissions/{userId}`,
  updateTimeZone: `${routes.sitesService}/sites/{siteId}/time-zone`,
  fetchTimeZones: `${routes.sitesService}/sites/time-zones?country={country}`,
  fetchTariffStructure: `${
    routes.sitesService
  }/sites/{siteId}/tariff-structure`,
  fetchSitesCompanies: `${routes.sitesService}/sites/companies`,
  updateTariffStructure: `${
    routes.sitesService
  }/sites/{siteId}/tariff-structure/{tariffId}`,
  setCradlePointRouterId: `${routes.sitesService}/sites/{siteId}/router-id`,
  setEdgeDataTimeout: `${routes.sitesService}/sites/{siteId}/edge-data-timeout`,
  fetchNotificationsSettings: `${routes.usersService}/users/settings`,
  updateNotificationsSettings: `${routes.usersService}/users/settings`,
  fetchUserPolicy: `${routes.usersService}/users/policy`,
  fetchOktaUsers: `${routes.usersService}/users/okta/users`,
  updateUserOktaProfile: `${routes.usersService}/users/info`,
  userSessionEvents: `${routes.usersService}/users/events/{event}`,
  fetchUserRoleConfig: `${routes.usersService}/users/role`,
  fetchUserAppConfig: `${routes.usersService}/users/app-config`,
  fetchNotification: `${
    routes.notificationsService
  }/notifications/?page=0&size=200`,
  patchNotification: `${routes.notificationsService}/notifications/dismiss/`,
  fetchEnergyCharts: `${routes.chartsService}/charts/energy-productions`,
  fetchESSCharts: `${routes.chartsService}/charts/ess-states`,
  fetchFacilityCharts: `${
    routes.chartsService
  }/charts/facility-usage-productions`,
  fetchVehicleAndFleetCharts: `${
    routes.chartsService
  }/charts/vehicle-and-fleets`,
  fetchShareReports: `${routes.chartsService}/charts/share-reports`,
  fetchMonthlyReports: `${routes.chartsService}/charts/monthly-report`,
  fetchReportsExcel: `${routes.chartsService}/charts/monthly-report/csv`,
  fetchDevicesBySiteId: `${
    window.env.routes.devicesService
  }/devices/?bySiteId={siteId}`,
  fetchDeviceStatus: `${routes.devicesService}/devices/{deviceId}/status`,
  fetchDeviceTelemetry: `${routes.devicesService}/devices/{deviceId}/telemetry`,
  fetchDeviceConfig: `${routes.devicesService}/devices/{deviceId}/config`,
  fetchDeviceExcelExport: `${
    routes.devicesService
  }/devices/{deviceId}/events/export`,
  fetchDeviceEvents: `${
    routes.devicesService
  }/devices/{deviceId}/events/?page={page}&size={size}`,
};

export default endpoints;
