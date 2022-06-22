/**
 * Ignition template
 */

import React from 'react';
import { Colors } from 'Theme';
import { getSystemDiagramLabelingConfiguration } from 'Utils/systemDiagram';
import AutoSyncDCBus from '../AutoSyncDCBus';
import Labeling from '../Labeling';

/**
 * Displays Ignition layer template
 * @param {*} props
 */
function IgnitionTemplate() {
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
      <AutoSyncDCBus />

      {getSystemDiagramLabelingConfiguration().map((label) => (
        <Labeling key={label.name} {...label} />
      ))}
    </>
  );
}

export default IgnitionTemplate;
