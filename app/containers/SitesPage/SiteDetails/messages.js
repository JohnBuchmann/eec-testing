/*
 * Sites details page messages
 *
 * This contains all the text for the SitesPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SitesDetailsPage';

export default defineMessages({
  overviewTabTitle: {
    id: `${scope}.overview_tab.title`,
    defaultMessage: 'Overview',
  },
  devicesTabTitle: {
    id: `${scope}.devices_tab.title`,
    defaultMessage: 'Devices',
  },
  reportsTabTitle: {
    id: `${scope}.reports_tab.title`,
    defaultMessage: 'Reports',
  },
  auditLogTabTitle: {
    id: `${scope}.audit_log_tab.title`,
    defaultMessage: 'Audit Log',
  },
  busBandTabTitle: {
    id: `${scope}.bus_band_tab.title`,
    defaultMessage: 'Bus Band',
  },
  siteAdminTabTitle: {
    id: `${scope}.site_admin_tab.title`,
    defaultMessage: 'Site Admin',
  },
  siteDetailsSiteName: {
    id: `${scope}.site_details_site_name`,
    defaultMessage: 'Site Name',
  },
  siteDetailsSiteId: {
    id: `${scope}.site_details_site_id`,
    defaultMessage: 'Site Id',
  },
  siteDetailsCompanyName: {
    id: `${scope}.site_details_site_company_name`,
    defaultMessage: 'Company Name',
  },
  siteDetailsLocationName: {
    id: `${scope}.site_details_site_location_name`,
    defaultMessage: 'Location Name',
  },
  siteDetailsAreaName: {
    id: `${scope}.site_details_site_area_name`,
    defaultMessage: 'Area Name',
  },
});
