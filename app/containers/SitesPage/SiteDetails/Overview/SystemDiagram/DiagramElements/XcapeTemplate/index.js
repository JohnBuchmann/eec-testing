/**
 * XCape template
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from 'Theme';
import { getSystemDiagramLabelingConfiguration } from 'Utils/systemDiagram';
import messages from './messages';
import Labeling from '../Labeling';

/**
 * @property {Object} useStyles Stores the styles
 */
const useStyles = makeStyles({
  autoSyncDCBusTitle: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '12px',
    fontWeight: '300',
    lineHeight: 'normal',
    letterSpacing: '.6px',
    textTransform: 'uppercase',
    color: Colors.white,
  },
});

/**
 * Displays XCape layer template
 * @param {*} props
 */
function XcapeTemplate(props) {
  const { formatMessage } = props.intl;
  const { autoSyncDCBusTitle } = messages;

  const classes = useStyles();

  return (
    <>
      {/* Micro Grid Consumption Section frame */}
      <rect
        width="506"
        height="436"
        x="147"
        y="60"
        rx="40"
        ry="40"
        fill="none"
        stroke={Colors.white}
        strokeWidth="1"
      />
      {/* Micro Grid Production Section frame */}
      <rect
        width="489"
        height="436"
        x="660"
        y="61"
        rx="40"
        ry="40"
        fill="none"
        stroke={Colors.white}
        strokeWidth="1"
      />
      <path
        stroke={Colors.white}
        fill={Colors.nandor}
        d="M464,267,h572,q5,0 5, 5,v12,q0,5 -5,5h-572z"
      />
      <text x={863} y={282} className={classes.autoSyncDCBusTitle}>
        {formatMessage(autoSyncDCBusTitle)}
      </text>

      {getSystemDiagramLabelingConfiguration().map((label) => (
        <Labeling key={label.name} {...label} />
      ))}
    </>
  );
}

XcapeTemplate.propTypes = {
  intl: PropTypes.any.isRequired,
};

export default injectIntl(XcapeTemplate);
