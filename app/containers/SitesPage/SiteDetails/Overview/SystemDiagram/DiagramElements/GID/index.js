/**
 * GID
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Colors } from 'Theme';
import { SiteStatusId } from 'Utils/enums/site';
import Status from '../Status';

/**
 * @property {Object} useStyles Stores the styles
 */
const useStyles = makeStyles({
  gidTitle: {
    fontFamily: 'Inter, sans-serif',
    color: Colors.surfCrest,
    fontSize: '10px',
    fontWeight: '300',
    lineHeight: 'normal',
    letterSpacing: '0px',
  },
});

/**
 * @method GID
 * Displays GID
 *
 * @param {number} x The X axis
 * @param {number} y The Y axis
 * @returns GID component
 */
function GID(props) {
  const classes = useStyles();
  const { x = 0, y = 0, isConnected } = props;

  const title = 'GID';
  const statusId = isConnected ? SiteStatusId.Ok : SiteStatusId.Faulted;
  const statusIconPositionX = x - 3;
  const statusIconPositionY = y + 7;
  const showIcon = !isConnected;

  return (
    <>
      <desc>GID</desc>
      <text x={x} y={y} className={classes.gidTitle}>
        {title}
      </text>
      {/* Status icon */}
      <Status
        x={statusIconPositionX}
        y={statusIconPositionY}
        showIcon={showIcon}
        width="24px"
        height="24px"
        statusId={statusId}
        roundness="3px"
      />
    </>
  );
}

GID.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  isConnected: PropTypes.bool,
};

export default GID;
