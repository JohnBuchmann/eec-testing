import React from 'react';
import { shallow, mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import TariffStructureEditModal from '../modals/TariffStructureEditModal';

import messages from '../messages';

describe('<TariffStructureEditModal />', () => {
  describe('Mount the component', () => {
    it('should the component exists mounted', () => {
      const mountWrapper = mount(
        <IntlProvider locale="en">
          <TariffStructureEditModal openModal />
        </IntlProvider>
      );
      const expected = true;
      const actual = mountWrapper.exists();
      expect(actual).toBe(expected);
    });
    it('should the component exists mounted', () => {
      const isOpen = false;
      const mountWrapper = mount(
        <IntlProvider locale="en">
          <TariffStructureEditModal openModal={isOpen} />
        </IntlProvider>
      );
      const expected = true;
      const actual = mountWrapper.exists();
      expect(actual).toBe(expected);
    });
  });

  describe('constructor', () => {
    const { tariffUpdateModal: tariffStructureModalMessages } = messages;

    const wrapper = shallow(
      <IntlProvider locale="en">
        <TariffStructureEditModal openModal />
      </IntlProvider>
    );
    const component = wrapper.dive();
    const modalTitle = component
      .dive()
      .find('[data-testid="content-modalTitle"]');

    it('should component exists', () => {
      const expected = true;
      const actual = component.exists();
      expect(actual).toBe(expected);
    });
    it('should exists the ModalTitle', () => {
      const expected = true;
      const actual = modalTitle.exists();
      expect(actual).toBe(expected);
    });
    it('should have the same title in the messages', () => {
      const { defaultMessage: actual } = modalTitle.props();
      const { defaultMessage: expected } = tariffStructureModalMessages.title;
      expect(actual).toBe(expected);
    });
    it('should the cancel button exists', () => {
      const actual = component
        .find('[data-testid="content-modalDeleteCloseButton"]')
        .exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should the submit button exists', () => {
      const actual = component
        .find('[data-testid="content-modalTariffStructureSubmitButton"]')
        .exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
  describe('Modal > buttons', () => {
    const submitTariffStructureDialog = jest.fn(() => {});
    const closeTariffStructureEditDialog = jest.fn(() => {});
    const wrapper = shallow(
      <IntlProvider locale="en">
        <TariffStructureEditModal
          openModal
          submitTariffStructureDialog={submitTariffStructureDialog}
          closeTariffStructureEditDialog={closeTariffStructureEditDialog}
        />
      </IntlProvider>
    );
    const component = wrapper.dive();

    it('should cancel button click call closeTariffStructureEditDialog method', () => {
      const actual = closeTariffStructureEditDialog;
      const button = component.find(
        '[data-testid="content-modalDeleteCloseButton"]'
      );
      button.props().onClick();
      expect(actual).toHaveBeenCalled();
    });

    it('should submit button click call submitTariffStructureDialog method', () => {
      const actual = submitTariffStructureDialog;
      const button = component.find(
        '[data-testid="content-modalTariffStructureSubmitButton"]'
      );
      button.props().onClick();
      expect(actual).toHaveBeenCalled();
    });
  });
});
