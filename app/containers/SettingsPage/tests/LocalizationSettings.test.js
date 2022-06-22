import { mount } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';
import {
  getTemperatureUnitLabel,
  temperatureUnitsId,
} from '../../../utils/unitsOfMeasurement';
import LocalizationSettings from '../LocalizationSettings';

describe('<LocalizationSettings />', () => {
  const onChangeSpy = jest.fn();
  const unitMeasurementSelected = {
    unitMeasurementId: temperatureUnitsId.Celsius,
    name: getTemperatureUnitLabel(temperatureUnitsId.Celsius),
  };

  let wrapper = mount(
    <IntlProvider locale="en">
      <LocalizationSettings
        unitMeasurement={unitMeasurementSelected}
        onChange={onChangeSpy}
      />
    </IntlProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = mount(
      <IntlProvider locale="en">
        <LocalizationSettings
          unitMeasurement={unitMeasurementSelected}
          onChange={onChangeSpy}
        />
      </IntlProvider>
    );
  });

  describe('#Constructor', () => {
    it('should render <LocalizationSettings /> component', () => {
      expect(
        wrapper.find('[data-testid="content-unitOfMeasurement"]').exists()
      ).toBe(true);
    });

    it('should render <LocalizationSettings /> with celsius and fahrenheit options', () => {
      const unitOfMeasurementContent = wrapper.find(
        '[data-testid="content-unitOfMeasurement"]'
      );
      const toggleButton = unitOfMeasurementContent.find('Switch');
      const celsiusOption = toggleButton.findWhere(
        (item) =>
          item.type() === 'button' &&
          item.prop('value') === temperatureUnitsId.Celsius
      );
      const fahrenheitOption = toggleButton.findWhere(
        (item) =>
          item.type() === 'button' &&
          item.prop('value') === temperatureUnitsId.Fahrenheit
      );

      expect(celsiusOption.exists()).toBe(true);
      expect(fahrenheitOption.exists()).toBe(true);
    });
  });

  describe('#Switch.click', () => {
    it('should not call onChange method when Fahrenheit is clicked', () => {
      const unitOfMeasurementContent = wrapper.find(
        '[data-testid="content-unitOfMeasurement"]'
      );
      const toggleButton = unitOfMeasurementContent.find('Switch');

      const celsiusToggle = toggleButton.findWhere(
        (item) =>
          item.type() === 'button' &&
          item.prop('value') === temperatureUnitsId.Celsius
      );

      celsiusToggle.simulate('click');
      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('should call onChange method when Fahrenheit is clicked', () => {
      const unitOfMeasurementContent = wrapper.find(
        '[data-testid="content-unitOfMeasurement"]'
      );
      const toggleButton = unitOfMeasurementContent.find('Switch');

      const fahrenheitToggle = toggleButton.findWhere(
        (item) =>
          item.type() === 'button' &&
          item.prop('value') === temperatureUnitsId.Fahrenheit
      );

      fahrenheitToggle.simulate('click');
      expect(onChangeSpy).toHaveBeenCalled();
    });
  });
});
