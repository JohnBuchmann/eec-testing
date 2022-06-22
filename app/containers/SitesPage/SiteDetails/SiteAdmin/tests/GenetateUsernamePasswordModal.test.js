import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import GenerateUsernamePasswordModal from '../modals/GenerateUsernamePasswordModal';

describe('GenerateUsernamePasswordModal', () => {
  const isModalOpen = true;
  const submitDialog = jest.fn();
  const closeDialog = jest.fn();
  const wrapper = mount(
    <IntlProvider locale="en">
      <GenerateUsernamePasswordModal
        openModal={isModalOpen}
        submitUsernamePasswordDialog={submitDialog}
        closetUsernamePasswordDialog={closeDialog}
      />
    </IntlProvider>
  );
  const component = wrapper;
  const cancelButton = component
    .find('[data-testid="content-modalGenerateNewUsernamePasswordCloseButton"]')
    .first();
  const submitButton = component
    .find(
      '[data-testid="content-modalGenerateNewUsernamePasswordSubmitButton"]'
    )
    .first();
  it('should component exists', () => {
    const expected = true;
    const actual = component.exists();
    expect(actual).toBe(expected);
  });

  it('should exist cancel button in the modal', () => {
    const expected = true;
    const actual = cancelButton.exists();
    expect(actual).toBe(expected);
  });

  it('should click cancel button and call function closeDialog', () => {
    cancelButton.simulate('click');
    expect(closeDialog).toHaveBeenCalled();
  });

  it('should exist submit button in the modal', () => {
    const expected = true;
    const actual = submitButton.exists();
    expect(actual).toBe(expected);
  });

  it('should click submit button and call function submitDialog', () => {
    submitButton.simulate('click');
    expect(submitDialog).toHaveBeenCalled();
  });
});
