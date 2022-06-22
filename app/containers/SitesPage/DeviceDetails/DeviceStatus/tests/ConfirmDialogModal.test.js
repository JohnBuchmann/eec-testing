import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import ConfirmDialogModal from '../ConfirmDialogModal';
import messages from '../../messages';

describe('<ConfirmDialogModal />', () => {
  describe('Mount the component', () => {
    it('should the component exists mounted', () => {
      const isOpen = false;
      const mountWrapper = mount(
        <IntlProvider locale="en">
          <ConfirmDialogModal openModal={isOpen} />
        </IntlProvider>
      );
      const expected = true;
      const actual = mountWrapper.exists();
      expect(actual).toBe(expected);
    });
  });

  describe('Cancel Changes', () => {
    const { cancelChanges } = messages;
    const isOpen = true;
    const continueDialogFn = jest.fn(() => true);
    const discardDialogFn = jest.fn(() => true);

    const wrapper = mount(
      <IntlProvider locale="en">
        <ConfirmDialogModal
          openModal={isOpen}
          continueDialog={continueDialogFn}
          discardDialog={discardDialogFn}
          title={cancelChanges.title.defaultMessage}
          body={cancelChanges.body.defaultMessage}
          discardButton={cancelChanges.discardButton.defaultMessage}
          continueButton={cancelChanges.continueButton.defaultMessage}
        />
      </IntlProvider>
    );
    const modalTitle = wrapper
      .find('[data-testid="content-modalTitle"]')
      .first();
    const modalBody = wrapper.find('[data-testid="content-modalBody"]').first();
    const modalDiscard = wrapper
      .find('[data-testid="content-modalDiscardButton"]')
      .first();
    const modalContinue = wrapper
      .find('[data-testid="content-modalContinueButton"]')
      .first();
    it('should exist title', () => {
      const expected = true;
      const actual = modalTitle.exists();
      expect(actual).toBe(expected);
    });

    it('should component exist', () => {
      const expected = true;
      const actual = wrapper.exists();
      expect(actual).toBe(expected);
    });

    it('should validate text title', () => {
      const { children: actual } = modalTitle.props();
      const { defaultMessage: expected } = cancelChanges.title;
      expect(actual).toBe(expected);
    });

    it('should exist body', () => {
      const expected = true;
      const actual = modalBody.exists();
      expect(actual).toBe(expected);
    });

    it('should validate text body', () => {
      const { children: actual } = modalBody.props();
      const { defaultMessage: expected } = cancelChanges.body;
      expect(actual).toBe(expected);
    });

    it('should exist discard button', () => {
      const expected = true;
      const actual = modalDiscard.exists();
      expect(actual).toBe(expected);
    });

    it('should validate text discard button', () => {
      const { children: actual } = modalDiscard.props().children.props;
      const { defaultMessage: expected } = cancelChanges.discardButton;
      expect(actual).toBe(expected);
    });

    it('should click on discard button and call function discardDialogFn', () => {
      modalDiscard.simulate('click');
      expect(discardDialogFn).toHaveBeenCalled();
    });

    it('should exist continue button', () => {
      const expected = true;
      const actual = modalContinue.exists();
      expect(actual).toBe(expected);
    });

    it('should validate text continue button', () => {
      const { children: actual } = modalContinue.props().children.props;
      const { defaultMessage: expected } = cancelChanges.continueButton;
      expect(actual).toBe(expected);
    });

    it('should click on continue button and call function continueDialogFn', () => {
      modalContinue.simulate('click');
      expect(continueDialogFn).toHaveBeenCalled();
    });
  });

  describe('Changes Successful', () => {
    const { changesSuccessful } = messages;
    const isOpen = true;
    const continueDialogFn = jest.fn(() => true);

    const wrapper = mount(
      <IntlProvider locale="en">
        <ConfirmDialogModal
          openModal={isOpen}
          continueDialog={continueDialogFn}
          discardDialog={null}
          title={changesSuccessful.title.defaultMessage}
          body={changesSuccessful.body.defaultMessage}
          discardButton={null}
          continueButton={changesSuccessful.continueButton.defaultMessage}
        />
      </IntlProvider>
    );
    const modalTitle = wrapper
      .find('[data-testid="content-modalTitle"]')
      .first();
    const modalBody = wrapper.find('[data-testid="content-modalBody"]').first();
    const modalDiscard = wrapper
      .find('[data-testid="content-modalDiscardButton"]')
      .first();
    const modalContinue = wrapper
      .find('[data-testid="content-modalContinueButton"]')
      .first();
    it('should exist title', () => {
      const expected = true;
      const actual = modalTitle.exists();
      expect(actual).toBe(expected);
    });

    it('should validate text title', () => {
      const { children: actual } = modalTitle.props();
      const { defaultMessage: expected } = changesSuccessful.title;
      expect(actual).toBe(expected);
    });

    it('should exist body', () => {
      const expected = true;
      const actual = modalBody.exists();
      expect(actual).toBe(expected);
    });

    it('should validate text body', () => {
      const { children: actual } = modalBody.props();
      const { defaultMessage: expected } = changesSuccessful.body;
      expect(actual).toBe(expected);
    });

    it('should exist discard button', () => {
      const expected = false;
      const actual = modalDiscard.exists();
      expect(actual).toBe(expected);
    });

    it('should exist continue button', () => {
      const expected = true;
      const actual = modalContinue.exists();
      expect(actual).toBe(expected);
    });

    it('should validate text continue button', () => {
      const { children: actual } = modalContinue.props().children.props;
      const { defaultMessage: expected } = changesSuccessful.continueButton;
      expect(actual).toBe(expected);
    });

    it('should click on continue button and call function continueDialogFn', () => {
      modalContinue.simulate('click');
      expect(continueDialogFn).toHaveBeenCalled();
    });
  });
});
