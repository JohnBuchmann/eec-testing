import React from 'react';
import { shallow, mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import AddNewUserModal from '../modals/AddNewUserModal';
import messages from '../messages';

describe('AddNewUserModal', () => {
  const usersMocks = [
    {
      id: '123',
      profile: {
        firstName: 'ICIAN 5',
        userGroup: 'ICIAN',
        email: 'ician5@ician.com',
      },
    },
    {
      id: '456',
      profile: {
        firstName: 'ICIAN 6',
        userGroup: 'ICIAN',
        email: 'ician6@ician.com',
      },
    },
  ];
  describe('<AutoComplete />', () => {
    const { sitePermissions } = messages || {};
    const modalTitle = sitePermissions.addUserButtonLabel || '';
    const isModalOpen = false;
    const wrapper = shallow(
      <IntlProvider locale="en">
        <AddNewUserModal
          open={isModalOpen}
          title={modalTitle}
          users={usersMocks}
        />
      </IntlProvider>
    );
    const component = wrapper.dive();
    const autoComplete = component
      .dive()
      .find('[data-testid="content-autoCompleteBox"]');
    it('should open the modal if the property is set to false', () => {
      const expected = false;
      const actual = wrapper.props().open;
      expect(actual).toBe(expected);
    });
    it('should the input field exists', () => {
      const inputField = autoComplete
        .dive()
        .find('[data-testid="content-autoCompleteBox"]');
      const expected = true;
      const actual = inputField.exists();
      expect(actual).toBe(expected);
    });
    it('should autoComplete component exists', () => {
      const expected = true;
      const actual = autoComplete.exists();
      expect(actual).toBe(expected);
    });
    it('should have the same options as users in array', () => {
      const actual = autoComplete.props().options.length;
      const expected = usersMocks.length;
      expect(actual).toEqual(expected);
    });
  });
  describe('<Buttons />', () => {
    const { sitePermissions } = messages || {};
    const modalTitle = sitePermissions.addUserButtonLabel || '';
    const isModalOpen = false;
    const wrapper = shallow(
      <IntlProvider locale="en">
        <AddNewUserModal
          openModal={isModalOpen}
          modalTitle={modalTitle}
          users={usersMocks}
        />
      </IntlProvider>
    );
    const component = wrapper.dive();
    it('should the button to close the dialog exists', () => {
      const closeButton = component
        .dive()
        .find('[data-testid="content-modalCloseButton"]');
      const expected = true;
      const actual = closeButton.exists();
      expect(actual).toBe(expected);
    });
    it('should the button to submit the dialog exists', () => {
      const submitButton = component
        .dive()
        .find('[data-testid="content-modalSubmitButton"]');
      const expected = true;
      const actual = submitButton.exists();
      expect(actual).toBe(expected);
    });
    it('should mount the component and exists', () => {
      const isOpen = true;
      const newUsersToAdd = {
        firstName: 'ICIAN 6',
        userGroup: 'ICIAN',
        email: 'ician6@ician.com',
      };
      const modalComponent = mount(
        <IntlProvider locale="en">
          <AddNewUserModal
            openModal={isOpen}
            modalTitle={modalTitle}
            users={usersMocks}
            newUsersToAdd={newUsersToAdd}
          />
        </IntlProvider>
      );
      const actual = modalComponent.exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should the button to submit the dialog have text Add', () => {
      const { searchModal } = messages || {};
      const { defaultMessage: actual } = searchModal.addButtonLabel || '';
      const submitButton = component
        .dive()
        .find('[data-testid="content-modalSubmitButton"]');
      const tipoGraphy = submitButton.props().children;
      const { defaultMessage: expected } = tipoGraphy.props;
      expect(actual).toBe(expected);
    });
    it('should the button to submit the dialog disabled', () => {
      const submitButton = component
        .dive()
        .find('[data-testid="content-modalSubmitButton"]');
      const expected = true;
      const actual = submitButton.props().disabled;
      expect(actual).toBe(expected);
    });
  });
});
