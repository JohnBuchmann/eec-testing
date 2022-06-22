import { DeviceListTypeId, DeviceListTypeName } from 'Utils/enums/device';

/**
 * Enum Site Event Names.
 */
export const SiteEventType = {
  AllEvents: 'All Events',
  Fault: 'Fault',
  Alarm: 'Alarm',
  Warning: 'Warning',
};

/**
 * Available options for Site Events
 */
export const SiteEventOptions = [
  {
    value: SiteEventType.AllEvents,
    text: SiteEventType.AllEvents,
  },
  {
    value: SiteEventType.Fault,
    text: SiteEventType.Fault,
  },
  {
    value: SiteEventType.Alarm,
    text: SiteEventType.Alarm,
  },
  {
    value: SiteEventType.Warning,
    text: SiteEventType.Warning,
  },
];

/**
 * Available options for Site Devices
 */
export const SiteDeviceType = [
  {
    value: DeviceListTypeId.All,
    text: DeviceListTypeName.All,
  },
  {
    value: DeviceListTypeId.AcLoad,
    text: DeviceListTypeName.AcLoad,
  },
  {
    value: DeviceListTypeId.Ats,
    text: DeviceListTypeName.Ats,
  },
  {
    value: DeviceListTypeId.Battery,
    text: DeviceListTypeName.Battery,
  },
  {
    value: DeviceListTypeId.CustomerLoad,
    text: DeviceListTypeName.CustomerLoad,
  },
  {
    value: DeviceListTypeId.DcLoad,
    text: DeviceListTypeName.DcLoad,
  },
  {
    value: DeviceListTypeId.Ev,
    text: DeviceListTypeName.Ev,
  },
  {
    value: DeviceListTypeId.Fleet,
    text: DeviceListTypeName.Fleet,
  },
  {
    value: DeviceListTypeId.Gid,
    text: DeviceListTypeName.Gid,
  },
  {
    value: DeviceListTypeId.Inverter,
    text: DeviceListTypeName.Inverter,
  },
  {
    value: DeviceListTypeId.LocalIO,
    text: DeviceListTypeName.LocalIO,
  },

  {
    value: DeviceListTypeId.Meters,
    text: DeviceListTypeName.Meters,
  },
  {
    value: DeviceListTypeId.Rengine,
    text: DeviceListTypeName.Rengine,
  },
  {
    value: DeviceListTypeId.Solar,
    text: DeviceListTypeName.Solar,
  },
  {
    value: DeviceListTypeId.Wind,
    text: DeviceListTypeName.Wind,
  },
];
