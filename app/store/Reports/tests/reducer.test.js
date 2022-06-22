import {
  setReports,
  cleanReports,
  setSearchCompanyParams,
  setSearchSitesParams,
  sendShareReportEmail,
  cleanSearchParams,
  setReportsCSVDownload,
  clearReportsCSVDownload,
} from '../actions';
import reportsReducer from '../reportsReducer';

const defaultState = {
  charts: {},
  searchParams: {
    company: '',
    sites: [],
  },
  shareReports: {},
};
const chartsMock = {
  microturbineProduction: [],
  reciprocatingProduction: [],
  solarProduction: [],
  windProduction: [],
};

describe('Reports reducer', () => {
  it('return initial state', () => {
    expect(reportsReducer(defaultState, {})).toEqual(defaultState);
  });

  it('should dispatch setReports action', () => {
    const expected = {
      ...defaultState,
      charts: chartsMock,
    };
    const actual = reportsReducer(defaultState, setReports(chartsMock));

    expect(actual).toEqual(expected);
  });

  it('should dispatch cleanReports action', () => {
    const expected = {
      ...defaultState,
      charts: {},
    };
    const actual = reportsReducer(defaultState, cleanReports());

    expect(actual).toEqual(expected);
  });

  it('should dispatch setSearchCompanyParams action', () => {
    const company = 'Anexinet';
    const expected = {
      ...defaultState,
      charts: {},
      searchParams: {
        ...defaultState.searchParams,
        company,
      },
    };
    const actual = reportsReducer(
      defaultState,
      setSearchCompanyParams(company)
    );

    expect(actual).toEqual(expected);
  });

  it('should dispatch setSearchSitesParams action', () => {
    const sites = [1, 2];
    const expected = {
      ...defaultState,
      charts: {},
      searchParams: {
        ...defaultState.searchParams,
        sites,
      },
    };
    const actual = reportsReducer(defaultState, setSearchSitesParams(sites));

    expect(actual).toEqual(expected);
  });

  it('should dispatch sendShareReportEmail action', () => {
    const expected = {
      ...defaultState,
      shareReports: { sendingReport: true },
    };
    const actual = reportsReducer(defaultState, sendShareReportEmail());
    expect(actual).toEqual(expected);
  });

  it('should dispatch cleanSearchParams action', () => {
    const expected = {
      ...defaultState,
      searchParams: {
        company: '',
        sites: [],
      },
    };
    const actual = reportsReducer(defaultState, cleanSearchParams());

    expect(actual).toEqual(expected);
  });

  it('should set true value property eventsDownloadExcel to true when call action setEventsExcelDownload', () => {
    global.URL.createObjectURL = jest.fn();
    const expected = {
      ...defaultState,
      loading: false,
      reportsDownloadExcel: true,
    };
    const actual = reportsReducer(defaultState, setReportsCSVDownload());

    expect(actual).toEqual(expected);
  });

  it('should set true value property eventsDownloadExcel to false when call action clearReportsCSVDownload', () => {
    const expected = {
      ...defaultState,
      loading: false,
      reportsDownloadExcel: false,
    };
    const actual = reportsReducer(defaultState, clearReportsCSVDownload());

    expect(actual).toEqual(expected);
  });
});
