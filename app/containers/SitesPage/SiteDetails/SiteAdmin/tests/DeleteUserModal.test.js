import React from 'react';
import { shallow, mount } from 'enzyme';
import { IntlProvider } from 'react-intl';

import DeleteUserModal from '../modals/DeleteUserModal';

import messages from '../messages';

describe('<DeleteUserModal />', () => {
  const isModalOpen = true;
  const { deleteModal: deleteModalMessages } = messages;

  const wrapper = shallow(
    <IntlProvider locale="en">
      <DeleteUserModal openModal={isModalOpen} />
    </IntlProvider>
  );
  const component = wrapper.dive();
  const modalTitle = component
    .dive()
    .find('[data-testid="content-modalTitle"]');

  describe('#DeleteUserModal', () => {
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
      const { defaultMessage: expected } = deleteModalMessages.title;
      expect(actual).toBe(expected);
    });
  });
  describe('Mount the component', () => {
    it('should the component exists mounted', () => {
      const mountWrapper = mount(
        <IntlProvider locale="en">
          <DeleteUserModal openModal={isModalOpen} />
        </IntlProvider>
      );
      const expected = true;
      const actual = mountWrapper.exists();
      expect(actual).toBe(expected);
    });
  });
});
