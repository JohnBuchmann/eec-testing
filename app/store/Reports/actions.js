/**
 * Reports actions
 */
import moment from 'moment';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import * as _ from 'lodash';
import { apiRequest } from 'Store/api/actions';
import { hideLoader, showLoader } from 'Store/App/actions';
import { endpointFormatter } from 'Utils/endpoint';
import { doPost } from 'system/httpHelper';
import { ReportTypesId } from 'Utils/enums/report';
import { getValueIfExists } from 'Utils/propertyValidation';
import { IntervalCatalog } from 'Utils/enums/interval';
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
  SEND_SHARE_REPORT_EMAIL_SUCCESS,
  GET_REPORTS_CSV_DOWNLOAD_START,
  GET_REPORTS_CSV_DOWNLOAD_FAIL,
  SET_REPORTS_CSV_DOWNLOAD,
  CLEAR_REPORTS_CSV_DOWNLOAD,
} from './types';

/**
 * fetchReportsStart
 * Start the fetch report
 */
export const fetchReportsStart = () => ({
  type: FETCH_REPORTS_START,
});
/**
 * fetchReportsFail
 * Save the error the fail when fetch reports
 * @param {Object} error receives error from set
 */
export const fetchReportsFail = (error) => ({
  type: FETCH_REPORTS_FAIL,
  payload: error,
});
/**
 * setReports
 * Save the reports charts
 * @param {object} data receives reports charts data
 */
export const setReports = (data) => ({
  type: SET_REPORTS,
  payload: data,
});
/**
 * cleanReports
 * Clear the reports charts data
 */
export const cleanReports = () => ({
  type: CLEAN_REPORTS,
});
/**
 * setSearchCompanyParams
 * Set company name to search params
 * @param {string} company receives company name
 */
export const setSearchCompanyParams = (company) => ({
  type: SET_SEARCH_COMPANY,
  payload: company,
});
/**
 * setSearchSitesParams
 * Set sites to search params
 * @param {Array} sites receives company name
 */
export const setSearchSitesParams = (sites) => ({
  type: SET_SEARCH_SITES,
  payload: sites,
});
/**
 * sendShareReportEmail
 * Send share report by email
 */
export const sendShareReportEmail = () => ({
  type: SEND_SHARE_REPORT_EMAIL,
});
/**
 * sendShareReportEmail
 * Send share report by email
 */
export const sendShareReportEmailSuccess = () => ({
  type: SEND_SHARE_REPORT_EMAIL_SUCCESS,
});
/**
 * cleanShareReports
 * Clear share reports data
 */
export const sendShareReportEmailFail = () => ({
  type: CLEAN_SHARE_REPORTS,
});

/**
 * cleanSearchParams
 * Clear search params properties from redux
 */
export const cleanSearchParams = () => ({
  type: CLEAN_SEARCH_PARAMS,
});

/**
 * getReportsCSVDownloadStart
 * Start to download reports excel document
 */
export const getReportsCSVDownloadStart = () => ({
  type: GET_REPORTS_CSV_DOWNLOAD_START,
});

/**
 * getReportsCSVDownloadFail
 * Save the error caused by attempting to download reports excel document
 * @param {object} payload receives error data
 */
export const getReportsCSVDownloadFail = (payload) => ({
  type: GET_REPORTS_CSV_DOWNLOAD_FAIL,
  payload,
});

/**
 * clearReportsCSVDownload
 * Clear reports excel download property in the store
 */
export const clearReportsCSVDownload = () => ({
  type: CLEAR_REPORTS_CSV_DOWNLOAD,
  payload: false,
});

/**
 * @method handleSetReportsCSVDownload
 * Handle download csv response from api and return action data, and save to redux.
 * @param {object} response receives request data
 * @returns {object}
 */
const handleSetReportsCSVDownload = (response, params, company) => {
  const blob = new Blob([response], { type: 'application/vnd.ms-excel' });
  const downloadUrl = URL.createObjectURL(blob);
  const fileName = `EnTech EC - ${company} - Monthly Micro-Grid Report - ${moment(
    getValueIfExists(() => params.timePeriod, '')
  ).format('MM-YYYY')}.csv`;
  const hiddenElement = document.createElement('a');
  // Assignment to href can be unsafe but is necessary for input blob array with excel data
  // eslint-disable-next-line
  hiddenElement.href = downloadUrl;
  hiddenElement.target = '_blank';
  hiddenElement.download = fileName;
  hiddenElement.click();

  return {
    type: SET_REPORTS_CSV_DOWNLOAD,
    payload: true,
  };
};

/**
 * @method fetchReportsCSVDownload
 * Call to get reports excel download via hitting reports csv endpoint
 * @param {date} month date of the month to filter by
 * @param {array} sites list of site ids to filter by
 * @param {string} siteName name of the selected site or customer if sites are multi-selected
 * @param {number} deviceId receives device ID
 */
export const fetchReportsCSVDownload = (month, sites, company) => (
  dispatch
) => {
  dispatch(getReportsCSVDownloadStart());
  const apiUrl = `${endpointFormatter('fetchReportsExcel')}`;
  const params = {
    interval: IntervalCatalog.month, // interval for monthly reports is always 'Month'.
    sites,
    timePeriod: month,
  };

  dispatch(
    apiRequest(
      () => doPost(apiUrl, params, { responseType: 'arraybuffer' }),
      (response) => handleSetReportsCSVDownload(response, params, company),
      getReportsCSVDownloadFail,
      false
    )
  );
};

/**
 * setReportsCSVDownload
 * Save reports on excel file and download
 * @param {object} response receives data response request
 */
export const setReportsCSVDownload = (response) =>
  handleSetReportsCSVDownload(response);

/**
 * getTypeFechEndpoint
 * Validate type chart to fetch on endpoint
 * @param {number} type receives chart ID
 * @return {string}
 */
export const getTypeFetchEndpoint = (type) => {
  switch (type) {
    case ReportTypesId.Facility:
      return endpointFormatter('fetchFacilityCharts');
    case ReportTypesId.Energy:
      return endpointFormatter('fetchEnergyCharts');
    case ReportTypesId.ESS:
      return endpointFormatter('fetchESSCharts');
    case ReportTypesId.VehicleAndFleet:
      return endpointFormatter('fetchVehicleAndFleetCharts');
    case ReportTypesId.Monthly:
      return endpointFormatter('fetchMonthlyReports');
    default:
      return '';
  }
};
/**
 * getReports
 * Fetch reports charts from endpoints
 * @param {string} company receives company name
 * @param {string} interval receives interval type
 * @param {string} quarter receives quarter
 * @param {string} scale receives scale type
 * @param {Array} sites receives sites array
 * @param {string} timePeriod receives time period
 * @param {number} reportType receives report type
 * @return Promise
 */
export const getReports = (
  company,
  interval,
  quarter,
  sites,
  timePeriod,
  reportType
) => (dispatch) => {
  dispatch(fetchReportsStart());
  const requestData = {
    company,
    sites,
    interval,
    timePeriod,
    quarter,
  };
  const apiUrl = getTypeFetchEndpoint(reportType);

  if (
    getValueIfExists(() => company.length, 0) > 0 &&
    getValueIfExists(() => sites.length, 0) > 0
  ) {
    dispatch(
      apiRequest(
        () => doPost(apiUrl, requestData),
        setReports,
        fetchReportsFail
      )
    );
  }
};

/**
 * createPdf It will add and create a PDF base on the input
 * @param {Object} content send content to add as a PDF
 * @returns {Object} returns a jsPDF object to manipulate
 */
const createPdf = (content) =>
  new Promise((resolve) => {
    _.defer(() => {
      html2canvas(content).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        // eslint-disable-next-line
        const pdf = new jsPDF({
          orientation: 'landscape',
        });

        // try and calculate relative size for pdf container
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // add image and save
        pdf.addImage(
          imgData,
          'JPEG',
          10,
          10,
          pdfWidth,
          pdfHeight,
          'NULL',
          'fast'
        );
        resolve(pdf);
      });
    });
  });

/**
 * sendReportByEmail
 * Converts an html object to PDF and send it to by email
 *
 * @param {object} content send content to add as a PDF
 * @param {string} companyName
 * @param {array} sites ID array that covers that belongs the content object
 * @param {string} reportName
 * @param {string} recipients array with email recipients
 * @param {string} customMessage
 */
export const sendReportByEmail = (
  reportContent,
  companyName,
  sites,
  reportName,
  recipients,
  customMessage
) => (dispatch) => {
  dispatch(showLoader());
  dispatch(sendShareReportEmail());

  createPdf(reportContent).then((pdf) => {
    const apiUrl = endpointFormatter('fetchShareReports');
    const pdfOutputBlob = pdf.output('blob');
    const shareReportFormData = new FormData();

    shareReportFormData.append('company', companyName);
    shareReportFormData.append('sites', sites);
    shareReportFormData.append('reportName', `${reportName}.pdf`);
    shareReportFormData.append('recipients', recipients);
    shareReportFormData.append('message', customMessage);
    shareReportFormData.append('reportBlob', pdfOutputBlob);

    const sendReportSuccess = () => {
      dispatch(hideLoader());
      return sendShareReportEmailSuccess();
    };

    const sendReportFail = () => {
      dispatch(hideLoader());
      return sendShareReportEmailFail();
    };

    dispatch(
      apiRequest(
        () => doPost(apiUrl, shareReportFormData),
        sendReportSuccess,
        sendReportFail,
        false,
        false
      )
    );
  });
};
