import { allLocationsDefault } from 'Utils/devices';
import { DeviceListTypeId } from 'Utils/enums/device';
import { getValueIfExists, propertyExist } from 'Utils/propertyValidation';

/**
 * getDevicesListCard
 * Selector method to get devices filtered based on stored filter devices object
 * @param {Object} state the entire store to get devices and filtersDevices to apply them.
 * @returns {Array} An array with devices filtered
 */
export const getDevicesListCard = (state) => {
  const devices = getValueIfExists(() => state.devices, {});
  let filteredDevicesList = [];

  if (devices) {
    const { filtersDevices, devicesList } = devices;

    if (devicesList) {
      if (
        propertyExist(() => filtersDevices.deviceGroupId) &&
        (filtersDevices.deviceGroupId === DeviceListTypeId.Ats ||
          filtersDevices.deviceGroupId === DeviceListTypeId.Gid ||
          filtersDevices.deviceGroupId === DeviceListTypeId.Meters ||
          filtersDevices.deviceGroupId === DeviceListTypeId.LocalIO)
      ) {
        devicesList.forEach((deviceGroup) => {
          deviceGroup.devices.forEach((device) => {
            if (device.deviceType.name === filtersDevices.deviceGroupId) {
              filteredDevicesList.push(device);
            }
          });
        });
        // Sort alphanumeric all devices
        return filteredDevicesList.sort((a, b) =>
          a.deviceName.localeCompare(b.deviceName, 'en', { numeric: true })
        );
      }
      if (
        propertyExist(() => filtersDevices.deviceGroupId) &&
        filtersDevices.deviceGroupId !== DeviceListTypeId.All
      ) {
        const groupDevicesList = devicesList.find(
          (deviceItem) =>
            deviceItem.deviceGroupName === filtersDevices.deviceGroupId
        );

        filteredDevicesList = getValueIfExists(
          () => groupDevicesList.devices,
          []
        );
      } else {
        // Extract all Devices from all points
        devicesList.forEach((deviceList) =>
          filteredDevicesList.push(...deviceList.devices)
        );
      }

      if (
        propertyExist(() => filtersDevices.locationId) &&
        filtersDevices.locationId !== allLocationsDefault
      ) {
        filteredDevicesList = filteredDevicesList.filter(
          (deviceItem) => deviceItem.lcmLocation === filtersDevices.locationId
        );
      }
    }
  }

  return filteredDevicesList;
};
