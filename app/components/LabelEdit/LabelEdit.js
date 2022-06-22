/*
 * LabelEdit Component
 *
 * This contains device status widget
 */
import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { formatTemperatureData } from 'Utils/unitsOfMeasurement';
import { fieldTypes, getFieldTypeUnitMeasure } from '../../utils/fieldType';
import { getDefaultToggleOptions, offLabel, onLabel } from '../../utils/toggle';
import InputComponent from '../Input';
import Switch from '../Switch';

const useStyles = makeStyles({
  input: {
    width: '97px',
    marginRight: '14px',
  },
  statusItem: {
    alignItems: 'center',
    display: 'flex',
    height: '40px',
  },
  suffix: {
    fontSize: '12px !important',
  },
  symbol: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  dataValue: {
    marginRight: '14px',
  },
  editColumn: {
    display: 'inline-flex',
  },
  extraLabels: {
    position: 'absolute',
    left: '60%',
    top: '10px',
    width: '100%',
  },
  extraLabelValue: {
    float: 'left',
  },
});

/*
 * LabelEdit creates a label component to display a value and it can be
 * changed to an editable component
 * @param {boolean} isEditable Indicates if the component could be editable
 * @param {any} value Data to be displayed
 * @param {any} oldValue Data old to be displayed
 * @param {string} type Field type
 * @param {boolean} editMode Indicates if component is on edit mode
 * @param {function} onChange Function to execute when changing value
 * @param, {boolean} displayOldValueWhenEdit Validate if display old value with symbol when is on edit mode
 * @param, {boolean} displayError Validate if the component should display error style
 */
export const LabelEdit = ({
  isEditable,
  value = null,
  oldValue,
  type,
  editMode,
  onChange,
  onBlur,
  displayOldValueWhenEdit,
  units,
  displayError = false,
  isTemperature,
  temperatureSettings,
}) => {
  const classes = useStyles();
  const toggleOptions = getDefaultToggleOptions();
  const {
    unitMeasureSymbol,
    unitMeasureSymbolSuffix,
  } = getFieldTypeUnitMeasure(units);

  const controlView = () => {
    const status = {
      units,
      value,
    };

    const formattedData = isTemperature
      ? formatTemperatureData(status, temperatureSettings)
      : status;

    let children;
    const childrenSymbol = isTemperature ? (
      <div className={classes.symbol}>
        <Typography variant="subtitle2">{formattedData.units}</Typography>
      </div>
    ) : (
      <div className={classes.symbol}>
        <Typography variant="subtitle2">{unitMeasureSymbol}</Typography>
        <Typography variant="subtitle2" className={classes.suffix}>
          {unitMeasureSymbolSuffix}
        </Typography>
      </div>
    );

    if (editMode && isEditable) {
      if (type === fieldTypes.boolean && value !== '') {
        children = (
          <Switch
            leftOption={toggleOptions.left}
            rightOption={toggleOptions.right}
            value={JSON.parse(value)}
            onChange={(e, newAlignment) => {
              if (newAlignment !== null) {
                onChange(newAlignment);
              }
            }}
          />
        );
      } else {
        children = (
          <div className={`${classes.input} ${classes.editColumn}`}>
            {displayOldValueWhenEdit && unitMeasureSymbol && (
              <div className={classes.extraLabels}>
                <div
                  className={`${classes.dataValue} ${classes.extraLabelValue}`}
                >
                  <Typography variant="caption">{oldValue}</Typography>
                </div>
                {childrenSymbol}
              </div>
            )}
            <InputComponent
              invalid={displayError}
              type={type}
              value={value}
              alignRight
              onBlur={onBlur}
              onChange={(e) => {
                onChange(e.target.value);
              }}
            />
          </div>
        );
      }
    } else if (type === fieldTypes.boolean && value !== '') {
      children = <div>{JSON.parse(value) ? onLabel : offLabel}</div>;
    } else {
      children = (
        <div className={classes.dataValue}>
          <Typography variant="caption">
            {isTemperature ? formattedData.value : value}
          </Typography>
        </div>
      );
    }

    children = (
      <>
        {children}
        {unitMeasureSymbol && childrenSymbol}
      </>
    );

    return children;
  };

  return <div className={classes.statusItem}>{controlView()}</div>;
};

LabelEdit.propTypes = {
  isEditable: PropTypes.bool,
  value: PropTypes.any,
  onBlur: PropTypes.func,
  oldValue: PropTypes.any,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
  units: PropTypes.string,
  displayOldValueWhenEdit: PropTypes.bool,
  displayError: PropTypes.bool,
  isTemperature: PropTypes.bool,
  temperatureSettings: PropTypes.object,
};
