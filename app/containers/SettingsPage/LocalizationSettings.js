/*
 * LocalizationSettings
 *
 * This is the component for Localization Settings
 *
 */
import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Panel from '../../components/Panel';
import Switch from '../../components/Switch';
import {
  getTemperatureUnitLabel,
  temperatureUnitsId,
} from '../../utils/unitsOfMeasurement';
import messages from './messages';

const useStyles = makeStyles({
  settingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

/**
 * LocalizationSettings creates a panel to display
 * and edit the localization settings
 */
const LocalizationSettings = ({ unitMeasurement, onChange }) => {
  const classes = useStyles();
  const localizationSettingsMessages = messages.localizationSettings;
  const unitsOfMeasurementOptions = {
    left: {
      value: temperatureUnitsId.Celsius,
      label: getTemperatureUnitLabel(temperatureUnitsId.Celsius),
    },
    right: {
      value: temperatureUnitsId.Fahrenheit,
      label: getTemperatureUnitLabel(temperatureUnitsId.Fahrenheit),
    },
  };

  /*
   * onUnitsOfMeasurementChange
   * Method to handle any change on Units Of Measurement
   * @param {any} e Switch event arguments
   * @param {integer} unitMeasurementSelected temperature unit Id selected
   */
  const onUnitsOfMeasurementChange = (e, unitMeasurementSelected) => {
    if (unitMeasurementSelected !== null) {
      onChange({
        name: getTemperatureUnitLabel(unitMeasurementSelected),
        unitMeasurementId: unitMeasurementSelected,
      });
    }
  };

  // Creates Localization Settings body
  const contentBody = (
    <div data-testid="content-unitOfMeasurement" className={classes.settingRow}>
      <FormattedMessage {...localizationSettingsMessages.unitOfMeasurement}>
        {(unitOfMeasurement) => (
          <Typography variant="caption">{unitOfMeasurement}</Typography>
        )}
      </FormattedMessage>
      <Switch
        leftOption={unitsOfMeasurementOptions.left}
        rightOption={unitsOfMeasurementOptions.right}
        value={unitMeasurement.unitMeasurementId}
        onChange={onUnitsOfMeasurementChange}
      />
    </div>
  );

  return (
    <FormattedMessage {...localizationSettingsMessages.title}>
      {(title) => <Panel title={title} content={contentBody} />}
    </FormattedMessage>
  );
};

LocalizationSettings.propTypes = {
  unitMeasurement: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default LocalizationSettings;
