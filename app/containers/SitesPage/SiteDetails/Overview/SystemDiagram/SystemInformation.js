/**
 * SystemIn formation
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import IconStatusLabel from 'Components/IconStatusLabel/Index';
import { Colors } from 'Theme';
import {
  ScaleSymbol,
  UnitMeasurementSymbol,
  ScaleValues,
} from 'Utils/enums/unitMeasurement';
import { getValueIfExists } from 'Utils/propertyValidation';
import { formatSI } from 'Utils/systemDiagram';
import { injectIntl } from 'react-intl';
import messages from './messages';
import ConnectionStatus from './DiagramElements/ConnectionStatus';

/**
 * @property {Object} useStyles Stores the styles
 */
const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'flex-end',
    padding: '20px 34px 0px 24px',
    width: '1166px',
  },
  iconLabelStyle: {
    marginTop: '0px',
    fontSize: '12px',
    padding: '4px 7px 4px 7px !important',
    color: Colors.white,
    display: 'inline-block',
    textTransform: 'uppercase',
    minHeight: '17px',
  },
  informationWrapper: {
    display: 'flex',
    alignItems: 'Baseline',
    color: Colors.white,
  },
  status: {
    marginLeft: '24px',
    marginRight: '8px',
  },
});

/**
 * @method SystemInformation
 * SystemIn formation component
 * @param {bool} isIgnition Is ignition system diagram
 * @param {number} siteStatus Site status id
 * @param {number} commStatus Connection status id
 * @param {number} totalSystemOutput Total system output
 * @param {any} intl Internationalization (i18n)
 * @returns SystemIn formation component
 */
function SystemInformation(props) {
  const { siteStatus, commStatus, totalSystemOutput = {}, intl } = props;
  const classes = useStyles();
  const { formatMessage } = intl;
  const { systemInformation: systemInformationMessages } = messages;
  const labelDecimals = 1;

  const totalSystemOutputValue = getValueIfExists(
    () => totalSystemOutput.currentFlow,
    0
  );

  const totalSystemOutputText = `${formatSI(
    totalSystemOutputValue,
    ScaleSymbol.Kilo,
    labelDecimals,
    ScaleValues.Kilo
  )}${UnitMeasurementSymbol.Watt}`;

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.informationWrapper}>
        <Box>
          <Typography>
            {`${formatMessage(
              systemInformationMessages.totalSystemOutput
            )} ${totalSystemOutputText}`}
          </Typography>
        </Box>
        <Box className={classes.status}>
          <IconStatusLabel
            iconLabelStyle={classes.iconLabelStyle}
            statusId={getValueIfExists(() => siteStatus.value, 0)}
          />
        </Box>
        <Box>
          <ConnectionStatus
            status={getValueIfExists(() => commStatus.value, 0)}
          />
        </Box>
      </Box>
    </Box>
  );
}

SystemInformation.propTypes = {
  intl: PropTypes.any,
  siteStatus: PropTypes.object,
  commStatus: PropTypes.object,
  totalSystemOutput: PropTypes.object,
};

export default injectIntl(SystemInformation);
