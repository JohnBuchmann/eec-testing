/*
 * Bus Band Configuration Page
 *
 * This is the bus band configuration page where we can read and edit bus band settings
 *
 */
import {
  Box,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import images from 'Assets/images';
import ButtonComponent from 'Components/Button';
import GenericModalConfirmation from 'Components/GenericModalConfirmation';
import { LabelEdit } from 'Components/LabelEdit/LabelEdit';
import Panel from 'Components/Panel';
import ToolTipText from 'Components/ToolTipText';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  cleanBusBandPoints,
  cleanBusBandStatus,
  getSiteBusBand,
  patchBusBandPoints,
  postBusBandStatus,
  updateBusBandTabsDisabled,
} from 'Store/Sites/actions';
import { Colors } from 'Theme';
import {
  busBandEditingStatus,
  getModifiedFieldsFormat,
  pointOperationStatus,
} from 'Utils/busband';
import busBandTimer from 'Utils/busBandTimer';
import * as general from 'Utils/messages';
import {
  SiteDetailsCatalog,
  PermissionsList,
  TypeValidation,
} from 'Utils/enums/roles';
import { fieldTypes } from 'Utils/fieldType';
import history from 'Utils/history';
import {
  getValueIfExists,
  isNumeric,
  propertyExist,
} from 'Utils/propertyValidation';
import { validatePermission } from 'Config/appSettings';
import * as busMessages from '../../messages';
import DiscardModal from './DiscardModal';
import messages from './messages';
import SavedModal from './SavedModal';

/**
 * useStyles
 * Method to get bus band styles
 */
const useStyles = makeStyles({
  actionControl: {
    marginLeft: '10px',
    marginRight: '25px',
  },
  headerWrapper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '65px',
    padding: '12px 16px',
  },
  headerTitle: {
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  editIconButton: {
    paddingBottom: '0px',
    paddingTop: '0px',
    paddingLeft: '5px',
    paddingRight: '0px',
  },
  iconImage: {
    color: Colors.mountainMeadow,
  },
  cellHeaderWrapper: {
    borderBottom: 'none',
    padding: '0px',
    textTransform: 'uppercase',
  },
  cellTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: '16px',
    paddingTop: '9px',
    paddingBottom: '12px',
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
  },
  cellWorkingBusBand: {
    backgroundColor: Colors.athensGray,
  },
  cellDescription: {
    borderBottom: 'none',

    paddingTop: '8px',
    paddingBottom: '8px',
  },
  cellData: {
    borderBottom: 'none',
    minWidth: '190px',
    padding: '0px 16px 0px 0px',
    textAlign: 'end',
    '&:last-child': {
      borderRight: 'none',
    },
  },
  borderCell: { borderRight: `solid 3px ${Colors.geyser}` },
  columnTitle: {
    fontWeight: 600,
  },
  descriptionValue: {
    minWidth: '341px',
  },
  dataValue: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  contentStyle: {
    padding: '0px 16px 24px 16px',
    maxWidth: '92vw',
  },
  saveButton: {
    '&.Mui-disabled': {
      color: `${Colors.silverSand} !important
      `,
    },
  },
  noDataPlaceholder: {
    margin: '0',
    lineHeight: '50px',
    height: '50px',
    textAlign: 'center',
    paddingTop: '12px',
  },
});

export const createTimer = (callback) =>
  busBandTimer.createTimer(() => {
    callback();
  });

/**
 * BusBand creates the container to
 * display all the content related to the bus band configuration
 */
const BusBand = (props) => {
  const { siteId } = useParams();
  const [openModal, setOpenModal] = React.useState(false);
  const [dataChanged, setDataChanged] = React.useState(false);
  const [customMessage, setCustomMessage] = React.useState({});
  const {
    permissions,
    editionAvailable,
    lastPointsUpdated,
    formattedConfiguration,
    getBusBandConfiguration,
    updateBusBandTabsState,
    isBusbandTabDisabled,
    postBusBandStatusDispatch,
    isSiteLive,
    siteAccount,
  } = props;
  /**
   * Params to Permissions in Busband Edit
   */
  const paramsToPermissions = {
    permissions,
    isSiteLive,
    section: getValueIfExists(() => PermissionsList.SiteDetails, ''),
    type: getValueIfExists(() => TypeValidation.Edit, ''),
    action: getValueIfExists(() => SiteDetailsCatalog.BusBand, ''),
    siteAccount,
  };
  /**
   * Handle which can user Bus Band Edit Permission
   */
  const canUserBusBandEdit = validatePermission(paramsToPermissions);
  const classStyle = useStyles();
  const {
    busBand: busBandMessages,
    savedAlert: saveAlertMessages,
    outOfRangeAlert: outOfRangeAlertMessages,
  } = messages;
  const busBandModal = getValueIfExists(() => busMessages.default.busBand, {});
  const { editGreenIcon } = images;
  const discardModalName = 'discardModal';
  const savedModalName = 'savedModal';
  const confirmDialogModal = 'confirmDialogModal';
  const outOfRangeModal = 'outOfRangeModal';
  const tooltipPosition = 'top';
  const {
    busBandConfiguration,
    groups: busBandGroups,
    activeColumn: activeColumnValue,
  } = formattedConfiguration;
  const { formatMessage } = props.intl;
  const radix = 10;
  const indexActiveColumn = !Number.isNaN(activeColumnValue)
    ? parseInt(activeColumnValue, radix)
    : activeColumnValue;
  const cancelButton = {
    onClick: () => {
      setOpenModal({
        modal: discardModalName,
        isOpen: true,
      });
    },
  };
  let outLocation = '';
  // Set columns configuration
  const columnNameId = 1;
  let tableConfiguration = [];

  /**
   * setConfigurationColumns
   * Set configuration on columns coming from data base.
   */
  const setConfigurationColumns = () => {
    tableConfiguration = [];
    const indexStartPosition = 0;
    // Set default configuration column name
    tableConfiguration.push({
      id: columnNameId,
      index: indexStartPosition,
      isEditable: false,
      dataValue: 'name',
      classDataStyle: classStyle.descriptionValue,
    });

    // Set dynamic configuration columns
    if (Array.isArray(busBandGroups)) {
      let index = indexStartPosition + 1;
      busBandGroups.forEach((group) => {
        tableConfiguration.push({
          id: group.formattedNameId,
          title: group.name,
          classHeaderStyle: classStyle.cellTitle,
          isEditable: true,
          dataValue: group.formattedNameId,
          classDataStyle: classStyle.dataValue,
          fieldType: fieldTypes.vdc,
          workingBusBand: true,
          index: index++,
        });
      });
    }
  };

  const [isGridEditMode, setIsGridEditMode] = useState(false);
  const [busBandState, setBusBandState] = useState({
    busBandTable: tableConfiguration,
    busBandOriginalData: [],
    busBandWorkingData: [],
  });
  const [failPoints, setFailPoints] = useState({});

  const {
    busBandTable,
    busBandOriginalData,
    busBandWorkingData,
  } = busBandState;

  /**
   * setDetailColumns it map all points into elements to be displayed/
   * @param {Array} points
   * @returns {Array} of elements with the points messages
   */
  const setDetailColumns = (points) => {
    const space = <br />;
    const contentMessage = [space];
    if (Array.isArray(points)) {
      points.forEach((point) => {
        contentMessage.push(<p>{point.tag}</p>);
      });
      contentMessage.push(space);
    }
    return <>{contentMessage}</>;
  };

  /**
   * getCurrentEditingColumnNameId
   * Returns the id of the current editing column
   */
  const getCurrentEditingColumnNameId = () => {
    const editModeColumnIndex = busBandTable.findIndex(
      (activeColumn) => activeColumn.editMode
    );
    return getValueIfExists(
      () => busBandTable[parseInt(editModeColumnIndex, radix)].id
    );
  };

  /**
   * getModifiedPatchPoints
   * It gets current editing column and returns an object from getModifiedFieldsFormat
   * @returns {Object} object coming from getModifiedFieldsFormat
   */
  const getModifiedPatchPoints = () => {
    // Get name id of the column we are editing
    const editedColumnNameId = getCurrentEditingColumnNameId();
    return getModifiedFieldsFormat(
      busBandOriginalData,
      busBandWorkingData,
      editedColumnNameId
    );
  };

  /**
   * @method cancelGridEdit
   * Cancel edit mode in columns on bus Band Table
   * @param {number} columnId Column identifier to determinate which column was clicked
   * @return {void}
   */
  const cancelGridEdit = () =>
    busBandTable.map((column) => ({
      ...column,
      editMode: false,
    }));

  /**
   * isValueMinMaxValid
   * If Value is numeric and it is inside range
   * @param {Object} workingPoint working point, the one to validate
   * @returns {Boolean} If Value is numeric and it is inside range
   */
  const isValueMinMaxValid = (workingPoint) => {
    if (workingPoint) {
      const currentValue = workingPoint.value;

      // We need this new value to be numeric in order to validate it
      const isNumber = isNumeric(workingPoint.value);

      if (isNumber) {
        const newValueNumber = +currentValue;
        // Get min value, if this is null return same newValue to avoid validation
        const minValue = getValueIfExists(
          () => workingPoint.valueMin,
          newValueNumber
        );
        // Get max value, if this is null return same newValue to avoid validation
        const maxValue = getValueIfExists(
          () => workingPoint.valueMax,
          newValueNumber
        );

        return newValueNumber >= minValue && newValueNumber <= maxValue;
      }
    }
    return false;
  };

  /**
   * @method handleEditMode
   * Handles edit icon click on column to set that column in edit mode
   * @param {number} columnId Column identifier to determinate which column was clicked
   * @return {void}
   */
  const handleGridEditMode = (columnId) => {
    postBusBandStatusDispatch(busBandEditingStatus.Unavailable, siteId);
    const columnIndexToEdit = busBandTable.findIndex(
      (column) => column.id === columnId
    );
    if (columnIndexToEdit >= 0) {
      busBandTable[`${columnIndexToEdit}`] = {
        ...busBandTable[`${columnIndexToEdit}`],
        editMode: true,
      };

      createTimer(closeDiscardDialog);

      setBusBandState({
        ...busBandState,
        busBandTable,
      });
    }
  };

  useEffect(() => {
    if (propertyExist(() => editionAvailable.status)) {
      // If status available the keep editing, otherwise, display error.
      if (editionAvailable.status === busBandEditingStatus.Available) {
        // Set edit mode
        setBusBandState({
          ...busBandState,
          busBandWorkingData: _.cloneDeep(busBandOriginalData),
        });

        // Save button unavailable until data changes
        setDataChanged(false);
      } else {
        // Revert any changes for editing.
        setBusBandState({
          ...busBandState,
          busBandTable: cancelGridEdit(),
        });

        // Set Message
        const titleMessage = (
          <FormattedMessage {...busBandMessages.errorAttemptingToEdit}>
            {(continueButton) => <Typography>{continueButton}</Typography>}
          </FormattedMessage>
        );
        const bodyMessage = editionAvailable.message;
        setCustomMessage({ bodyMessage, titleMessage });

        // Open Modal
        setOpenModal({
          modal: savedModalName,
          isOpen: true,
        });
      }
      const { cleanBusBandStatusDispatch } = props;
      if (cleanBusBandStatusDispatch) {
        cleanBusBandStatusDispatch();
      }
    }
  }, [editionAvailable]);

  useEffect(() => {
    getBusBandConfiguration(siteId);
  }, []);

  useEffect(() => {
    setConfigurationColumns();

    // If failPoints are available, then restore edit mode and set the error
    if (propertyExist(() => failPoints.points.length)) {
      let workingColumnNameId;
      let newBusBandWorkingData;

      // Set editing mode
      if (
        propertyExist(
          () => tableConfiguration[`${failPoints.editingColumnIndex}`]
        )
      ) {
        tableConfiguration[`${failPoints.editingColumnIndex}`].editMode = true;
        workingColumnNameId =
          tableConfiguration[`${failPoints.editingColumnIndex}`].id;
      }

      // Set error on fail points
      failPoints.points.forEach((failPoint) => {
        newBusBandWorkingData = busBandConfiguration.map((workingItem) => {
          if (workingItem[`${workingColumnNameId}`].id === failPoint.id) {
            const modifiedWorkItem = { ...workingItem };
            modifiedWorkItem[`${workingColumnNameId}`].error = true;
            return modifiedWorkItem;
          }
          return workingItem;
        });
      });

      // Set editing mode.
      if (workingColumnNameId) {
        handleGridEditMode(workingColumnNameId);
      }

      // Clear fail points
      setFailPoints({});

      // Set data
      setBusBandState({
        ...busBandState,
        busBandTable: tableConfiguration,
        busBandOriginalData: busBandConfiguration,
        busBandWorkingData: newBusBandWorkingData,
      });
    } else {
      setBusBandState({
        ...busBandState,
        busBandTable: tableConfiguration,
        busBandOriginalData: busBandConfiguration,
      });
    }
  }, [busBandConfiguration]);

  useEffect(() => {
    setIsGridEditMode(
      busBandTable && busBandTable.some((column) => column && column.editMode)
    );
  }, [busBandState]);

  useEffect(() => {
    if (isBusbandTabDisabled === false && isGridEditMode) {
      setBusBandState({ ...busBandState, busBandTable: cancelGridEdit() });
      setIsGridEditMode(false);
    }
  }, [isBusbandTabDisabled]);

  useEffect(() => {
    if (isGridEditMode) {
      updateBusBandTabsState(true);
      history.block((location) => {
        outLocation = location;
        setOpenModal({
          modal: confirmDialogModal,
          isOpen: true,
        });
        return false;
      });
    } else {
      updateBusBandTabsState(false);
      history.block(true);
    }
  }, [isGridEditMode]);

  const saveButton = {
    handleRoute: () => {
      const editedColumnNameId = getCurrentEditingColumnNameId();

      // Validate if there is a field out of bound with isValueMinMaxValid
      let errorFound = false;
      const newBusBandWorkingData = busBandWorkingData.map((workingItem) => {
        if (!isValueMinMaxValid(workingItem[`${editedColumnNameId}`])) {
          errorFound = true;
          const modifiedWorkItem = { ...workingItem };
          // Set error true to show red border.
          modifiedWorkItem[`${editedColumnNameId}`].error = true;
          return modifiedWorkItem;
        }
        return workingItem;
      });

      if (errorFound) {
        setBusBandState({
          ...busBandState,
          busBandWorkingData: [...newBusBandWorkingData],
        });

        setOpenModal({
          modal: outOfRangeModal,
          isOpen: true,
        });
      } else {
        // Only call endpoint if there is a modification
        const patchPoints = getModifiedPatchPoints();
        if (getValueIfExists(() => patchPoints.points.length)) {
          const { patchBusBandPointsDispatch } = props;
          patchBusBandPointsDispatch(siteId, patchPoints);
        }
      }
    },
    secondary: true,
  };

  /**
   * cleanAllUpdatedPoints
   * This will call clean busband points to restore last update.
   */
  const cleanAllUpdatedPoints = () => {
    const { cleanBusBandPointsDispatch } = props;
    if (cleanBusBandPointsDispatch) {
      cleanBusBandPointsDispatch();
    }
  };

  // This will process the response the response after attempting to save.
  useEffect(() => {
    let bodyMessage;
    let titleMessage;
    if (getValueIfExists(() => lastPointsUpdated.points.length, 0)) {
      const content = [];
      const isThereAnyFailStatus = lastPointsUpdated.points.some(
        (point) => point.operationStatus === pointOperationStatus.Fail
      );

      // If something failed, we will set a custom message.
      if (isThereAnyFailStatus) {
        bodyMessage = '';

        // Set message for the one on success
        const successPoints = lastPointsUpdated.points.filter(
          (point) => point.operationStatus === pointOperationStatus.Success
        );

        if (getValueIfExists(() => successPoints.length, 0)) {
          bodyMessage = (
            <FormattedMessage {...saveAlertMessages.bodyPartialSuccess}>
              {(message) => <Typography>{message}</Typography>}
            </FormattedMessage>
          );
          content.push(bodyMessage);

          // Append all points on success
          bodyMessage = setDetailColumns(successPoints);
          content.push(bodyMessage);
        }

        // Set message for the one on fail
        const responseFailPoints = lastPointsUpdated.points.filter(
          (point) => point.operationStatus === pointOperationStatus.Fail
        );

        titleMessage = (
          <FormattedMessage {...saveAlertMessages.titleFailure}>
            {(continueButton) => <Typography>{continueButton}</Typography>}
          </FormattedMessage>
        );

        // If there is any error then mark errors and keep editing...
        if (getValueIfExists(() => responseFailPoints.length, 0)) {
          bodyMessage = (
            <FormattedMessage {...outOfRangeAlertMessages.body}>
              {(message) => <Typography>{message}</Typography>}
            </FormattedMessage>
          );
          content.push(bodyMessage);

          // Append all points on fail
          bodyMessage = setDetailColumns(responseFailPoints);
          content.push(bodyMessage);

          const editModeColumnIndex = busBandTable.findIndex(
            (activeColumn) => activeColumn.editMode
          );
          // save responseFailPoints in useState and the useEffect when data updates then clean responseFailPoints
          setFailPoints({
            points: responseFailPoints,
            editingColumnIndex: editModeColumnIndex,
          });
          titleMessage = (
            <FormattedMessage {...outOfRangeAlertMessages.title}>
              {(title) => <Typography>{title}</Typography>}
            </FormattedMessage>
          );
        }
      } else {
        // Is no fail status set edition available
        postBusBandStatusDispatch(busBandEditingStatus.Available, siteId);
      }

      // Call getBusBandConfiguration to refresh bus band data
      getBusBandConfiguration(siteId);

      setCustomMessage({
        bodyMessage: content.length ? content : null,
        titleMessage,
      });
      setOpenModal({
        modal: savedModalName,
        isOpen: true,
      });

      cleanAllUpdatedPoints();
    } else if (propertyExist(() => lastPointsUpdated.error)) {
      // if there is an error, set title and body as failure
      titleMessage = (
        <FormattedMessage {...saveAlertMessages.titleFailure}>
          {(continueButton) => <Typography>{continueButton}</Typography>}
        </FormattedMessage>
      );
      bodyMessage = (
        <FormattedMessage {...saveAlertMessages.bodyGeneralFailure}>
          {(message) => <Typography>{message}</Typography>}
        </FormattedMessage>
      );

      setCustomMessage({ bodyMessage, titleMessage });
      setOpenModal({ modal: savedModalName, isOpen: true });

      cleanAllUpdatedPoints();
    }
  }, [lastPointsUpdated]);

  /**
   * @method onBusBandChange
   * Handles edition on bus band field and update the state
   * @param {number} columnId Column identifier to determinate which column was clicked
   * @return {void}
   */
  const onBusBandChange = (newValue, busBandId, propertyData) => {
    const busBanToEditIndex = busBandWorkingData.findIndex(
      (busBandWorkingItem) => busBandWorkingItem.id === busBandId
    );

    if (busBanToEditIndex >= 0) {
      const newBusBandData = {
        ...busBandWorkingData[`${busBanToEditIndex}`],
      };
      newBusBandData[`${propertyData}`].value = newValue;
      newBusBandData[`${propertyData}`].error = false;
      busBandWorkingData[`${busBanToEditIndex}`] = newBusBandData;

      setBusBandState({
        ...busBandState,
        busBandWorkingData: [...busBandWorkingData],
      });
    }
  };

  /**
   * validateEditColumn
   * return validation with role permission, colum value and isGridEditMode
   * @param {boolean} isEditable receives value from colum.isEditable
   * @return {boolean}
   */
  const validateEditColumn = (isEditable) =>
    canUserBusBandEdit && isEditable && !isGridEditMode;
  /**
   * @method createCellHeader
   * Creates Bus Band Configuration Table Header Cell
   * @param {object} column configuration configuration
   * @return {void}
   */
  const createCellHeader = (column) => {
    let cellHeader = <></>;

    if (column) {
      const cellStyle = `${classStyle.cellHeaderWrapper} ${
        column.workingBusBand &&
        !column.editMode &&
        column.index === indexActiveColumn
          ? classStyle.cellWorkingBusBand
          : ''
      } `;

      cellHeader = (
        <React.Fragment key={column.id}>
          <TableCell key={column.id} className={cellStyle}>
            <Box className={classStyle.cellTitle}>
              {column.title && (
                <Box className={classStyle.title}>
                  <Typography
                    variant="caption"
                    className={classStyle.columnTitle}
                  >
                    {column.title}
                  </Typography>

                  {column.editMode && (
                    <FormattedMessage {...busBandMessages.currentSetPoint}>
                      {(currentSetPoint) => (
                        <Typography
                          variant="caption"
                          className={classStyle.columnTitle}
                        >
                          {currentSetPoint}
                        </Typography>
                      )}
                    </FormattedMessage>
                  )}
                </Box>
              )}
              {validateEditColumn(column.isEditable) && (
                <IconButton
                  className={classStyle.editIconButton}
                  onClick={() => {
                    handleGridEditMode(column.id);
                  }}
                  data-testid="edit-icon-column"
                >
                  <img
                    src={editGreenIcon}
                    alt=""
                    className={classStyle.iconImage}
                  />
                </IconButton>
              )}
              {!canUserBusBandEdit && (
                <ToolTipText
                  title={formatMessage(general.default.disabledEditTitle)}
                  placement={tooltipPosition}
                />
              )}
            </Box>
          </TableCell>

          {column.isEditable && column.editMode && (
            <TableCell className={classStyle.cellHeaderWrapper}>
              <Box className={classStyle.cellTitle}>
                {column.title && (
                  <Box className={classStyle.title}>
                    <Typography
                      variant="caption"
                      className={classStyle.columnTitle}
                    >
                      {column.title}
                    </Typography>

                    <FormattedMessage {...busBandMessages.newSetPoint}>
                      {(newSetPoint) => (
                        <Typography
                          variant="caption"
                          className={classStyle.columnTitle}
                        >
                          {newSetPoint}
                        </Typography>
                      )}
                    </FormattedMessage>
                  </Box>
                )}
              </Box>
            </TableCell>
          )}
        </React.Fragment>
      );
    }
    return cellHeader;
  };

  /**
   * @method isModalOpen
   * Validates if a specific modal is open
   * or not to display or hide it.
   * @param {String} modal The name of the modal to validate
   * @return {void}
   */
  const isModalOpen = (modal) =>
    openModal && openModal.isOpen && openModal.modal === modal;

  /**
   * @method closeDiscardDialog
   * Closing the dialog to discard busband changes
   * @return {void}
   */
  const closeDiscardDialog = () => {
    setBusBandState({ ...busBandState, busBandTable: cancelGridEdit() });
    setOpenModal({
      modal: discardModalName,
      isOpen: false,
    });
    updateBusBandTabsState(false);
    postBusBandStatusDispatch(busBandEditingStatus.Available, siteId);
    busBandTimer.clearTimer();
  };

  /**
   * @method submitContinueDialog
   * Continue to editing busband changes
   * @return {void}
   */
  const submitContinueDialog = () => {
    // TODO: Send the request to API to remove the user from database.
    setOpenModal({
      modal: discardModalName,
      isOpen: false,
    });
  };

  /**
   * @method submitUnSaved
   * Handle submit event from General Modal and redirect with history
   * from outLocation saved
   */
  const submitUnSaved = () => {
    history.block(true);
    history.push(outLocation);
    closeDiscardDialog();
  };

  /**
   * @method submitOkDialog
   * Continue to editing busband changes
   * @return {void}
   */
  const submitOkDialog = () => {
    setOpenModal({
      modal: savedModalName,
      isOpen: false,
    });
  };

  /**
   * @method onSubmitOutOfRangeAlert
   * Handle submit event for out of range alert
   * @return {void}
   */
  const onSubmitOutOfRangeAlert = () => {
    setOpenModal({
      modal: outOfRangeModal,
      isOpen: false,
    });
  };

  const onLabelEditBlur = () => {
    const patchPoints = getModifiedPatchPoints();
    const hasDataChanged = !!getValueIfExists(() => patchPoints.points.length);
    setDataChanged(hasDataChanged);
  };

  /**
   * validateTypeArray
   * Validate if the input variable is an array
   * @param {Any} arrayData receives variable to validate
   * @returns boolean
   */
  const validateTypeArray = (arrayData) => Array.isArray(arrayData);

  /**
   * @method createCellHeader
   * Creates Bus Band Configuration Table Body Cell
   * @param {object} column configuration configuration
   * @param {object} busBandItem data value for bus band object
   * @return {object} a fragment node with table cell data if data exist
   */
  const createCellBody = (column, busBandItem, displayBorderRight) => {
    let cellBody = <></>;

    if (column && busBandItem) {
      const busBandObject = getValueIfExists(
        () => busBandItem[column.dataValue],
        ''
      );
      const busBandValue = getValueIfExists(
        () => busBandObject.value,
        busBandObject
      );

      let busBandEditedValue = '';
      const busBandWorkingItemEdit = busBandWorkingData.find(
        (busBandWorkingItem) => busBandWorkingItem.id === busBandItem.id
      );
      if (column.editMode) {
        busBandEditedValue = getValueIfExists(
          () => busBandWorkingItemEdit[column.dataValue].value,
          ''
        );
      }

      const cellStyle = `${
        column.id === columnNameId
          ? classStyle.cellDescription
          : classStyle.cellData
      } ${
        column.workingBusBand &&
        !column.editMode &&
        column.index === indexActiveColumn
          ? classStyle.cellWorkingBusBand
          : ''
      } ${displayBorderRight ? classStyle.borderCell : ''}`;

      const cellEditStyle = `${classStyle.cellData} ${classStyle.borderCell}`;

      cellBody = (
        <React.Fragment key={column.id}>
          <TableCell className={cellStyle}>
            <Box className={column.classDataStyle}>
              <LabelEdit
                value={busBandValue}
                type={column.fieldType}
                onChange={() => {}}
              />
            </Box>
          </TableCell>

          {column.editMode && (
            <TableCell className={cellEditStyle}>
              <Box className={column.classDataStyle}>
                <LabelEdit
                  displayError={getValueIfExists(
                    () => busBandWorkingItemEdit[column.dataValue].error,
                    false
                  )}
                  onBlur={() => onLabelEditBlur()}
                  value={busBandEditedValue}
                  type="number"
                  onChange={(e) => {
                    onBusBandChange(e, busBandItem.id, column.dataValue);
                  }}
                  editMode={column.editMode}
                  isEditable={column.isEditable}
                />
              </Box>
            </TableCell>
          )}
        </React.Fragment>
      );
    }

    return cellBody;
  };

  /**
   * @method contentBody
   * Creates table content for bus band configuration panel
   * @return {void}
   */
  const contentBody = (
    <>
      <TableContainer>
        <Table aria-label="simple table" data-testid="bus-band-table">
          <TableHead data-testid="bus-band-table-header">
            <TableRow data-testid="bus-band-table-row">
              {busBandTable &&
                busBandTable.map((column) => createCellHeader(column))}
            </TableRow>
          </TableHead>
          <TableBody data-testid="bus-band-table-body">
            {busBandOriginalData &&
              validateTypeArray(busBandOriginalData) &&
              busBandOriginalData.map((busBandItem) => (
                <TableRow
                  key={busBandItem.id}
                  data-testid="bus-band-table-body-row"
                >
                  {busBandTable &&
                    busBandTable.map((column, index) => {
                      const workingBusBandColumnIndex = busBandTable.findIndex(
                        (workingColumn) => workingColumn.workingBusBand
                      );

                      const editModeColumnIndex = busBandTable.findIndex(
                        (activeColumn) => activeColumn.editMode
                      );

                      const borderRight =
                        (!column.editMode &&
                          index !== workingBusBandColumnIndex &&
                          index !== workingBusBandColumnIndex - 1) ||
                        (isGridEditMode &&
                          !column.editMode &&
                          index !== editModeColumnIndex &&
                          index === editModeColumnIndex - 1);

                      return createCellBody(column, busBandItem, borderRight);
                    })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  // Creates panel header section
  const headerContent = (
    <div
      className={classStyle.headerWrapper}
      data-testid="content-headerContent"
    >
      <FormattedMessage {...busBandMessages.title}>
        {(title) => (
          <Typography variant="caption" className={classStyle.headerTitle}>
            {title}
          </Typography>
        )}
      </FormattedMessage>
      {isGridEditMode && (
        <Box data-testid="content-header-actions">
          <ButtonComponent
            data-testid="cancel-action"
            className={classStyle.actionControl}
            {...cancelButton}
          >
            Cancel
          </ButtonComponent>
          <ButtonComponent
            className={classStyle.saveButton}
            disabled={!dataChanged}
            data-testid="save-action"
            {...saveButton}
          >
            Save
          </ButtonComponent>
        </Box>
      )}
    </div>
  );

  const noBusbandDataAvailableContent = (
    <p
      className={classStyle.noDataPlaceholder}
      data-testid="content-no-data-placeholder"
    >
      <FormattedMessage {...busBandMessages.noBusbandDataAvailable}>
        {(noBusbandDataAvailable) => (
          <Typography variant="caption">{noBusbandDataAvailable}</Typography>
        )}
      </FormattedMessage>
    </p>
  );

  return (
    <div>
      <Panel
        headerContent={headerContent}
        content={
          busBandTable && busBandOriginalData
            ? contentBody
            : noBusbandDataAvailableContent
        }
        contentStyle={classStyle.contentStyle}
      />
      <DiscardModal
        data-testid="content-discardModal"
        openModal={isModalOpen(discardModalName)}
        discardDialog={closeDiscardDialog}
        continueDialog={submitContinueDialog}
      />
      <SavedModal
        data-testid="content-savedModal"
        openModal={isModalOpen(savedModalName)}
        customMessage={customMessage}
        continueDialog={submitOkDialog}
      />
      <GenericModalConfirmation
        data-testid="content-devicesDetailsModal"
        titleMessage={formatMessage(busBandModal.unSavedChanges.title)}
        bodyMessage={formatMessage(busBandModal.unSavedChanges.body)}
        openModal={isModalOpen(confirmDialogModal)}
        saveLabelText={formatMessage(
          busBandModal.unSavedChanges.continueButton
        )}
        cancelLabelText={formatMessage(
          busBandModal.unSavedChanges.discardButton
        )}
        submitSave={submitUnSaved}
        submitCancel={submitContinueDialog}
      />
      <GenericModalConfirmation
        data-testid="outOfRangeModal"
        titleMessage={formatMessage(outOfRangeAlertMessages.title)}
        bodyMessage={formatMessage(outOfRangeAlertMessages.body)}
        openModal={isModalOpen(outOfRangeModal)}
        cancelLabelText={formatMessage(outOfRangeAlertMessages.continueButton)}
        submitCancel={onSubmitOutOfRangeAlert}
        showSubmit={false}
      />
    </div>
  );
};

BusBand.propTypes = {
  intl: PropTypes.any.isRequired,
  permissions: PropTypes.object,
  editionAvailable: PropTypes.object,
  lastPointsUpdated: PropTypes.object,
  formattedConfiguration: PropTypes.object,
  getBusBandConfiguration: PropTypes.func.isRequired,
  postBusBandStatusDispatch: PropTypes.func.isRequired,
  patchBusBandPointsDispatch: PropTypes.func.isRequired,
  cleanBusBandPointsDispatch: PropTypes.func.isRequired,
  updateBusBandTabsState: PropTypes.func,
  isBusbandTabDisabled: PropTypes.bool,
  cleanBusBandStatusDispatch: PropTypes.func,
  isSiteLive: PropTypes.bool,
  siteAccount: PropTypes.string,
};

const mapStateToProps = (state) => ({
  permissions: getValueIfExists(() => state.user.permissions, {}),
  editionAvailable: getValueIfExists(
    () => state.sites.site.busBand.editionAvailable,
    {}
  ),
  lastPointsUpdated: getValueIfExists(
    () => state.sites.site.busBand.lastPointsUpdated,
    {}
  ),
  formattedConfiguration: getValueIfExists(
    () => state.sites.site.busBand.formattedConfiguration,
    {}
  ),
  isBusbandTabDisabled: getValueIfExists(
    () => state.sites.busBandTabsDisabled,
    false
  ),
  isSiteLive: getValueIfExists(() => state.sites.site.live, false),
  siteAccount: getValueIfExists(() => state.sites.site.account, ''),
});

const mapDispatchToProps = (dispatch) => ({
  getBusBandConfiguration: (siteId) => dispatch(getSiteBusBand(siteId)),
  cleanBusBandPointsDispatch: () => dispatch(cleanBusBandPoints()),
  patchBusBandPointsDispatch: (siteId, busBandPoints) =>
    dispatch(patchBusBandPoints(siteId, busBandPoints)),
  updateBusBandTabsState: (state) => dispatch(updateBusBandTabsDisabled(state)),
  postBusBandStatusDispatch: (status, siteId) =>
    dispatch(postBusBandStatus(status, siteId)),
  cleanBusBandStatusDispatch: () => dispatch(cleanBusBandStatus()),
});
// Disabling this line because codacy doesn't recognizes the method from react */
/* eslint-disable */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(BusBand));
/* eslint-enable */
