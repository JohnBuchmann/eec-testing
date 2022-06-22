import Enzyme, { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { IntlProvider } from 'react-intl';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import React from 'react';
import { userLogin } from 'Internals/mocks/userLogin';
import ConsentManagementModal from '../ConsentManagementModal';

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const consentEffectiveDate = '2022-09-15 12:00:00';
const modalShow = true;
const storeMockData = {
  user: userLogin,
  policy: {
    consentEffectiveDate,
    consentTimestamp: '2021-04-05 16:07:44',
    active: true,
    urlPolicy:
      'https://energybyentech.com/wp-content/uploads/2021/02/EnTech_Solutions_-_Privacy_Policy.pdf',
  },
};
const store = mockStore(storeMockData);

describe('<ConsentManagementModal />', () => {
  describe('<ConsentManagementModal /> component is mounted', () => {
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConsentManagementModal
            openModal={modalShow}
            effectiveDate={consentEffectiveDate}
            pdf
            {...store}
          />
        </IntlProvider>
      </Provider>
    );
    it('ConsentManagementModal component should exists', () => {
      const component = wrapper.find(
        '[data-testid="content-consentManagementModal"]'
      );
      const actual = component.exists();
      const expected = true;
      expect(actual).toBe(expected);
    });

    it('should display pdf container with pdf file', () => {
      const componentPdf = wrapper.find('[data-testid="content-pdfContainer"]');
      const actual = componentPdf.exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
  describe('First display contains "Dont Accept" and "ACCEPT" buttons', () => {
    it('should display dont accept warning after first "Dont Accept button click"', () => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <ConsentManagementModal
              openModal={modalShow}
              effectiveDate={consentEffectiveDate}
              pdf
              {...store}
            />
          </IntlProvider>
        </Provider>
      );
      const firstDontAcceptButton = wrapper.find(
        '[data-testid="content-firstDontAcceptTermsButton"]'
      );
      firstDontAcceptButton.at(0).simulate('click');

      const dontAcceptWarning = wrapper.find(
        '[data-testid="content-dontAcceptWarningLabel"]'
      );

      const actual = dontAcceptWarning.exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
    it('should receive click on "ACCEPT" button and close modal', () => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en">
            <ConsentManagementModal
              openModal={modalShow}
              effectiveDate={consentEffectiveDate}
              pdf
              {...store}
            />
          </IntlProvider>
        </Provider>
      );
      const acceptButton = wrapper.find('[data-testid="content-acceptButton"]');
      acceptButton.at(0).simulate('click');

      const component = wrapper.find(
        'div[data-testid="content-consentManagementModal"]'
      );
      const actual = component.exists();
      const expected = false;
      expect(actual).toBe(expected);
    });
  });
  describe('Second display contains "Dont Accept" and "Review" buttons', () => {
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ConsentManagementModal
            openModal={modalShow}
            effectiveDate={consentEffectiveDate}
            pdf
            {...store}
          />
        </IntlProvider>
      </Provider>
    );
    const firstDontAcceptButton = wrapper.find(
      '[data-testid="content-firstDontAcceptTermsButton"]'
    );
    firstDontAcceptButton.at(0).simulate('click');
    it('should receive second "Dont Accept" button click and close modal', () => {
      const dontAcceptButtonLogout = wrapper.find(
        '[data-testid="content-dontAcceptButtonLogout"]'
      );
      dontAcceptButtonLogout.at(0).simulate('click');

      const component = wrapper.find(
        'div[data-testid="content-consentManagementModal"]'
      );
      const actual = component.exists();
      const expected = false;
      expect(actual).toBe(expected);
    });
    it('should receive "Review" button click', () => {
      const reviewButton = wrapper.find('[data-testid="content-reviewButton"]');
      reviewButton.at(0).simulate('click');

      const component = wrapper.find(
        '[data-testid="content-consentManagementModal"]'
      );
      const actual = component.exists();
      const expected = true;
      expect(actual).toBe(expected);
    });
  });
});
