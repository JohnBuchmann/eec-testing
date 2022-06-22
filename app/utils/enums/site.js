/**
 * Site.js under utility contains const to define possible kind of Sites and their status with predefined icon
 */
import images from 'Assets/images';
import { firstElement, getValueIfExists } from 'Utils/propertyValidation';

/**
 * @property {Object} SiteStatusPointName  Enum for site status point name identifier
 */
export const SiteStatusPointName = {
  SiteStatus: 'Site_Status',
  SiteMode: 'Island_Mode_Init',
  ConnectionStatus: 'Comm_Status',
};

/**
 * @property {Object} SiteStatusName The is the enum of names for site status.
 */
export const SiteStatusName = {
  Maintenance: 'Maintenance',
  Faulted: 'Fault',
  Alarm: 'Alarm',
  Warning: 'Warning',
  Ok: 'Ok',
  Disconnected: 'Disconnected', // TODO : Check if this item is not a connection status intead of site status
};

/**
 * @property {Object} SiteConnectionName The is the enum of names for site connection.
 */
export const SiteConnectionName = {
  Landline: 'Landline',
  Disconnected: 'Disconnected',
  Cellular: 'Cellular',
  Unknown: 'Unknown',
};

/**
 * @property {Object} SiteModeName The is the enum of names for site mode.
 */
export const SiteModeName = {
  tower: 'Tower Mode',
  island: 'Island Mode',
};

/**
 * @property {Object[]} SiteStatusId The is the catalogue  of ids for site status.
 */
export const SiteModeId = {
  None: 0,
  Island: 1,
  Tower: 2,
};

/**
 * @property {Object[]} SiteStatusId The is the catalogue  of ids for site status.
 */
export const SiteStatusId = {
  Maintenance: 1,
  Faulted: 2,
  Alarm: 3,
  Warning: 4,
  Ok: 5,
  Disconnected: 6,
};

/**
 * @property {Object[]} SiteConnectionId The is the catalogue  of ids for site connection.
 */
export const SiteConnectionId = {
  Connected: 1,
  Cellular: 2,
  Disconnected: 3,
  Unknown: 4,
};

/**
 * @property {Object} TabsOptions Options of tab dashboard
 */
export const TabsOptions = {
  MySite: 'My sites',
  All: 'All',
};

/**
 * @property {Object[]} AvailableTabsDashboard The is the catalogue of tabs on dashboard
 */
export const AvailableTabsDashboard = [
  { key: 1, title: TabsOptions.MySite },
  { key: 2, title: TabsOptions.All },
];

/**
 * @property {Object[]} SiteStatus The is the catalogue for site status.
 */
export const SiteStatus = [
  {
    icon: images.iconMaintenance,
    name: SiteStatusName.Maintenance,
    id: SiteStatusId.Maintenance,
    class: 'statusBadgeMaintenance',
    iconClass: 'statusIconMaintenance',
    pinMapIcon: images.pinMaintenance,
  },
  {
    icon: images.iconFaulted,
    name: SiteStatusName.Faulted,
    id: SiteStatusId.Faulted,
    class: 'statusBadgeFaulted',
    iconClass: 'statusIconFaulted',
    pinMapIcon: images.pinFaulted,
  },
  {
    icon: images.iconAlarm,
    name: SiteStatusName.Alarm,
    id: SiteStatusId.Alarm,
    class: 'statusBadgeAlarm',
    iconClass: 'statusIconAlarm',
    pinMapIcon: images.pinAlarm,
  },
  {
    icon: images.iconWarning,
    name: SiteStatusName.Warning,
    id: SiteStatusId.Warning,
    class: 'statusBadgeWarning',
    iconClass: 'statusIconWarning',
    pinMapIcon: images.pinWarning,
  },
  {
    icon: images.iconCheck,
    name: SiteStatusName.Ok,
    id: SiteStatusId.Ok,
    class: 'statusBadgeHealthy',
    iconClass: 'statusIconHealthy',
    pinMapIcon: images.pinOk,
  },
];

/**
 * @property {Object[]} SiteConnection The is the catalogue for site connection.
 */
export const SiteConnection = [
  {
    icon: images.iconWifiConnected,
    name: SiteConnectionName.Landline,
    id: SiteConnectionId.Connected,
    class: 'transparent',
  },
  {
    icon: images.iconWifiDisconnected,
    name: SiteConnectionName.Disconnected,
    id: SiteConnectionId.Disconnected,
    class: 'transparent',
    iconClass: 'statusIconDisconnected',
  },
  {
    icon: images.iconCellular,
    name: SiteConnectionName.Cellular,
    id: SiteConnectionId.Cellular,
    class: 'transparent',
  },
  {
    icon: images.iconUnknown,
    name: SiteConnectionName.Unknown,
    id: SiteConnectionId.Unknown,
    class: 'transparent',
  },
];

/**
 * @property {Object[]} SiteMode The site mode collection to display in the UI.
 */
export const SiteMode = [
  {
    id: SiteModeId.Island,
    name: SiteModeName.island,
    icon: images.iconIsland,
  },
  {
    id: SiteModeId.Tower,
    name: SiteModeName.tower,
    icon: images.iconTower,
  },
];

export const siteStatusCollections = {
  Site_Status: SiteStatus,
  Comm_Status: SiteConnection,
  Island_Mode_Init: SiteMode,
};

// Default All option
export const allOptions = {
  herarchyLevel: 1,
  text: 'All',
  value: 0,
};

export const allCustomerOptions = {
  herarchyLevel: 2,
  text: 'All',
  value: 0,
};

export const allAreaOptions = {
  herarchyLevel: 3,
  text: 'All',
  value: 0,
};

export const allLocationOptions = {
  herarchyLevel: 4,
  text: 'All',
  value: 0,
};

/**
 * @method getSiteStatusByStatusPoint
 *
 * @param {object} sitePoints data object
 * @param {string} statusPointName is an string that represents the Id for status type
 * @return {object} Returns the status data related to statusPointName
 */
export const getSiteStatusByStatusPoint = (
  sitePoints = [],
  statusPointName = ''
) =>
  (sitePoints && sitePoints.find((point) => point.name === statusPointName)) ||
  {};

/**
 * @method getSiteStatusUIConfigByStatusPoint
 * Search inside the collections to get the status UI configuration based on statusId.
 * @param {array} collectionType The collection type to search in.
 * @param {string} statusId The status id to validate
 * @return {object} An object with UI Configuration or an empty object.
 */
export const getSiteStatusUIConfigByStatusPoint = (
  statusPointName,
  configId
) => {
  let statusUIConfig = {};

  if (configId && siteStatusCollections[`${statusPointName}`]) {
    statusUIConfig = siteStatusCollections[`${statusPointName}`].find(
      (statusItem) => statusItem.id === Number(configId)
    );

    statusUIConfig = { ...statusUIConfig };
  }

  return statusUIConfig;
};

/**
 * @method getStatusCount
 * Gets the total of sites with certain status.
 * @param {object} status The status value to count.
 * @param {object[]} sites The sites to count.
 * @return {number} The total of sites found.
 */
export const getStatusCount = (statusPointName, statusId, sites) => {
  let count = 0;
  if (typeof sites === 'undefined') {
    count = 0;
  } else if (sites.length > 0) {
    sites.forEach((site) => {
      let siteProperty = '';
      switch (statusPointName) {
        case SiteStatusPointName.ConnectionStatus:
          siteProperty = 'siteCommStatus';
          break;

        case SiteStatusPointName.SiteStatus:
          siteProperty = 'siteStatus';
          break;

        default:
          break;
      }
      if (Number(site[siteProperty]) === statusId) {
        count += 1;
      }
    });
  }
  return count;
};

/**
 * @method getStatusConnectionOverview
 * Gets connection status options available to display on overview
 * @return {Array} array connection status options available
 */
export const getConnectionStatusOverview = () => {
  const statusConnectionOverviewAvailable = [SiteConnectionId.Disconnected];

  return SiteConnection.filter(
    (statusConnection) =>
      !!statusConnectionOverviewAvailable.find(
        (statusOverview) => statusOverview === statusConnection.id
      )
  );
};

/**
 * getFilterAvailableOptions
 * Set available values for Sites Selection Status
 * @returns {Array} All available options for Status Selection
 */
export const getFilterAvailableOptions = () => {
  const filterOptions = SiteStatus.map((status) => ({
    herarchyLevel: 1,
    text: status.name,
    value: status.id,
  }));

  // Add disconnected to the selection
  const siteDisconnected = firstElement(getConnectionStatusOverview());

  filterOptions.push({
    herarchyLevel: 1,
    text: siteDisconnected.name,
    value: siteDisconnected.name,
  });

  filterOptions.unshift(allOptions);
  return filterOptions;
};

/**
 * getSiteMapPinIcon
 * Get site map icon by site status
 * @param {object} stie information
 * @returns {string} Returns a string this the image svg source
 */
export const getSiteMapPinIcon = (site) => {
  let statusPinMapIcon = '';

  if (site) {
    const siteStatusConfig = getSiteStatusUIConfigByStatusPoint(
      site.points,
      SiteStatusPointName.SiteStatus
    );

    statusPinMapIcon = getValueIfExists(
      () => siteStatusConfig.pinMapIcon,
      images.pinWhite
    );
  }

  return statusPinMapIcon;
};
