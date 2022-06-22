import { Box, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import images from 'Assets/images';
import Select from 'Components/Select';
import { ReportTypesId, ScaleTypesId } from 'Utils/enums/report';
import { IntervalCatalog } from 'Utils/enums/interval';
import {
  cleanReports,
  getReports,
  sendReportByEmail,
  fetchReportsCSVDownload,
} from 'Store/Reports/actions';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Colors } from 'Theme';
import { truncate } from 'Utils/propertyHelpers';
import {
  getValueIfExists,
  propertyExist,
  stringIsNullOrEmpty,
} from 'Utils/propertyValidation';
import {
  getReportIntervalSelectOptions,
  getReportScaleSelectOptions,
  getReportTimePeriodOptions,
  getReportTypesSelectOptions,
} from 'Utils/reports';
import EnergyProductionChart from './Charts/EnergyProduction';
import EssStateCharts from './Charts/EssState';
import UsageVsProductionCharts from './Charts/UsageVsProduction';
import VehicleAndFleetLoadsCharts from './Charts/VehicleAndFleetLoads';
import MonthlyCharts from './Charts/Monthly';
import messages from './messages';
import ShareReportModal from './ShareReportModal';

/**
 * Declare UI styles
 */
const useStyles = makeStyles({
  siteSearch: {
    float: 'right',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  reportFilterWrapper: {
    marginTop: '16px',
  },
  tabContent: {
    flex: 1,
    display: 'contents',
  },
  reportHeaderPanel: {
    padding: '12px 20px',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.06)',
    border: `1px solid ${Colors.sandBeach}`,
    background: `${Colors.white}`,
    width: '100%',
    flexGrow: 1,
  },
  reportFilterSection: {
    width: '100%',
  },
  reportType: {
    maxWidth: '360px',
    marginRight: '15px',
  },
  periodStart: {
    maxWidth: '142px',
    marginRight: '15px',
  },
  periodEnd: {
    maxWidth: '142px',
    marginRight: '15px',
    marginTop: '20px',
  },
  scale: {
    maxWidth: '142px',
  },
  labelText: {
    fontSize: '14px',
    marginBottom: '6px',
    color: `1px solid ${Colors.lunarGreen}`,
  },
  icon: {
    margin: '10px',
    cursor: 'pointer',
  },
  iconContainer: {
    marginTop: '17px',
  },
  reportsSections: {
    padding: '0px 16px',
  },
  reportContainer: {
    background: `${Colors.white}`,
    height: '451px',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.06)',
  },
  reportArea: {
    padding: '16px',
  },
  chartingHeader: {
    height: '65px',
    borderBottom: `1px solid ${Colors.mercury}`,
    lineHeight: '65px',
    paddingLeft: '16px',
    fontSize: '14px',
    fontWeight: '600',
  },
  chartsWrapper: {
    marginTop: '20px',
  },
  iframeWrapper: {
    height: '0px',
    width: '0px',
    position: 'absolute',
  },
});
/**
 * Charting
 * Container to display the different charts with a form filters
 * @param {object} props Properties for the controller
 */
const Charting = (props) => {
  const {
    company,
    sites = [],
    defaultReportType,
    getReportsCharts,
    cleanReportsCharts,
    charts,
    shareReports,
    sendChartReportByEmail,
    customerName,
    siteName,
    resetFiltersWhenCompanyChange,
    allowShareReport = true,
    allowPrintReport = true,
    allowPdfDownloadReport = true,
  } = props;
  const formatYearMonthDay = 'YYYY-MM-DD';
  const classes = useStyles();
  const actualDateDefault = `${moment().format('YYYY-MM')}-01`;
  const timePeriodMonthDefault = {
    value: moment().month(),
    text: moment().format('MMM-YYYY'),
  };
  const timePeriodYearDefault = {
    value: 0,
    text: moment().format('YYYY'),
  };
  const timePeriodDayDefault = {
    value: moment().format('D') - 1,
    text: moment().format('D-MMMM-YYYY'),
  };
  const timePeriodQuarterDefault = {
    value: moment().quarter() - 1,
    text: `Q${moment().quarter()}-${moment().format('YYYY')}`,
  };
  const defaultWorkingReportState = {
    company,
    sites,
    interval: {
      value: IntervalCatalog.month,
      text: `By ${IntervalCatalog.month}`,
    },
    timePeriod: actualDateDefault,
    quarter: null,
    scale: {
      value: ScaleTypesId.Auto,
      text: ScaleTypesId[`${ScaleTypesId.Auto}`],
    },
    timePeriodSelected: timePeriodMonthDefault,
  };
  const [workingReportConfig, setWorkingReportConfig] = React.useState(
    defaultWorkingReportState
  );
  const [openModal, setOpenModal] = React.useState(null);
  const { reportType: reportTypeSelected, interval } = workingReportConfig;
  const shareReportModalId = 'shareReportModal';
  const reportTypeOptions = getReportTypesSelectOptions(
    resetFiltersWhenCompanyChange
  );
  const periodStart = getReportIntervalSelectOptions();
  const scaleData = getReportScaleSelectOptions();
  const [periodEnd, setPeriodEnd] = React.useState(
    getReportTimePeriodOptions(interval.value)
  );

  const [
    showLoadingShareReportModal,
    setShowLoadingShareReportModal,
  ] = React.useState(false);

  /**
   * @method closeShareReportModal
   * Handler for closing the share report modal
   * @return {void}
   */
  const closeShareReportModal = () => {
    setOpenModal({
      modal: shareReportModalId,
      isOpen: false,
    });
  };

  /**
   * getPdfName
   * Generate PDF name
   * @returns string
   */
  const getPdfName = () => {
    const nowFormatted = moment().format('DDMMYYYY');
    const reportType = getValueIfExists(
      () => workingReportConfig.reportType.text,
      ''
    );
    const maxCharacterAllowed = 8;
    const ellipsisRequired = false;
    const customerNameFormatted = truncate(
      customerName,
      maxCharacterAllowed,
      ellipsisRequired
    );
    const siteNameFormatted = !stringIsNullOrEmpty(siteName)
      ? ` ${truncate(siteName, maxCharacterAllowed, ellipsisRequired)}`
      : '';
    return `${customerNameFormatted}${siteNameFormatted}_${reportType}_${nowFormatted}`;
  };

  /**
   * callReportChart
   * Call endpoint to request charts data
   * @return {void}
   */
  const callReportChart = () => {
    if (propertyExist(() => workingReportConfig.reportType)) {
      const {
        interval: intervalType = {},
        sites: sitesWorking,
        quarter = '',
        timePeriod = '',
        reportType = {},
      } = workingReportConfig;
      const sitesList = sitesWorking.filter((site) => site > 0);
      getReportsCharts(
        company,
        intervalType.value,
        quarter,
        sitesList,
        timePeriod,
        reportType.value
      );
    }
  };

  /**
   * @method validateTimePeriodToSelect
   * Validate to select time period depending interval value,
   * and modify property  timePeriodSelected to workingReportConfig State
   */
  const validateTimePeriodToSelect = (periodId) => {
    const intervalValue = getValueIfExists(
      () => periodId.value,
      getValueIfExists(() => workingReportConfig.interval.value, '')
    );

    let timePeriodValue = '';
    let isQuarter = false;
    let timePeriod = '';
    switch (intervalValue) {
      case IntervalCatalog.month:
        timePeriodValue = timePeriodMonthDefault;
        timePeriod = moment(`01-${timePeriodValue.text}`).format(
          formatYearMonthDay
        );
        break;
      case IntervalCatalog.year:
        timePeriodValue = timePeriodYearDefault;
        timePeriod = moment(`01-01-${timePeriodValue.text}`).format(
          formatYearMonthDay
        );
        break;
      case IntervalCatalog.day:
        timePeriodValue = timePeriodDayDefault;
        timePeriod = moment(`${timePeriodValue.text}`).format(
          formatYearMonthDay
        );
        break;
      case IntervalCatalog.quarter:
        timePeriodValue = timePeriodQuarterDefault;
        isQuarter = true;
        break;
      default:
        break;
    }
    setWorkingReportConfig((prevState) => ({
      ...prevState,
      quarter: isQuarter ? timePeriodQuarterDefault.text : null,
      timePeriod: isQuarter ? null : timePeriod,
      timePeriodSelected: timePeriodValue,
      interval: getValueIfExists(() => periodId, prevState.interval),
      charts: null,
    }));
  };

  React.useEffect(() => {
    if (resetFiltersWhenCompanyChange) {
      validateTimePeriodToSelect();
    }
  }, [company]);

  React.useEffect(() => {
    if (sites.length > 0) {
      setWorkingReportConfig((prevState) => ({
        ...prevState,
        sites,
        charts: null,
      }));
    }
    callReportChart();
  }, [sites]);

  React.useEffect(() => {
    if (defaultReportType) {
      const defaultReportTypeSelected = reportTypeOptions.find(
        (report) => report.value === defaultReportType
      );
      setWorkingReportConfig((prevState) => ({
        ...prevState,
        reportType: defaultReportTypeSelected,
        charts: null,
      }));
    }

    return () => {
      cleanReportsCharts();
    };
  }, []);

  React.useEffect(() => {
    if (charts && (Array.isArray(charts) || Object.keys(charts).length > 0)) {
      setWorkingReportConfig((prevState) => ({
        ...prevState,
        charts,
      }));
    }
  }, [charts]);

  React.useEffect(() => {
    const { charts: chartsData } = workingReportConfig;
    if (chartsData === null) {
      callReportChart();
    }
  }, [workingReportConfig]);

  React.useEffect(() => {
    const { sendingReport } = shareReports;

    if (!sendingReport) {
      setShowLoadingShareReportModal(false);
      closeShareReportModal();
    }
  }, [shareReports]);

  /**
   * @method isModalOpen
   * Validates if a specific modal is open
   * or not to display or hide it.
   * @param {String} modal The name of the modal to validate
   * @return {boolean}
   */
  const isModalOpen = (modal) =>
    openModal && openModal.modal === modal && openModal.isOpen;

  /**
   * @method downloadReport
   * Handler for download report button
   * @return {void}
   */
  const downloadReport = () => {
    setOpenModal({
      modal: shareReportModalId,
      isOpen: true,
    });
  };

  /**
   * @method printReport
   * Handler for print report button and display in new tap to print chart report
   * @param {boolean} print receives validation if print pdf
   */
  const printReport = (print = false) => {
    const reportContainer = getValueIfExists(
      () => document.getElementById('chartContainer'),
      {}
    );
    const childrenGraphics = getValueIfExists(
      () => reportContainer.childNodes,
      []
    );
    const yPositionIncrement = 300;
    const xPageNumber = 15;
    const yPageNumber = 620;
    const xTitle = 85;
    const yTitle = 30;
    const widthChart = 430;
    const heightChart = 250;
    const imagesChildrens = [];
    const limitChartsPage = 2;
    const pdfName = getPdfName();
    const xPosition = 15;
    const fontSize = 10;
    const defaultScale = 1;
    let yPosition = 50;
    let pageNumber = 1;
    let numGraphicsInserted = 0;
    // eslint-disable-next-line
    const pdf = new jsPDF({
      orientation: 'portrait',
      compressPdf: true,
      unit: 'px',
      scale: defaultScale,
    });
    // Set all charts canvas images into an Array
    childrenGraphics.forEach((childGraphic) =>
      childGraphic.childNodes.forEach((child) =>
        imagesChildrens.push(html2canvas(child))
      )
    );
    // Add charts canvas images to PDF file
    Promise.all(imagesChildrens).then((childs) => {
      if (print) {
        pdf.text(xTitle, yTitle, pdfName);
      }
      pdf.setFontSize(fontSize);
      pdf.text(xPageNumber, yPageNumber, `Page - ${pageNumber}`);
      childs.forEach((canvas, index) => {
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(
          imgData,
          'png',
          xPosition,
          yPosition,
          widthChart,
          heightChart,
          `canvas-${index}`,
          'FAST'
        );
        numGraphicsInserted++;
        if (numGraphicsInserted % limitChartsPage === 0) {
          yPosition = 10;
          pageNumber++;
          if (numGraphicsInserted < childs.length) {
            pdf.addPage();
            pdf.text(xPageNumber, yPageNumber, `Page - ${pageNumber}`);
          }
        } else {
          yPosition = yPositionIncrement;
        }
      });
      if (print) {
        pdf.autoPrint();
        pdf.output('dataurlnewwindow');
      } else {
        pdf.save(`${pdfName}.pdf`);
      }
    });
  };

  /**
   * @method printPdfReport
   * Handle for print pdf report button
   */
  const printPdfReport = () => printReport(true);

  /**
   * @method downloadPdf
   * Handler for download pdf button
   */
  const downloadPdf = () => printReport();

  /**
   * @method generateSharedPdfHandler
   * Handler for the Generate button on the share report modal
   * @return {void}
   */
  const generateSharedPdfHandler = (recipients, message) => {
    const reportContent = document.getElementById('chartContainer');

    if (propertyExist(() => workingReportConfig.reportType)) {
      setShowLoadingShareReportModal(true);

      const reportName = getPdfName();
      const sitesList = sites.filter((site) => site > 0);

      sendChartReportByEmail(
        reportContent,
        company,
        sitesList,
        reportName,
        recipients,
        message
      );
    }
  };

  /**
   * @method reportTypeChange
   * Handler for changing of the report type dropdown
   * @param {string} reportTypeId receives report type from report type dropdown
   * @return {void}
   */
  const reportTypeChange = (reportTypeId) => {
    const reportType = reportTypeOptions.find(
      (report) => report.value === reportTypeId
    );
    setWorkingReportConfig((prevState) => ({
      ...prevState,
      reportType,
      charts: null,
    }));
  };

  /**
   * @method periodStartChange
   * Handler for changing of the period start dropdown
   * @param {string} periodId receives period type from period start dropdown
   * @return {void}
   */
  const periodStartChange = (periodId) => {
    const periodEndOptions = getReportTimePeriodOptions(periodId);
    setPeriodEnd(periodEndOptions);
    validateTimePeriodToSelect({ value: periodId, text: `By ${periodId}` });
  };

  /**
   * @method periodEndChange
   * Handler for changing of the period end dropdown
   * @param {string} timePeriodId receives time period from period end dropdown
   * @return {void}
   */
  const periodEndChange = (timePeriodId) => {
    let timePeriod = null;
    let quarter = null;
    const timePeriodOption = periodEnd[`${timePeriodId}`];
    const { text: timePeriodvalue } = timePeriodOption;
    if (interval.value === IntervalCatalog.quarter) {
      timePeriod = null;
      quarter = timePeriodvalue;
    } else {
      quarter = null;
      switch (interval.value) {
        case IntervalCatalog.day:
          timePeriod = moment(`${timePeriodvalue}`).format(formatYearMonthDay);
          break;
        case IntervalCatalog.month:
          timePeriod = moment(`01-${timePeriodvalue}`).format(
            formatYearMonthDay
          );
          break;
        case IntervalCatalog.year:
          timePeriod = moment(`01-01-${timePeriodvalue}`).format(
            formatYearMonthDay
          );
          break;
        default:
          break;
      }
    }
    setWorkingReportConfig((prevState) => ({
      ...prevState,
      timePeriod,
      timePeriodSelected: timePeriodOption,
      quarter,
      charts: null,
    }));
  };

  /**
   * @method scaleChange
   * Handler for changing of the scale dropdown
   * @param {string} scaleId receives scale from scale dropdown
   * @return {void}
   */
  const scaleChange = (scaleId) => {
    setWorkingReportConfig((prevState) => ({
      ...prevState,
      scale: { value: scaleId, text: ScaleTypesId[`${scaleId}`] },
      charts: null,
    }));
  };

  /**
   * getChartsComponent
   * Get charts component to display from reporting header search
   */
  const getChartsComponent = () => {
    const reportTypeId = reportTypeSelected ? reportTypeSelected.value : 0;
    const { charts: chartsData } = workingReportConfig;
    let chartsComponent;
    // Validate if have empty charts data
    if (!chartsData) {
      return chartsComponent;
    }
    switch (reportTypeId) {
      case ReportTypesId.Facility:
        chartsComponent = (
          <UsageVsProductionCharts reportConfig={workingReportConfig} />
        );
        break;
      case ReportTypesId.Energy:
        chartsComponent = (
          <EnergyProductionChart reportConfig={workingReportConfig} />
        );
        break;
      case ReportTypesId.ESS:
        chartsComponent = <EssStateCharts reportConfig={workingReportConfig} />;
        break;
      case ReportTypesId.VehicleAndFleet:
        chartsComponent = (
          <VehicleAndFleetLoadsCharts reportConfig={workingReportConfig} />
        );
        break;
      case ReportTypesId.Monthly:
        chartsComponent = <MonthlyCharts reportConfig={workingReportConfig} />;
        break;
      default:
        chartsComponent = <Box />;
        break;
    }
    return chartsComponent;
  };

  /**
   * @method disabledDropdowns
   * Disable filters selects if company and sites is not selected
   * @returns {boolean}
   */
  const disabledDropdowns = () =>
    getValueIfExists(() => company.length, 0) === 0 ||
    getValueIfExists(() => sites.length, 0) === 0;

  /**
   * @method disablePeriodDropdown
   * Disable filter Period and extra validation for report type equal monthly report
   * @returns {boolean}
   */
  const disablePeriodDropdown = () =>
    getValueIfExists(() => reportTypeSelected.value, 0) ===
      ReportTypesId.Monthly || disabledDropdowns();

  return (
    <>
      <Box>
        <div className={classes.reportFilterWrapper}>
          <Box className={classes.reportHeaderPanel}>
            <Grid container>
              <Grid
                item
                xs
                className={classes.reportType}
                data-testid="select-reportType"
              >
                <FormattedMessage {...messages.reportTypeTitle}>
                  {(reportTypeTitle) => (
                    <InputLabel id="reportType" className={classes.labelText}>
                      {reportTypeTitle}
                    </InputLabel>
                  )}
                </FormattedMessage>

                <FormattedMessage {...messages.reportTypePlaceholder}>
                  {(reportTypePlaceholder) => (
                    <Select
                      disabled={disabledDropdowns()}
                      data-testid="select-reportType2"
                      placeholder={reportTypePlaceholder}
                      selectData={reportTypeOptions}
                      onChange={reportTypeChange}
                      selectedObject={{
                        value: reportTypeSelected
                          ? reportTypeSelected.text
                          : '',
                      }}
                    />
                  )}
                </FormattedMessage>
              </Grid>
              <Grid item xs className={classes.periodStart}>
                <FormattedMessage {...messages.periodTitle}>
                  {(periodTitle) => (
                    <InputLabel id="period" className={classes.labelText}>
                      {periodTitle}
                    </InputLabel>
                  )}
                </FormattedMessage>
                <FormattedMessage {...messages.periodPlaceholder}>
                  {(periodPlaceholder) => (
                    <Select
                      disabled={disablePeriodDropdown()}
                      data-testid="select-periodType"
                      placeholder={periodPlaceholder}
                      selectData={periodStart}
                      onChange={periodStartChange}
                      selectedObject={{
                        value: workingReportConfig.interval
                          ? workingReportConfig.interval.text
                          : '',
                      }}
                    />
                  )}
                </FormattedMessage>
              </Grid>
              <Grid item xs className={classes.periodEnd}>
                <Select
                  disabled={disabledDropdowns()}
                  selectData={periodEnd}
                  onChange={periodEndChange}
                  selectedObject={{
                    value: workingReportConfig.timePeriodSelected
                      ? workingReportConfig.timePeriodSelected.text
                      : '',
                  }}
                />
              </Grid>
              <Grid item xs className={classes.scale}>
                <FormattedMessage {...messages.scaleTitle}>
                  {(scaleTitle) => (
                    <InputLabel id="scale" className={classes.labelText}>
                      {scaleTitle}
                    </InputLabel>
                  )}
                </FormattedMessage>
                <Select
                  disabled={disabledDropdowns()}
                  selectData={scaleData}
                  onChange={scaleChange}
                  selectedObject={{
                    value: workingReportConfig.scale
                      ? workingReportConfig.scale.text
                      : '',
                  }}
                />
              </Grid>
              <Grid
                container
                item
                xs
                justify="flex-end"
                className={classes.iconContainer}
              >
                {allowShareReport && (
                  <FormattedMessage {...messages.shareAlt}>
                    {(shareAlt) => (
                      <div
                        data-testid="downloadReport"
                        onClick={downloadReport}
                        onKeyDown={downloadReport}
                        role="button"
                        tabIndex="0"
                        alt={shareAlt}
                      >
                        <img
                          src={images.reportEmail}
                          alt={shareAlt}
                          className={classes.icon}
                        />
                      </div>
                    )}
                  </FormattedMessage>
                )}
                {allowPrintReport && (
                  <FormattedMessage {...messages.printAlt}>
                    {(printAlt) => (
                      <div
                        data-testid="printReport"
                        onClick={printPdfReport}
                        onKeyDown={printPdfReport}
                        role="button"
                        tabIndex="0"
                        alt={printAlt}
                      >
                        <img
                          src={images.reportPrint}
                          alt={printAlt}
                          className={classes.icon}
                        />
                      </div>
                    )}
                  </FormattedMessage>
                )}
                {allowPdfDownloadReport && (
                  <FormattedMessage {...messages.pdfAlt}>
                    {(pdfAlt) => (
                      <div
                        data-testid="downloadPdf"
                        onClick={downloadPdf}
                        onKeyDown={downloadPdf}
                        role="button"
                        tabIndex="0"
                        alt={pdfAlt}
                      >
                        <img
                          src={images.reportPdf}
                          alt={pdfAlt}
                          className={classes.icon}
                        />
                      </div>
                    )}
                  </FormattedMessage>
                )}
              </Grid>
            </Grid>
          </Box>
        </div>
      </Box>
      <Box id="chartContainer" className={classes.chartsWrapper}>
        {getChartsComponent()}
      </Box>
      <iframe
        title="Entech Reporting Chart"
        id="printContainer"
        className={classes.iframeWrapper}
      />
      {isModalOpen('shareReportModal') && (
        <ShareReportModal
          data-testid="content-shareReportModal"
          openModal={isModalOpen('shareReportModal')}
          closeShareReportDialog={closeShareReportModal}
          generateSharedPdf={generateSharedPdfHandler}
          showLoading={showLoadingShareReportModal}
        />
      )}
    </>
  );
};

Charting.propTypes = {
  intl: intlShape,
  company: PropTypes.string,
  sites: PropTypes.array,
  defaultReportType: PropTypes.number,
  charts: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  getReportsCharts: PropTypes.func,
  getReportsExcel: PropTypes.func,
  reportsCsv: PropTypes.bool,
  cleanReportsCharts: PropTypes.func,
  getShareReports: PropTypes.func,
  sendChartReportByEmail: PropTypes.func,
  shareReports: PropTypes.object,
  customerName: PropTypes.string,
  siteName: PropTypes.string,
  resetFiltersWhenCompanyChange: PropTypes.bool,
  allowShareReport: PropTypes.bool,
  allowPrintReport: PropTypes.bool,
  allowPdfDownloadReport: PropTypes.bool,
};

/**
 * mapStateToProps
 * @param {Object} charts receives reports.charts reducer from redux
 * @param {Object} shareReports receives reports.shareReports reducer from redux
 */
const mapStateToProps = (state) => ({
  charts: state.reports.charts,
  shareReports: state.reports.shareReports,
  customerName: getValueIfExists(() => state.user.user.given_name, ''),
  siteName: getValueIfExists(() => state.sites.site.name, ''),
  reportsCsv: state.reports.reportsDownloadExcel,
});

/**
 * mapDispatchToProps
 * @param {Function} getReports call getReports action and get reports from charts data
 * @param {Function} cleanReports call cleanReports action and clear charts data
 */
const mapDispatchToProps = (dispatch) => ({
  getReportsCharts: (
    company,
    interval,
    quarter,
    sites,
    timePeriod,
    reportType
  ) =>
    dispatch(
      getReports(company, interval, quarter, sites, timePeriod, reportType)
    ),
  cleanReportsCharts: () => dispatch(cleanReports()),
  sendChartReportByEmail: (
    reportContent,
    company,
    sites,
    reportName,
    reportBlob,
    recipients,
    customMessage
  ) =>
    dispatch(
      sendReportByEmail(
        reportContent,
        company,
        sites,
        reportName,
        reportBlob,
        recipients,
        customMessage
      )
    ),
  getReportsExcel: (month, sites, company) =>
    dispatch(
      fetchReportsCSVDownload(
        moment(month).format('YYYY-MM-DD'),
        sites,
        company
      )
    ),
});
// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Charting));
/* eslint-enable */
