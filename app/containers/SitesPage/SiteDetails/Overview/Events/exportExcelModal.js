import { makeStyles, Typography, Box, Grid } from '@material-ui/core';
import ButtonComponent from 'Components/Button';
import ModalComponent from 'Components/Modal';
import TextField from 'Components/Input';
import Select from 'Components/Select';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import { Colors } from 'Theme';
import { DownloadExcelFilters, FormatTimes } from 'Utils/enums/device';
import {
  generateTimeTwelveHours,
  generateTimeMinutes,
  TimeDivisionOptions,
} from 'Utils/reports';
import { getValueIfExists } from 'Utils/propertyValidation';
import messages from './messages';

const useStyles = makeStyles({
  title: {
    fontWeight: 'bold',
  },
  mainContainer: {
    marginTop: '25px',
  },
  lastDropdown: {
    marginTop: '24px',
  },
  cancelButton: {
    height: '40px',
    width: '140px',
    cursor: 'pointer',
  },
  submitButton: {
    height: '40px',
    width: '150px',
    border: 0,
    color: Colors.white,
    backgroundColor: Colors.primaryLight,
    outline: 'none',
    margin: '0',
    marginLeft: '10px',
    cursor: 'pointer',
    '&:disabled': {
      opacity: 0.5,
    },
  },
  timesContainer: {
    marginTop: '25px',
    marginBottom: '25px',
  },
  timeTitle: {
    color: Colors.primaryLight,
    fontWeight: 'bold',
    marginBottom: '12px',
  },
  selectDate: {
    position: 'relative',
  },
  label: {
    position: 'absolute',
    left: '10px',
    top: '10px',
    color: Colors.edward,
    fontSize: '15px',
    backgroundColor: Colors.athensGray,
    width: '90px',
    zIndex: 1,
  },
});

/**
 * @method ExportExcelModal
 * Handle download to excel events from device with some filters
 * @property {Object} props The properties to render the component.
 * @return {Object} Returns the component
 */
const ExportExcelModal = (props) => {
  const { formatMessage } = props.intl;
  const classStyle = useStyles();
  const { continueDialog, discardDialog, openModal = false } = props;
  const { downloadExcel } = messages;
  const formDefault = {
    dateRangeFrom: null,
    dateRangeTo: null,
    timeFromHour: null,
    timeFromMinute: null,
    timeFromDivision: null,
    timeToHour: null,
    timeToMinute: null,
    timeToDivision: null,
  };
  const formDataDefault = {
    ...formDefault,
    timeFromHour: 12,
    timeFromMinute: '00',
    timeFromDivision: 'AM',
    timeToHour: 12,
    timeToMinute: '00',
    timeToDivision: 'AM',
  };
  const [allowSubmit, setAllowSubmit] = React.useState(false);
  const [formData, setFormData] = React.useState(formDataDefault);
  const [formErrors, setFormErrors] = React.useState(formDefault);
  const twelveHoursData = generateTimeTwelveHours();
  const minutesData = generateTimeMinutes();

  /**
   * @method validateDateRange
   * Validate if Date Range From filter is greater than Date Range To filter
   * and update formErrors property States
   * @returns {boolean}
   */
  const validateDateRange = () => {
    if (
      moment(formData.dateRangeFrom).format() >
      moment(formData.dateRangeTo).format()
    ) {
      setFormErrors((prevData) => ({
        ...prevData,
        dateRangeTo: true,
      }));
      return false;
    }
    setFormErrors((prevData) => ({
      ...prevData,
      dateRangeTo: false,
    }));
    return true;
  };

  /**
   * @method validateTimeSpan
   * Validate if Date Range filters has same values and Time to filters
   * is lower time than time From filter, in both cases should update
   * formErrors properties States
   * @returns {boolean}
   */
  const validateTimeSpan = () => {
    const timeFrom = `${formData.timeFromHour}:${formData.timeFromMinute} ${
      formData.timeFromDivision
    }`;
    const timeTo = `${formData.timeToHour}:${formData.timeToMinute} ${
      formData.timeToDivision
    }`;

    if (
      moment(formData.dateRangeFrom).format() ===
        moment(formData.dateRangeTo).format() &&
      moment(timeTo, FormatTimes.TimeFiltersFormat).isBefore(
        moment(timeFrom, FormatTimes.TimeFiltersFormat)
      )
    ) {
      setFormErrors((prevData) => ({
        ...prevData,
        timeToHour: true,
        timeToMinute: true,
        timeToDivision: true,
      }));
      return false;
    }
    setFormErrors((prevData) => ({
      ...prevData,
      timeToHour: false,
      timeToMinute: false,
      timeToDivision: false,
    }));
    return true;
  };

  /**
   * @method onChangeEvent
   * Handle change event in all filters and save values on formData variable
   * @param {any} event receives change event from filter
   * @param {string} type receives type filter
   */
  const onChangeEvent = (event, type) => {
    const value = getValueIfExists(() => event.target.value, event);
    setFormData((prevData) => ({
      ...prevData,
      [`${type}`]: value,
    }));
  };

  /**
   * @method getFormDataSelected
   * Handle select object from filters when comparing the formData properties values
   * @param {string} type receives type filter
   * @returns {Object|null}
   */
  const getFormDataSelected = (type) =>
    getValueIfExists(() => formData[`${type}`])
      ? { value: formData[`${type}`] }
      : null;

  /**
   * @method initializeDefaultVariables
   * Initialize variables states to default values
   */
  const initializeDefaultVariables = () => {
    setAllowSubmit(false);
    setFormErrors(formDefault);
    setFormData(formDataDefault);
  };

  /**
   * @method cancelClickEvent
   * Handle click event on Cancel button and restore formData values
   */
  const cancelClickEvent = () => {
    discardDialog();
    initializeDefaultVariables();
  };

  /**
   * @method submitClickEvent
   * Handle click event on Submit button, send rangeFrom and rangeTo date variables
   * to continueDialog function and restore formData values
   */
  const submitClickEvent = () => {
    const timeFrom = `${formData.timeFromHour}:${formData.timeFromMinute} ${
      formData.timeFromDivision
    }`;
    const timeTo = `${formData.timeToHour}:${formData.timeToMinute} ${
      formData.timeToDivision
    }`;
    const rangeFrom = moment(`${formData.dateRangeFrom} ${timeFrom}`);
    const rangeTo = moment(`${formData.dateRangeTo} ${timeTo}`);
    continueDialog(rangeFrom, rangeTo);
    initializeDefaultVariables();
  };

  /**
   * @method validateFormData
   * Handle validation for allow submit button disabled
   * @returns {boolean}
   */
  const validateFormData = () =>
    validateDateRange() &&
    validateTimeSpan() &&
    Object.values(formData).filter((value) => value !== null).length ===
      Object.keys(formData).length;

  React.useEffect(() => {
    setAllowSubmit(validateFormData);
  }, [formData]);

  /**
   * @property {Object} modalTitle Stores the title to display in the modal
   */
  const modalTitle = (
    <Typography variant="caption" className={classStyle.title}>
      {formatMessage(downloadExcel.title)}
    </Typography>
  );

  return (
    <ModalComponent
      data-testid="content-downloadExcelModal"
      open={openModal}
      onBackdropClick={continueDialog}
      title={modalTitle}
    >
      <Typography>{formatMessage(downloadExcel.body)}</Typography>
      <Box className={classStyle.mainContainer}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography component="span" variant="body1">
              {formatMessage(downloadExcel.dateRange)}
            </Typography>
            <div className={classStyle.selectDate}>
              <Typography
                className={classStyle.label}
                style={{ opacity: formData.dateRangeFrom ? 0 : 1 }}
              >
                {formatMessage(downloadExcel.from)}
              </Typography>
              <TextField
                name={DownloadExcelFilters.DateRangeFrom}
                invalid={formErrors.dateRangeFrom}
                data-testid="select-dateFrom"
                type="date"
                placeholder={formatMessage(downloadExcel.from)}
                onChange={(event) =>
                  onChangeEvent(event, DownloadExcelFilters.DateRangeFrom)
                }
              />
            </div>
          </Grid>
          <Grid item xs={6} className={classStyle.lastDropdown}>
            <div className={classStyle.selectDate}>
              <Typography
                className={classStyle.label}
                style={{ opacity: formData.dateRangeTo ? 0 : 1 }}
              >
                {formatMessage(downloadExcel.to)}
              </Typography>
              <TextField
                name={DownloadExcelFilters.DateRangeTo}
                invalid={formErrors.dateRangeTo}
                data-testid="select-dateTo"
                type="date"
                placeholder={formatMessage(downloadExcel.to)}
                onChange={(event) =>
                  onChangeEvent(event, DownloadExcelFilters.DateRangeTo)
                }
              />
            </div>
          </Grid>
        </Grid>
        <Box className={classStyle.timesContainer}>
          <Typography className={classStyle.timeTitle}>
            {formatMessage(downloadExcel.timeFrom)}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Typography component="span" variant="body1">
                {formatMessage(downloadExcel.hour)}
              </Typography>
              <Select
                invalid={formErrors.timeFromHour}
                data-testid="select-timeFromHour"
                selectData={twelveHoursData}
                selectedObject={getFormDataSelected(
                  DownloadExcelFilters.TimeFromHour
                )}
                onChange={(event) =>
                  onChangeEvent(event, DownloadExcelFilters.TimeFromHour)
                }
              />
            </Grid>
            <Grid item xs={3}>
              <Typography component="span" variant="body1">
                {formatMessage(downloadExcel.minute)}
              </Typography>
              <Select
                invalid={formErrors.timeFromMinute}
                data-testid="select-timeFromMinute"
                selectData={minutesData}
                selectedObject={getFormDataSelected(
                  DownloadExcelFilters.TimeFromMinute
                )}
                onChange={(event) =>
                  onChangeEvent(event, DownloadExcelFilters.TimeFromMinute)
                }
              />
            </Grid>
            <Grid item xs={3} className={classStyle.lastDropdown}>
              <Select
                invalid={formErrors.timeFromDivision}
                className={classStyle.dropdown}
                data-testid="select-timeFromAM"
                selectData={TimeDivisionOptions}
                selectedObject={getFormDataSelected(
                  DownloadExcelFilters.TimeFromDivision
                )}
                onChange={(event) =>
                  onChangeEvent(event, DownloadExcelFilters.TimeFromDivision)
                }
              />
            </Grid>
          </Grid>
        </Box>
        <Box className={classStyle.timesContainer}>
          <Typography className={classStyle.timeTitle}>
            {formatMessage(downloadExcel.timeTo)}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Typography component="span" variant="body1">
                {formatMessage(downloadExcel.hour)}
              </Typography>
              <Select
                invalid={formErrors.timeToHour}
                data-testid="select-timeToHour"
                selectData={twelveHoursData}
                selectedObject={getFormDataSelected(
                  DownloadExcelFilters.TimeToHour
                )}
                onChange={(event) =>
                  onChangeEvent(event, DownloadExcelFilters.TimeToHour)
                }
              />
            </Grid>
            <Grid item xs={3}>
              <Typography component="span" variant="body1">
                {formatMessage(downloadExcel.minute)}
              </Typography>
              <Select
                invalid={formErrors.timeToMinute}
                data-testid="select-timeToMinute"
                selectData={minutesData}
                selectedObject={getFormDataSelected(
                  DownloadExcelFilters.TimeToMinute
                )}
                onChange={(event) =>
                  onChangeEvent(event, DownloadExcelFilters.TimeToMinute)
                }
              />
            </Grid>
            <Grid item xs={3} className={classStyle.lastDropdown}>
              <Select
                invalid={formErrors.timeToDivision}
                data-testid="select-timeToAM"
                selectData={TimeDivisionOptions}
                selectedObject={getFormDataSelected(
                  DownloadExcelFilters.TimeToDivision
                )}
                onChange={(event) =>
                  onChangeEvent(event, DownloadExcelFilters.TimeToDivision)
                }
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <div>
        <ButtonComponent
          className={classStyle.cancelButton}
          type="button"
          onClick={cancelClickEvent}
          data-testid="content-modalDiscardButton"
        >
          {formatMessage(downloadExcel.discardButton)}
        </ButtonComponent>
        <button
          disabled={!allowSubmit}
          type="button"
          className={classStyle.submitButton}
          onClick={submitClickEvent}
          data-testid="content-modalContinueButton"
        >
          {formatMessage(downloadExcel.continueButton)}
        </button>
      </div>
    </ModalComponent>
  );
};

ExportExcelModal.propTypes = {
  intl: PropTypes.any.isRequired,
  continueDialog: PropTypes.func,
  discardDialog: PropTypes.func,
  openModal: PropTypes.bool,
};

export default injectIntl(ExportExcelModal);
