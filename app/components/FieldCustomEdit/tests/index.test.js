import { mount } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';
import FieldCustomEdit from '..';

describe('<FieldCustomEdit />', () => {
  const onEditionSave = jest.fn();
  const labelValueTextMock = 'Testing 1';
  describe('#Actions', () => {
    it('should render <FieldCustomEdit /> edit and cancel', () => {
      const basicData = {
        labelValueText: labelValueTextMock,
        isEncrypted: false,
        cleanOnEdit: false,
        labelEditText: 'Change',
      };

      const wrapper = mount(
        <IntlProvider locale="en">
          <FieldCustomEdit onEditionSave={onEditionSave} {...basicData} />
        </IntlProvider>
      );

      let actual = !!wrapper.find('[data-testid="main-value-container-div"]');
      const expected = true;
      expect(actual).toEqual(expected);

      // Edit click
      const buttonEdit = wrapper.find('[data-testid="edit-button"]').first();
      buttonEdit.simulate('click');

      actual = wrapper.find('input').first();
      actual = !!actual;
      expect(actual).toEqual(expected);

      // Cancel click
      const buttonCancel = wrapper
        .find('[data-testid="cancel-button"]')
        .first();
      buttonCancel.simulate('click');

      actual = !!wrapper.find('input').first();
      expect(actual).toEqual(expected);
    });

    it('should render <FieldCustomEdit /> edit and save', () => {
      const basicData = {
        labelValueText: labelValueTextMock,
        isEncrypted: true,
        cleanOnEdit: true,
        labelEditText: 'Change',
      };

      const wrapper = mount(
        <IntlProvider locale="en">
          <FieldCustomEdit onEditionSave={onEditionSave} {...basicData} />
        </IntlProvider>
      );

      let actual = !!wrapper.find('[data-testid="main-value-container-div"]');
      let expected = true;
      expect(actual).toEqual(expected);

      // Edit click
      const buttonEdit = wrapper.find('[data-testid="edit-button"]').first();
      buttonEdit.simulate('click');

      // Save click
      const buttonSave = wrapper.find('[data-testid="save-button"]').first();
      buttonSave.simulate('click');

      expected = '';
      actual = wrapper
        .find('input')
        .first()
        .text();
      expect(actual).toEqual(expected);
    });

    it('should render <FieldCustomEdit /> edit and call change', () => {
      const basicData = {
        labelValueText: labelValueTextMock,
        isEncrypted: true,
        cleanOnEdit: true,
        labelEditText: 'Change',
      };

      const wrapper = mount(
        <IntlProvider locale="en">
          <FieldCustomEdit onEditionSave={onEditionSave} {...basicData} />
        </IntlProvider>
      );

      let actual = !!wrapper.find('[data-testid="main-value-container-div"]');
      let expected = true;
      expect(actual).toEqual(expected);

      // Edit click
      const buttonEdit = wrapper.find('[data-testid="edit-button"]').first();
      buttonEdit.simulate('click');

      // Save click
      const buttonSave = wrapper.find('[data-testid="save-button"]').first();
      buttonSave.simulate('click');

      wrapper.find('input').simulate('change');

      expected = '';
      actual = wrapper
        .find('input')
        .first()
        .text();

      expect(actual).toEqual(expected);
    });
  });
});
