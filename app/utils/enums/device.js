/**
 * device.js under utility contains const to define possible kind of Devices and their status with predefined icon
 */

import images from 'Assets/images';

/**
 * This is a catalog label for Device List.
 */
export const DeviceListTypeName = {
  AcLoad: 'AC Load',
  All: 'All Devices',
  Battery: 'Battery',
  CustomerLoad: 'Customer Load',
  DcLoad: 'DC Load',
  Ev: 'EV',
  Fleet: 'Fleet',
  Microturbine: 'Microturbine',
  Rengine: 'R. Engine',
  Solar: 'Solar',
  Wind: 'Wind',
  Ess: 'ESS',
  Inverter: 'Inverter',
  Meters: 'Meters',
  Ats: 'ATS',
  Gid: 'GID',
  LocalIO: 'Local I/O',
};

/**
 * This is a catalog id for Device List Type.
 */
export const DeviceListTypeId = {
  All: 'ALL',
  Battery: 'BATT',
  Wind: 'WIND',
  Rengine: 'RENGINE',
  DcLoad: 'DCLOAD',
  AcLoad: 'ACLOAD',
  Ev: 'EV',
  CustomerLoad: 'CDEMAND',
  Solar: 'PDC',
  Inverter: 'INV',
  PowerGrid: 'POWERGRID',
  Gid: 'GID',
  Meters: 'METERS',
  Ats: 'ATS',
  LocalIO: 'LOCALIO',
  Fleet: 'FLEET',
};

/**
 * This is a catalog for Device Points
 */
export const DevicePointName = {
  location: 'LCM_Loc',
  rack: 'LCM_Rac_Num',
  position: 'LCM_Pos_Num',
  make: 'Make',
  model: 'Model',
  energyRating: 'Rating',
  gridStatus: 'Inverter_On_grid',
  serialNumber: 'Serial_Num',
  buildNo: 'Build_Num',
  uniqueIdentifier: 'Unique_ID',
  firmwareVersion: 'Firm_Ver',
};

/**
 * This is a catalog to render Device List Icon Device button.
 */
export const DeviceListType = [
  {
    displayText: DeviceListTypeName.All,
    icon: images.iconAll,
    id: DeviceListTypeId.All,
  },
  {
    displayText: DeviceListTypeName.AcLoad,
    icon: images.iconUtility,
    id: DeviceListTypeId.AcLoad,
  },
  {
    displayText: DeviceListTypeName.Battery,
    icon: images.iconCarBattery,
    id: DeviceListTypeId.Battery,
  },
  {
    displayText: DeviceListTypeName.CustomerLoad,
    icon: images.iconUtility,
    id: DeviceListTypeId.CustomerLoad,
  },
  {
    displayText: DeviceListTypeName.DcLoad,
    icon: images.iconUtility,
    id: DeviceListTypeId.DcLoad,
  },
  {
    displayText: DeviceListTypeName.Ev,
    icon: images.iconEv,
    id: DeviceListTypeId.Ev,
  },
  {
    displayText: DeviceListTypeName.Fleet,
    icon: images.iconFleet,
    id: DeviceListTypeId.Fleet,
  },
  {
    displayText: DeviceListTypeName.Microturbine,
    icon: images.iconBattery,
    id: DeviceListTypeId.Microturbine,
  },
  {
    displayText: DeviceListTypeName.Rengine,
    icon: images.iconBattery,
    id: DeviceListTypeId.Rengine,
  },
  {
    displayText: DeviceListTypeName.Solar,
    icon: images.iconSolar,
    id: DeviceListTypeId.Solar,
  },
  {
    displayText: DeviceListTypeName.Wind,
    icon: images.iconWind,
    id: DeviceListTypeId.Wind,
  },
  {
    displayText: DeviceListTypeName.Inverter,
    icon: images.iconInverter,
    id: DeviceListTypeId.Inverter,
  },
  {
    displayText: DeviceListTypeName.Gid,
    icon: images.iconGid,
    id: DeviceListTypeId.Gid,
  },
  {
    displayText: DeviceListTypeName.Meters,
    icon: images.iconMeters,
    id: DeviceListTypeId.Meters,
  },
  {
    displayText: DeviceListTypeName.Ats,
    icon: images.iconAts,
    id: DeviceListTypeId.Ats,
  },
  {
    displayText: DeviceListTypeName.LocalIO,
    icon: images.iconLocalIO,
    id: DeviceListTypeId.LocalIO,
  },
];

/**
 * Download Excel Filters catalog
 */
export const DownloadExcelFilters = {
  DateRangeFrom: 'dateRangeFrom',
  DateRangeTo: 'dateRangeTo',
  TimeFromHour: 'timeFromHour',
  TimeFromMinute: 'timeFromMinute',
  TimeFromDivision: 'timeFromDivision',
  TimeToHour: 'timeToHour',
  TimeToMinute: 'timeToMinute',
  TimeToDivision: 'timeToDivision',
};

/**
 * Device Details Tabs Catalog
 */
export const DeviceDetailsTabs = {
  Status: 0,
  Event: 1,
};

/**
 * FormatTimes Catalog
 */
export const FormatTimes = {
  DateFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
  TimeFiltersFormat: 'H:mm A',
};
