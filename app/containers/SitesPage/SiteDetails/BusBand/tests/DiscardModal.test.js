import React from 'react';
import { shallow, mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import DiscardModal from '../DiscardModal';

import messages from '../messages';

describe('<DiscardModal />', () => {
  const isModalOpen = true;
  const { discardAlert } = messages;

  const wrapper = shallow(
    <IntlProvider locale="en">
      <DiscardModal openModal={isModalOpen} />
    </IntlProvider>
  );
  const component = wrapper.dive();
  const modalTitle = component
    .dive()
    .find('[data-testid="content-modalTitle"]');

  describe('#DiscardModal', () => {
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
      const { defaultMessage: expected } = discardAlert.title;
      expect(actual).toBe(expected);
    });
  });
  describe('Mount the component', () => {
    it('should the component exists mounted', () => {
      const mountWrapper = mount(
        <IntlProvider locale="en">
          <DiscardModal openModal={isModalOpen} />
        </IntlProvider>
      );
      const expected = true;
      const actual = mountWrapper.exists();
      expect(actual).toBe(expected);
    });

    it('should mount the component with default data.', () => {
      const mountWrapper = mount(
        <IntlProvider locale="en">
          <DiscardModal />
        </IntlProvider>
      );
      const expected = true;
      const actual = mountWrapper.exists();
      expect(actual).toBe(expected);
    });
  });
});
