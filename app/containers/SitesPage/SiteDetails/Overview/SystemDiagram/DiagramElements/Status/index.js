/*
 * Status icon
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Colors } from 'Theme';
import { SiteStatusId } from 'Utils/enums/site';
import SvgMaintenance from './SvgMaintenance';
import SvgFaulted from './SvgFaulted';
import SvgAlarm from './SvgAlarm';
import SvgOk from './SvgOk';
import SvgWarning from './SvgWarning';

/**
 * @method StatusIcon
 * Displays site status icon
 * @param {number} x The X axis
 * @param {number} y The Y axis
 * @param {string} width Component width
 * @param {string} height Component height
 * @param {string} roundness Component roundness
 * @param {number} status Status
 * @returns Status icon component
 */
function Status(props) {
  let icon;
  const {
    x = 0,
    y = 0,
    width = '',
    height = '',
    roundness = '',
    statusId = 0,
    showIcon = true,
  } = props;

  switch (statusId) {
    case SiteStatusId.Maintenance:
      icon = {
        background: Colors.flameaPea,
        svgIcon: <SvgMaintenance />,
      };
      break;
    case SiteStatusId.Faulted:
      icon = {
        background: Colors.flameaPea,
        svgIcon: <SvgFaulted />,
      };
      break;
    case SiteStatusId.Alarm:
      icon = {
        background: Colors.christine,
        svgIcon: <SvgAlarm />,
      };
      break;
    case SiteStatusId.Warning:
      icon = {
        background: Colors.goldenDream,
        svgIcon: <SvgWarning />,
      };
      break;
    case SiteStatusId.Ok:
      icon = {
        background: Colors.olivine,
        svgIcon: <SvgOk />,
      };
      break;
    default:
      icon = {
        background: Colors.white,
      };
      break;
  }

  return (
    // Container
    <g>
      {/* Square as background */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill={icon.background}
        rx={roundness}
      />
      {showIcon && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x={x}
          y={y}
          width={width}
          height={height}
          viewBox="0 0 24 24"
        >
          {icon.svgIcon}
        </svg>
      )}
    </g>
  );
}

Status.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.string,
  height: PropTypes.string,
  roundness: PropTypes.string,
  statusId: PropTypes.number,
  showIcon: PropTypes.bool,
};

export default Status;
