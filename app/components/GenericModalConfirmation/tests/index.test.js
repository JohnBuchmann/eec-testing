import { mount } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';
import GenericModalConfirmation from '../index';

describe('#GenericModalConfirmation', () => {
  describe('#Constructor', () => {
    it('should render component with minimal data', () => {
      const wrapper = mount(
        <IntlProvider locale="en">
          <GenericModalConfirmation />
        </IntlProvider>
      );
      const actual = !!wrapper;
      const expected = true;
      expect(actual).toEqual(expected);
    });

    it('should render component with all options', () => {
      const wrapper = mount(
        <IntlProvider locale="en">
          <GenericModalConfirmation
            openModal
            bodyMessage="Body Message"
            titleMessage="Title Message"
            saveLabelText="Save"
            cancelLabelText="Cancel"
          />
        </IntlProvider>
      );
      const actual = !!wrapper;
      const expected = true;
      expect(actual).toEqual(expected);
    });

    it('should hide cancel button when showCancel is sent as false', () => {
      const wrapper = mount(
        <IntlProvider locale="en">
          <GenericModalConfirmation
            openModal
            bodyMessage="Body Message"
            titleMessage="Title Message"
            saveLabelText="Save"
            cancelLabelText="Cancel"
            showCancel={false}
          />
        </IntlProvider>
      );

      const expected = 0;
      const actual = wrapper.find('[data-testid="modal-cancel-button"]').length;

      expect(actual).toEqual(expected);
    });

    it('should hide submit button when showSubmit is sent as false', () => {
      const wrapper = mount(
        <IntlProvider locale="en">
          <GenericModalConfirmation
            openModal
            bodyMessage="Body Message"
            titleMessage="Title Message"
            saveLabelText="Save"
            cancelLabelText="Cancel"
            showSubmit={false}
          />
        </IntlProvider>
      );

      const expected = 0;
      const actual = wrapper.find('[data-testid="modal-submit-button"]').length;

      expect(actual).toEqual(expected);
    });
  });
});
