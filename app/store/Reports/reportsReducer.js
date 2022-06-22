/**
 * Reports reducer
 */

import {
  CLEAN_REPORTS,
  SET_REPORTS,
  SET_SEARCH_SITES,
  SET_SEARCH_COMPANY,
  SEND_SHARE_REPORT_EMAIL,
  CLEAN_SHARE_REPORTS,
  CLEAN_SEARCH_PARAMS,
  SEND_SHARE_REPORT_EMAIL_SUCCESS,
  SET_REPORTS_CSV_DOWNLOAD,
  CLEAR_REPORTS_CSV_DOWNLOAD,
} from './types';

const initialState = {
  charts: {},
  searchParams: {
    company: '',
    sites: [],
  },
  shareReports: {},
  reportsDownloadExcel: false,
};
/**
 * reportsReducer
 * @param {Object} state receives new state
 * @param {Object} action receives action data
 * @return {Object}
 */
const reportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REPORTS:
      return {
        ...state,
        charts: action.payload,
      };
    case CLEAN_REPORTS:
      return {
        ...state,
        charts: {},
      };
    case SET_SEARCH_COMPANY:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          company: action.payload,
        },
      };
    case SET_SEARCH_SITES:
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          sites: action.payload,
        },
      };
    case CLEAN_SEARCH_PARAMS:
      return {
        ...state,
        searchParams: {
          company: '',
          sites: [],
        },
      };
    case SEND_SHARE_REPORT_EMAIL:
      return {
        ...state,
        shareReports: {
          sendingReport: true,
        },
      };
    case SEND_SHARE_REPORT_EMAIL_SUCCESS:
      return {
        ...state,
        shareReports: {
          sendingReport: false,
        },
      };
    case CLEAN_SHARE_REPORTS:
      return {
        ...state,
        shareReports: {},
      };
    case SET_REPORTS_CSV_DOWNLOAD:
      return {
        ...state,
        loading: false,
        reportsDownloadExcel: action.payload,
      };
    case CLEAR_REPORTS_CSV_DOWNLOAD: {
      return {
        ...state,
        loading: false,
        reportsDownloadExcel: false,
      };
    }
    default:
      return state;
  }
};

export default reportsReducer;
