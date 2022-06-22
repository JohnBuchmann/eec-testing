/**
 * @property {Object[]} ReportTypesId The catalogue  of ids for report types.
 */
export const ReportTypesId = {
  Facility: 1,
  Energy: 2,
  ESS: 3,
  VehicleAndFleet: 4,
  Monthly: 5,
};
/**
 * @property {Object} ScaleTypesId The catalogue of scale types
 */
export const ScaleTypesId = {
  Auto: 'Auto',
  KW_1000: '1000 kW',
  KW_500: '500 kW',
  KW_100: '100 kW',
};
/**
 * @property {Array} CompaniesId The catalogue of id and names from companies
 */
export const CompaniesId = [
  { value: 1, text: 'BlueScope Construction Inc.' },
  { value: 2, text: 'Butler Foods - Panama City, FL' },
  { value: 3, text: 'PACCAR Inc.' },
  { value: 4, text: 'Daikin North America' },
  { value: 5, text: 'Kohler Co' },
];
/**
 * @property {Object} AutoScale The catalogue of scales from Auto scale type
 */
export const AutoScale = {
  gw: 'GWh',
  mw: 'MWh',
  kw: 'kWh',
  w: 'Wh',
};
/**
 * @property {Object} PowerScale The catalogue of scales from Power scale type
 */
export const PowerScale = {
  gw: 'gW',
  mw: 'mW',
  kw: 'kW',
  w: 'w',
};
