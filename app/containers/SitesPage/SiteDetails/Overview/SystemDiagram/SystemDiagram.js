/**
 * System diagram component
 */

import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Colors } from 'Theme';
import { DeviceListTypeId } from 'Utils/enums/device';
import { SiteTypesId } from 'Utils/enums/siteTypes';
import { getValueIfExists, propertyExist } from 'Utils/propertyValidation';
import {
  displaySystemDiagram,
  getSystemDiagramConfiguration,
} from 'Utils/systemDiagram';

import EV from './DiagramElements/EV';
import LoadAC from './DiagramElements/LoadAc';
import CustomerDemand from './DiagramElements/CustomerDemand';
import Solar from './DiagramElements/Solar';
import Wind from './DiagramElements/Wind';
import ESS from './DiagramElements/ESS';
import ReciprocatingEngine from './DiagramElements/ReciprocatingEngine';
import Inverter from './DiagramElements/Inverter';
import PowerGrid from './DiagramElements/PowerGrid';
import GID from './DiagramElements/GID';
import IgnitionTemplate from './DiagramElements/IgnitionTemplate';
import Wire from './DiagramElements/Wire';
import SystemInformation from './SystemInformation';
import XcapeTemplate from './DiagramElements/XcapeTemplate';
import NoDevices from './DiagramElements/NoDevices';
import Fleet from './DiagramElements/Fleet';
import LoadDC from './DiagramElements/LoadDc';

/**
 * Declare UI styles
 */
const useStyles = makeStyles({
  svgDiagram: {
    backgroundColor: Colors.nandor,
    width: '1166px',
  },
  systemInformation: {
    paddingBottom: '16px',
  },
});

/**
 * System diagram component
 */
function SystemDiagram(props) {
  const classes = useStyles();
  const { siteOverview } = props;
  let existsCustomerLoad = false;
  let existsFleet = false;
  let existsEv = false;
  if (siteOverview && siteOverview.microGridConsumption) {
    existsCustomerLoad = siteOverview.microGridConsumption.some(
      (device) => device.name === 'CDEMAND'
    );

    existsFleet = siteOverview.microGridConsumption.some(
      (device) => device.name === 'FLEET'
    );

    existsEv = siteOverview.microGridConsumption.some(
      (device) => device.name === 'EV'
    );
  }
  const systemDiagramElements = getSystemDiagramConfiguration(
    siteOverview,
    existsCustomerLoad,
    existsFleet,
    existsEv
  );
  const wires = systemDiagramElements.flatMap((elements) => elements.wires);
  const siteTypeId = getValueIfExists(() => siteOverview.siteType.siteTypeId);

  /**
   * getDeviceComponent
   * Get proper React component by device type
   *
   * @param {Object} device system diagram config data
   * @return {Node} React device component
   */
  const getDeviceComponent = (device) => {
    let deviceElement;

    const { deviceType, x, y } = device;

    switch (deviceType) {
      case DeviceListTypeId.Ev:
        deviceElement = <EV key={`svg-${deviceType}-${x}-${y}`} {...device} />;
        break;
      case DeviceListTypeId.AcLoad:
        deviceElement = (
          <LoadAC key={`svg-${deviceType}-${x}-${y}`} {...device} />
        );
        break;
      case DeviceListTypeId.DcLoad:
        deviceElement = (
          <LoadDC key={`svg-${deviceType}-${x}-${y}`} {...device} />
        );
        break;
      case DeviceListTypeId.CustomerLoad:
        deviceElement = (
          <CustomerDemand key={`svg-${deviceType}-${x}-${y}`} {...device} />
        );
        break;
      case DeviceListTypeId.Solar:
        deviceElement = (
          <Solar key={`svg-${deviceType}-${x}-${y}`} {...device} />
        );
        break;
      case DeviceListTypeId.Wind:
        deviceElement = (
          <Wind key={`svg-${deviceType}-${x}-${y}`} {...device} />
        );
        break;
      case DeviceListTypeId.Battery:
        deviceElement = <ESS key={`svg-${deviceType}-${x}-${y}`} {...device} />;
        break;
      case DeviceListTypeId.Rengine:
        deviceElement = (
          <ReciprocatingEngine
            key={`svg-${deviceType}-${x}-${y}`}
            {...device}
          />
        );
        break;
      case DeviceListTypeId.Inverter:
        deviceElement = (
          <Inverter key={`svg-${deviceType}-${x}-${y}`} {...device} />
        );
        break;
      case DeviceListTypeId.PowerGrid:
        deviceElement = (
          <PowerGrid key={`svg-${deviceType}-${x}-${y}`} {...device} />
        );
        break;
      case DeviceListTypeId.Gid:
        deviceElement = <GID key={`svg-${deviceType}-${x}-${y}`} {...device} />;
        break;
      case DeviceListTypeId.Fleet:
        deviceElement = (
          <Fleet key={`svg-${deviceType}-${x}-${y}`} {...device} />
        );
        break;
      default:
        break;
    }

    return deviceElement;
  };

  /**
   * getDiagramDevicesGroup
   * Get an array for proper React components by device type
   *
   * @param {Object} device system diagram config data
   * @return {Array} React device components
   */
  const getDiagramDeviceGroup = (device) => {
    const deviceElement = [];
    deviceElement.push(getDeviceComponent(device));

    if (propertyExist(() => device.inverter)) {
      deviceElement.push(getDeviceComponent(device.inverter));
    }

    return deviceElement;
  };

  /**
   * getDiagramTemplate
   * Get system diagram template board
   *
   * @return {Object} React system diagram template board component
   */
  const getDiagramTemplate = () => {
    let diagramTemplate;

    switch (siteTypeId) {
      case SiteTypesId.Ignition:
        diagramTemplate = <IgnitionTemplate />;
        break;
      case SiteTypesId.Xcape:
        diagramTemplate = <XcapeTemplate />;
        break;
      default:
        diagramTemplate = <></>;
        break;
    }

    return diagramTemplate;
  };

  /**
   * getSystemDiagramElements
   * Get all device elements for system diagram
   *
   * @return {Array} React element for system diagram
   */
  const getSystemDiagramElements = () =>
    systemDiagramElements
      .map((element) => getDiagramDeviceGroup(element))
      .flat();

  return displaySystemDiagram(siteOverview) ? (
    <Box>
      <Box className={classes.systemInformation}>
        <SystemInformation
          siteStatus={getValueIfExists(() => siteOverview.siteStatus)}
          commStatus={getValueIfExists(() => siteOverview.commStatus)}
          totalSystemOutput={getValueIfExists(
            () => siteOverview.totalSystemOutput,
            {}
          )}
        />
      </Box>
      <svg
        width="1166"
        height="580"
        viewBox="0 0 1166 526"
        className={classes.svgDiagram}
      >
        {/* Draw diagram template */}
        {getDiagramTemplate()}

        {/* Draw wires first, doing in that way we are simulating a lower z-index over SVG item */}
        {wires.map((wire, index) => (
          // eslint-disable-next-line
          <Wire key={index} {...wire} />
        ))}

        {/* Draw devices */}
        {getSystemDiagramElements()}
      </svg>
    </Box>
  ) : (
    <Box>
      <svg
        width="1166"
        height="526"
        viewBox="0 0 1166 526"
        className={classes.wrapper}
      >
        <NoDevices />
      </svg>
    </Box>
  );
}

SystemDiagram.propTypes = {
  siteOverview: PropTypes.object,
};

export default SystemDiagram;
