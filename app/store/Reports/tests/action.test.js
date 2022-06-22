import { ReportTypesId } from 'Utils/enums/report';
import { endpointFormatter } from 'Utils/endpoint';
import {
  fetchReportsStart,
  fetchReportsFail,
  setReports,
  cleanReports,
  setSearchCompanyParams,
  setSearchSitesParams,
  getTypeFetchEndpoint,
  sendShareReportEmail,
  sendShareReportEmailFail,
  cleanSearchParams,
  getReportsCSVDownloadStart,
  getReportsCSVDownloadFail,
  clearReportsCSVDownload,
} from '../actions';
import {
  FETCH_REPORTS_START,
  FETCH_REPORTS_FAIL,
  SET_REPORTS,
  CLEAN_REPORTS,
  SET_SEARCH_COMPANY,
  SET_SEARCH_SITES,
  SEND_SHARE_REPORT_EMAIL,
  CLEAN_SHARE_REPORTS,
  CLEAN_SEARCH_PARAMS,
  GET_REPORTS_CSV_DOWNLOAD_START,
  GET_REPORTS_CSV_DOWNLOAD_FAIL,
  CLEAR_REPORTS_CSV_DOWNLOAD,
} from '../types';

const errorMock = { error: {} };
const chartsMock = {
  microturbineProduction: [],
  reciprocatingProduction: [],
  solarProduction: [],
  windProduction: [],
};

describe('Reports Actions', () => {
  it('should create an action to fetchReportsStart', () => {
    const expected = {
      type: FETCH_REPORTS_START,
    };
    const actual = fetchReportsStart();

    expect(actual).toEqual(expected);
  });

  it('should create an action to fetchReportsFail', () => {
    const expected = {
      type: FETCH_REPORTS_FAIL,
      payload: errorMock,
    };
    const actual = fetchReportsFail(errorMock);

    expect(actual).toEqual(expected);
  });

  it('should create an action to setReports', () => {
    const expected = {
      type: SET_REPORTS,
      payload: chartsMock,
    };
    const actual = setReports(chartsMock);

    expect(actual).toEqual(expected);
  });

  it('should input type "Facility" and return endpoint for Facility Production Chart', () => {
    const expected = endpointFormatter('fetchFacilityCharts');
    const actual = getTypeFetchEndpoint(ReportTypesId.Facility);

    expect(actual).toEqual(expected);
  });

  it('should input type "Energy" and return endpoint for Energy Production Chart', () => {
    const expected = endpointFormatter('fetchEnergyCharts');
    const actual = getTypeFetchEndpoint(ReportTypesId.Energy);

    expect(actual).toEqual(expected);
  });

  it('should input type "ESS" and return endpoint for ESS Production Chart', () => {
    const expected = endpointFormatter('fetchESSCharts');
    const actual = getTypeFetchEndpoint(ReportTypesId.ESS);

    expect(actual).toEqual(expected);
  });

  it('should input type "VehicleAndFleet" and return endpoint for Vehicle And Fleet Production Chart', () => {
    const expected = endpointFormatter('fetchVehicleAndFleetCharts');
    const actual = getTypeFetchEndpoint(ReportTypesId.VehicleAndFleet);

    expect(actual).toEqual(expected);
  });

  it('should return the endpoint for fetchReportsCSVDownload', () => {
    const expected = endpointFormatter('fetchReportsExcel');
    const actual =
      'dcentriq.energybyentech.com/charts-service/charts/monthly-report/csv';

    expect(expected).toContain(actual);
  });

  it('should create an action to cleanReports', () => {
    const expected = {
      type: CLEAN_REPORTS,
    };
    const actual = cleanReports();

    expect(actual).toEqual(expected);
  });

  it('should create an action to setSearchCompanyParams', () => {
    const companyMock = 'Anexinet';
    const expected = {
      type: SET_SEARCH_COMPANY,
      payload: companyMock,
    };
    const actual = setSearchCompanyParams(companyMock);

    expect(actual).toEqual(expected);
  });

  it('should create an action to setSearchSitesParams', () => {
    const sitesMock = [1, 2];
    const expected = {
      type: SET_SEARCH_SITES,
      payload: sitesMock,
    };
    const actual = setSearchSitesParams(sitesMock);

    expect(actual).toEqual(expected);
  });

  it('should create an action to cleanShareReports', () => {
    const expected = {
      type: CLEAN_SHARE_REPORTS,
    };
    const actual = sendShareReportEmailFail();

    expect(actual).toEqual(expected);
  });

  it('should create an action to sendShareReportEmail', () => {
    const expected = {
      type: SEND_SHARE_REPORT_EMAIL,
    };
    const actual = sendShareReportEmail();

    expect(actual).toEqual(expected);
  });

  it('should create an action to cleanSearchParams', () => {
    const expected = {
      type: CLEAN_SEARCH_PARAMS,
    };
    const actual = cleanSearchParams();

    expect(actual).toEqual(expected);
  });

  it('should create an action to start csv download', () => {
    const expected = {
      type: GET_REPORTS_CSV_DOWNLOAD_START,
    };
    const actual = getReportsCSVDownloadStart();

    expect(actual).toEqual(expected);
  });

  it('should create an action to fail csv download fetch', () => {
    const expected = {
      type: GET_REPORTS_CSV_DOWNLOAD_FAIL,
      payload: errorMock,
    };
    const actual = getReportsCSVDownloadFail(errorMock);

    expect(actual).toEqual(expected);
  });

  it('should create an action to clear csv reports', () => {
    const expected = {
      type: CLEAR_REPORTS_CSV_DOWNLOAD,
      payload: false,
    };
    const actual = clearReportsCSVDownload(false);
    expect(actual).toEqual(expected);
  });
});
