import { DeviceListTypeId } from 'Utils/enums/device';

import { SiteEventType } from 'Utils/enums/siteEvent';
import { AllIcianUsers } from 'Utils/icianUsers';
import {
  getValueIfExists,
  propertyExist,
  stringContains,
  getSites,
} from 'Utils/propertyValidation';

import { DeviceStatusName } from '../../utils/enums/deviceStatus';

/**
 * getFilteredSites
 * Selector method to get sites filtered based on stored filter object
 */
export const getFilteredSites = (state) => {
  let filteredSites = [];
  const selectedStatus = [];
  const selectedCustomers = [];
  const selectedAreas = [];
  const selectedLocations = [];
  let customerScopeOptions = [];
  let areasScopeOptions = [];
  let sitesScopeOptions = [];

  if (propertyExist(() => state.sites)) {
    const { filters, allSites } = state.sites;
    const { status, customer, area, location } = filters;
    if (status.length > 0) {
      status.forEach((statusElement) => {
        selectedStatus.push(
          statusElement.value === DeviceStatusName.Disconnected
            ? DeviceStatusName.Disconnected
            : statusElement.value
        );
      });
    }

    if (customer.length > 0) {
      customer.forEach((customerElement) => {
        selectedCustomers.push(customerElement.value);
      });
    }

    if (area.length > 0) {
      area.forEach((areaElement) => {
        selectedAreas.push(areaElement.value);
      });
    }

    if (location.length > 0) {
      location.forEach((locationElement) => {
        selectedLocations.push(locationElement.value);
      });
    }

    if (allSites.length > 0) {
      const {
        formattedSitesList,
        customersOptions,
        areasOptions,
        sitesOptions,
      } = getSites(
        allSites,
        selectedStatus,
        selectedCustomers,
        selectedAreas,
        selectedLocations
      );
      filteredSites = formattedSitesList;
      customerScopeOptions = customersOptions;
      areasScopeOptions = areasOptions;
      sitesScopeOptions = sitesOptions;

      if (filters) {
        if (filters.text) {
          filteredSites = filteredSites.filter(
            (site) =>
              stringContains(site.name, filters.text, false) ||
              stringContains(site.companyName, filters.text, false) ||
              stringContains(site.icianName, filters.text, false) ||
              stringContains(site.locationName, filters.text, false)
          );
        }

        if (!filters.showEmulatedSites) {
          const displayLiveSitesOnly = true;
          filteredSites = filteredSites.filter(
            (site) => site.live === displayLiveSitesOnly
          );
        }

        if (filters.assignedUser && filters.assignedUser !== AllIcianUsers) {
          const assignedUser = filters.assignedUser.toLowerCase();

          customerScopeOptions = customersOptions.filter((customerOption) => {
            if (customerOption.text === 'All') return customerOption;
            if (
              customerOption.assignedUsers &&
              customerOption.assignedUsers.includes(assignedUser)
            ) {
              return customerOption;
            }
            return null;
          });

          areasScopeOptions = areasOptions.filter((areaOption) => {
            if (areaOption.text === 'All') return areaOption;
            if (
              areaOption.assignedUsers &&
              areaOption.assignedUsers.includes(assignedUser)
            ) {
              return areaOption;
            }
            return null;
          });

          sitesScopeOptions = sitesOptions.filter((siteOption) => {
            if (siteOption.text === 'All') return siteOption;
            if (
              siteOption.assignedUsers &&
              siteOption.assignedUsers.includes(assignedUser)
            ) {
              return siteOption;
            }
            return null;
          });

          filteredSites = filteredSites.filter(
            (site) =>
              site.externalIcianId &&
              site.externalIcianId.toLowerCase() === assignedUser
          );
        }
      }
    }
  }

  /* eslint-disable no-param-reassign */
  if (customerScopeOptions && customerScopeOptions.length > 0) {
    customerScopeOptions.forEach((customerOption) => {
      delete customerOption.assignedUsersCustomer;
    });
  }

  if (areasScopeOptions && areasScopeOptions.length > 0) {
    areasScopeOptions.forEach((areaOption) => {
      delete areaOption.assignedUsersAreas;
    });
  }

  if (sitesScopeOptions && sitesScopeOptions.length > 0) {
    sitesScopeOptions.forEach((siteOption) => {
      delete siteOption.assignedUsersLocations;
    });
  }
  /* eslint-disable no-param-reassign */

  filteredSites.sort(
    (a, b) =>
      a.companyName.localeCompare(b.companyName) ||
      a.locationName.localeCompare(b.locationName) ||
      a.name.localeCompare(b.name)
  );

  customerScopeOptions.sort((a, b) => a.text.localeCompare(b.text));
  areasScopeOptions.sort((a, b) => a.text.localeCompare(b.text));
  sitesScopeOptions.sort((a, b) => a.text.localeCompare(b.text));

  return {
    filteredSites,
    customerScopeOptions,
    areasScopeOptions,
    sitesScopeOptions,
  };
};

/**
 * @method filterEvents
 * Filter array events data with params eventTypeId, deviceId, or groupId
 * @param {array} events receive array events data
 * @param {number} eventTypeId receive event type ID
 * @param {number} deviceId receive device ID
 * @param {number} groupId receive group ID
 * @returns {array}
 */
const filterEvents = (events, eventTypeId, deviceId, groupId) => {
  let filteredSiteEvents = [];
  // Filter by Event type
  filteredSiteEvents = events.filter((eventsItem) => {
    if (eventTypeId.toLowerCase() === SiteEventType.AllEvents.toLowerCase()) {
      return eventsItem;
    }
    return eventTypeId.toLowerCase() === eventsItem.eventTypeId.toLowerCase();
  });

  if (deviceId !== 0) {
    // Filter by device only if this is valid.
    filteredSiteEvents = filteredSiteEvents.filter(
      (eventsItem) => eventsItem.deviceId === deviceId
    );
  } else {
    // Filter by device group id, only if this is required
    filteredSiteEvents = filteredSiteEvents.filter(
      (eventsItem) =>
        eventsItem.deviceGroupName ===
        (groupId === DeviceListTypeId.All
          ? eventsItem.deviceGroupName
          : groupId)
    );
  }
  return filteredSiteEvents;
};

/**
 * getFilteredDeviceEvents
 * Selector method to get device events filtered based on stored eventFilters object
 * @param {Object} state Whole State to get device events.
 */
export const getFilteredDeviceEvents = (state) => {
  const sites = getValueIfExists(() => state.sites, null);
  let filteredSiteEvents = [];

  if (sites) {
    const { eventsFilters = {} } = sites.site;
    const {
      eventTypeId = 'All Events',
      deviceId = 0,
      groupId = 0,
    } = eventsFilters;
    const events = getValueIfExists(() => state.devices.deviceEvents, null);
    if (events) {
      filteredSiteEvents = filterEvents(events, eventTypeId, deviceId, groupId);
    }
  }
  return filteredSiteEvents;
};

/**
 * getFilteredSiteEvents
 * Selector method to get site events filtered based on stored eventFilters object
 * @param {Object} state Whole State to get site events.
 */
export const getFilteredSiteEvents = (state) => {
  const sites = getValueIfExists(() => state.sites, null);
  let filteredSiteEvents = [];

  if (sites) {
    const { events, eventsFilters = {} } = sites.site;
    const {
      eventTypeId = 'All Events',
      deviceId = 0,
      groupId = 0,
    } = eventsFilters;
    if (events) {
      filteredSiteEvents = filterEvents(events, eventTypeId, deviceId, groupId);
    }
  }
  return filteredSiteEvents;
};

// exclude column list from filter of auditLogs
const auditLogExcludeColumns = ['id'];

/**
 * @method getFilteredSiteAuditLog
 * Retrieves the filtered records from the site's audit logs.
 * It is necessary to listen the changes on filters applied in the reducer
 * when user is searching or requesting older records.
 * @param {Object} state Receives the sites statement to process.
 * @return {Object[]}
 */
// TODO: Add Unit Testing
export const getFilteredSiteAuditLog = (state) => {
  let filteredAuditLogs = [];
  if (!state) {
    return filteredAuditLogs;
  }
  const { sites } = state || {};
  const { site } = sites || {};
  const { auditLogFilters = { text: '' }, auditLogs } = site || {};
  const { results = [] } = auditLogs || {};

  if (auditLogFilters) {
    const lowercasedValue = auditLogFilters.text.toLowerCase();
    filteredAuditLogs = results.filter((item) =>
      Object.keys(item)
        .filter((key) => !auditLogExcludeColumns.includes(key))
        .some(
          (key) =>
            propertyExist(() => item[`${key}`]) &&
            item[`${key}`]
              .toString()
              .toLowerCase()
              .includes(lowercasedValue)
        )
    );
  }
  return filteredAuditLogs;
};

/**
 * @method getInitialAuditLogList
 * Gets the initial statement of the auditLog results list.
 * @param {Object} state The current statement.
 * @return {array}
 */
// TODO: Add Unit Testing
export const getAuditLogResults = (state) =>
  getValueIfExists(() => state.sites.site.auditLogs, {});
