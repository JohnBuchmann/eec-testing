import { busBandEditingStatus } from 'Utils/busband';
import { DeviceListTypeId } from 'Utils/enums/device';
import { SiteEventType } from 'Utils/enums/siteEvent';
import { getCamelCase, getPointByName } from 'Utils/propertyHelpers';
import {
  firstElement,
  getValueIfExists,
  propertyExist,
} from 'Utils/propertyValidation';
import {
  CLEAN_SITE_AUDIT_LOG_FILTERS,
  DELETE_USER_PERMISSIONS,
  FETCH_SITES_FAIL,
  FETCH_SITES_ICIAN_USERS_FAIL,
  FETCH_SITES_ICIAN_USERS_START,
  FETCH_SITES_START,
  FETCH_SITE_AUDIT_LOG,
  FETCH_SITE_AUDIT_LOG_FAIL,
  FETCH_SITE_BUS_BAND,
  FETCH_SITE_DETAILS,
  FETCH_SITE_EVENTS,
  FETCH_SITE_TELEMETRY,
  FETCH_SITE_TELEMETRY_FAIL,
  PATCH_SITE_BUS_BAND_POINTS,
  PATCH_SITE_BUS_BAND_POINTS_FAIL,
  SET_BUS_BAND_STATUS,
  SET_BUS_BAND_STATUS_CLEAN,
  SET_BUS_BAND_STATUS_FAIL,
  SET_BUS_BAND_STATUS_START,
  SET_CA_CERTIFICATE,
  SET_COMPANIES_SITES,
  SET_CRADLE_POINT_ROUTER_ID,
  SET_OKTA_USERS,
  SET_SITES,
  SET_SITES_FILTERS_ASSIGNED_USER,
  SET_SITES_FILTERS_STATUS,
  SET_SITES_FILTERS_CUSTOMER,
  SET_SITES_FILTERS_AREA,
  SET_SITES_FILTERS_LOCATION,
  SET_SITES_FILTERS_TEXT,
  SET_SITES_FILTERS_EMULATED_SITES,
  SET_SITES_ICIAN_USERS,
  SET_SITE_AUDIT_LOG,
  SET_SITE_AUDIT_LOG_FILTERS,
  SET_SITE_AUDIT_LOG_MORE_RESULTS,
  SET_SITE_BUS_BAND,
  SET_SITE_DETAILS,
  SET_SITE_EVENTS,
  SET_SITE_EVENT_FILTERS,
  SET_SITE_TELEMETRY,
  SET_SITE_TYPE,
  SET_TARIFF_STRUCTURE,
  SET_TIME_ZONES,
  SET_USERS_PERMISSIONS,
  UPDATE_BUS_BAND_TABS_DISABLED,
  UPDATE_TIME_ZONE,
  SET_SITE_USERNAME_PASSWORD,
  RESET_SITES_FILTERS,
} from './types';

const initialState = {
  companiesSites: [],
  timeZones: [],
  oktaUsers: [],
  usersPermissions: {},
  allSites: [],
  icianUsers: [],
  loading: false,
  filters: {
    text: '',
    status: [],
    customer: [],
    area: [],
    location: [],
    assignedUser: '',
    showEmulatedSites: false,
    isAreaDropwonDisabled: true,
    isLocationDropwonDisabled: true,
  },
  site: {
    siteId: '',
    name: '',
    location: {
      customer: {
        primaryContact: {},
      },
      address: {},
    },
    address: {},
    timeZone: { country: '', name: '', timeZoneId: 0 },
    type: '',
    siteType: {
      siteTypeId: 0,
      name: '',
    },
    plcId: '',
    password: '',
    caCertificate: {
      url: '',
    },
    tariffStructure: {},
    busBand: {
      configuration: {},
      formattedConfiguration: {},
      lastPointsUpdated: {},
      editionAvailable: {
        status: null,
        message: '',
      },
    },
    busbandStateId: null,
    userEditingBusband: null,
    events: [],
    overview: null,
    eventsFilters: {
      eventTypeId: SiteEventType.AllEvents,
      deviceId: 0,
      groupId: DeviceListTypeId.All,
    },
    auditLogs: {
      date: null,
      siteId: 0,
      page: 0,
      totalResults: 0,
      results: [],
    },
    auditLogsFilters: { text: '' },
    routerId: '',
  },
  busBandTabsDisabled: false,
};

/**
 * formatBusBandData
 * Format BusBand object to create an array of all available values.
 * @param {Object} busBand BusBand Configuration Object to format
 * @returns {Object} returns a formatted object of the BusBand object
 */
export const formatBusBandData = (busBand) => {
  const defaultActiveColumnIndex = 1;
  const activeColumn = firstElement(getValueIfExists(() => busBand.points, []));
  const formattedConfiguration = {
    busBandConfiguration: [],
    groups: [],
    rowsBasic: [],
    activeColumn: getValueIfExists(
      () => activeColumn.value,
      defaultActiveColumnIndex
    ),
  };
  if (propertyExist(() => busBand.group) && busBand.group.length) {
    // Get columns names
    const busBandColumns = busBand.group.map((busBandItem) => ({
      formattedNameId: getCamelCase(busBandItem.name),
      nameId: busBandItem.name,
      name: busBandItem.label,
    }));
    formattedConfiguration.groups = busBandColumns;

    // Get rows names
    const elementsGroupBase = getValueIfExists(
      () => firstElement(busBand.group).points,
      []
    );
    const busBandRow = elementsGroupBase.map((point) => ({
      nameId: point.name,
      name: point.label,
    }));
    formattedConfiguration.rowsBasic = busBandRow;

    // Format to set the entry point into the value for each element on the array
    formattedConfiguration.busBandConfiguration = busBandRow.map((row) => {
      const columnItems = {};
      busBandColumns.forEach((column) => {
        const groupPoints = busBand.group.find(
          (group) => group.name === column.nameId
        );
        const pointItem = getPointByName(
          getValueIfExists(() => groupPoints.points, []),
          row.nameId
        );
        columnItems[`${column.formattedNameId}`] = pointItem;
      });
      return {
        id: row.nameId,
        name: row.name,
        ...columnItems,
      };
    });
  }
  return formattedConfiguration;
};

/**
 * formatSiteEvents it will format this array into another with the parent property at the same level.
 * @param {array} events it is an array of array to format
 * @returns {array} it returns a formatted flatted array
 */
const formatSiteEvents = (events) => {
  const formattedEventsArray = [];
  if (events) {
    // eslint-disable-next-line
    console.log('formatSiteEvents');
    events.forEach((siteEventGroup) => {
      const { events: eventList = [] } = siteEventGroup;
      eventList.forEach((eventItem) => {
        formattedEventsArray.push({
          ...eventItem,
          eventTypeId: siteEventGroup.name,
        });
      });
    });
  }
  return formattedEventsArray;
};

/**
 * @method formatTimeZonesData
 * Format time zones objects with new properties text and value, this for
 * using on dropdown data
 * @param {array} timeZones receives action.payload data from redux
 * @returns {array}
 */
const formatTimeZonesData = (timeZones) => {
  if (timeZones) {
    return timeZones.map((time) => ({
      ...time,
      value: time.timeZoneId,
      text: time.name,
    }));
  }
  return [];
};

/**
 * @method removeUserInUserPermissions
 * Remove user from user's array filtering by user ID
 * @param {array} users receives users array from redux
 * @param {number} userId receives user ID
 */
const removeUserInUserPermissions = (users, userId) =>
  users.filter((user) => user.userId !== userId);

/**
 * @method removeOktaUsersFromUserPermissions
 * Remove okta users which exist in user permissions
 * @param {Array} oktaUsers receives okta users array
 * @param {Array} usersPermissions receives user permissions array
 * @returns {Array}
 */
const removeOktaUsersFromUserPermissions = (oktaUsers, usersPermissions) =>
  oktaUsers.filter((user) => {
    if (
      !usersPermissions.filter((perm) => perm.externalId === user.profile.email)
        .length
    ) {
      return true;
    }
    return false;
  });

/**
 * sitesReducer
 * Selector method to get sites filtered based on stored filter object
 * @param {object} state current redux state for sites
 * @param {object} action action creator object
 */
const sitesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SITES:
      return { ...state, allSites: action.payload };
    case FETCH_SITES_START:
      return { ...state, loading: true };
    case FETCH_SITES_FAIL:
      return { ...state, loading: false };

    case SET_SITES_ICIAN_USERS:
      return { ...state, icianUsers: action.payload };
    case FETCH_SITES_ICIAN_USERS_START:
      return { ...state, loading: true };
    case FETCH_SITES_ICIAN_USERS_FAIL:
      return { ...state, loading: false };

    case FETCH_SITE_AUDIT_LOG_FAIL:
      return {
        ...state,
        loading: false,
        site: {
          ...state.site,
          auditLogs: [],
        },
      };

    case FETCH_SITE_DETAILS:
      return { ...state, loading: true };

    case FETCH_SITE_EVENTS:
      return { ...state, loading: true };

    case FETCH_SITE_TELEMETRY:
      return {
        ...state,
        loading: true,
        site: {
          ...state.site,
          overview: {},
        },
      };
    case FETCH_SITE_BUS_BAND:
      return { ...state, loading: true };
    case FETCH_SITE_AUDIT_LOG:
      return { ...state, loading: true };

    case SET_SITES_FILTERS_STATUS:
      return {
        ...state,
        filters: { ...state.filters, status: action.payload },
      };
    case SET_SITES_FILTERS_CUSTOMER:
      return {
        ...state,
        filters: {
          ...state.filters,
          customer: action.payload,
          isAreaDropwonDisabled: false,
        },
      };
    case SET_SITES_FILTERS_AREA:
      return {
        ...state,
        filters: {
          ...state.filters,
          area: action.payload,
          isLocationDropwonDisabled: false,
        },
      };
    case SET_SITES_FILTERS_LOCATION:
      return {
        ...state,
        filters: { ...state.filters, location: action.payload },
      };

    case RESET_SITES_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          isLocationDropwonDisabled: true,
          isAreaDropwonDisabled: true,
          status: [],
          customer: [],
          area: [],
          location: [],
        },
      };
    case SET_SITES_FILTERS_TEXT:
      return {
        ...state,
        filters: { ...state.filters, text: action.payload },
      };
    case SET_SITES_FILTERS_ASSIGNED_USER:
      return {
        ...state,
        filters: { ...state.filters, assignedUser: action.payload },
      };
    case SET_SITES_FILTERS_EMULATED_SITES:
      return {
        ...state,
        filters: { ...state.filters, showEmulatedSites: action.payload },
      };
    case SET_SITE_DETAILS:
      return {
        ...state,
        loading: false,
        site: {
          ...action.payload,
          events: state.site.events,
          eventsFilters: state.site.eventsFilters,
          overview: state.site.overview,
          auditLogs: state.site.auditLogs,
          auditLogsFilters: state.site.auditLogsFilters,
          busBand: state.site.busBand,
        },
      };
    case SET_SITE_EVENTS:
      return {
        ...state,
        loading: false,
        site: {
          ...state.site,
          events: formatSiteEvents(action.payload),
        },
      };
    case SET_SITE_EVENT_FILTERS:
      return {
        ...state,
        loading: false,
        site: {
          ...state.site,
          eventsFilters: action.payload,
        },
      };
    case SET_SITE_TELEMETRY:
      return {
        ...state,
        loading: false,
        site: {
          ...state.site,
          overview: action.payload,
        },
      };
    case FETCH_SITE_TELEMETRY_FAIL:
      return {
        ...state,
        loading: false,
        site: {
          ...state.site,
          overview: {},
        },
      };
    case SET_SITE_BUS_BAND:
      return {
        ...state,
        loading: false,
        site: {
          ...state.site,
          busBand: {
            ...state.site.busBand,
            configuration: action.payload,
            formattedConfiguration: formatBusBandData(action.payload),
            lastPointsUpdated: {},
          },
        },
      };

    case PATCH_SITE_BUS_BAND_POINTS:
      return {
        ...state,
        loading: false,
        site: {
          ...state.site,
          busBand: {
            ...state.site.busBand,
            lastPointsUpdated: action.payload,
          },
        },
      };

    case PATCH_SITE_BUS_BAND_POINTS_FAIL:
      return {
        ...state,
        loading: false,
        site: {
          ...state.site,
          busBand: {
            ...state.site.busBand,
            lastPointsUpdated: { error: action.payload },
          },
        },
      };

    case SET_BUS_BAND_STATUS:
      return {
        ...state,
        loading: false,
        site: {
          ...state.site,
          busBand: {
            ...state.site.busBand,
            editionAvailable: {
              status: busBandEditingStatus.Available,
              message: action.payload.userEditingBusband,
            },
          },
        },
      };
    case SET_BUS_BAND_STATUS_START:
      return {
        ...state,
        loading: true,
      };

    case SET_BUS_BAND_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        site: {
          ...state.site,
          busBand: {
            ...state.site.busBand,
            editionAvailable: {
              status: busBandEditingStatus.Unavailable,
              message: action.payload,
            },
          },
        },
      };

    case SET_BUS_BAND_STATUS_CLEAN:
      return {
        ...state,
        loading: false,
        site: {
          ...state.site,
          busBand: {
            ...state.site.busBand,
            editionAvailable: {},
          },
        },
      };

    case SET_SITE_AUDIT_LOG:
      return {
        ...state,
        loading: false,
        site: {
          ...state.site,
          auditLogs: action.payload,
        },
      };
    case SET_SITE_AUDIT_LOG_FILTERS:
      return {
        ...state,
        loading: false,
        site: {
          ...state.site,
          auditLogFilters: action.payload,
        },
      };
    case SET_SITE_AUDIT_LOG_MORE_RESULTS:
      return {
        ...state,
        loading: false,
        site: {
          ...state.site,
          auditLogs: {
            ...action.payload,
            results: [
              ...state.site.auditLogs.results,
              ...action.payload.results,
            ],
          },
        },
      };
    case SET_CA_CERTIFICATE:
      return {
        ...state,
        loading: false,
        site: {
          ...state.site,
          caCertificate: action.payload,
        },
      };
    case CLEAN_SITE_AUDIT_LOG_FILTERS:
      return {
        ...state,
        loading: false,
        site: {
          ...state.site,
          auditLogFilters: { text: '' },
        },
      };
    case SET_OKTA_USERS:
      return {
        ...state,
        oktaUsers: removeOktaUsersFromUserPermissions(
          action.payload,
          state.usersPermissions.users
        ),
      };
    case SET_USERS_PERMISSIONS:
      return {
        ...state,
        usersPermissions: action.payload,
      };
    case UPDATE_TIME_ZONE:
      return {
        ...state,
        site: {
          ...state.site,
          timeZone: action.payload,
        },
      };
    case SET_TIME_ZONES:
      return {
        ...state,
        timeZones: formatTimeZonesData(action.payload),
      };
    case DELETE_USER_PERMISSIONS:
      return {
        ...state,
        usersPermissions: {
          ...state.usersPermissions,
          users: removeUserInUserPermissions(
            state.usersPermissions.users,
            action.payload
          ),
        },
      };
    case SET_SITE_TYPE:
      return {
        ...state,
        loading: false,
        site: {
          ...state.site,
          siteType: {
            siteTypeId: action.payload.selectedSiteTypeId,
            name: action.payload.selectedSiteTypeName,
          },
        },
      };
    case SET_SITE_USERNAME_PASSWORD:
      return {
        ...state,
        loading: false,
        site: {
          ...state.site,
          plcId: action.payload.plcId,
          password: action.payload.password,
        },
      };
    case SET_TARIFF_STRUCTURE:
      return {
        ...state,
        loading: false,
        site: {
          ...state.site,
          tariffStructure: action.payload,
        },
      };
    case SET_COMPANIES_SITES:
      return {
        ...state,
        companiesSites: action.payload,
      };
    case SET_CRADLE_POINT_ROUTER_ID:
      return {
        ...state,
        loading: false,
        site: {
          ...state.site,
          routerId: action.payload,
        },
      };
    case UPDATE_BUS_BAND_TABS_DISABLED:
      return {
        ...state,
        busBandTabsDisabled: action.payload,
      };
    default:
      return state;
  }
};

export default sitesReducer;
