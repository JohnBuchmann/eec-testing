import { mount, shallow } from 'enzyme';
import React from 'react';
import { IntlProvider } from 'react-intl';
import messages from '../messages';
import SavedModal from '../SavedModal';

describe('<SavedModal />', () => {
  const isModalOpen = true;
  const { savedAlert } = messages;

  const wrapper = shallow(
    <IntlProvider locale="en">
      <SavedModal openModal={isModalOpen} />
    </IntlProvider>
  );
  const component = wrapper.dive();
  const modalTitle = component
    .dive()
    .find('[data-testid="content-modalTitle"]');

  describe('#SavedModal', () => {
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
      const { defaultMessage: expected } = savedAlert.titleSuccess;
      expect(actual).toBe(expected);
    });

    it('should have the same title than custom message title ', () => {
      const customText = 'Custom Message Input';
      const customMessage = {
        titleMessage: customText,
        bodyMessage: customText,
      };
      const wrapperCustom = mount(
        <IntlProvider locale="en">
          <SavedModal openModal={isModalOpen} customMessage={customMessage} />
        </IntlProvider>
      );
      const expected = true;
      const actual = wrapperCustom.exists();
      expect(actual).toBe(expected);
    });
  });
  describe('Mount the component', () => {
    it('should the component exists mounted', () => {
      const mountWrapper = mount(
        <IntlProvider locale="en">
          <SavedModal openModal={isModalOpen} />
        </IntlProvider>
      );
      const expected = true;
      const actual = mountWrapper.exists();
      expect(actual).toBe(expected);
    });
  });
});
