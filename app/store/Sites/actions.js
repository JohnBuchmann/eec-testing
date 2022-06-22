import { apiRequest } from 'Store/api/actions';
import { doDelete, doGet, doPatch, doPost, doPut } from 'system/httpHelper';
import { endpointFormatter } from 'Utils/endpoint';
import { getValueIfExists, propertyExist } from 'Utils/propertyValidation';
import {
  CLEAN_SITE_AUDIT_LOG_FILTERS,
  DELETE_USER_PERMISSIONS,
  DELETE_USER_PERMISSIONS_FAIL,
  DELETE_USER_PERMISSIONS_START,
  FETCH_CA_CERTIFICATE,
  FETCH_CA_CERTIFICATE_FAIL,
  FETCH_COMPANIES_SITES_FAIL,
  FETCH_COMPANIES_SITES_START,
  FETCH_OKTA_USERS_FAIL,
  FETCH_OKTA_USERS_START,
  FETCH_SITES_FAIL,
  FETCH_SITES_ICIAN_USERS_FAIL,
  FETCH_SITES_ICIAN_USERS_START,
  FETCH_SITES_START,
  FETCH_SITE_AUDIT_LOG_FAIL,
  FETCH_SITE_BUS_BAND,
  FETCH_SITE_BUS_BAND_FAIL,
  FETCH_SITE_DETAILS,
  FETCH_SITE_DETAILS_FAIL,
  FETCH_SITE_EVENTS,
  FETCH_SITE_EVENTS_FAIL,
  FETCH_SITE_TELEMETRY,
  FETCH_SITE_TELEMETRY_FAIL,
  FETCH_SITE_TYPE_START,
  FETCH_TARIFF_STRUCTURE_FAIL,
  FETCH_TARIFF_STRUCTURE_START,
  FETCH_TIME_ZONES_FAIL,
  FETCH_TIME_ZONES_START,
  FETCH_USERS_PERMISSIONS_FAIL,
  FETCH_USERS_PERMISSIONS_START,
  PATCH_SITE_BUS_BAND_POINTS,
  PATCH_SITE_BUS_BAND_POINTS_FAIL,
  SET_BUS_BAND_STATUS,
  SET_BUS_BAND_STATUS_CLEAN,
  SET_BUS_BAND_STATUS_FAIL,
  SET_BUS_BAND_STATUS_START,
  SET_CA_CERTIFICATE,
  SET_COMPANIES_SITES,
  SET_CRADLE_POINT_ROUTER_ID,
  SET_CRADLE_POINT_ROUTER_ID_FAIL,
  SET_CRADLE_POINT_ROUTER_ID_START,
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
  SET_EDGE_DATA_TIMEOUT_START,
  SET_EDGE_DATA_TIMEOUT,
  SET_EDGE_DATA_TIMEOUT_FAIL,
  SET_SITE_TELEMETRY,
  SET_SITE_TYPE,
  SET_SITE_TYPE_FAIL,
  SET_TARIFF_STRUCTURE,
  SET_TARIFF_STRUCTURE_FAIL,
  SET_TARIFF_STRUCTURE_START,
  SET_TIME_ZONES,
  SET_TIME_ZONE_FAIL,
  SET_TIME_ZONE_START,
  SET_USERS_PERMISSIONS,
  UPDATE_BUS_BAND_TABS_DISABLED,
  UPDATE_TIME_ZONE,
  SET_SITE_USERNAME_PASSWORD,
  RESET_SITES_FILTERS,
} from './types';
import { formatCustomerAreas } from '../../utils/formatCustomerAreas';

/**
 * fetchSitesStart
 * Action creator to indicate fetch sites process started
 */
export const fetchSitesStart = () => ({
  type: FETCH_SITES_START,
});

/**
 * fetchSitesFail
 * Action creator to indicate fetch sites process failed
 */
export const fetchSitesFail = (error) => ({
  type: FETCH_SITES_FAIL,
  payload: error,
});

/**
 * setSites
 * Action creator to populate sites on the store
 * @param {array} sites array to store
 */
export const setSites = (sites) => {
  const formattedAreas = formatCustomerAreas(sites);
  return { type: SET_SITES, payload: formattedAreas };
};

/**
 * setSiteFiltersByStatus
 * Action creator to populate site status filter on the store
 * @param {array} statusFilters array for status to filter
 */
export const setSiteFiltersByStatus = (statusFilters) => ({
  type: SET_SITES_FILTERS_STATUS,
  payload: statusFilters,
});

/**
 * setSiteFiltersByCustomer
 * Action creator to populate site status filter on the store
 * @param {array} statusFilters array for status to filter
 */
export const setSiteFiltersByCustomer = (customerFilters) => ({
  type: SET_SITES_FILTERS_CUSTOMER,
  payload: customerFilters,
});

/**
 * setSiteFiltersByArea
 * Action creator to populate site status filter on the store
 * @param {array} statusFilters array for status to filter
 */
export const setSiteFiltersByArea = (areaFilters) => ({
  type: SET_SITES_FILTERS_AREA,
  payload: areaFilters,
});

/**
 * setSiteFiltersByLocation
 * Action creator to populate site status filter on the store
 * @param {array} statusFilters array for status to filter
 */
export const setSiteFiltersByLocation = (locationFilters) => ({
  type: SET_SITES_FILTERS_LOCATION,
  payload: locationFilters,
});

export const resetSiteFilters = () => ({
  type: RESET_SITES_FILTERS,
});

/**
 * setSiteFiltersByText
 * Action creator to populate site filter
 * @param {string} filterText string for site filter
 */
export const setSiteFiltersByText = (filterText) => ({
  type: SET_SITES_FILTERS_TEXT,
  payload: filterText,
});

/**
 * setSiteFiltersByEmulatedSites
 * Action creator to populate site filters with emulated sites view
 * @param {boolean} showEmulatedSites boolean to display emulated sites
 */
export const setSiteFiltersByEmulatedSites = (showEmulatedSites) => ({
  type: SET_SITES_FILTERS_EMULATED_SITES,
  payload: showEmulatedSites,
});

/**
 * getAllSites
 * Method to get all sites
 */
export const getAllSites = (showLoader = true) => (dispatch) =>
  new Promise(() => {
    dispatch(fetchSitesStart());

    const apiUrl = `${endpointFormatter('fetchSitesFilters')}`;
    dispatch(
      apiRequest(() => doGet(apiUrl), setSites, fetchSitesFail, showLoader)
    );
  });

/**
 * setSiteDetails
 * Action creator to populate site detail
 * @param {object} payload Object to set into the store
 */
export const setSiteDetails = (payload) => ({
  type: SET_SITE_DETAILS,
  payload,
});

/**
 * fetchSiteDetailsFail
 * Action creator to indicate fetch site details failed
 */
export const fetchSiteDetailsFail = () => ({
  type: FETCH_SITE_DETAILS_FAIL,
});

/**
 * getSiteInformation Method to get Site Details Information
 * @param {number} siteId id number to add into the request
 */
export const getSiteInformation = (siteId, isRefreshing = false) => (
  dispatch
) => {
  if (!isRefreshing) {
    dispatch({ type: FETCH_SITE_DETAILS });
  }

  const params = {
    siteId,
  };
  const apiUrl = `${endpointFormatter('fetchSiteDetail', params)}`;

  dispatch(
    apiRequest(() => doGet(apiUrl), setSiteDetails, fetchSiteDetailsFail, false)
  );
};

/**
 * setSiteEventFilters
 * Action creator to populate site event filter
 * @param {Object} eventFilters Object with eventTypeId, deviceId, groupId,
 */
export const setSiteEventFilters = (eventFilters) => ({
  type: SET_SITE_EVENT_FILTERS,
  payload: eventFilters,
});

/**
 * setSiteEvent
 * Action creator to populate site event
 * @param {object} payload Object to set into the store
 */
export const setSiteEvent = (payload) => ({
  type: SET_SITE_EVENTS,
  payload,
});

/**
 * fetchSiteEventsFail
 * Action creator to indicate fetch site events failed
 */
export const fetchSiteEventsFail = () => ({
  type: FETCH_SITE_EVENTS_FAIL,
});

/**
 * getSiteEvents Method to get Site Events and dispatch
 * @param {number} siteId id number to add into the request
 */
export const getSiteEvents = (siteId, isRefreshing = false) => (dispatch) => {
  if (!isRefreshing) {
    dispatch({ type: FETCH_SITE_EVENTS });
  }
  const params = {
    siteId,
  };
  const apiUrl = `${endpointFormatter('fetchSiteEvent', params)}`;

  dispatch(
    apiRequest(() => doGet(apiUrl), setSiteEvent, fetchSiteEventsFail, false)
  );
};

/**
 * setSiteTelemetry
 * Action creator to populate site telemetry
 * @param {object} payload Object to set into the store
 */
export const setSiteTelemetry = (payload) => ({
  type: SET_SITE_TELEMETRY,
  payload,
});

/**
 * fetchSiteTelemetryFail
 * Action creator to indicate fetch site telemetry failed
 */
export const fetchSiteTelemetryFail = () => ({
  type: FETCH_SITE_TELEMETRY_FAIL,
});

/**
 * getSiteOverview Method to get Site telemetry and dispatch
 * @param {number} siteId id number to add into the request
 */
export const getSiteOverview = (siteId, isRefreshing = false) => (dispatch) => {
  let showSpinner = false;
  if (!isRefreshing) {
    dispatch({
      type: FETCH_SITE_TELEMETRY,
    });
    showSpinner = true;
  }

  const params = {
    siteId,
  };
  const apiUrl = `${endpointFormatter('fetchSiteTelemetry', params)}`;

  dispatch(
    apiRequest(
      () => doGet(apiUrl),
      setSiteTelemetry,
      fetchSiteTelemetryFail,
      showSpinner
    )
  );
};

/**
 * setSiteFiltersByAssignedUser
 * Action creator to populate site filter
 * @param {string} assignedUser string to filter by ICIAN assigned user
 */
export const setSiteFiltersByAssignedUser = (assignedUser) => ({
  type: SET_SITES_FILTERS_ASSIGNED_USER,
  payload: assignedUser,
});

/**
 * setSitesIcianUsers
 * Action creator to populate sites assigned users on the store
 * @param {array} sites array to store
 */
export const setSitesIcianUsers = (sites) => ({
  type: SET_SITES_ICIAN_USERS,
  payload: sites,
});

/**
 * getSitesIcianUsers
 * Method to get all ICIAN users from endpoint
 */
export const getSitesIcianUsers = () => (dispatch) =>
  new Promise(() => {
    dispatch({ type: FETCH_SITES_ICIAN_USERS_START });
    const apiUrl = `${endpointFormatter('fetchSitesIcianUsers')}`;

    doGet(apiUrl, false)
      .then((data) => {
        dispatch(setSitesIcianUsers(data));
      })
      .catch(() => {
        dispatch({ type: FETCH_SITES_ICIAN_USERS_FAIL });
      });
  });

/* fetchSiteBusBand
 * Action creator to indicate fetch site bus band process started
 */
export const fetchSiteBusBand = () => ({
  type: FETCH_SITE_BUS_BAND,
});

/**
 * setSiteBusBand
 * Action creator to populate store bus band data
 * @param {object} payload Object to set bus band data into the store
 */
export const setSiteBusBand = (payload) => ({
  type: SET_SITE_BUS_BAND,
  payload,
});

/**
 * fetchSiteBusBandFail
 * Action creator to indicate fetch site bus band process failed
 */
export const fetchSiteBusBandFail = () => ({
  type: FETCH_SITE_BUS_BAND_FAIL,
});

/**
 * getSiteBusBand
 *  Method to get Site Bus Band data and dispatch
 * @param {number} siteId id number to add into the request
 */
export const getSiteBusBand = (siteId) => (dispatch) =>
  new Promise(() => {
    dispatch(fetchSiteBusBand());
    const params = {
      siteId,
    };
    const apiUrl = `${endpointFormatter('fetchSiteBusBand', params)}`;

    dispatch(
      apiRequest(() => doGet(apiUrl), setSiteBusBand, fetchSiteBusBandFail)
    );
  });

/**
 * setSiteAuditLog
 * Action creator to populate site audit logs records on the store
 * @param {array} payload array to store
 */
export const setSiteAuditLog = (payload) => ({
  type: SET_SITE_AUDIT_LOG,
  payload,
});

/**
 * setSiteAuditLogFilters
 * Action creator to populate site audit logs records filtered on the store
 * @param {array} payload array to store
 */
export const setSiteAuditLogFilters = (payload) => ({
  type: SET_SITE_AUDIT_LOG_FILTERS,
  payload,
});

/**
 * fetchSiteAuditLogFail
 * Action creator to indicate fetch site audit log records process failed
 */
export const fetchSiteAuditLogFail = () => ({
  type: FETCH_SITE_AUDIT_LOG_FAIL,
});

/**
 * fetchNewResultsToAuditLog
 * Action creator to indicate fetch site audit log records has new records to display.
 */
export const fetchNewResultsToAuditLog = (payload = []) => ({
  type: SET_SITE_AUDIT_LOG_MORE_RESULTS,
  payload,
});

/**
 * fetchCACertificateStart
 * Action creator to indicate fetch ca certificate started
 */
export const fetchCACertificateStart = () => ({
  type: FETCH_CA_CERTIFICATE,
});

/**
 * setCACertificate
 * Action creator to populate CA certificate
 * @param {object} payload Object to set into the store
 */
export const setCACertificate = (response) => {
  const hiddenElement = document.createElement('a');
  // eslint-disable-next-line
  hiddenElement.href = `data:attachment/text,${encodeURI(response)}`;
  hiddenElement.target = '_blank';
  hiddenElement.download = `CACertificate.pem`;
  hiddenElement.click();
  return {
    type: SET_CA_CERTIFICATE,
    payload: {},
  };
};

/**
 * fetchCACertificate
 * Action creator to indicate fetch ca certificate failed
 */
export const fetchCACertificateFail = () => ({
  type: FETCH_CA_CERTIFICATE_FAIL,
});

/**
 * @method getSiteAuditLog
 * Fetch the audit log records from the site selected.
 * @param {string} params The site id selected.
 * @return {void}
 */
export const getSiteAuditLog = (params, isRefreshing = false) => (dispatch) => {
  const { siteId } = params;
  const apiUrl = `${endpointFormatter('fetchSiteAuditLog', { siteId })}`;
  let showLoading = false;
  if (!isRefreshing) {
    showLoading = true;
  }
  dispatch(
    apiRequest(
      () => doPost(apiUrl, params),
      setSiteAuditLog,
      fetchSiteAuditLogFail,
      showLoading
    )
  );
};

/**
 * fetchSiteTypeStart
 * Action creator to indicate setting site type change started
 */
export const fetchSiteTypeStart = () => ({
  type: FETCH_SITE_TYPE_START,
});

/**
 * setSiteType
 * Action creator to populate site type response
 * @param {object} payload Object to set into the store
 * @param {object} selectedSiteType Object to set into the store
 */
export const setSiteType = (
  payload,
  selectedSiteTypeId,
  selectedSiteTypeName
) => ({
  type: SET_SITE_TYPE,
  payload: { ...payload, selectedSiteTypeId, selectedSiteTypeName },
});

/**
 * setUsernamePassword
 * Action to set plcId and password on site redux
 * @param {object} payload Object to set into the store
 */
export const setUsernamePassword = (payload) => ({
  type: SET_SITE_USERNAME_PASSWORD,
  payload,
});

/**
 * setSiteTypeFail
 * Action creator to indicate indicate setting site type change failed
 */
export const setSiteTypeFail = () => ({
  type: SET_SITE_TYPE_FAIL,
});

/**
 * @method getSiteFilteredAuditLog
 * Sets the auditLog statement with the current results of
 * the auditLogs received by the initial call to the API.
 * So the user can filter this list instead to create another request to the API.
 * @param {string} params The site id selected.
 * @return {void}
 */
export const getSiteFilteredAuditLog = (params) => (dispatch) => {
  dispatch(setSiteAuditLog(params));
};
/**
 * updateSiteType
 * Save the new site type for site on redux
 * @param {number} siteId id number to add into the request
 * @param {number} siteTypeId site type id number to add into the request
 * @param {number} siteTypeName site type name to add into the request
 */
export const updateSiteType = (siteId, siteTypeId, siteTypeName) => (
  dispatch
) => {
  dispatch(fetchSiteTypeStart());
  const params = {
    siteId,
  };
  const paramsData = {
    name: siteTypeName,
    siteTypeId,
  };
  const apiUrl = `${endpointFormatter('fetchNewUsernamePassword', params)}`;

  const onSuccess = () => {
    dispatch(setSiteType({}, siteTypeId, siteTypeName));
    return setUsernamePassword;
  };
  dispatch(
    apiRequest(() => doPost(apiUrl, paramsData), onSuccess, setSiteTypeFail)
  );
};

/**
 * fetchUsernamePassword
 * Update site type method and receives password and plcId from endpoint
 * @param {number} siteId id number to add into the request
 * @param {number} siteTypeId site type id number to add into the request
 * @param {number} siteTypeName site type name to add into the request
 */
export const fetchUsernamePassword = (siteId, siteTypeId, siteTypeName) => (
  dispatch
) => {
  dispatch(fetchSiteTypeStart());
  const params = {
    siteId,
  };
  const paramsData = {
    name: siteTypeName,
    siteTypeId,
  };
  const apiUrl = `${endpointFormatter('fetchNewUsernamePassword', params)}`;

  dispatch(
    apiRequest(
      () => doPost(apiUrl, paramsData),
      setUsernamePassword,
      setSiteTypeFail
    )
  );
};

/**
 * @method getMoreResultsAuditLog
 * Requests a new block of results from the date provided in parameters.
 * And then update the current list of results adding the new block.
 * @param {Object} params Includes all the parameters to
 * send the request to get the latest results.
 * @param {String} params.date The date of last record in the list or current moment.
 * @param {String} params.search The search text value to search data in the API Records.
 * @param {String} params.siteId The site Id to query.
 * @return {void}
 */
export const getMoreResultsAuditLog = (params) => (dispatch) => {
  const { siteId } = params;
  const apiUrl = `${endpointFormatter('fetchSiteAuditLog', { siteId })}`;
  dispatch(
    apiRequest(
      () => doPost(apiUrl, params),
      fetchNewResultsToAuditLog,
      fetchSiteAuditLogFail
    )
  );
};

/**
 * getCACertificate
 * Get CA certificate method
 * @param {number} siteId id number to add into the request
 */
export const getCACertificate = (siteId) => (dispatch) => {
  dispatch(fetchCACertificateStart());
  const params = {
    siteId,
  };
  const apiUrl = `${endpointFormatter('fetchCACertificate', params)}`;

  dispatch(
    apiRequest(
      () => doGet(apiUrl),
      setCACertificate,
      fetchCACertificateFail,
      false
    )
  );
};

/**
 * cleanAuditLogFilters
 * Clean audit log filters params
 */
export const cleanAuditLogFilters = () => ({
  type: CLEAN_SITE_AUDIT_LOG_FILTERS,
});

/**
 * fetchTariffStructureStart
 * Start fetch tariff structure
 */
export const fetchTariffStructureStart = () => ({
  type: FETCH_TARIFF_STRUCTURE_START,
});

/**
 * fetchOktaUsersStart
 * Start fetch okta users
 */
export const fetchOktaUsersStart = () => ({
  type: FETCH_OKTA_USERS_START,
});

/**
 * fetchOktaUsers
 * Set okta users to redux
 * @param {object} users receives users data
 */
export const setOktaUsers = (users) => ({
  type: SET_OKTA_USERS,
  payload: users,
});

/**
 * fetchOktaUsersFail
 * Save the error fail when fetch okta users
 * @param {object} error receives error data
 */
export const fetchOktaUsersFail = (error) => ({
  type: FETCH_OKTA_USERS_FAIL,
  payload: error,
});
/*
 * setTariffStructure
 * Save tariff structure information
 * @param {object} tariff receives tariff structure data
 */
export const setTariffStructure = (tariff) => ({
  type: SET_TARIFF_STRUCTURE,
  payload: tariff,
});

/**
 * fetchTariffStructureFail
 * Save the error fail when fetch tariff structure
 * @param {object} error receives error data
 */
export const fetchTariffStructureFail = (error) => ({
  type: FETCH_TARIFF_STRUCTURE_FAIL,
  payload: error,
});

/**
 * setTariffStructureStart
 * Start update tariff structure
 */
export const setTariffStructureStart = () => ({
  type: SET_TARIFF_STRUCTURE_START,
});

/**
 * setTariffStructureFail
 * Save the error fail when update tariff structure
 * @param {object} error receives error data
 */
export const setTariffStructureFail = (error) => ({
  type: SET_TARIFF_STRUCTURE_FAIL,
  payload: error,
});

/**
 * @method updateTariffStructure
 * fetchUsersPermissionsStart
 * Start fetch users permissions
 */
export const fetchUsersPermissionsStart = () => ({
  type: FETCH_USERS_PERMISSIONS_START,
});

/**
 * fetchUsersPermissions
 * Save users permissions to redux
 * @param {object} users receives users data
 */
export const setUsersPermissions = (users) => ({
  type: SET_USERS_PERMISSIONS,
  payload: users,
});

/**
 * fetchUsersPermissionsFail
 * Save the error fail when fetch users permissions
 * @param {object} error receives error data
 */
export const fetchUsersPermissionsFail = (error) => ({
  type: FETCH_USERS_PERMISSIONS_FAIL,
  payload: error,
});

/**
 * setTimeZoneStart
 * Start to set time zone
 */
export const setTimeZoneStart = () => ({
  type: SET_TIME_ZONE_START,
});

/**
 * setTimeZone
 * Save the time zone on redux
 * @param {object} timeZone receives time-zone data
 */
export const setTimeZone = (timeZone) => ({
  type: UPDATE_TIME_ZONE,
  payload: timeZone,
});

/**
 * setTimeZoneFail
 * Save the error fail when set time-zone
 * @param {object} error receives error data
 */
export const setTimeZoneFail = (error) => ({
  type: SET_TIME_ZONE_FAIL,
  payload: error,
});

/**
 * fetchTimeZonesStart
 * Start fetch time zones
 */
export const fetchTimeZonesStart = () => ({
  type: FETCH_TIME_ZONES_START,
});

/**
 * setTimeZones
 * @param {array} timeZones receives time zones array data
 */
export const setTimeZones = (timeZones) => ({
  type: SET_TIME_ZONES,
  payload: timeZones,
});

/**
 * fetchTimeZonesFail
 * Save the error fail when set time zones
 * @param {object} error receives error data
 */
export const fetchTimeZonesFail = (error) => ({
  type: FETCH_TIME_ZONES_FAIL,
  payload: error,
});

/**
 * deleteUserPermissionsStart
 * Start delete user permissions
 */
export const deleteUserPermissionsStart = () => ({
  type: DELETE_USER_PERMISSIONS_START,
});

/**
 * deleteUserPermissions
 * Delete user permissions from redux
 * @param {number} userId receives user ID
 */
export const deleteUserPermissions = (userId) => ({
  type: DELETE_USER_PERMISSIONS,
  payload: userId,
});

/**
 * deleteUserPermissionsFail
 * Save the error fail when delete user permissions
 * @param {object} error receives error data
 */
export const deleteUserPermissionsFail = (error) => ({
  type: DELETE_USER_PERMISSIONS_FAIL,
  payload: error,
});

/**
 * fetchCompaniesSitesStart
 * Start fetch companies sites
 */
export const fetchCompaniesSitesStart = () => ({
  type: FETCH_COMPANIES_SITES_START,
});

/**
 * setCompaniesSites
 * Save companies sites to redux
 * @param {array} companies receives companies array data
 */
export const setCompaniesSites = (companies) => ({
  type: SET_COMPANIES_SITES,
  payload: companies,
});

/**
 * fetchCompaniesSitesFail
 * Save the error fail when fetch companies sites
 * @param {object} error receives error data
 */
export const fetchCompaniesSitesFail = (error) => ({
  type: FETCH_COMPANIES_SITES_FAIL,
  payload: error,
});

/**
 * @method getOktaUsers
 * Request to get all okta users from endpoint
 */
export const getOktaUsers = () => (dispatch) => {
  dispatch(fetchOktaUsersStart());
  const apiUrl = `${endpointFormatter('fetchOktaUsers')}`;

  dispatch(
    apiRequest(() => doGet(apiUrl), setOktaUsers, fetchOktaUsersFail, false)
  );
};

/**
 * @method getUsersPermissions
 * Request to get all user permissions from endpoint
 * @param {string} siteId receives site ID
 */
export const getUsersPermissions = (siteId) => (dispatch) => {
  dispatch(fetchUsersPermissionsStart());
  const params = {
    siteId,
  };
  const apiUrl = `${endpointFormatter('fetchSitesPermissions', params)}`;

  dispatch(
    apiRequest(
      () => doGet(apiUrl),
      setUsersPermissions,
      fetchUsersPermissionsFail
    )
  );
};

/**
 * @method addUsersPermissions
 * Request to add or update user permissions from endpoint
 * @param {string} siteId receives site ID
 * @param {object} data receives params data to send
 */
export const addUsersPermissions = (siteId, data) => (dispatch) => {
  dispatch(fetchUsersPermissionsStart());
  const params = {
    siteId,
  };
  const apiUrl = `${endpointFormatter('fetchSitesPermissions', params)}`;
  const onSuccess = (response) => {
    if (propertyExist(() => data.isPermissioned)) {
      return setUsersPermissions({
        ...response,
        isPermissioned: data.isPermissioned,
      });
    }
    return setUsersPermissions(response);
  };

  dispatch(
    apiRequest(
      () => doPatch(apiUrl, data),
      onSuccess,
      fetchUsersPermissionsFail
    )
  );
};

/**
 * @method removeUserPermissions
 * Request to remove user from user permissions from endpoint
 * @param {number} siteId receives site ID
 * @param {number} userId receives user ID
 */
export const removeUserPermissions = (siteId, userId) => (dispatch) => {
  dispatch(deleteUserPermissionsStart());
  const params = {
    siteId,
    userId,
  };
  const apiUrl = `${endpointFormatter('deleteSitesPermissions', params)}`;
  const onSuccess = () => deleteUserPermissions(userId);

  dispatch(
    apiRequest(() => doDelete(apiUrl), onSuccess, deleteUserPermissionsFail)
  );
};

/**
 * @method updateTimeZone
 * Request to update time zone from endpoint
 * @param {string} siteId receives site ID
 * @param {object} data receives params data to send
 */
export const updateTimeZone = (siteId, data) => (dispatch) => {
  dispatch(setTimeZoneStart());
  const params = {
    siteId,
  };
  const apiUrl = `${endpointFormatter('updateTimeZone', params)}`;
  const onSuccess = () => setTimeZone(data);

  dispatch(apiRequest(() => doPut(apiUrl, data), onSuccess, setTimeZoneFail));
};

/**
 * @method getTimeZones
 * Request to get all time zones by country ID from endpoint
 * @param {string} country receives country ID
 */
export const getTimeZones = (country) => (dispatch) => {
  dispatch(fetchTimeZonesStart());
  const params = {
    country,
  };
  const apiUrl = `${endpointFormatter('fetchTimeZones', params)}`;

  dispatch(apiRequest(() => doGet(apiUrl), setTimeZones, fetchTimeZonesFail));
};

/**
 * updateTariffStructure
 * Request to update tariff structure information by site ID
 * @param {string} siteId receives site ID
 * @param {object} params receives params to request
 * @param {object} tariffStructure receives tariffStructure to validate
 */
export const updateTariffStructure = (siteId, params, tariffStructure) => (
  dispatch
) => {
  dispatch(setTariffStructureStart());
  let paramsUrl = {
    siteId,
  };
  let apiUrl = `${endpointFormatter('fetchTariffStructure', paramsUrl)}`;
  const onRequest = () => {
    if (propertyExist(() => tariffStructure.id)) {
      paramsUrl = {
        ...paramsUrl,
        tariffId: tariffStructure.id,
      };
      apiUrl = `${endpointFormatter('updateTariffStructure', paramsUrl)}`;
      return doPut(apiUrl, params);
    }
    return doPost(apiUrl, params);
  };
  dispatch(apiRequest(onRequest, setTariffStructure, setTariffStructureFail));
};

/**
 * @method getTariffStructure
 * Request to fetch tariff structure by site ID from endpoint
 * @param {*} siteId receives site ID
 */
export const getTariffStructure = (siteId) => (dispatch) => {
  dispatch(fetchTariffStructureStart());
  const paramsUrl = {
    siteId,
  };
  const apiUrl = `${endpointFormatter('fetchTariffStructure', paramsUrl)}`;
  dispatch(
    apiRequest(
      () => doGet(apiUrl),
      setTariffStructure,
      fetchTariffStructureFail
    )
  );
};

/**
 * patchBusBandPoints
 * Action creator to set report of
 * @param {array} payload notification array to store
 */
export const patchBusBandPointsSuccess = (payload) => ({
  type: PATCH_SITE_BUS_BAND_POINTS,
  payload,
});

/**
 * patchBusBandPointsFail
 * Action creator to indicate patch busband points failed
 */
export const patchBusBandPointsFail = () => ({
  type: PATCH_SITE_BUS_BAND_POINTS_FAIL,
});

/**
 * @method patchBusBandPoints
 * patchBusBandPoints method to patch busbund points
 * @param {number} siteId siteId to get updated by this patch
 * @param {object} busBandPoints  object with points
 */
export const patchBusBandPoints = (siteId, busBandPoints) => (dispatch) => {
  const paramsUrl = {
    siteId,
  };
  const apiUrl = `${endpointFormatter('patchSiteBusBandPoints', paramsUrl)}`;

  dispatch(
    apiRequest(
      () => doPatch(apiUrl, busBandPoints),
      patchBusBandPointsSuccess,
      patchBusBandPointsFail,
      true
    )
  );
};

/**
 * @method cleanBusBandPoints
 * cleanBusBandPoints method to patch clean after saving
 */
export const cleanBusBandPoints = () => (dispatch) => {
  dispatch(patchBusBandPointsSuccess({}));
};

/**
 * @method getAllCompaniesSites
 * Request companies & sites from end point
 */
export const getAllCompaniesSites = () => (dispatch) => {
  dispatch(fetchCompaniesSitesStart());
  const apiUrl = `${endpointFormatter('fetchSitesCompanies')}`;

  dispatch(
    apiRequest(() => doGet(apiUrl), setCompaniesSites, fetchCompaniesSitesFail)
  );
};
/*
 * setCradlePointRouterIdStart
 * Start to set cradlepoint
 */
export const setCradlePointRouterIdStart = () => ({
  type: SET_CRADLE_POINT_ROUTER_ID_START,
});

/**
 * setCradlePointRouterId
 * Set cradlepoint router id to redux
 * @param {string} point receives point data
 */
export const setCradlePointRouterId = (payload) => ({
  type: SET_CRADLE_POINT_ROUTER_ID,
  payload,
});

/**
 * setCradlePointRouterIdFail
 * Save when fail to set cradlepoint
 * @param {object} error receives error data
 */
export const setCradlePointRouterIdFail = (error) => ({
  type: SET_CRADLE_POINT_ROUTER_ID_FAIL,
  payload: error,
});

/**
 * @method updateCradlePoint
 * Request to update cradlepoint from endpoint
 * @param {number} siteId siteId to get updated by this patch
 * @param {string} point receives point data
 */
export const updateCradlePoint = (siteId, point) => (dispatch) => {
  dispatch(setCradlePointRouterIdStart());
  const paramsUrl = {
    siteId,
  };
  const data = {
    routerId: point,
  };
  const apiUrl = `${endpointFormatter('setCradlePointRouterId', paramsUrl)}`;
  const onSuccess = () => setCradlePointRouterId(point);

  dispatch(
    apiRequest(
      () => doPatch(apiUrl, data),
      onSuccess,
      setCradlePointRouterIdFail,
      true
    )
  );
};

/*
 * setEdgeDataTimeoutStart
 * Start to set edge data
 */
export const setEdgeDataTimeoutStart = () => ({
  type: SET_EDGE_DATA_TIMEOUT_START,
});

/**
 * setEdgeDataTimeout
 * Set edge data timeout to redux
 * @param {string} point receives point data
 */
export const setEdgeDataTimeout = (payload) => ({
  type: SET_EDGE_DATA_TIMEOUT,
  payload,
});

/**
 * setEdgeDataTimeoutFail
 * Save when fail to set edge data
 * @param {object} error receives error data
 */
export const setEdgeDataTimeoutFail = (error) => ({
  type: SET_EDGE_DATA_TIMEOUT_FAIL,
  payload: error,
});

/**
 * @method updateEdgeDataTimeout
 * Request to update edge data timeout from endpoint
 * @param {number} siteId siteId to get updated by this patch
 * @param {string} edgeTimeout receives edge data
 */
export const updateEdgeDataTimeout = (siteId, edgeTimeout) => (dispatch) => {
  dispatch(setEdgeDataTimeoutStart());
  const paramsUrl = {
    siteId,
  };
  const data = {
    edgeDataTimeout: edgeTimeout,
  };
  const apiUrl = `${endpointFormatter('setEdgeDataTimeout', paramsUrl)}`;
  const onSuccess = () => setEdgeDataTimeout(edgeTimeout);

  dispatch(
    apiRequest(
      () => doPatch(apiUrl, data),
      onSuccess,
      setEdgeDataTimeoutFail,
      true
    )
  );
};

/**
 * updateBusBandTabsDisabled
 * Set to state to update busBand tabs disabled on redux
 * @param {boolean} payload receives state to tabs
 */
export const updateBusBandTabsDisabled = (payload) => ({
  type: UPDATE_BUS_BAND_TABS_DISABLED,
  payload,
});

/*
 * postBusBandStatusStart
 * Start to post Bus Band Status
 */
export const postBusBandStatusStart = () => ({
  type: SET_BUS_BAND_STATUS_START,
});

/**
 * postBusBandStatusSet
 * Set bus band status to redux
 * @param {object} payload data with the status and user
 */
export const postBusBandStatusSet = (payload) => ({
  type: SET_BUS_BAND_STATUS,
  payload,
});

/**
 * postBusBandStatusFail
 * Save bus band status when it fails
 * @param {object} error receives error data
 */
export const postBusBandStatusFail = (error) => {
  const errorMessage = getValueIfExists(
    () => error.response.data.errors.busbandStateId[0].message,
    'error'
  );
  return {
    type: SET_BUS_BAND_STATUS_FAIL,
    payload: errorMessage,
  };
};

/**
 * postBusBandStatusFail
 * Save bus band status when it fails
 * @param {object} error receives error data
 */
export const cleanBusBandStatus = () => (dispatch) => {
  dispatch({
    type: SET_BUS_BAND_STATUS_CLEAN,
  });
};

/**
 * postBusBandStatus
 * It call end point postBusBandStatus to set bus band status
 * @param {string} status to set into data base
 * @param {number} siteId site to set status
 */
export const postBusBandStatus = (status, siteId) => (dispatch) => {
  dispatch(postBusBandStatusStart());
  const bodyRequest = { status };
  const apiUrl = `${endpointFormatter('postBusBandStatus', { siteId })}`;
  dispatch(
    apiRequest(
      () => doPost(apiUrl, bodyRequest),
      postBusBandStatusSet,
      postBusBandStatusFail,
      true
    )
  );
};
