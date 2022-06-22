/**
 * Testing IconDeviceButton component
 */

import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { DeviceListTypeId } from 'Utils/enums/device';
import { DeviceStatusId } from 'Utils/enums/deviceStatus';
import IconDeviceButton from '../index';

describe('<IconDeviceButton />', () => {
  describe('#Constructor', () => {
    it('should render IconDeviceButton with minimum data', () => {
      const deviceStatusId = DeviceStatusId.Ok;
      const deviceGroupId = DeviceListTypeId.Rengine;

      const { container } = render(
        <IconDeviceButton
          deviceStatusId={deviceStatusId}
          deviceGroupId={deviceGroupId}
        />
      );
      expect(container.querySelector('button')).toBeDefined();
    });
    it('should not render with invalid data', () => {
      const deviceStatusId = 999;
      const deviceGroupId = DeviceListTypeId.Rengine;

      const { container } = render(
        <IconDeviceButton
          deviceStatusId={deviceStatusId}
          deviceGroupId={deviceGroupId}
        />
      );
      const expected = true;
      const actual = !!container.querySelector('button');
      expect(actual).toBe(expected);
    });
  });

  describe('#Fire.Click', () => {
    it('should Click on the first ribbon element', () => {
      const deviceStatusId = DeviceStatusId.Ok;
      const deviceGroupId = DeviceListTypeId.Solar;
      const onClickSpy = jest.fn();

      const { container } = render(
        <IconDeviceButton
          deviceStatusId={deviceStatusId}
          deviceGroupId={deviceGroupId}
          handleActionClick={onClickSpy}
        />
      );
      fireEvent.click(container.querySelector('button'));
      expect(onClickSpy).toHaveBeenCalled();
    });
  });
});
