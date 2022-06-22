import images from 'Assets/images';
import { Colors } from 'Theme';

/**
 * This is a catalog label for DeviceStatus.
 */
export const DeviceStatusName = {
  Maintenance: 'Maintenance',
  Faulted: 'Fault',
  Alarm: 'Alarm',
  Warning: 'Warning',
  Ok: 'Ok',
  Disconnected: 'Disconnected',
};

/**
 * This is a catalog for Device Status Ids.
 */
export const DeviceStatusId = {
  All: 0,
  Maintenance: 1,
  Faulted: 2,
  Alarm: 3,
  Warning: 4,
  Ok: 5,
  Disconnected: 6,
};

/**
 * This is a catalog to render Device Status Options.
 */
export const DeviceStatus = [
  {
    icon: images.iconMaintenance,
    name: DeviceStatusName.Maintenance,
    id: DeviceStatusId.Maintenance,
    backgroundColor: Colors.alizarinCrimson,
  },
  {
    icon: images.iconFaulted,
    name: DeviceStatusName.Faulted,
    id: DeviceStatusId.Faulted,
    backgroundColor: Colors.flameaPea,
  },
  {
    icon: images.iconAlarm,
    name: DeviceStatusName.Alarm,
    id: DeviceStatusId.Alarm,
    backgroundColor: Colors.christine,
  },
  {
    icon: images.iconWarning,
    name: DeviceStatusName.Warning,
    id: DeviceStatusId.Warning,
    backgroundColor: Colors.goldenDream,
  },
  {
    icon: images.iconOk,
    name: DeviceStatusName.Ok,
    id: DeviceStatusId.Ok,
    backgroundColor: Colors.olivine,
  },
  {
    icon: images.iconWifiDisconnected,
    name: DeviceStatusName.Disconnected,
    id: DeviceStatusId.Disconnected,
    backgroundColor: Colors.white,
  },
];
