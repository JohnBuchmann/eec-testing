import { Box, makeStyles } from '@material-ui/core';
import ButtonComponent from 'Components/Button';
import GenericModalConfirmation from 'Components/GenericModalConfirmation';
import InputComponent from 'Components/Input';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { Colors } from 'Theme';
import messages from 'Utils/enums/messages';
import { convertToAsterisk } from 'Utils/propertyHelpers';
import { stringIsNullOrEmpty } from 'Utils/propertyValidation';

const useStyles = makeStyles(() => ({
  saveButton: {
    width: '160px',
    height: '40px',
    objectFit: 'contain',
    border: `1px solid ${Colors.mountainMeadow}`,
    textDecoration: 'none',
    marginLeft: '24px',
  },
  editButton: {
    width: '160px',
    height: '40px',
    objectFit: 'contain',
    border: `1px solid ${Colors.mountainMeadow}`,
    textDecoration: 'none',
  },
  capitalize: {
    textTransform: 'uppercase',
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
}));

/**
 * FieldCustomEdit
 * Render FieldCustomEdit with customs props.
 * @param {Object} props
 * isEncrypted {bool} If text will be with * when it is not on editMode
 * cleanOnEdit {bool} If this will clean the input when it enters on editMode
 * onEditionSave {func} Function to execute where the click on save
 * labelEditText {string} Text to be displayed to activate editMode
 * labelValueText {string} Value to display
 * type {string} Value to send to input component to set behavior
 * showEditButton {boolean} Value to set wether edit will be available or not.
 */
const FieldCustomEdit = (props) => {
  const classStyle = useStyles();
  const {
    isEncrypted = false,
    cleanOnEdit = false,
    showEditButton = true,
    onEditionSave,
    labelEditText,
    labelValueText,
    type,
  } = props;
  const { formatMessage } = props.intl;

  const [valueText, setValueText] = React.useState({});
  const [isEditing, setIsEditing] = React.useState(false);
  const [isOpenModalConfirmation, setIsOpenModalConfirmation] = React.useState(
    false
  );
  const { editOptionsText, confirmationOptionsText } = messages;
  const displayEditText = !stringIsNullOrEmpty(labelEditText)
    ? labelEditText
    : formatMessage(editOptionsText.edit);

  useEffect(() => {
    setValueText({
      originalText: labelValueText,
      workingText: labelValueText,
      encryptedValueText: convertToAsterisk(labelValueText),
    });
  }, [labelValueText]);

  /**
   * saveActionHandler
   * It handles save action when save is confirmed
   */
  const saveActionHandler = () => {
    setIsOpenModalConfirmation(false);
    setIsEditing(false);
    setValueText({
      ...valueText,
      originalText: valueText.workingText,
      encryptedValueText: convertToAsterisk(valueText.workingText),
    });
    if (onEditionSave) {
      onEditionSave(valueText);
    }
  };

  /**
   * cancelEdit
   * It contains actions for cancel button
   */
  const cancelEdit = {
    onClick: () => {
      setValueText({
        ...valueText,
        workingText: valueText.originalText,
      });
      setIsEditing(false);
    },
  };

  /**
   * editAction
   * It contains actions for edit button
   */
  const editAction = {
    onClick: () => {
      if (cleanOnEdit) {
        setValueText({
          ...valueText,
          workingText: '',
        });
      }
      setIsEditing(true);
    },
  };

  /**
   * saveEdit
   * It contains actions for save button
   */
  const saveEdit = {
    onClick: () => {
      setIsOpenModalConfirmation(true);
    },
    className: `${classStyle.saveButton} ${classStyle.capitalize}`,
  };

  /**
   * onChange
   * It handles changes on the input component.
   * @param {string} editedValue it contains the value modified value
   */
  const onChange = (editedValue) => {
    setValueText({
      ...valueText,
      workingText: editedValue,
    });
  };

  /**
   * cancelModalActionHandler
   * Close modal popup by setting isOpenModalConfirmation to false
   * @returns
   */
  const cancelModalActionHandler = () => setIsOpenModalConfirmation(false);

  return (
    <div
      data-testid="main-value-container-div"
      className={classStyle.spaceBetween}
    >
      <div>
        {isEditing && (
          <InputComponent
            type={type}
            data-testid="input-value-text"
            value={valueText.workingText}
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
        )}
        {!isEditing &&
          (isEncrypted ? valueText.encryptedValueText : valueText.workingText)}
      </div>
      <div>
        {isEditing && (
          <div>
            <Box>
              <div>
                <ButtonComponent {...cancelEdit} data-testid="cancel-button">
                  {formatMessage(confirmationOptionsText.cancel)}{' '}
                </ButtonComponent>
                <ButtonComponent {...saveEdit} data-testid="save-button">
                  {formatMessage(confirmationOptionsText.save)}
                </ButtonComponent>
              </div>
            </Box>
            <GenericModalConfirmation
              openModal={isOpenModalConfirmation}
              submitSave={saveActionHandler}
              submitCancel={cancelModalActionHandler}
            />
          </div>
        )}
        {showEditButton && !isEditing && (
          <ButtonComponent data-testid="edit-button" {...editAction}>
            {displayEditText}
          </ButtonComponent>
        )}
      </div>
    </div>
  );
};

FieldCustomEdit.propTypes = {
  isEncrypted: PropTypes.bool,
  cleanOnEdit: PropTypes.bool,
  onEditionSave: PropTypes.func,
  showEditButton: PropTypes.bool,
  intl: PropTypes.any.isRequired,
  labelEditText: PropTypes.string,
  labelValueText: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default injectIntl(FieldCustomEdit);
